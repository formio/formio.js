const Rule = require('./Rule');

module.exports = class DateRule extends Rule {
  defaultMessage = '{{field}} is not a valid date.';

  check(value) {
    if (!value) {
      return true;
    }
    if (value === 'Invalid date' || value === 'Invalid Date') {
      return false;
    }
    if (typeof value === 'string') {
      value = new Date(value);
    }
    return value instanceof Date === true && value.toString() !== 'Invalid Date';
  }
};
