import _get from 'lodash/get';
import _each from 'lodash/each';
import _has from 'lodash/has';
import _isArray from 'lodash/isArray';
import FormioUtils from '../utils/index';
export var Validator = {
  get: _get,
  each: _each,
  has: _has,
  checkValidator: function(component, validator, setting, value, data) {
    // Make sure this component isn't conditionally disabled.
    if (!FormioUtils.checkCondition(component.component, data, component.data)) {
      return '';
    }

    let result = validator.check.call(this, component, setting, value, data);
    if (typeof result === 'string') {
      return result;
    }
    if (!result) {
      return validator.message.call(this, component, setting);
    }
    return '';
  },
  validate: function(component, validator, value, data) {
    if (validator.key && _has(component.component, validator.key)) {
      let setting = this.get(component.component, validator.key);
      return this.checkValidator(component, validator, setting, value, data);
    }
    return this.checkValidator(component, validator, null, value, data);
  },
  check: function(component, data) {
    let result = '';
    let value = component.getRawValue();
    data = data || component.data;
    _each(component.validators, (name) => {
      if (this.validators.hasOwnProperty(name)) {
        let validator = this.validators[name];
        if ((component.component.multiple && _isArray(value)) && !(component.component.type === 'select' && validator.key === 'validate.required')) {
          _each(value, (val) => {
            result = this.validate(component, validator, val, data);
            if (result) {
              return false;
            }
          });
        }
        else {
          result = this.validate(component, validator, value, data);
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
      message: function(component, setting) {
        return component.t('required', {field: component.name});
      },
      check: function(component, setting, value) {
        if (!FormioUtils.boolValue(setting)) {
          return true;
        }
        return !component.isEmpty(value);
      }
    },
    minLength: {
      key: 'validate.minLength',
      message: function(component, setting) {
        return component.t('minLength', {
          field: component.name,
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
      message: function(component, setting) {
        return component.t('maxLength', {
          field: component.name,
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
      message: function(component, setting) {
        return component.t('invalid_email', {
          field: component.name
        });
      },
      check: function(component, setting, value) {
        // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
      }
    },
    date: {
      message: function(component, setting) {
        return component.t('invalid_date', {
          field: component.name
        });
      },
      check: function(component, setting, value) {
        return (value !== 'Invalid date');
      }
    },
    pattern: {
      key: 'validate.pattern',
      message: function(component, setting) {
        return component.t('pattern', {
          field: component.name
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
      check: function(component, setting, value, data) {
        if (!setting) {
          return true;
        }
        let valid = true;
        try {
          valid = FormioUtils.jsonLogic.apply(setting, {
            data: data,
            row: component.data
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
      message: function(component) {
        return component.t('custom', {
          field: component.name
        });
      },
      check: function(component, setting, value, data) {
        if (!setting) {
          return true;
        }
        var valid = true;
        var row = component.data;
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
