"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-nan");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationChecker = exports.default = void 0;

require("regenerator-runtime/runtime");

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils/utils");

var _moment = _interopRequireDefault(require("moment"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _calendarUtils = require("../utils/calendarUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValidationChecker =
/*#__PURE__*/
function () {
  function ValidationChecker() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ValidationChecker);

    this.async = _lodash.default.defaultTo(config.async, true);
    this.validators = {
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

          var isCalendar = component.validators.some(function (validator) {
            return validator === 'calendar';
          });

          if (!value && isCalendar && component.widget.enteredDate) {
            return !this.validators.calendar.check.call(this, component, setting, value);
          }

          return !component.isEmpty(value);
        }
      },
      unique: {
        key: 'validate.unique',
        message: function message(component) {
          return component.t(component.errorMessage('unique'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check: function check(component, setting, value) {
          // Skip if setting is falsy
          if (!(0, _utils.boolValue)(setting)) {
            return true;
          } // Skip if value is empty


          if (!value || _lodash.default.isEmpty(value)) {
            return true;
          } // Skip if we don't have a database connection


          if (!config.db) {
            return true;
          }

          return new _nativePromiseOnly.default(function (resolve) {
            var form = config.form;
            var submission = config.submission;
            var path = "data.".concat(component.path); // Build the query

            var query = {
              form: form._id
            };

            if (_lodash.default.isString(value)) {
              query[path] = {
                $regex: new RegExp("^".concat((0, _utils.escapeRegExCharacters)(value), "$")),
                $options: 'i'
              };
            } // FOR-213 - Pluck the unique location id
            else if (_lodash.default.isPlainObject(value) && value.hasOwnProperty('address_components') && value.hasOwnProperty('place_id')) {
                query["".concat(path, ".place_id")] = {
                  $regex: new RegExp("^".concat((0, _utils.escapeRegExCharacters)(value.place_id), "$")),
                  $options: 'i'
                };
              } // Compare the contents of arrays vs the order.
              else if (_lodash.default.isArray(value)) {
                  query[path] = {
                    $all: value
                  };
                } else if (_lodash.default.isObject(value)) {
                  query[path] = {
                    $eq: value
                  };
                } // Only search for non-deleted items


            query.deleted = {
              $eq: null
            }; // Try to find an existing value within the form

            config.db.models.submission.findOne(query, function (err, result) {
              if (err) {
                return resolve(false);
              } else if (result) {
                // Only OK if it matches the current submission
                return resolve(submission._id && result._id.toString() === submission._id);
              } else {
                return resolve(true);
              }
            });
          }).catch(function () {
            return false;
          });
        }
      },
      multiple: {
        key: 'validate.multiple',
        message: function message(component) {
          var shouldBeArray = (0, _utils.boolValue)(component.component.multiple) || Array.isArray(component.emptyValue);
          var isRequired = component.component.validate.required;
          var messageKey = shouldBeArray ? isRequired ? 'array_nonempty' : 'array' : 'nonarray';
          return component.t(component.errorMessage(messageKey), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check: function check(component, setting, value) {
          // Skip multiple validation if the component tells us to
          if (!component.validateMultiple()) {
            return true;
          }

          var shouldBeArray = (0, _utils.boolValue)(setting);
          var canBeArray = Array.isArray(component.emptyValue);
          var isArray = Array.isArray(value);
          var isRequired = component.component.validate.required;

          if (shouldBeArray) {
            if (isArray) {
              return isRequired ? !!value.length : true;
            } else {
              // Null/undefined is ok if this value isn't required; anything else should fail
              return _lodash.default.isNil(value) ? !isRequired : false;
            }
          } else {
            return canBeArray || !isArray;
          }
        }
      },
      select: {
        key: 'validate.select',
        message: function message(component) {
          return component.t(component.errorMessage('select'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check: function check(component, setting, value) {
          // Skip if setting is falsy
          if (!(0, _utils.boolValue)(setting)) {
            return true;
          } // Skip if value is empty


          if (!value || _lodash.default.isEmpty(value)) {
            return true;
          } // Skip if we're not async-capable


          if (!this.async) {
            return true;
          }

          var schema = component.component; // Initialize the request options

          var requestOptions = {
            url: setting,
            method: 'GET',
            qs: {},
            json: true,
            headers: {}
          }; // If the url is a boolean value

          if (_lodash.default.isBoolean(requestOptions.url)) {
            requestOptions.url = !!requestOptions.url;

            if (!requestOptions.url || schema.dataSrc !== 'url' || !schema.data.url || !schema.searchField) {
              return true;
            } // Get the validation url


            requestOptions.url = schema.data.url; // Add the search field

            requestOptions.qs[schema.searchField] = value; // Add the filters

            if (schema.filter) {
              requestOptions.url += (!requestOptions.url.includes('?') ? '?' : '&') + schema.filter;
            } // If they only wish to return certain fields.


            if (schema.selectFields) {
              requestOptions.qs.select = schema.selectFields;
            }
          }

          if (!requestOptions.url) {
            return true;
          } // Make sure to interpolate.


          requestOptions.url = (0, _utils.interpolate)(requestOptions.url, {
            data: component.data
          }); // Add query string to URL

          requestOptions.url += (requestOptions.url.includes('?') ? '&' : '?') + _lodash.default.chain(requestOptions.qs).map(function (val, key) {
            return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(val));
          }).join('&').value(); // Set custom headers.

          if (schema.data && schema.data.headers) {
            _lodash.default.each(schema.data.headers, function (header) {
              if (header.key) {
                requestOptions.headers[header.key] = header.value;
              }
            });
          } // Set form.io authentication.


          if (schema.authenticate && config.token) {
            requestOptions.headers['x-jwt-token'] = config.token;
          } // Isomorphic fetch


          var isofetch = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.fetch ? {
            fetch: fetch,
            Headers: Headers,
            Request: Request,
            Response: Response
          } : require('fetch-ponyfill')();
          var request = new isofetch.Request(requestOptions.url, {
            headers: new isofetch.Headers(requestOptions.headers)
          });
          return isofetch.fetch(request).then(function _callee(response) {
            var results;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (response.ok) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return", false);

                  case 2:
                    _context.next = 4;
                    return regeneratorRuntime.awrap(response.json());

                  case 4:
                    results = _context.sent;
                    return _context.abrupt("return", results && results.length);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }).catch(function () {
            return false;
          });
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
      minSelectedCount: {
        key: 'validate.minSelectedCount',
        message: function message(component, setting) {
          return component.component.minSelectedCountMessage ? component.component.minSelectedCountMessage : component.t(component.errorMessage('minSelectedCount'), {
            minCount: parseFloat(setting),
            data: component.data
          });
        },
        check: function check(component, setting, value) {
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
        message: function message(component, setting) {
          return component.component.maxSelectedCountMessage ? component.component.maxSelectedCountMessage : component.t(component.errorMessage('maxSelectedCount'), {
            minCount: parseFloat(setting),
            data: component.data
          });
        },
        check: function check(component, setting, value) {
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
        message: function message(component, setting) {
          return component.t(component.errorMessage('minLength'), {
            field: component.errorLabel,
            length: setting - 1,
            data: component.data
          });
        },
        check: function check(component, setting, value) {
          var minLength = parseInt(setting, 10);

          if (!minLength || typeof value !== 'string' || component.isEmpty(value)) {
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

          return value.trim().split(/\s+/).length <= maxWords;
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

          return value.trim().split(/\s+/).length >= minWords;
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
        check: function check(component, setting, value, data, index, row) {
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
        message: function message(component) {
          return component.t(component.errorMessage('mask'), {
            field: component.errorLabel,
            data: component.data
          });
        },
        check: function check(component, setting, value) {
          var inputMask;

          if (component.isMultipleMasksField) {
            var maskName = value ? value.maskName : undefined;
            var formioInputMask = component.getMaskByName(maskName);

            if (formioInputMask) {
              inputMask = (0, _utils.getInputMask)(formioInputMask);
            }

            value = value ? value.value : value;
          } else {
            inputMask = component._inputMask;
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
        check: function check(component, setting, value, data, index, row) {
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
      calendar: {
        key: 'validate.calendar',
        messageText: '',
        message: function message(component) {
          return component.t(component.errorMessage(this.validators.calendar.messageText), {
            field: component.errorLabel,
            maxDate: (0, _moment.default)(component.dataValue).format(component.format)
          });
        },
        check: function check(component, setting, value, data, index) {
          this.validators.calendar.messageText = '';
          var widget = component.getWidget(index);

          if (!widget) {
            return true;
          }

          var settings = widget.settings,
              enteredDate = widget.enteredDate;
          var minDate = settings.minDate,
              maxDate = settings.maxDate,
              format = settings.format;
          var momentFormat = [(0, _utils.convertFormatToMoment)(format)];

          if (momentFormat[0].match(/M{3,}/g)) {
            momentFormat.push(momentFormat[0].replace(/M{3,}/g, 'MM'));
          }

          if (!value && enteredDate) {
            var _checkInvalidDate = (0, _calendarUtils.checkInvalidDate)(enteredDate, momentFormat, minDate, maxDate),
                message = _checkInvalidDate.message,
                result = _checkInvalidDate.result;

            if (!result) {
              this.validators.calendar.messageText = message;
              return result;
            }
          }

          if (value && enteredDate) {
            if ((0, _moment.default)(value).format() !== (0, _moment.default)(enteredDate, momentFormat, true).format() && enteredDate.match(/_/gi)) {
              this.validators.calendar.messageText = _calendarUtils.CALENDAR_ERROR_MESSAGES.INCOMPLETE;
              return false;
            } else {
              widget.enteredDate = '';
              return true;
            }
          }
        }
      }
    };
  }

  _createClass(ValidationChecker, [{
    key: "checkValidator",
    value: function checkValidator(component, validator, setting, value, data, index, row) {
      var _this = this;

      var resultOrPromise = null; // Allow each component to override their own validators by implementing the validator.method

      if (validator.method && typeof component[validator.method] === 'function') {
        resultOrPromise = component[validator.method](setting, value, data, index, row);
      } else {
        resultOrPromise = validator.check.call(this, component, setting, value, data, index, row);
      }

      var processResult = function processResult(result) {
        if (typeof result === 'string') {
          return result;
        }

        if (!result) {
          return validator.message.call(_this, component, setting, index, row);
        }

        return '';
      };

      if (this.async) {
        return _nativePromiseOnly.default.resolve(resultOrPromise).then(processResult);
      } else {
        return processResult(resultOrPromise);
      }
    }
  }, {
    key: "validate",
    value: function validate(component, validatorName, value, data, index, row) {
      // Skip validation for conditionally hidden components
      if (!component.conditionallyVisible()) {
        return false;
      }

      var validator = this.validators[validatorName];

      var setting = _lodash.default.get(component.component, validator.key, null);

      var resultOrPromise = this.checkValidator(component, validator, setting, value, data, index, row);

      var processResult = function processResult(result) {
        return result ? {
          message: _lodash.default.get(result, 'message', result),
          level: _lodash.default.get(result, 'level') === 'warning' ? 'warning' : 'error',
          path: (component.path || '').replace(/[[\]]/g, '.').replace(/\.\./g, '.').split('.').map(function (part) {
            return _lodash.default.defaultTo(_lodash.default.toNumber(part), part);
          }),
          context: {
            validator: validatorName,
            setting: setting,
            key: component.key,
            label: component.label,
            value: value
          }
        } : false;
      };

      if (this.async) {
        return _nativePromiseOnly.default.resolve(resultOrPromise).then(processResult);
      } else {
        return processResult(resultOrPromise);
      }
    }
  }, {
    key: "checkComponent",
    value: function checkComponent(component, data, row) {
      var _this2 = this;

      var includeWarnings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isServerSidePersistent = typeof process !== 'undefined' && _lodash.default.get(process, 'release.name') === 'node' && !_lodash.default.defaultTo(component.component.persistent, true); // If we're server-side and it's not a persistent component, don't run validation at all

      if (isServerSidePersistent || component.component.validate === false) {
        return [];
      }

      data = data || component.rootValue;
      row = row || component.data;
      var values = component.component.multiple && Array.isArray(component.validationValue) ? component.validationValue : [component.validationValue];

      var validateCustom = _lodash.default.get(component, 'component.validate.custom');

      var customErrorMessage = _lodash.default.get(component, 'component.validate.customMessage'); // Run primary validators


      var resultsOrPromises = (0, _lodash.default)(component.validators).chain().map(function (validatorName) {
        if (!_this2.validators.hasOwnProperty(validatorName)) {
          return {
            message: "Validator for \"".concat(validatorName, "\" is not defined"),
            level: 'warning',
            context: {
              validator: validatorName,
              key: component.key,
              label: component.label
            }
          };
        }

        return _lodash.default.map(values, function (value, index) {
          return _this2.validate(component, validatorName, value, data, index, row);
        });
      }).flatten().value(); // Run the "unique" pseudo-validator

      component.component.validate = component.component.validate || {};
      component.component.validate.unique = component.component.unique;
      resultsOrPromises.push(this.validate(component, 'unique', component.validationValue, data)); // Run the "multiple" pseudo-validator

      component.component.validate.multiple = component.component.multiple;
      resultsOrPromises.push(this.validate(component, 'multiple', component.validationValue, data)); // Define how results should be formatted

      var formatResults = function formatResults(results) {
        // Condense to a single flat array
        results = (0, _lodash.default)(results).chain().flatten().compact().value();

        if (customErrorMessage || validateCustom) {
          _lodash.default.each(results, function (result) {
            result.message = component.t(customErrorMessage || result.message, {
              field: component.errorLabel,
              data: data,
              row: row,
              error: result
            });
          });
        }

        return includeWarnings ? results : _lodash.default.reject(results, function (result) {
          return result.level === 'warning';
        });
      }; // Wait for results if using async mode, otherwise process and return immediately


      if (this.async) {
        return _nativePromiseOnly.default.all(resultsOrPromises).then(formatResults);
      } else {
        return formatResults(resultsOrPromises);
      }
    }
  }, {
    key: "get",
    value: function get() {
      _lodash.default.get.call(this, arguments);
    }
  }, {
    key: "each",
    value: function each() {
      _lodash.default.each.call(this, arguments);
    }
  }, {
    key: "has",
    value: function has() {
      _lodash.default.has.call(this, arguments);
    }
  }, {
    key: "check",
    get: function get() {
      return this.checkComponent;
    }
  }]);

  return ValidationChecker;
}();

exports.ValidationChecker = ValidationChecker;
var instance = new ValidationChecker({
  async: false
});
exports.default = instance;