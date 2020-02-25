const Rule = require('./Rule');

module.exports = class MaxLength extends Rule {
  defaultMessage = '{{field}} must contain {{length}} or less characters.';

  check(value) {
    const maxLength = parseInt(this.settings.length, 10);
    if (!value || !maxLength || !value.hasOwnProperty('length')) {
      return true;
    }
    return (value.length <= maxLength);
  }
};
