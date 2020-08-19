const Rule = require('./Rule');

module.exports = class Min extends Rule {
  defaultMessage = '{{field}} cannot be less than {{settings.limit}}.';

  check(value) {
    const min = parseFloat(this.settings.limit);
    const parsedValue = parseFloat(value);

    if (Number.isNaN(min) || Number.isNaN(parsedValue)) {
      return true;
    }

    return parsedValue >= min;
  }
};
