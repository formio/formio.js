const Rule = require('./Rule');

module.exports = class Max extends Rule {
  defaultMessage = '{{field}} cannot be greater than {{settings.limit}}.';

  check(value) {
    const max = parseFloat(this.settings.limit);
    const parsedValue = parseFloat(value);

    if (Number.isNaN(max) || Number.isNaN(parsedValue)) {
      return true;
    }

    return parsedValue <= max;
  }
};
