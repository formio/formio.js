import _ from 'lodash';
import {boolValue, evaluate, getInputMask, matchInputMask} from '../utils/utils';

export default {
  get: _.get,
  each: _.each,
  has: _.has,
  checkValidator(component, validator, setting, value, data) {
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
    if (validator.key && _.has(component.component, validator.key)) {
      const setting = this.get(component.component, validator.key);
      return this.checkValidator(component, validator, setting, value, data);
    }
    return this.checkValidator(component, validator, null, value, data);
  },
  check(component, data) {
    let result = '';
    const value = component.validationValue;
    data = data || component.data;
    _.each(component.validators, (name) => {
      if (this.validators.hasOwnProperty(name)) {
        const validator = this.validators[name];
        if (component.validateMultiple(value)) {
          _.each(value, (val) => {
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

    const validateCustom = _.get(component, 'component.validate.custom');
    const customErrorMessage = _.get(component, 'component.validate.customMessage');
    if (result && (customErrorMessage || validateCustom)) {
      result = component.t(customErrorMessage || result, {
        data: component.data
      });
    }
    return result;
  },
  validators: {
    required: {
      key: 'validate.required',
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
        if (!min || (!_.isNumber(value))) {
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
        if (!max || (!_.isNumber(value))) {
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
        let valid = evaluate(setting, {
          row: component.data,
          data,
          component: component.component,
          input: value,
          instance: component
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
      check(component, setting, value, data) {
        if (!setting) {
          return true;
        }
        let valid = evaluate(setting, {
          valid: true,
          row: component.data,
          data,
          component: component.component,
          input: value,
          instance: component
        }, 'valid', true);
        if (valid === null) {
          return true;
        }
        return valid;
      }
    }
  }
};
