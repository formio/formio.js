const Rule = require('./Rule');

module.exports = class MaxYear extends Rule {
  defaultMessage = '{{field}} should not contain year greater than {{maxYear}}';

  check(value) {
    const maxYear = this.settings;
    let year = /\d{4}$/.exec(value);
    year = year ? year[0] : null;

    if (!(+maxYear) || !(+year)) {
      return true;
    }

    return +year <= +maxYear;
  }
};
