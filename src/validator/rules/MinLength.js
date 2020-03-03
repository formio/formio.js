const Rule = require('./Rule');

module.exports = class MinLength extends Rule {
  defaultMessage = '{{field}} must have no more than {{- settings.length}} characters.';

  check(value) {
    const minLength = parseInt(this.settings.length, 10);
    if (!minLength || !value || !value.hasOwnProperty('length') || this.component.isEmpty(value)) {
      return true;
    }
    return (value.length >= minLength);
  }
};
