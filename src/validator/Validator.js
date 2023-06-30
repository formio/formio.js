import _ from 'lodash';
import {
  boolValue,
  getInputMask,
  matchInputMask,
  getDateSetting,
  escapeRegExCharacters,
  interpolate,
  convertFormatToMoment, getArrayFromComponentPath, unescapeHTML
} from '../utils/utils';
import moment from 'moment';
import NativePromise from 'native-promise-only';
import fetchPonyfill from 'fetch-ponyfill';
const { fetch, Headers, Request } = fetchPonyfill({
  Promise: NativePromise
});
import {
  checkInvalidDate,
  CALENDAR_ERROR_MESSAGES
} from '../utils/calendarUtils';
import Rules from './Rules';

class ValidationChecker {
  constructor(config = {}) {
    this.config = _.defaults(config, ValidationChecker.config);
    this.validators = {
      required: {
        key: 'validate.required',
        method: 'validateRequired',
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('required'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          if (!boolValue(setting) || component.isValueHidden()) {
            return true;
          }

          const isCalendar = component.validators.some(validator => validator === 'calendar');

          if (!value && isCalendar && component.widget.enteredDate) {
            return !this.validators.calendar.check.call(this, component, setting, value);
          }

          return !component.isEmpty(value);
        }
      },
      onlyAvailableItems: {
        key: 'validate.onlyAvailableItems',
        method: 'validateValueAvailability',
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('valueIsNotAvailable'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting) {
          return !boolValue(setting);
        }
      },
      unique: {
        key: 'validate.unique',
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('unique'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          // Skip if setting is falsy
          if (!boolValue(setting)) {
            return true;
          }

          // Skip if value is empty object or falsy
          if (!value || _.isObjectLike(value) && _.isEmpty(value)) {
            return true;
          }

          // Skip if we don't have a database connection
          if (!this.config.db) {
            return true;
          }

          return new NativePromise(resolve => {
            const form = this.config.form;
            const submission = this.config.submission;
            const path = `data.${component.path}`;

            const addPathQueryParams = (pathQueryParams, query, path) => {
              const pathArray = path.split(/\[\d+\]?./);
              const needValuesInArray = pathArray.length > 1;

              let pathToValue = path;

              if (needValuesInArray) {
                pathToValue = pathArray.shift();
                const pathQueryObj = {};

                _.reduce(pathArray, (pathQueryPath, pathPart, index) => {
                  const isLastPathPart = index === (pathArray.length - 1);
                  const obj = _.get(pathQueryObj, pathQueryPath, pathQueryObj);
                  const addedPath = `$elemMatch['${pathPart}']`;

                  _.set(obj, addedPath, isLastPathPart ? pathQueryParams : {});

                  return pathQueryPath ? `${pathQueryPath}.${addedPath}` : addedPath;
                }, '');

                query[pathToValue] = pathQueryObj;
              }
              else {
                query[pathToValue] = pathQueryParams;
              }
            };

            // Build the query
            const query = { form: form._id };
            let collationOptions = {};

            if (_.isString(value)) {
              if (component.component.dbIndex) {
                addPathQueryParams(value, query, path);
              }
              // These are kind of hacky but provides for a more efficient "unique" validation when the string is an email,
              // because we (by and large) only have to worry about ASCII and partial unicode; this way, we can use collation-
              // aware indexes with case insensitive email searches to make things like login and registration a whole lot faster
              else if (
                component.component.type === 'email' ||
                (component.component.type === 'textfield' && component.component.validate?.pattern === '[A-Za-z0-9]+')
              ) {
                addPathQueryParams(value, query, path);
                collationOptions = { collation: { locale: 'en', strength: 2 } };
              }
              else {
                addPathQueryParams({
                  $regex: new RegExp(`^${escapeRegExCharacters(value)}$`),
                  $options: 'i'
                }, query, path);
              }
            }
            // FOR-213 - Pluck the unique location id
            else if (
              _.isPlainObject(value) &&
              value.address &&
              value.address['address_components'] &&
              value.address['place_id']
            ) {
              addPathQueryParams({
                $regex: new RegExp(`^${escapeRegExCharacters(value.address['place_id'])}$`),
                $options: 'i'
              }, query, `${path}.address.place_id`);
            }
            // Compare the contents of arrays vs the order.
            else if (_.isArray(value)) {
              addPathQueryParams({ $all: value }, query, path);
            }
            else if (_.isObject(value) || _.isNumber(value)) {
              addPathQueryParams({ $eq: value }, query, path);
            }
            // Only search for non-deleted items
            query.deleted = { $eq: null };
            query.state = 'submitted';
            const uniqueValidationCallback = (err, result) => {
              if (err) {
                return resolve(false);
              }
              else if (result) {
               // Only OK if it matches the current submission
                if (submission._id && (result._id.toString() === submission._id)) {
                  resolve(true);
                }
                else {
                  component.conflictId = result._id.toString();
                  return resolve(false);
                }
              }
              else {
                return resolve(true);
              }
            };
            // Try to find an existing value within the form
            this.config.db.findOne(query, null, collationOptions, (err, result) => {
              if (err && collationOptions.collation) {
                // presume this error comes from db compatibility, try again as regex
                delete query[path];
                addPathQueryParams({
                  $regex: new RegExp(`^${escapeRegExCharacters(value)}$`),
                  $options: 'i'
                }, query, path);
                this.config.db.findOne(query, uniqueValidationCallback);
              }
              else {
                return uniqueValidationCallback(err, result);
              }
            });
          }).catch(() => false);
        }
      },
      multiple: {
        key: 'validate.multiple',
        hasLabel: true,
        message(component) {
          const shouldBeArray = boolValue(component.component.multiple) || Array.isArray(component.emptyValue);
          const isRequired = component.component.validate.required;
          const messageKey = shouldBeArray ? (isRequired ? 'array_nonempty' : 'array') : 'nonarray';

          return component.t(component.errorMessage(messageKey), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          // Skip multiple validation if the component tells us to
          if (!component.validateMultiple()) {
            return true;
          }

          const shouldBeArray = boolValue(setting);
          const canBeArray = Array.isArray(component.emptyValue);
          const isArray = Array.isArray(value);
          const isRequired = component.component.validate.required;

          if (shouldBeArray) {
            if (isArray) {
              return isRequired ? !!value.length : true;
            }
            else {
              // Null/undefined is ok if this value isn't required; anything else should fail
              return _.isNil(value) ? !isRequired : false;
            }
          }
          else {
            return canBeArray || !isArray;
          }
        }
      },
      select: {
        key: 'validate.select',
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('select'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value, data, index, row, async) {
          // Skip if setting is falsy
          if (!boolValue(setting)) {
            return true;
          }

          // Skip if value is empty
          if (!value || _.isEmpty(value)) {
            return true;
          }

          // Skip if we're not async-capable
          if (!async) {
            return true;
          }

          const schema = component.component;

          // Initialize the request options
          const requestOptions = {
            url: setting,
            method: 'GET',
            qs: {},
            json: true,
            headers: {}
          };

          // If the url is a boolean value
          if (_.isBoolean(requestOptions.url)) {
            requestOptions.url = !!requestOptions.url;

            if (
              !requestOptions.url ||
              schema.dataSrc !== 'url' ||
              !schema.data.url ||
              !schema.searchField
            ) {
              return true;
            }

            // Get the validation url
            requestOptions.url = schema.data.url;

            // Add the search field
            requestOptions.qs[schema.searchField] = value;

            // Add the filters
            if (schema.filter) {
              requestOptions.url += (!requestOptions.url.includes('?') ? '?' : '&') + schema.filter;
            }

            // If they only wish to return certain fields.
            if (schema.selectFields) {
              requestOptions.qs.select = schema.selectFields;
            }
          }

          if (!requestOptions.url) {
            return true;
          }

          // Make sure to interpolate.
          requestOptions.url = interpolate(requestOptions.url, { data: component.data });

          // Add query string to URL
          requestOptions.url += (requestOptions.url.includes('?') ? '&' : '?') + _.chain(requestOptions.qs)
            .map((val, key) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&')
            .value();

          // Set custom headers.
          if (schema.data && schema.data.headers) {
            _.each(schema.data.headers, header => {
              if (header.key) {
                requestOptions.headers[header.key] = header.value;
              }
            });
          }

          // Set form.io authentication.
          if (schema.authenticate && this.config.token) {
            requestOptions.headers['x-jwt-token'] = this.config.token;
          }

          return fetch(new Request(requestOptions.url, {
            headers: new Headers(requestOptions.headers)
          }))
            .then(response => {
              if (!response.ok) {
                return false;
              }

              return response.json();
            })
            .then((results) => {
              return results && results.length;
            })
            .catch(() => false);
        }
      },
      min: {
        key: 'validate.min',
        hasLabel: true,
        message(component, setting) {
          return component.t(component.errorMessage('min'), {
            field: component.errorLabel,
            min: parseFloat(setting),
            data: component.data
          });
        },
        check(component, setting, value) {
          const min = parseFloat(setting);
          const parsedValue = parseFloat(value);

          if (Number.isNaN(min) || Number.isNaN(parsedValue)) {
            return true;
          }

          return parsedValue >= min;
        }
      },
      max: {
        key: 'validate.max',
        hasLabel: true,
        message(component, setting) {
          return component.t(component.errorMessage('max'), {
            field: component.errorLabel,
            max: parseFloat(setting),
            data: component.data
          });
        },
        check(component, setting, value) {
          const max = parseFloat(setting);
          const parsedValue = parseFloat(value);

          if (Number.isNaN(max) || Number.isNaN(parsedValue)) {
            return true;
          }

          return parsedValue <= max;
        }
      },
      minSelectedCount: {
        key: 'validate.minSelectedCount',
        message(component, setting) {
          return component.component.minSelectedCountMessage
            ? component.component.minSelectedCountMessage
            : component.t(component.errorMessage('minSelectedCount'), {
                minCount: parseFloat(setting),
                data: component.data
              });
        },
        check(component, setting, value) {
          const min = parseFloat(setting);

          if (!min) {
            return true;
          }
          const count = Object.keys(value).reduce((total, key) =>{
            if (value[key]) {
              total++;
            }
            return total;
          }, 0);

          // Should not be triggered if there is no options selected at all
          return !count || count >= min;
        }
      },
      maxSelectedCount: {
        key: 'validate.maxSelectedCount',
        message(component, setting) {
          return component.component.maxSelectedCountMessage
            ? component.component.maxSelectedCountMessage
            : component.t(component.errorMessage('maxSelectedCount'), {
                minCount: parseFloat(setting),
                data: component.data
              });
        },
        check(component, setting, value) {
          const max = parseFloat(setting);

          if (!max) {
            return true;
          }
          const count = Object.keys(value).reduce((total, key) =>{
            if (value[key]) {
              total++;
            }
            return total;
          }, 0);

          return count <= max;
        }
      },
      minLength: {
        key: 'validate.minLength',
        hasLabel: true,
        message(component, setting) {
          return component.t(component.errorMessage('minLength'), {
            field: component.errorLabel,
            length: setting,
            data: component.data
          });
        },
        check(component, setting, value) {
          const minLength = parseInt(setting, 10);
          if (!value || !minLength || (typeof value !== 'string') || component.isEmpty(value)) {
            return true;
          }
          return (value.length >= minLength);
        }
      },
      maxLength: {
        key: 'validate.maxLength',
        hasLabel: true,
        message(component, setting) {
          return component.t(component.errorMessage('maxLength'), {
            field: component.errorLabel,
            length: setting,
            data: component.data
          });
        },
        check(component, setting, value) {
          const maxLength = parseInt(setting, 10);
          if (!maxLength || (typeof value !== 'string')) {
            return true;
          }
          return (value.length <= maxLength);
        }
      },
      maxWords: {
        key: 'validate.maxWords',
        hasLabel: true,
        message(component, setting) {
          return component.t(component.errorMessage('maxWords'), {
            field: component.errorLabel,
            length: setting,
            data: component.data
          });
        },
        check(component, setting, value) {
          const maxWords = parseInt(setting, 10);
          if (!maxWords || (typeof value !== 'string')) {
            return true;
          }
          return (value.trim().split(/\s+/).length <= maxWords);
        }
      },
      minWords: {
        key: 'validate.minWords',
        hasLabel: true,
        message(component, setting) {
          return component.t(component.errorMessage('minWords'), {
            field: component.errorLabel,
            length: setting,
            data: component.data
          });
        },
        check(component, setting, value) {
          const minWords = parseInt(setting, 10);
          if (!minWords || !value || (typeof value !== 'string')) {
            return true;
          }
          return (value.trim().split(/\s+/).length >= minWords);
        }
      },
      email: {
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('invalid_email'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          /* eslint-disable max-len */
          // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          /* eslint-enable max-len */

          // Allow emails to be valid if the component is pristine and no value is provided.
          return !value || re.test(value);
        }
      },
      url: {
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('invalid_url'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          /* eslint-disable max-len */
          // From https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
          const re = /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
          // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
          const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          /* eslint-enable max-len */

          // Allow urls to be valid if the component is pristine and no value is provided.
          return !value || (re.test(value) && !emailRe.test(value));
        }
      },
      date: {
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('invalid_date'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          if (!value) {
            return true;
          }
          if (value === 'Invalid date' || value === 'Invalid Date') {
            return false;
          }
          if (typeof value === 'string') {
            value = new Date(value);
          }
          return value instanceof Date === true && value.toString() !== 'Invalid Date';
        }
      },
      day: {
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('invalid_day'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          if (!value) {
            return true;
          }
          const [DAY, MONTH, YEAR] = component.dayFirst ? [0, 1, 2] : [1, 0, 2];
          const values = value.split('/').map(x => parseInt(x, 10)),
            day = values[DAY],
            month = values[MONTH],
            year = values[YEAR],
            maxDay = getDaysInMonthCount(month, year);

          if (day < 0 || day > maxDay) {
            return false;
          }
          if (month < 0 || month > 12) {
            return false;
          }
          if (year < 0 || year > 9999) {
            return false;
          }
          return true;

          function isLeapYear(year) {
            // Year is leap if it is evenly divisible by 400 or evenly divisible by 4 and not evenly divisible by 100.
            return !(year % 400) || (!!(year % 100) && !(year % 4));
          }

          function getDaysInMonthCount(month, year) {
            switch (month) {
              case 1:     // January
              case 3:     // March
              case 5:     // May
              case 7:     // July
              case 8:     // August
              case 10:    // October
              case 12:    // December
                return 31;
              case 4:     // April
              case 6:     // June
              case 9:     // September
              case 11:    // November
                return 30;
              case 2:     // February
                return isLeapYear(year) ? 29 : 28;
              default:
                return 31;
            }
          }
        }
      },
      pattern: {
        key: 'validate.pattern',
        hasLabel: true,
        message(component, setting) {
          return component.t(_.get(component, 'component.validate.patternMessage', component.errorMessage('pattern')), {
            field: component.errorLabel,
            pattern: setting,
            data: component.data
          });
        },
        check(component, setting, value) {
          if (component.isEmpty(value)) return true;

          const pattern = setting;
          if (!pattern) {
            return true;
          }
          const regex = new RegExp(`^${pattern}$`);
          return regex.test(value);
        }
      },
      json: {
        key: 'validate.json',
        check(component, setting, value, data, index, row) {
          if (!setting) {
            return true;
          }
          const valid = component.evaluate(setting, {
            data,
            row,
            rowIndex: index,
            input: value
          });
          if (valid === null) {
            return true;
          }
          return valid;
        }
      },
      mask: {
        key: 'inputMask',
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage('mask'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          let inputMask;
          if (component.isMultipleMasksField) {
            const maskName = value ? value.maskName : undefined;
            const formioInputMask = component.getMaskByName(maskName);
            if (formioInputMask) {
              inputMask = formioInputMask;
            }
            value = value ? value.value : value;
          }
          else {
            inputMask = setting;
          }

          inputMask = inputMask ? getInputMask(inputMask) : null;

          if (value && inputMask && !component.skipMaskValidation) {
            // If char which is used inside mask placeholder was used in the mask, replace it with space to prevent errors
            inputMask = inputMask.map((char) => char === component.placeholderChar ? ' ' : char);
            return matchInputMask(value, inputMask);
          }

          return true;
        }
      },
      custom: {
        key: 'validate.custom',
        message(component) {
          return component.t(component.errorMessage('custom'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value, data, index, row) {
          if (!setting) {
            return true;
          }
          const valid = component.evaluate(setting, {
            valid: true,
            data,
            rowIndex: index,
            row,
            input: value
          }, 'valid', true);
          if (valid === null) {
            return true;
          }
          return valid;
        }
      },
      maxDate: {
        key: 'maxDate',
        hasLabel: true,
        message(component, setting) {
          const date = getDateSetting(setting);
          return component.t(component.errorMessage('maxDate'), {
            field: component.errorLabel,
            maxDate: moment(date).format(component.format),
          });
        },
        check(component, setting, value) {
          //if any parts of day are missing, skip maxDate validation
          if (component.isPartialDay && component.isPartialDay(value)) {
            return true;
          }
          const date = component.getValidationFormat ? moment(value, component.getValidationFormat()) : moment(value);
          const maxDate = getDateSetting(setting);

          if (_.isNull(maxDate)) {
            return true;
          }
          else {
            maxDate.setHours(0, 0, 0, 0);
          }

          return date.isBefore(maxDate) || date.isSame(maxDate);
        }
      },
      minDate: {
        key: 'minDate',
        hasLabel: true,
        message(component, setting) {
          const date = getDateSetting(setting);
          return component.t(component.errorMessage('minDate'), {
            field: component.errorLabel,
            minDate: moment(date).format(component.format),
          });
        },
        check(component, setting, value) {
          //if any parts of day are missing, skip minDate validation
          if (component.isPartialDay && component.isPartialDay(value)) {
            return true;
          }
          const date = component.getValidationFormat ? moment(value, component.getValidationFormat()) : moment(value);
          const minDate = getDateSetting(setting);
          if (_.isNull(minDate)) {
            return true;
          }
          else {
            minDate.setHours(0, 0, 0, 0);
          }

          return date.isAfter(minDate) || date.isSame(minDate);
        }
      },
      minYear: {
        key: 'minYear',
        hasLabel: true,
        message(component, setting) {
          return component.t(component.errorMessage('minYear'), {
            field: component.errorLabel,
            minYear: setting,
          });
        },
        check(component, setting, value) {
          const minYear = setting;
          let year = /\d{4}$/.exec(value);
          year = year ? year[0] : null;

          if (!(+minYear) || !(+year)) {
            return true;
          }

          return +year >= +minYear;
        }
      },
      maxYear: {
        key: 'maxYear',
        hasLabel: true,
        message(component, setting) {
          return component.t(component.errorMessage('maxYear'), {
            field: component.errorLabel,
            maxYear: setting,
          });
        },
        check(component, setting, value) {
          const maxYear = setting;
          let year = /\d{4}$/.exec(value);
          year = year ? year[0] : null;

          if (!(+maxYear) || !(+year)) {
            return true;
          }

          return +year <= +maxYear;
        }
      },
      calendar: {
        key: 'validate.calendar',
        messageText: '',
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage(this.validators.calendar.messageText), {
            field: component.errorLabel,
            maxDate: moment(component.dataValue).format(component.format),
          });
        },
        check(component, setting, value, data, index) {
          this.validators.calendar.messageText = '';
          const widget = component.getWidget(index);
          if (!widget) {
            return true;
          }
          const { settings, enteredDate } = widget;
          const { minDate, maxDate, format } = settings;
          const momentFormat = [convertFormatToMoment(format)];

          if (momentFormat[0].match(/M{3,}/g)) {
            momentFormat.push(momentFormat[0].replace(/M{3,}/g, 'MM'));
          }

          if (!value && enteredDate) {
            const { message, result } = checkInvalidDate(enteredDate, momentFormat, minDate, maxDate);

            if (!result) {
              this.validators.calendar.messageText = message;
              return result;
            }
          }

          if (value && enteredDate) {
            if (moment(value).format() !== moment(enteredDate, momentFormat, true).format() && enteredDate.match(/_/gi)) {
              this.validators.calendar.messageText = CALENDAR_ERROR_MESSAGES.INCOMPLETE;
              return false;
            }
            else {
              widget.enteredDate = '';
              return true;
            }
          }
        }
      },
      time: {
        key: 'validate.time',
        messageText: 'Invalid time',
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage(this.validators.time.messageText), {
            field: component.errorLabel
          });
        },
        check(component, setting, value) {
          if (component.isEmpty(value)) return true;
          return moment(value, component.component.format).isValid();
        }
      },
      availableValueProperty: {
        key: 'validate.availableValueProperty',
        method: 'validateValueProperty',
        messageText: 'Invalid Value Property',
        hasLabel: true,
        message(component) {
          return component.t(component.errorMessage(this.validators.availableValueProperty.messageText), {
            field: component.errorLabel,
          });
        },
        check(component, setting, value) {
          if (component.component.dataSrc === 'url' && (_.isUndefined(value) || _.isObject(value))) {
            return false;
          }

          return true;
        }
      }
    };
  }

