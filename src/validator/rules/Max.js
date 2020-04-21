import _ from 'lodash';

const Rule = require('./Rule');

module.exports = class Max extends Rule {
  defaultMessage = '{{field}} cannot be greater than {{settings.limit}}.';

  check(value) {
    const max = parseFloat(this.settings.limit);
    if (Number.isNaN(max) || (!_.isNumber(value))) {
      return true;
    }
    return parseFloat(value) <= max;
  }
};
