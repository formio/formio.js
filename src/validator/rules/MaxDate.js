import { getDateSetting } from '../../utils/utils';
import moment from 'moment';
import _ from 'lodash';

const Rule = require('./Rule');

module.exports = class MaxDate extends Rule {
  defaultMessage = '{{field}} should not contain date after {{settings.dateLimit}}';

  check(value) {
    if (!value) {
      return true;
    }

    const date = moment(value);
    const maxDate = getDateSetting(this.settings.dateLimit);

    if (_.isNull(maxDate)) {
      return true;
    }
    else {
      maxDate.setHours(0, 0, 0, 0);
    }

    return date.isBefore(maxDate) || date.isSame(maxDate);
  }
};
