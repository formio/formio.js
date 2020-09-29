import * as dayjs from 'dayjs';

import { Rule } from './Rule';

export class Time extends Rule {
   defaultMessage = '{{field}} must contain valid time';

  check(value) {
    if (this.component.isEmpty(value)) return true;
    return dayjs(value, this.component.component.format).isValid();
  }
}
