const Rule = require('./Rule');

module.exports = class Day extends Rule {
  defaultMessage = '{{field}} is not a valid day.';

  check(value) {
    if (!value) {
      return true;
    }
    if (typeof value !== 'string') {
      return false;
    }
    const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
    const values = value.split('/').map(x => parseInt(x, 10)),
      day = values[DAY],
      month = values[MONTH],
      year = values[YEAR],
      maxDay = getDaysInMonthCount(month, year);

    if (isNaN(day) || day < 0 || day > maxDay) {
      return false;
    }
    if (isNaN(month) || month < 0 || month > 12) {
      return false;
    }
    if (isNaN(year) || year < 0 || year > 9999) {
      return false;
    }
    return true;

    function isLeapYear(year) {
      // Year is leap if it is evenly divisible by 400 or evenly divisible by 4 and not evenly divisible by 100.
      return !(year % 400) || (!!(year % 100) && !(year % 4));
    }

    function getDaysInMonthCount(month, year) {
      switch (month) {
        case 1:     // January
        case 3:     // March
        case 5:     // May
        case 7:     // July
        case 8:     // August
        case 10:    // October
        case 12:    // December
          return 31;
        case 4:     // April
        case 6:     // June
        case 9:     // September
        case 11:    // November
          return 30;
        case 2:     // February
          return isLeapYear(year) ? 29 : 28;
        default:
          return 31;
      }
    }
  }
};
