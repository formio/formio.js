import * as dayjs from 'dayjs';

import { Transformer } from './Transformer';

export class GetDaysInMonthTransformer extends Transformer {
  static get title() {
    return 'Get Days In Month';
  }

  static get name() {
    return 'getDaysInMonth';
  }

  transform(value) {
    return dayjs(value).daysInMonth();
  }
}
