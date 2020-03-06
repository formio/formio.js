const Rule = require('./Rule');

module.exports = class Custom extends Rule {
  defaultMessage = '{{error}}';

  check(value, data, row, index) {
    const custom = this.settings.custom;

    if (!custom) {
      return true;
    }

    const valid = this.component.evaluate(custom, {
      valid: true,
      data,
      row,
      rowIndex: index,
      input: value,
    }, 'valid', true);

    if (valid === null) {
      return true;
    }

    return valid;
  }
};
