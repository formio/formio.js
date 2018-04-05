'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validator = exports.Validator = {
  get: _lodash2.default.get,
  each: _lodash2.default.each,
  has: _lodash2.default.has,
  checkValidator: function checkValidator(component, validator, setting, value, data) {
    var result = validator.check.call(this, component, setting, value, data);
    if (typeof result === 'string') {
      return result;
    }
    if (!result) {
      return validator.message.call(this, component, setting);
    }
    return '';
  },
  validate: function validate(component, validator, value, data) {
    if (validator.key && _lodash2.default.has(component.component, validator.key)) {
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
    _lodash2.default.each(component.validators, function (name) {
      if (_this.validators.hasOwnProperty(name)) {
        var validator = _this.validators[name];
        if (component.validateMultiple(value)) {
          _lodash2.default.each(value, function (val) {
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

    var customErrorMessage = _lodash2.default.get(component, 'component.validate.customMessage');
    if (result && customErrorMessage) {
      result = component.t(customErrorMessage, {
        data: component.data
      });
    }

    return result;
  },

  validators: {
    required: {
      key: 'validate.required',
      message: function message(component) {
        return component.t(component.errorMessage('required'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        if (!_utils2.default.boolValue(setting)) {
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
        if (!min || !_lodash2.default.isNumber(value)) {
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
        if (!max || !_lodash2.default.isNumber(value)) {
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
    email: {
      message: function message(component) {
        return component.t(component.errorMessage('invalid_email'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Allow emails to be valid if the component is pristine and no value is provided.
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
    pattern: {
      key: 'validate.pattern',
      message: function message(component, setting) {
        return component.t(_lodash2.default.get(component, 'component.validate.patternMessage', component.errorMessage('pattern'), {
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
        var regexStr = '^' + pattern + '$';
        var regex = new RegExp(regexStr);
        return regex.test(value);
      }
    },
    json: {
      key: 'validate.json',
      check: function check(component, setting, value, data) {
        if (!setting) {
          return true;
        }
        var valid = true;
        try {
          valid = _utils2.default.jsonLogic.apply(setting, {
            data: data,
            row: component.data,
            _: _lodash2.default
          });
        } catch (err) {
          valid = err.message;
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
        if (value && component._inputMask) {
          return _utils2.default.matchInputMask(value, component._inputMask);
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
        var custom = setting;

        custom = custom.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
          if ($2.indexOf('data.') === 0) {
            return _lodash2.default.get(data, $2.replace('data.', ''));
          } else if ($2.indexOf('row.') === 0) {
            return _lodash2.default.get(component.data, $2.replace('row.', ''));
          }

          // Support legacy...
          return _lodash2.default.get(data, $2);
        });

        /* jshint evil: true */
        return new Function('row', 'data', 'component', 'input', 'var valid = true; ' + custom + '; return valid;')(component.data, data, component, value);
      }
    }
  }
};