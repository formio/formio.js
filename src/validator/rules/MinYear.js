const Rule = require('./Rule');

module.exports = class MinYear extends Rule {
   defaultMessage = '{{field}} should not contain year less than {{minYear}}';

  check(value) {
    const minYear = this.settings;
    let year = /\d{4}$/.exec(value);
    year = year ? year[0] : null;

    if (!(+minYear) || !(+year)) {
      return true;
    }

    return +year >= +minYear;
  }
};
