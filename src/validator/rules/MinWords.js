const Rule = require('./Rule');

module.exports = class MinWords extends Rule {
  defaultMessage = '{{field}} must have at least {{- settings.length}} words.';

  check(value) {
    const minWords = parseInt(this.settings.length, 10);
    if (!minWords || !value || (typeof value !== 'string')) {
      return true;
    }
    return (value.trim().split(/\s+/).length >= minWords);
  }
};
