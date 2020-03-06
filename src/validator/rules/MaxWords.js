const Rule = require('./Rule');

module.exports = class MaxWords extends Rule {
  defaultMessage = '{{field}} must have no more than {{- settings.length}} words.';

  check(value) {
    const maxWords = parseInt(this.settings.length, 10);
    if (!maxWords || (typeof value !== 'string')) {
      return true;
    }
    return (value.trim().split(/\s+/).length <= maxWords);
  }
};
