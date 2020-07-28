import _ from 'lodash';
import { boolValue, getInputMask, matchInputMask, getDateSetting, escapeRegExCharacters, interpolate, convertFormatToMoment, getArrayFromComponentPath, unescapeHTML, } from '../utils/utils';
import moment from 'moment';
import NativePromise from 'native-promise-only';
import fetchPonyfill from 'fetch-ponyfill';
var _a = fetchPonyfill({
    Promise: NativePromise,
}), fetch = _a.fetch, Headers = _a.Headers, Request = _a.Request;
import { checkInvalidDate, CALENDAR_ERROR_MESSAGES, } from '../utils/calendarUtils';
var ValidationChecker = /** @class */ (function () {
    function ValidationChecker(config) {
        if (config === void 0) { config = {}; }
        this.config = _.defaults(config, ValidationChecker.config);
        this.validators = {
            required: {
                key: 'validate.required',
                method: 'validateRequired',
                message: function (component) {
                    return component.t(component.errorMessage('required'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    if (!boolValue(setting) || component.isValueHidden()) {
                        return true;
                    }
                    var isCalendar = component.validators.some(function (validator) { return validator === 'calendar'; });
                    if (!value && isCalendar && component.widget.enteredDate) {
                        return !this.validators.calendar.check.call(this, component, setting, value);
                    }
                    return !component.isEmpty(value);
                }
            },
            unique: {
                key: 'validate.unique',
                message: function (component) {
                    return component.t(component.errorMessage('unique'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    var _this = this;
                    // Skip if setting is falsy
                    if (!boolValue(setting)) {
                        return true;
                    }
                    // Skip if value is empty
                    if (!value || _.isEmpty(value)) {
                        return true;
                    }
                    // Skip if we don't have a database connection
                    if (!this.config.db) {
                        return true;
                    }
                    return new NativePromise(function (resolve) {
                        var form = _this.config.form;
                        var submission = _this.config.submission;
                        var path = "data." + component.path;
                        // Build the query
                        var query = { form: form._id };
                        if (_.isString(value)) {
                            query[path] = {
                                $regex: new RegExp("^" + escapeRegExCharacters(value) + "$"),
                                $options: 'i'
                            };
                        }
                        // FOR-213 - Pluck the unique location id
                        else if (_.isPlainObject(value) &&
                            value.address &&
                            value.address['address_components'] &&
                            value.address['place_id']) {
                            query[path + ".address.place_id"] = {
                                $regex: new RegExp("^" + escapeRegExCharacters(value.address['place_id']) + "$"),
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
                        _this.config.db.findOne(query, function (err, result) {
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
                    }).catch(function () { return false; });
                }
            },
            multiple: {
                key: 'validate.multiple',
                message: function (component) {
                    var shouldBeArray = boolValue(component.component.multiple) || Array.isArray(component.emptyValue);
                    var isRequired = component.component.validate.required;
                    var messageKey = shouldBeArray ? (isRequired ? 'array_nonempty' : 'array') : 'nonarray';
                    return component.t(component.errorMessage(messageKey), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    // Skip multiple validation if the component tells us to
                    if (!component.validateMultiple()) {
                        return true;
                    }
                    var shouldBeArray = boolValue(setting);
                    var canBeArray = Array.isArray(component.emptyValue);
                    var isArray = Array.isArray(value);
                    var isRequired = component.component.validate.required;
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
                message: function (component) {
                    return component.t(component.errorMessage('select'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value, data, index, row, async) {
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
                    var schema = component.component;
                    // Initialize the request options
                    var requestOptions = {
                        url: setting,
                        method: 'GET',
                        qs: {},
                        json: true,
                        headers: {}
                    };
                    // If the url is a boolean value
                    if (_.isBoolean(requestOptions.url)) {
                        requestOptions.url = !!requestOptions.url;
                        if (!requestOptions.url ||
                            schema.dataSrc !== 'url' ||
                            !schema.data.url ||
                            !schema.searchField) {
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
                        .map(function (val, key) { return encodeURIComponent(key) + "=" + encodeURIComponent(val); })
                        .join('&')
                        .value();
                    // Set custom headers.
                    if (schema.data && schema.data.headers) {
                        _.each(schema.data.headers, function (header) {
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
                        .then(function (response) {
                        if (!response.ok) {
                            return false;
                        }
                        return response.json();
                    })
                        .then(function (results) {
                        return results && results.length;
                    })
                        .catch(function () { return false; });
                }
            },
            min: {
                key: 'validate.min',
                message: function (component, setting) {
                    return component.t(component.errorMessage('min'), {
                        field: component.errorLabel,
                        min: parseFloat(setting),
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    var min = parseFloat(setting);
                    if (Number.isNaN(min) || (!_.isNumber(value))) {
                        return true;
                    }
                    return parseFloat(value) >= min;
                }
            },
            max: {
                key: 'validate.max',
                message: function (component, setting) {
                    return component.t(component.errorMessage('max'), {
                        field: component.errorLabel,
                        max: parseFloat(setting),
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    var max = parseFloat(setting);
                    if (Number.isNaN(max) || (!_.isNumber(value))) {
                        return true;
                    }
                    return parseFloat(value) <= max;
                }
            },
            minSelectedCount: {
                key: 'validate.minSelectedCount',
                message: function (component, setting) {
                    return component.component.minSelectedCountMessage
                        ? component.component.minSelectedCountMessage
                        : component.t(component.errorMessage('minSelectedCount'), {
                            minCount: parseFloat(setting),
                            data: component.data
                        });
                },
                check: function (component, setting, value) {
                    var min = parseFloat(setting);
                    if (!min) {
                        return true;
                    }
                    var count = Object.keys(value).reduce(function (total, key) {
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
                message: function (component, setting) {
                    return component.component.maxSelectedCountMessage
                        ? component.component.maxSelectedCountMessage
                        : component.t(component.errorMessage('maxSelectedCount'), {
                            minCount: parseFloat(setting),
                            data: component.data
                        });
                },
                check: function (component, setting, value) {
                    var max = parseFloat(setting);
                    if (!max) {
                        return true;
                    }
                    var count = Object.keys(value).reduce(function (total, key) {
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
                message: function (component, setting) {
                    return component.t(component.errorMessage('minLength'), {
                        field: component.errorLabel,
                        length: setting,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    var minLength = parseInt(setting, 10);
                    if (!minLength || (typeof value !== 'string') || component.isEmpty(value)) {
                        return true;
                    }
                    return (value.length >= minLength);
                }
            },
            maxLength: {
                key: 'validate.maxLength',
                message: function (component, setting) {
                    return component.t(component.errorMessage('maxLength'), {
                        field: component.errorLabel,
                        length: setting,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    var maxLength = parseInt(setting, 10);
                    if (!maxLength || (typeof value !== 'string')) {
                        return true;
                    }
                    return (value.length <= maxLength);
                }
            },
            maxWords: {
                key: 'validate.maxWords',
                message: function (component, setting) {
                    return component.t(component.errorMessage('maxWords'), {
                        field: component.errorLabel,
                        length: setting,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    var maxWords = parseInt(setting, 10);
                    if (!maxWords || (typeof value !== 'string')) {
                        return true;
                    }
                    return (value.trim().split(/\s+/).length <= maxWords);
                }
            },
            minWords: {
                key: 'validate.minWords',
                message: function (component, setting) {
                    return component.t(component.errorMessage('minWords'), {
                        field: component.errorLabel,
                        length: setting,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    var minWords = parseInt(setting, 10);
                    if (!minWords || (typeof value !== 'string')) {
                        return true;
                    }
                    return (value.trim().split(/\s+/).length >= minWords);
                }
            },
            email: {
                message: function (component) {
                    return component.t(component.errorMessage('invalid_email'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    /* eslint-disable max-len */
                    // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
                    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    /* eslint-enable max-len */
                    // Allow emails to be valid if the component is pristine and no value is provided.
                    return !value || re.test(value);
                }
            },
            url: {
                message: function (component) {
                    return component.t(component.errorMessage('invalid_url'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    /* eslint-disable max-len */
                    // From https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
                    var re = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
                    /* eslint-enable max-len */
                    // Allow urls to be valid if the component is pristine and no value is provided.
                    return !value || re.test(value);
                }
            },
            date: {
                message: function (component) {
                    return component.t(component.errorMessage('invalid_date'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    return (value !== 'Invalid date');
                }
            },
            day: {
                message: function (component) {
                    return component.t(component.errorMessage('invalid_day'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    if (!value) {
                        return true;
                    }
                    var _a = component.dayFirst ? [0, 1, 2] : [1, 0, 2], DAY = _a[0], MONTH = _a[1], YEAR = _a[2];
                    var values = value.split('/').map(function (x) { return parseInt(x, 10); }), day = values[DAY], month = values[MONTH], year = values[YEAR], maxDay = getDaysInMonthCount(month, year);
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
                            case 1: // January
                            case 3: // March
                            case 5: // May
                            case 7: // July
                            case 8: // August
                            case 10: // October
                            case 12: // December
                                return 31;
                            case 4: // April
                            case 6: // June
                            case 9: // September
                            case 11: // November
                                return 30;
                            case 2: // February
                                return isLeapYear(year) ? 29 : 28;
                            default:
                                return 31;
                        }
                    }
                }
            },
            pattern: {
                key: 'validate.pattern',
                message: function (component, setting) {
                    return component.t(_.get(component, 'component.validate.patternMessage', component.errorMessage('pattern'), {
                        field: component.errorLabel,
                        pattern: setting,
                        data: component.data
                    }));
                },
                check: function (component, setting, value) {
                    if (component.isEmpty(value))
                        return true;
                    var pattern = setting;
                    if (!pattern) {
                        return true;
                    }
                    var regex = new RegExp("^" + pattern + "$");
                    return regex.test(value);
                }
            },
            json: {
                key: 'validate.json',
                check: function (component, setting, value, data, index, row) {
                    if (!setting) {
                        return true;
                    }
                    var valid = component.evaluate(setting, {
                        data: data,
                        row: row,
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
                message: function (component) {
                    return component.t(component.errorMessage('mask'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value) {
                    var inputMask;
                    if (component.isMultipleMasksField) {
                        var maskName = value ? value.maskName : undefined;
                        var formioInputMask = component.getMaskByName(maskName);
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
                        return matchInputMask(value, inputMask);
                    }
                    return true;
                }
            },
            custom: {
                key: 'validate.custom',
                message: function (component) {
                    return component.t(component.errorMessage('custom'), {
                        field: component.errorLabel,
                        data: component.data
                    });
                },
                check: function (component, setting, value, data, index, row) {
                    if (!setting) {
                        return true;
                    }
                    var valid = component.evaluate(setting, {
                        valid: true,
                        data: data,
                        rowIndex: index,
                        row: row,
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
                message: function (component, setting) {
                    var date = getDateSetting(setting);
                    return component.t(component.errorMessage('maxDate'), {
                        field: component.errorLabel,
                        maxDate: moment(date).format(component.format),
                    });
                },
                check: function (component, setting, value) {
                    //if any parts of day are missing, skip maxDate validation
                    if (component.isPartialDay && component.isPartialDay(value)) {
                        return true;
                    }
                    var date = moment(value);
                    var maxDate = getDateSetting(setting);
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
                message: function (component, setting) {
                    var date = getDateSetting(setting);
                    return component.t(component.errorMessage('minDate'), {
                        field: component.errorLabel,
                        minDate: moment(date).format(component.format),
                    });
                },
                check: function (component, setting, value) {
                    //if any parts of day are missing, skip minDate validation
                    if (component.isPartialDay && component.isPartialDay(value)) {
                        return true;
                    }
                    var date = moment(value);
                    var minDate = getDateSetting(setting);
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
                message: function (component, setting) {
                    return component.t(component.errorMessage('minYear'), {
                        field: component.errorLabel,
                        minYear: setting,
                    });
                },
                check: function (component, setting, value) {
                    var minYear = setting;
                    var year = /\d{4}$/.exec(value);
                    year = year ? year[0] : null;
                    if (!(+minYear) || !(+year)) {
                        return true;
                    }
                    return +year >= +minYear;
                }
            },
            maxYear: {
                key: 'maxYear',
                message: function (component, setting) {
                    return component.t(component.errorMessage('maxYear'), {
                        field: component.errorLabel,
                        maxYear: setting,
                    });
                },
                check: function (component, setting, value) {
                    var maxYear = setting;
                    var year = /\d{4}$/.exec(value);
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
                message: function (component) {
                    return component.t(component.errorMessage(this.validators.calendar.messageText), {
                        field: component.errorLabel,
                        maxDate: moment(component.dataValue).format(component.format),
                    });
                },
                check: function (component, setting, value, data, index) {
                    this.validators.calendar.messageText = '';
                    var widget = component.getWidget(index);
                    if (!widget) {
                        return true;
                    }
                    var settings = widget.settings, enteredDate = widget.enteredDate;
                    var minDate = settings.minDate, maxDate = settings.maxDate, format = settings.format;
                    var momentFormat = [convertFormatToMoment(format)];
                    if (momentFormat[0].match(/M{3,}/g)) {
                        momentFormat.push(momentFormat[0].replace(/M{3,}/g, 'MM'));
                    }
                    if (!value && enteredDate) {
                        var _a = checkInvalidDate(enteredDate, momentFormat, minDate, maxDate), message = _a.message, result = _a.result;
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
                message: function (component) {
                    return component.t(component.errorMessage(this.validators.time.messageText), {
                        field: component.errorLabel
                    });
                },
                check: function (component, setting, value) {
                    if (component.isEmpty(value))
                        return true;
                    return moment(value, component.component.format).isValid();
                }
            },
        };
    }
    ValidationChecker.prototype.checkValidator = function (component, validator, setting, value, data, index, row, async) {
        var _this = this;
        var resultOrPromise = null;
        // Allow each component to override their own validators by implementing the validator.method
        if (validator.method && (typeof component[validator.method] === 'function')) {
            resultOrPromise = component[validator.method](setting, value, data, index, row, async);
        }
        else {
            resultOrPromise = validator.check.call(this, component, setting, value, data, index, row, async);
        }
        var processResult = function (result) {
            if (typeof result === 'string') {
                return result;
            }
            if (!result && validator.message) {
                return validator.message.call(_this, component, setting, index, row);
            }
            return '';
        };
        if (async) {
            return NativePromise.resolve(resultOrPromise).then(processResult);
        }
        else {
            return processResult(resultOrPromise);
        }
    };
    ValidationChecker.prototype.validate = function (component, validatorName, value, data, index, row, async) {
        // Skip validation for conditionally hidden components
        if (!component.conditionallyVisible()) {
            return false;
        }
        var validator = this.validators[validatorName];
        var setting = _.get(component.component, validator.key, null);
        var resultOrPromise = this.checkValidator(component, validator, setting, value, data, index, row, async);
        var processResult = function (result) {
            return result
                ? {
                    message: unescapeHTML(_.get(result, 'message', result)),
                    level: _.get(result, 'level') === 'warning' ? 'warning' : 'error',
                    path: getArrayFromComponentPath(component.path || ''),
                    context: {
                        validator: validatorName,
                        setting: setting,
                        key: component.key,
                        label: component.label,
                        value: value,
                    },
                }
                : false;
        };
        if (async) {
            return NativePromise.resolve(resultOrPromise).then(processResult);
        }
        else {
            return processResult(resultOrPromise);
        }
    };
    ValidationChecker.prototype.checkComponent = function (component, data, row, includeWarnings, async) {
        var _this = this;
        if (includeWarnings === void 0) { includeWarnings = false; }
        if (async === void 0) { async = false; }
        var isServerSidePersistent = typeof process !== 'undefined'
            && _.get(process, 'release.name') === 'node'
            && !_.defaultTo(component.component.persistent, true);
        // If we're server-side and it's not a persistent component, don't run validation at all
        if (isServerSidePersistent || component.component.validate === false) {
            return async ? NativePromise.resolve([]) : [];
        }
        data = data || component.rootValue;
        row = row || component.data;
        var values = (component.component.multiple && Array.isArray(component.validationValue))
            ? component.validationValue
            : [component.validationValue];
        // If this component has the new validation system enabled, use it instead.
        var validations = _.get(component, 'component.validations');
        if (validations && Array.isArray(validations) && validations.length) {
            var groupedValidation = _
                .chain(validations)
                .filter('active')
                .groupBy(function (validation) { return (validation.group || null); })
                .value();
            var commonValidations = groupedValidation.null || [];
            delete groupedValidation.null;
            var results_1 = [];
            commonValidations.forEach(function (_a) {
                var condition = _a.condition, message = _a.message, severity = _a.severity;
                if (!component.calculateCondition(condition)) {
                    results_1.push({
                        level: severity || 'error',
                        message: component.t(message),
                        componentInstance: component,
                    });
                }
            });
            _.forEach(groupedValidation, function (validationGroup) {
                _.forEach(validationGroup, function (_a) {
                    var condition = _a.condition, message = _a.message, severity = _a.severity;
                    if (!component.calculateCondition(condition)) {
                        results_1.push({
                            level: severity || 'error',
                            message: component.t(message),
                            componentInstance: component,
                        });
                        return false;
                    }
                });
            });
            if (async) {
                return NativePromise.all(results_1);
            }
            else {
                return results_1;
            }
        }
        var validateCustom = _.get(component, 'component.validate.custom');
        var customErrorMessage = _.get(component, 'component.validate.customMessage');
        // Run primary validators
        var resultsOrPromises = _(component.validators)
            .chain()
            .map(function (validatorName) {
            if (!_this.validators.hasOwnProperty(validatorName)) {
                return {
                    message: "Validator for \"" + validatorName + "\" is not defined",
                    level: 'warning',
                    context: {
                        validator: validatorName,
                        key: component.key,
                        label: component.label,
                    },
                };
            }
            // Handle the case when there is no values defined and it is required.
            if (validatorName === 'required' && !values.length) {
                return [_this.validate(component, validatorName, null, data, 0, row, async)];
            }
            return _.map(values, function (value, index) { return _this.validate(component, validatorName, value, data, index, row, async); });
        })
            .flatten()
            .value();
        // Run the "unique" pseudo-validator
        component.component.validate = component.component.validate || {};
        component.component.validate.unique = component.component.unique;
        resultsOrPromises.push(this.validate(component, 'unique', component.validationValue, data, 0, data, async));
        // Run the "multiple" pseudo-validator
        component.component.validate.multiple = component.component.multiple;
        resultsOrPromises.push(this.validate(component, 'multiple', component.validationValue, data, 0, data, async));
        // Define how results should be formatted
        var formatResults = function (results) {
            // Condense to a single flat array
            results = _(results).chain().flatten().compact().value();
            if (customErrorMessage || validateCustom) {
                _.each(results, function (result) {
                    result.message = component.t(customErrorMessage || result.message, {
                        field: component.errorLabel,
                        data: data,
                        row: row,
                        error: result,
                    });
                });
            }
            return includeWarnings ? results : _.reject(results, function (result) { return result.level === 'warning'; });
        };
        // Wait for results if using async mode, otherwise process and return immediately
        if (async) {
            return NativePromise.all(resultsOrPromises).then(formatResults);
        }
        else {
            return formatResults(resultsOrPromises);
        }
    };
    Object.defineProperty(ValidationChecker.prototype, "check", {
        get: function () {
            return this.checkComponent;
        },
        enumerable: false,
        configurable: true
    });
    ValidationChecker.prototype.get = function () {
        _.get.call(this, arguments);
    };
    ValidationChecker.prototype.each = function () {
        _.each.call(this, arguments);
    };
    ValidationChecker.prototype.has = function () {
        _.has.call(this, arguments);
    };
    return ValidationChecker;
}());
ValidationChecker.config = {
    db: null,
    token: null,
    form: null,
    submission: null,
};
var instance = new ValidationChecker();
export { instance as default, ValidationChecker, };
