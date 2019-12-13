const Rule = require('./Rule');

module.exports = class Required extends Rule {
  defaultMessage = '{{field}} is required';

  check(value) {
    // TODO: Day, Survey overrides.

    return !this.component.isEmpty(value);
  }
};