  checkValidator(component, validator, setting, value, data, index, row, async) {
    let resultOrPromise = null;

    // Allow each component to override their own validators by implementing the validator.method
    if (validator.method && (typeof component[validator.method] === 'function')) {
      resultOrPromise = component[validator.method](setting, value, data, index, row, async);
    }
    else {
      resultOrPromise = validator.check.call(this, component, setting, value, data, index, row, async);
    }

    const processResult = result => {
      if (typeof result === 'string') {
        return result;
      }

      if (!result && validator.message) {
        return validator.message.call(this, component, setting, index, row);
      }

      return '';
    };

    if (async) {
      return NativePromise.resolve(resultOrPromise).then(processResult);
    }
    else {
      return processResult(resultOrPromise);
    }
  }

  validate(component, validatorName, value, data, index, row, async, conditionallyVisible, validationObj) {
    // Skip validation for conditionally hidden components
    if (!conditionallyVisible) {
      return false;
    }

    const validator       = this.validators[validatorName];
    const setting         = _.get(validationObj || component.component, validator.key, null);
    const resultOrPromise = this.checkValidator(component, validator, setting, value, data, index, row, async);

    const processResult = result => {
      if (result) {
        const resultData = {
          message: unescapeHTML(_.get(result, 'message', result)),
          level: _.get(result, 'level') === 'warning' ? 'warning' : 'error',
          path: getArrayFromComponentPath(component.path || ''),
          context: {
            validator: validatorName,
            hasLabel: validator.hasLabel,
            setting,
            key: component.key,
            label: component.label,
            value,
            index,
            input: component.refs.input?.[index]
          }
        };
        if (validatorName ==='unique' && component.conflictId) {
          resultData.conflictId = component.conflictId;
        }
        return resultData;
      }
      else {
        return false;
      }
    };

    if (async) {
      return NativePromise.resolve(resultOrPromise).then(processResult);
    }
    else {
      return processResult(resultOrPromise);
    }
  }

