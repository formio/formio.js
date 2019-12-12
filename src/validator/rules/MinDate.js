import { getDateSetting } from '../../utils/utils';
import moment from 'moment';
import _ from 'lodash';

const Rule = require('./Rule');

module.exports = class MinDate extends Rule {
  defaultMessage = '{{field}} should not contain date before {{settings.dateLimit}}';

  check(value) {
    if (!value) {
      return true;
    }

    const date = moment(value);
    const minDate = getDateSetting(this.settings.dateLimit);

    if (_.isNull(minDate)) {
      return true;
    }
    else {
      minDate.setHours(0, 0, 0, 0);
    }

    return date.isAfter(minDate) || date.isSame(minDate);
  }
};
