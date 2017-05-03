import _get from 'lodash/get';
import _each from 'lodash/each';
import _has from 'lodash/has';
import _isArray from 'lodash/isArray';
import jsonLogic from 'json-logic-js';
export var Validator = {
  get: _get,
  each: _each,
  has: _has,
  boolValue: function(value) {
    if (typeof value === 'boolean') {
      return value;
    }
    else if (typeof value === 'string') {
      return (value.toLowerCase() === 'true');
    }
    else {
      return !!value;
    }
  },
  empty: function(value) {
    return value == null || value.length === 0;
  },
  name: function(component) {
    return component.label || component.placeholder || component.key;
  },
  checkValidator: function(validator, component, setting, value, data, row, t) {
    let result = validator.check.call(this, component, setting, value, data, row);
    if (typeof result === 'string') {
      return result;
    }
    if (!result) {
      return validator.message.call(this, component, setting, t);
    }
    return '';
  },
  validate: function(validator, component, value, data, row, t) {
    if (validator.key && _has(component, validator.key)) {
      let setting = this.get(component, validator.key);
      return this.checkValidator(validator, component, setting, value, data, row, t);
    }
    return this.checkValidator(validator, component, null, value, data, row, t);
  },
  check: function(validators, component, value, data, row, t) {
    let result = '';
    _each(validators, (name) => {
      if (this.validators.hasOwnProperty(name)) {
        let validator = this.validators[name];
        if (component.multiple && _isArray(value)) {
          _each(value, (val) => {
            result = this.validate(validator, component, val, data, row, t);
            if (result) {
              return false;
            }
          });
        }
        else {
          result = this.validate(validator, component, value, data, row, t);
        }
        if (result) {
          return false;
        }
      }
    });
    return result;
  },
  validators: {
    required: {
      key: 'validate.required',
      message: function(component, setting, t) {
        return t('required', {field: this.name(component)});
      },
      check: function(component, setting, value) {
        let required = Validator.boolValue(setting);
        if (!required) {
          return true;
        }
        return !Validator.empty(value);
      }
    },
    minLength: {
      key: 'validate.minLength',
      message: function(component, setting, t) {
        return t('minLength', {
          field: this.name(component),
          length: (setting - 1)
        });
      },
      check: function(component, setting, value) {
        let minLength = parseInt(setting, 10);
        if (!minLength || (typeof value !== 'string')) {
          return true;
        }
        return (value.length >= minLength);
      }
    },
    maxLength: {
      key: 'validate.maxLength',
      message: function(component, setting, t) {
        return t('maxLength', {
          field: this.name(component),
          length: (setting + 1)
        });
      },
      check: function(component, setting, value) {
        let maxLength = parseInt(setting, 10);
        if (!maxLength || (typeof value !== 'string')) {
          return true;
        }
        return (value.length <= maxLength);
      }
    },
    email: {
      message: function(component, setting, t) {
        return t('invalid_email', {
          field: this.name(component)
        });
      },
      check: function(component, setting, value) {
        // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
      }
    },
    date: {
      message: function(component, setting, t) {
        return t('invalid_date', {
          field: this.name(component)
        });
      },
      check: function(component, setting, value) {
        return (value !== 'Invalid date');
      }
    },
    pattern: {
      key: 'validate.pattern',
      message: function(component, setting, t) {
        return t('pattern', {
          field: this.name(component)
        });
      },
      check: function(component, setting, value) {
        let pattern = setting;
        if (!pattern) {
          return true;
        }
        let regexStr = '^' + pattern + '$';
        let regex = new RegExp(regexStr);
        return regex.test(value);
      }
    },
    json: {
      key: 'validate.json',
      check: function(component, setting, value, data, row) {
        if (!setting) {
          return true;
        }
        let valid = true;
        try {
          valid = jsonLogic.apply(setting, {
            data: data,
            row: row
          });
        }
        catch (err) {
          valid = err.message;
        }
        return valid;
      }
    },
    custom: {
      key: 'validate.custom',
      message: function(component, setting, t) {
        return t('custom', {
          field: this.name(component)
        });
      },
      check: function(component, setting, value, data, row) {
        if (!setting) {
          return true;
        }
        var valid = true;
        let custom = setting;
        /*eslint-disable no-unused-vars */
        var input = value;
        /*eslint-enable no-unused-vars */
        custom = custom.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
          if ($2.indexOf('data.') === 0) {
            return _get(data, $2.replace('data.', ''));
          }
          else if ($2.indexOf('row.') === 0) {
            return _get(row, $2.replace('row.', ''));
          }

          // Support legacy...
          return _get(data, $2);
        });

        /* jshint evil: true */
        eval(custom);
        return valid;
      }
    }
  }
};