  checkComponent(component, data, row, includeWarnings = false, async = false) {
    const isServerSidePersistent = typeof process !== 'undefined'
      && _.get(process, 'release.name') === 'node'
      && !_.defaultTo(component.component.persistent, true);

    // If we're server-side and it's not a persistent component, don't run validation at all
    if (isServerSidePersistent || component.component.validate === false) {
      return async ? NativePromise.resolve([]) : [];
    }

    data = data || component.rootValue;
    row = row || component.data;

    const values = (component.component.multiple && Array.isArray(component.validationValue))
      ? component.validationValue
      : [component.validationValue];
    const conditionallyVisible = component.conditionallyVisible();
    const addonsValidations = [];

    if (component?.addons?.length) {
      values.forEach((value) => {
        component.addons.forEach((addon) => {
          if (!addon.checkValidity(value)) {
            addonsValidations.push(...(addon.errors || []));
          }
        });
      });
    }

    // If this component has the new validation system enabled, use it instead.
    const validations = _.get(component, 'component.validations');
    let nextGenResultsOrPromises = [];

    if (validations && Array.isArray(validations) && validations.length) {
      const validationsGroupedByMode = _.chain(validations)
        .groupBy((validation) => validation.mode)
        .value();

      if (component.calculateCondition) {
        includeWarnings = true;

        const uiGroupedValidation = _.chain(validationsGroupedByMode.ui)
          .filter('active')
          .groupBy((validation) => validation.group || null)
          .value();

        const commonValidations = uiGroupedValidation.null || [];
        delete uiGroupedValidation.null;

        commonValidations.forEach(({ condition, message, severity }) => {
          if (!component.calculateCondition(condition)) {
            nextGenResultsOrPromises.push({
              level: severity || 'error',
              message: component.t(message),
              componentInstance: component,
            });
          }
        });

        _.forEach(uiGroupedValidation, (validationGroup) => {
          _.forEach(validationGroup, ({ condition, message, severity }) => {
            if (!component.calculateCondition(condition)) {
              nextGenResultsOrPromises.push({
                level: severity || 'error',
                message: component.t(message),
                componentInstance: component,
              });

              return false;
            }
          });
        });
      }
      else {
        nextGenResultsOrPromises = this.checkValidations(component, validations, data, row, values, async);
      }
      if (component.validators.includes('custom') && validationsGroupedByMode.js) {
        _.each(validationsGroupedByMode.js, (validation) => {
          nextGenResultsOrPromises.push(_.map(values, (value, index) => this.validate(component, 'custom', value, data, index, row, async, conditionallyVisible, validation)));
        });
      }
      if (component.validators.includes('json') && validationsGroupedByMode.json) {
        _.each(validationsGroupedByMode.json, (validation) => {
          nextGenResultsOrPromises.push(_.map(values, (value, index) => this.validate(component, 'json', value, data, index, row, async, conditionallyVisible, validation)));
        });
      }
    }

    const validateCustom     = _.get(component, 'component.validate.custom');
    const customErrorMessage = _.get(component, 'component.validate.customMessage');

    // Run primary validators
    const resultsOrPromises = _(component.validators).chain()
      .map(validatorName => {
        if (!this.validators.hasOwnProperty(validatorName)) {
          return {
            message: `Validator for "${validatorName}" is not defined`,
            level: 'warning',
            context: {
              validator: validatorName,
              key: component.key,
              label: component.label
            }
          };
        }

        // Handle the case when there is no values defined and it is required.
        if (validatorName === 'required' && !values.length) {
          return [this.validate(component, validatorName, null, data, 0, row, async, conditionallyVisible)];
        }

        return _.map(values, (value, index) => this.validate(component, validatorName, value, data, index, row, async, conditionallyVisible));
      })
      .flatten()
      .value();

    // Run the "unique" pseudo-validator
    component.component.validate = component.component.validate || {};
    component.component.validate.unique = component.component.unique;
    resultsOrPromises.push(this.validate(component, 'unique', component.validationValue, data, 0, data, async, conditionallyVisible));

    // Run the "multiple" pseudo-validator
    component.component.validate.multiple = component.component.multiple;
    resultsOrPromises.push(this.validate(component, 'multiple', component.validationValue, data, 0, data, async, conditionallyVisible));

    resultsOrPromises.push(...addonsValidations);
    resultsOrPromises.push(...nextGenResultsOrPromises);

    // Define how results should be formatted
    const formatResults = results => {
      // Condense to a single flat array
      results = _(results).chain().flatten().compact().value();

      if (customErrorMessage || validateCustom) {
        _.each(results, result => {
          result.message = component.t(customErrorMessage || result.message, {
            field: component.errorLabel,
            data,
            row,
            error: result
          });
          result.context.hasLabel = false;
        });
      }

      return includeWarnings ? results : _.reject(results, result => result.level === 'warning');
    };
    // Wait for results if using async mode, otherwise process and return immediately
    if (async) {
      return NativePromise.all(resultsOrPromises).then(formatResults);
    }
    else {
      return formatResults(resultsOrPromises);
    }
  }

