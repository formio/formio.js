import _ from 'lodash';
import * as dayjs from 'dayjs';

import { getDateSetting } from '../../utils/utils';
import { Rule } from './Rule';

export class MinDate extends Rule {
  defaultMessage = '{{field}} should not contain date before {{settings.dateLimit}}';

  check(value) {
    if (!value) {
      return true;
    }

    const date = dayjs(value);
    const minDate = getDateSetting(this.settings.dateLimit);

    if (_.isNull(minDate)) {
      return true;
    }
    else {
      minDate.setHours(0, 0, 0, 0);
    }

    return date.isSameOfAfter(minDate);
  }
}
