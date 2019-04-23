import _ from 'lodash';
import {
  boolValue,
  getInputMask,
  matchInputMask,
  getDateSetting
} from '../utils/utils';
import moment from 'moment';

export default {
  get: _.get,
  each: _.each,
  has: _.has,
  checkValidator(component, validator, setting, value, data) {
    let result = null;

    // Allow each component to override their own validators by implementing the validator.method
    if (validator.method && (typeof component[validator.method] === 'function')) {
      result = component[validator.method](setting, value, data);
    }
    else {
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
          length: (setting + 1),
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
      check(component, setting, value, data) {
        if (!setting) {
          return true;
        }
        const valid = component.evaluate(setting, {
          data,
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
      check(component, setting, value, data) {
        if (!setting) {
          return true;
        }
        const valid = component.evaluate(setting, {
          valid: true,
          data,
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
    }
  }
};