  /**
   * Use the new validations engine to evaluate any errors.
   *
   * @param component
   * @param validations
   * @param data
   * @param row
   * @param values
   * @returns {any[]}
   */
  checkValidations(component, validations, data, row, values, async) {
    // Get results.
    const results = validations.map((validation) => {
      return this.checkRule(component, validation, data, row, values, async);
    });

    // Flatten array and filter out empty results.
    const messages = results.reduce((prev, result) => {
      if (result) {
        return [...prev, ...result];
      }
      return prev;
    }, []).filter((result) => result);

    // Keep only the last error for each rule.
    const rules = messages.reduce((prev, message) => {
      prev[message.context.validator] = message;
      return prev;
    }, {});

    return Object.values(rules);
  }

  checkRule(component, validation, data, row, values, async) {
    const Rule = Rules.getRule(validation.rule);
    const results = [];
    if (Rule) {
      const rule = new Rule(component, validation.settings, this.config);
      values.map((value, index) => {
        const result = rule.check(value, data, row, async);
        if (result !== true) {
          results.push({
            level: validation.level || 'error',
            message: component.t(validation.message || rule.defaultMessage, {
              settings: validation.settings,
              field: component.errorLabel,
              data,
              row,
              error: result,
            }),
            context: {
              key: component.key,
              index,
              label: component.label,
              validator: validation.rule,
            },
          });
        }
      });
    }
    // If there are no results, return false so it is removed by filter.
    return results.length === 0 ? false : results;
  }

  get check() {
    return this.checkComponent;
  }

  get() {
    _.get.call(this, arguments);
  }

  each() {
    _.each.call(this, arguments);
  }

  has() {
    _.has.call(this, arguments);
  }
}

ValidationChecker.config = {
  db: null,
  token: null,
  form: null,
  submission: null
};

const instance = new ValidationChecker();

export {
  instance as default,
  ValidationChecker
};
