import * as dayjs from 'dayjs';

import { Transformer } from './Transformer';

export class MinDateTransformer extends Transformer {
  static get title() {
    return 'Min Date';
  }

  static get name() {
    return 'minDate';
  }

  transform(value) {
    return dayjs.min(value);
  }
}
