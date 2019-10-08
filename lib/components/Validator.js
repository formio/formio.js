"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-nan");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils/utils");

var _moment = _interopRequireDefault(require("moment"));

var _calendarUtils = require("../utils/calendarUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  get: _lodash.default.get,
  each: _lodash.default.each,
  has: _lodash.default.has,
  checkValidator: function checkValidator(component, validator, setting, value, data) {
    var result = null; // Allow each component to override their own validators by implementing the validator.method

    if (validator.method && typeof component[validator.method] === 'function') {
      result = component[validator.method](setting, value, data);
    } else {
      result = validator.check.call(this, component, setting, value, data);
    }

    if (typeof result === 'string') {
      return result;
    }

    if (!result) {
      return validator.message.call(this, component, setting);
    }

    return '';
  },
  validate: function validate(component, validator, value, data) {
    if (validator.key && _lodash.default.has(component.component, validator.key)) {
      var setting = this.get(component.component, validator.key);
      return this.checkValidator(component, validator, setting, value, data);
    }

    return this.checkValidator(component, validator, null, value, data);
  },
  check: function check(component, data) {
    var _this = this;

    var result = '';
    var value = component.validationValue;
    data = data || component.data;

    _lodash.default.each(component.validators, function (name) {
      if (_this.validators.hasOwnProperty(name)) {
        var validator = _this.validators[name];

        if (component.validateMultiple(value)) {
          _lodash.default.each(value, function (val) {
            result = _this.validate(component, validator, val, data);

            if (result) {
              return false;
            }
          });
        } else {
          result = _this.validate(component, validator, value, data);
        }

        if (result) {
          return false;
        }
      }
    });

    var validateCustom = _lodash.default.get(component, 'component.validate.custom');

    var customErrorMessage = _lodash.default.get(component, 'component.validate.customMessage');

    if (result && (customErrorMessage || validateCustom)) {
      result = component.t(customErrorMessage || result, {
        field: component.errorLabel,
        data: component.data
      });
    }

    return result;
  },
  validators: {
    required: {
      key: 'validate.required',
      method: 'validateRequired',
      message: function message(component) {
        return component.t(component.errorMessage('required'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        if (!(0, _utils.boolValue)(setting)) {
          return true;
        }

        return !component.isEmpty(value);
      }
    },
    min: {
      key: 'validate.min',
      message: function message(component, setting) {
        return component.t(component.errorMessage('min'), {
          field: component.errorLabel,
          min: parseFloat(setting),
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var min = parseFloat(setting);

        if (Number.isNaN(min) || !_lodash.default.isNumber(value)) {
          return true;
        }

        return parseFloat(value) >= min;
      }
    },
    max: {
      key: 'validate.max',
      message: function message(component, setting) {
        return component.t(component.errorMessage('max'), {
          field: component.errorLabel,
          max: parseFloat(setting),
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var max = parseFloat(setting);

        if (Number.isNaN(max) || !_lodash.default.isNumber(value)) {
          return true;
        }

        return parseFloat(value) <= max;
      }
    },
    minLength: {
      key: 'validate.minLength',
      message: function message(component, setting) {
        return component.t(component.errorMessage('minLength'), {
          field: component.errorLabel,
          length: setting - 1,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var minLength = parseInt(setting, 10);

        if (!minLength || typeof value !== 'string') {
          return true;
        }

        return value.length >= minLength;
      }
    },
    maxLength: {
      key: 'validate.maxLength',
      message: function message(component, setting) {
        return component.t(component.errorMessage('maxLength'), {
          field: component.errorLabel,
          length: setting + 1,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var maxLength = parseInt(setting, 10);

        if (!maxLength || typeof value !== 'string') {
          return true;
        }

        return value.length <= maxLength;
      }
    },
    maxWords: {
      key: 'validate.maxWords',
      message: function message(component, setting) {
        return component.t(component.errorMessage('maxWords'), {
          field: component.errorLabel,
          length: setting + 1,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var maxWords = parseInt(setting, 10);

        if (!maxWords || typeof value !== 'string') {
          return true;
        }

        return _lodash.default.words(value).length <= maxWords;
      }
    },
    minWords: {
      key: 'validate.minWords',
      message: function message(component, setting) {
        return component.t(component.errorMessage('minWords'), {
          field: component.errorLabel,
          length: setting - 1,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var minWords = parseInt(setting, 10);

        if (!minWords || typeof value !== 'string') {
          return true;
        }

        return _lodash.default.words(value).length >= minWords;
      }
    },
    email: {
      message: function message(component) {
        return component.t(component.errorMessage('invalid_email'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        /* eslint-disable max-len */
        // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        /* eslint-enable max-len */
        // Allow emails to be valid if the component is pristine and no value is provided.

        return !value || re.test(value);
      }
    },
    url: {
      message: function message(component) {
        return component.t(component.errorMessage('invalid_url'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        /* eslint-disable max-len */
        // From https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
        var re = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
        /* eslint-enable max-len */
        // Allow urls to be valid if the component is pristine and no value is provided.

        return !value || re.test(value);
      }
    },
    date: {
      message: function message(component) {
        return component.t(component.errorMessage('invalid_date'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        return value !== 'Invalid date';
      }
    },
    day: {
      message: function message(component) {
        return component.t(component.errorMessage('invalid_day'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        if (!value) {
          return true;
        }

        var _ref = component.dayFirst ? [0, 1, 2] : [1, 0, 2],
            _ref2 = _slicedToArray(_ref, 3),
            DAY = _ref2[0],
            MONTH = _ref2[1],
            YEAR = _ref2[2];

        var values = value.split('/').map(function (x) {
          return parseInt(x, 10);
        }),
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
          return !(year % 400) || !!(year % 100) && !(year % 4);
        }

        function getDaysInMonthCount(month, year) {
          switch (month) {
            case 1: // January

            case 3: // March

            case 5: // May

            case 7: // July

            case 8: // August

            case 10: // October

            case 12:
              // December
              return 31;

            case 4: // April

            case 6: // June

            case 9: // September

            case 11:
              // November
              return 30;

            case 2:
              // February
              return isLeapYear(year) ? 29 : 28;

            default:
              return 31;
          }
        }
      }
    },
    pattern: {
      key: 'validate.pattern',
      message: function message(component, setting) {
        return component.t(_lodash.default.get(component, 'component.validate.patternMessage', component.errorMessage('pattern'), {
          field: component.errorLabel,
          pattern: setting,
          data: component.data
        }));
      },
      check: function check(component, setting, value) {
        var pattern = setting;

        if (!pattern) {
          return true;
        }

        var regex = new RegExp("^".concat(pattern, "$"));
        return regex.test(value);
      }
    },
    json: {
      key: 'validate.json',
      check: function check(component, setting, value, data) {
        if (!setting) {
          return true;
        }

        var valid = component.evaluate(setting, {
          data: data,
          input: value
        });

        if (valid === null) {
          return true;
        }

        return valid;
      }
    },
    mask: {
      message: function message(component) {
        return component.t(component.errorMessage('mask'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        if (component.skipMaskValidation) {
          return true;
        }

        var inputMask;

        if (component.isMultipleMasksField) {
          var maskName = value ? value.maskName : undefined;
          var formioInputMask = component.getMaskByName(maskName);

          if (formioInputMask) {
            inputMask = (0, _utils.getInputMask)(formioInputMask);
          }

          value = value ? value.value : value;
        } else {
          inputMask = component.defaultMask;
        }

        if (value && inputMask) {
          return (0, _utils.matchInputMask)(value, inputMask);
        }

        return true;
      }
    },
    custom: {
      key: 'validate.custom',
      message: function message(component) {
        return component.t(component.errorMessage('custom'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value, data) {
        if (!setting) {
          return true;
        }

        var valid = component.evaluate(setting, {
          valid: true,
          data: data,
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
      message: function message(component, setting) {
        var date = (0, _utils.getDateSetting)(setting);
        return component.t(component.errorMessage('maxDate'), {
          field: component.errorLabel,
          maxDate: (0, _moment.default)(date).format(component.format)
        });
      },
      check: function check(component, setting, value) {
        //if any parts of day are missing, skip maxDate validation
        if (component.isPartialDay && component.isPartialDay(value)) {
          return true;
        }

        var date = (0, _moment.default)(value);
        var maxDate = (0, _utils.getDateSetting)(setting);

        if (_lodash.default.isNull(maxDate)) {
          return true;
        } else {
          maxDate.setHours(0, 0, 0, 0);
        }

        return date.isBefore(maxDate) || date.isSame(maxDate);
      }
    },
    minDate: {
      key: 'minDate',
      message: function message(component, setting) {
        var date = (0, _utils.getDateSetting)(setting);
        return component.t(component.errorMessage('minDate'), {
          field: component.errorLabel,
          minDate: (0, _moment.default)(date).format(component.format)
        });
      },
      check: function check(component, setting, value) {
        //if any parts of day are missing, skip minDate validation
        if (component.isPartialDay && component.isPartialDay(value)) {
          return true;
        }

        var date = (0, _moment.default)(value);
        var minDate = (0, _utils.getDateSetting)(setting);

        if (_lodash.default.isNull(minDate)) {
          return true;
        } else {
          minDate.setHours(0, 0, 0, 0);
        }

        return date.isAfter(minDate) || date.isSame(minDate);
      }
    },
    strictDateValidation: {
      key: 'validate.strictDateValidation',
      messageText: '',
      message: function message(component) {
        return component.t(component.errorMessage(this.validators.strictDateValidation.messageText), {
          field: component.errorLabel,
          maxDate: (0, _moment.default)(component.dataValue).format(component.format)
        });
      },
      check: function check(component, setting, value) {
        this.validators.strictDateValidation.messageText = '';

        if (!component.widgetData) {
          return true;
        }

        var _component$widgetData = component.widgetData,
            minDate = _component$widgetData.minDate,
            maxDate = _component$widgetData.maxDate,
            format = _component$widgetData.format,
            enteredDate = _component$widgetData.enteredDate;
        var momentFormat = (0, _calendarUtils.monthFormatCorrector)(format);

        if (component.widgetLocale) {
          var _component$widgetLoca = component.widgetLocale,
              locale = _component$widgetLoca.locale,
              monthsShort = _component$widgetLoca.monthsShort,
              monthsShortStrictRegex = _component$widgetLoca.monthsShortStrictRegex;

          _moment.default.updateLocale(locale, {
            monthsShort: monthsShort,
            monthsShortStrictRegex: monthsShortStrictRegex
          });
        }

        if (!value && enteredDate) {
          var _checkInvalidDate = (0, _calendarUtils.checkInvalidDate)(enteredDate, momentFormat, minDate, maxDate),
              message = _checkInvalidDate.message,
              result = _checkInvalidDate.result;

          if (!result) {
            this.validators.strictDateValidation.messageText = message;
            return result;
          }
        }

        if (value && enteredDate) {
          if ((0, _moment.default)(value).format() !== (0, _moment.default)(enteredDate, momentFormat, true).format() && enteredDate.match(/_/gi)) {
            this.validators.strictDateValidation.messageText = _calendarUtils.CALENDAR_ERROR_MESSAGES.INCOMPLETE;
            return false;
          } else {
            component._widget.enteredDate = '';
            return true;
          }
        }
      }
    }
  }
};
exports.default = _default;