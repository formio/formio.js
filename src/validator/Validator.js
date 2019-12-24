import _ from 'lodash';
import {
  boolValue,
  getInputMask,
  matchInputMask,
  getDateSetting,
  escapeRegExCharacters,
  interpolate,
  convertFormatToMoment
} from '../utils/utils';
import moment from 'moment';
import NativePromise from 'native-promise-only';
import {
  checkInvalidDate,
  CALENDAR_ERROR_MESSAGES
} from '../utils/calendarUtils';
import Rules from './Rules';

class ValidationChecker {
  constructor(config = {}) {
    this.async = _.defaultTo(config.async, true);
    this.config = config;

    this.validators = {
      required: {
        key: 'validate.required',
        method: 'validateRequired',
        message(component) {
          return component.t(component.errorMessage('required'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          if (!boolValue(setting)) {
            return true;
          }

          const isCalendar = component.validators.some(validator => validator === 'calendar');

          if (!value && isCalendar && component.widget.enteredDate) {
            return !this.validators.calendar.check.call(this, component, setting, value);
          }

          return !component.isEmpty(value);
        }
      },
      unique: {
        key: 'validate.unique',
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

          // Skip if value is empty
          if (!value || _.isEmpty(value)) {
            return true;
          }

          // Skip if we don't have a database connection
          if (!config.db) {
            return true;
          }

          return new NativePromise(resolve => {
            const form = config.form;
            const submission = config.submission;
            const path = `data.${component.path}`;

            // Build the query
            const query = { form: form._id };

            if (_.isString(value)) {
              query[path] = {
                $regex: new RegExp(`^${escapeRegExCharacters(value)}$`),
                $options: 'i'
              };
            }
            // FOR-213 - Pluck the unique location id
            else if (_.isPlainObject(value) && value.hasOwnProperty('address_components') && value.hasOwnProperty('place_id')) {
              query[`${path}.place_id`] = {
                $regex: new RegExp(`^${escapeRegExCharacters(value.place_id)}$`),
                $options: 'i'
              };
            }
            // Compare the contents of arrays vs the order.
            else if (_.isArray(value)) {
              query[path] = { $all: value };
            }
            else if (_.isObject(value)) {
              query[path] = { $eq: value };
            }

            // Only search for non-deleted items
            query.deleted = { $eq: null };

            // Try to find an existing value within the form
            config.db.models.submission.findOne(query, (err, result) => {
              if (err) {
                return resolve(false);
              }
              else if (result) {
                // Only OK if it matches the current submission
                return resolve(submission._id && (result._id.toString() === submission._id));
              }
              else {
                return resolve(true);
              }
            });
          }).catch(() => false);
        }
      },
      multiple: {
        key: 'validate.multiple',
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
        message(component) {
          return component.t(component.errorMessage('select'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          // Skip if setting is falsy
          if (!boolValue(setting)) {
            return true;
          }

          // Skip if value is empty
          if (!value || _.isEmpty(value)) {
            return true;
          }

          // Skip if we're not async-capable
          if (!this.async) {
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
          if (schema.authenticate && config.token) {
            requestOptions.headers['x-jwt-token'] = config.token;
          }

          // Isomorphic fetch
          const isofetch = (typeof window === 'object' && window.fetch) ?
            { fetch, Headers, Request, Response } :
            require('fetch-ponyfill')();

          const request = new isofetch.Request(requestOptions.url, {
            headers: new isofetch.Headers(requestOptions.headers)
          });

          return isofetch.fetch(request)
            .then(async response => {
              if (!response.ok) {
                return false;
              }

              const results = await response.json();
              return results && results.length;
            })
            .catch(() => false);
        }
      },
      min: {
        key: 'validate.min',
        message(component, setting) {
          return component.t(component.errorMessage('min'), {
            field: component.errorLabel,
            min: parseFloat(setting),
            data: component.data
          });
        },
        check(component, setting, value) {
          const min = parseFloat(setting);
          if (Number.isNaN(min) || (!_.isNumber(value))) {
            return true;
          }
          return parseFloat(value) >= min;
        }
      },
      max: {
        key: 'validate.max',
        message(component, setting) {
          return component.t(component.errorMessage('max'), {
            field: component.errorLabel,
            max: parseFloat(setting),
            data: component.data
          });
        },
        check(component, setting, value) {
          const max = parseFloat(setting);
          if (Number.isNaN(max) || (!_.isNumber(value))) {
            return true;
          }
          return parseFloat(value) <= max;
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

          return count >= min;
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
        message(component, setting) {
          return component.t(component.errorMessage('minLength'), {
            field: component.errorLabel,
            length: (setting - 1),
            data: component.data
          });
        },
        check(component, setting, value) {
          const minLength = parseInt(setting, 10);
          if (!minLength || (typeof value !== 'string') || component.isEmpty(value)) {
            return true;
          }
          return (value.length >= minLength);
        }
      },
      maxLength: {
        key: 'validate.maxLength',
        message(component, setting) {
          return component.t(component.errorMessage('maxLength'), {
            field: component.errorLabel,
            length: (setting + 1),
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
        message(component, setting) {
          return component.t(component.errorMessage('maxWords'), {
            field: component.errorLabel,
            length: (setting + 1),
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
        message(component, setting) {
          return component.t(component.errorMessage('minWords'), {
            field: component.errorLabel,
            length: (setting - 1),
            data: component.data
          });
        },
        check(component, setting, value) {
          const minWords = parseInt(setting, 10);
          if (!minWords || (typeof value !== 'string')) {
            return true;
          }
          return (value.trim().split(/\s+/).length >= minWords);
        }
      },
      email: {
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
        message(component) {
          return component.t(component.errorMessage('invalid_url'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          /* eslint-disable max-len */
          // From https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
          const re = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
          /* eslint-enable max-len */

          // Allow urls to be valid if the component is pristine and no value is provided.
          return !value || re.test(value);
        }
      },
      date: {
        message(component) {
          return component.t(component.errorMessage('invalid_date'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check(component, setting, value) {
          return (value !== 'Invalid date');
        }
      },
      day: {
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
        message(component, setting) {
          return component.t(_.get(component, 'component.validate.patternMessage', component.errorMessage('pattern'), {
            field: component.errorLabel,
            pattern: setting,
            data: component.data
          }));
        },
        check(component, setting, value) {
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
              inputMask = getInputMask(formioInputMask);
            }
            value = value ? value.value : value;
          }
          else {
            inputMask = component._inputMask;
          }
          if (value && inputMask) {
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
          const date = moment(value);
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
          const date = moment(value);
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
      calendar: {
        key: 'validate.calendar',
        messageText: '',
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
    };
  }

  checkValidator(component, validator, setting, value, data, index, row) {
    let resultOrPromise = null;

    // Allow each component to override their own validators by implementing the validator.method
    if (validator.method && (typeof component[validator.method] === 'function')) {
      resultOrPromise = component[validator.method](setting, value, data, index, row);
    }
    else {
      resultOrPromise = validator.check.call(this, component, setting, value, data, index, row);
    }

    const processResult = result => {
      if (typeof result === 'string') {
        return result;
      }

      if (!result) {
        return validator.message.call(this, component, setting, index, row);
      }

      return '';
    };

    if (this.async) {
      return NativePromise.resolve(resultOrPromise).then(processResult);
    }
    else {
      return processResult(resultOrPromise);
    }
  }

  validate(component, validatorName, value, data, index, row) {
    // Skip validation for conditionally hidden components
    if (!component.conditionallyVisible()) {
      return false;
    }

    const validator       = this.validators[validatorName];
    const setting         = _.get(component.component, validator.key, null);
    const resultOrPromise = this.checkValidator(component, validator, setting, value, data, index, row);

    const processResult = result => {
      return result ? {
        message: _.get(result, 'message', result),
        level: _.get(result, 'level') === 'warning' ? 'warning' : 'error',
        path: (component.path || '')
          .replace(/[[\]]/g, '.')
          .replace(/\.\./g, '.')
          .split('.')
          .map(part => _.defaultTo(_.toNumber(part), part)),
        context: {
          validator: validatorName,
          setting,
          key: component.key,
          label: component.label,
          value
        }
      } : false;
    };

    if (this.async) {
      return NativePromise.resolve(resultOrPromise).then(processResult);
    }
    else {
      return processResult(resultOrPromise);
    }
  }

  checkComponent(component, data, row, includeWarnings = false) {
    const isServerSidePersistent = typeof process !== 'undefined'
      && _.get(process, 'release.name') === 'node'
      && !_.defaultTo(component.component.persistent, true);

    // If we're server-side and it's not a persistent component, don't run validation at all
    if (isServerSidePersistent || component.component.validate === false) {
      return [];
    }

    data = data || component.rootValue;
    row = row || component.data;

    const values = (component.component.multiple && Array.isArray(component.validationValue))
      ? component.validationValue
      : [component.validationValue];

    // If this component has the new validation system enabled, use it instead.
    const validations = _.get(component, 'component.validations');
    if (validations && Array.isArray(validations)) {
      const resultsOrPromises = this.checkValidations(component, validations, data, row, values);

      // Define how results should be formatted
      const formatResults = results => {
        return includeWarnings ? results : results.filter(result => result.level === 'error');
      };

      if (this.async) {
        return NativePromise.all(resultsOrPromises).then(formatResults);
      }
      else {
        return formatResults(resultsOrPromises);
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

        return _.map(values, (value, index) => this.validate(component, validatorName, value, data, index, row));
      })
      .flatten()
      .value();

    // Run the "unique" pseudo-validator
    component.component.validate = component.component.validate || {};
    component.component.validate.unique = component.component.unique;
    resultsOrPromises.push(this.validate(component, 'unique', component.validationValue, data));

    // Run the "multiple" pseudo-validator
    component.component.validate.multiple = component.component.multiple;
    resultsOrPromises.push(this.validate(component, 'multiple', component.validationValue, data));

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
        });
      }

      return includeWarnings ? results : _.reject(results, result => result.level === 'warning');
    };

    // Wait for results if using async mode, otherwise process and return immediately
    if (this.async) {
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
  checkValidations(component, validations, data, row, values) {
    // Get results.
    const results = validations.map((validation) => {
      return this.checkRule(component, validation, data, row, values);
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

  checkRule(component, validation, data, row, values) {
    const Rule = Rules.getRule(validation.rule);
    const results = [];
    if (Rule) {
      const rule = new Rule(component, validation.settings, this.config);
      values.map((value, index) => {
        const result = rule.check(value, data, row);
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

const instance = new ValidationChecker({ async: false });

export {
  instance as default,
  ValidationChecker
};
