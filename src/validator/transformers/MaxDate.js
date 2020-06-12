import moment from 'moment';

import { Transformer } from './Transformer';

export class MaxDateTransformer extends Transformer {
  static get title() {
    return 'Max Date';
  }

  static get name() {
    return 'maxDate';
  }

  transform(value) {
    return moment.max(value);
  }
}
