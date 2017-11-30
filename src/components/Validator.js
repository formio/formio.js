import _ from 'lodash';
import _get from 'lodash/get';
import _each from 'lodash/each';
import _has from 'lodash/has';
import _isNumber from 'lodash/isNumber';
import FormioUtils from '../utils/index';
export const Validator = {
  get: _get,
  each: _each,
  has: _has,
  checkValidator(component, validator, setting, value, data) {
    // Make sure this component isn't conditionally disabled.
    if (!FormioUtils.checkCondition(component.component, data, component.data)) {
      return '';
    }

    const result = validator.check.call(this, component, setting, value, data);
    if (typeof result === 'string') {
      return result;
    }
    if (!result) {
      return validator.message.call(this, component, setting);
    }
    return '';
  },
  validate(component, validator, value, data) {
    if (validator.key && _has(component.component, validator.key)) {
      const setting = this.get(component.component, validator.key);
      return this.checkValidator(component, validator, setting, value, data);
    }
    return this.checkValidator(component, validator, null, value, data);
  },
  check(component, data) {
    let result = '';
    const value = component.getRawValue();
    data = data || component.data;
    _each(component.validators, (name) => {
      if (this.validators.hasOwnProperty(name)) {
        const validator = this.validators[name];
        if (component.validateMultiple(value)) {
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

    const customErrorMessage = _get(component, 'component.validate.customMessage');
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
      message(component, setting) {
        return component.t(component.errorMessage('required'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check(component, setting, value) {
        if (!FormioUtils.boolValue(setting)) {
          return true;
        }
        return !component.isEmpty(value);
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
        if (!min || (!_isNumber(value))) {
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
        if (!max || (!_isNumber(value))) {
          return true;
        }
        return parseFloat(value) <= max;
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
        if (!minLength || (typeof value !== 'string')) {
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
    email: {
      message(component, setting) {
        return component.t(component.errorMessage('invalid_email'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check(component, setting, value) {
        // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Allow emails to be valid if the component is pristine and no value is provided.
        return (component.pristine && !value) || re.test(value);
      }
    },
    date: {
      message(component, setting) {
        return component.t(component.errorMessage('invalid_date'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check(component, setting, value) {
        return (value !== 'Invalid date');
      }
    },
    pattern: {
      key: 'validate.pattern',
      message(component, setting) {
        return component.t(_get(component, 'component.validate.patternMessage', component.errorMessage('pattern'), {
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
        const regexStr = `^${pattern}$`;
        const regex = new RegExp(regexStr);
        return regex.test(value);
      }
    },
    json: {
      key: 'validate.json',
      check(component, setting, value, data) {
        if (!setting) {
          return true;
        }
        let valid = true;
        try {
          valid = FormioUtils.jsonLogic.apply(setting, {
            data,
            row: component.data,
            _
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
      message(component) {
        return component.t(component.errorMessage('custom'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check(component, setting, value, data) {
        if (!setting) {
          return true;
        }
        let valid = true;
        let row = component.data;
        let custom = setting;
        /*eslint-disable no-unused-vars */
        let input = value;
        /*eslint-enable no-unused-vars */
        custom = custom.replace(/({{\s+(.*)\s+}})/, (match, $1, $2) => {
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
