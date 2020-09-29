import _ from 'lodash';
import * as dayjs from 'dayjs';

import { getDateSetting } from '../../utils/utils';
import { Rule } from './Rule';

export class MaxDate extends Rule {
  defaultMessage = '{{field}} should not contain date after {{settings.dateLimit}}';

  check(value) {
    if (!value) {
      return true;
    }

    // If they are the exact same string or object, then return true.
    if (value === this.settings.dateLimit) {
      return true;
    }

    const date = dayjs(value);
    const maxDate = getDateSetting(this.settings.dateLimit);

    if (_.isNull(maxDate)) {
      return true;
    }
    else {
      maxDate.setHours(0, 0, 0, 0);
    }

    return date.isSameOrBefore(maxDate);
  }
}
