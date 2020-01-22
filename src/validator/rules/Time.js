import moment from 'moment';

const Rule = require('./Rule');

module.exports = class Time extends Rule {
  defaultMessage = '{{field}} contains invalid time';

  check(value) {
    if (!value || (this.component.isNotCompleteInput && this.component.isNotCompleteInput(value))) {
      return true;
    }

    return moment(value, this.component.format || 'HH:mm').isValid();
  }
};
