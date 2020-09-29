import * as dayjs from 'dayjs';

import { Transformer } from './Transformer';

export class MaxDateTransformer extends Transformer {
  static get title() {
    return 'Max Date';
  }

  static get name() {
    return 'maxDate';
  }

  transform(value) {
    return dayjs.max(value);
  }
}
