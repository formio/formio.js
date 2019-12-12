const Rule = require('./Rule');

module.exports = class MinLength extends Rule {
  defaultMessage = '{{field}} must be longer than {{- settings.length}} characters.';

  check(value) {
    const minLength = parseInt(this.settings.length, 10);
    if (!minLength || !value || !value.hasOwnProperty('length') || this.component.isEmpty(value)) {
      return true;
    }
    return (value.length >= minLength);
  }
};
