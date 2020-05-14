import _ from 'lodash';

const Rule = require('./Rule');

module.exports = class Min extends Rule {
  defaultMessage = '{{field}} cannot be less than {{settings.limit}}.';

  check(value) {
    const min = parseFloat(this.settings.limit);
    if (Number.isNaN(min) || (!_.isNumber(value))) {
      return true;
    }
    return parseFloat(value) >= min;
  }
};
