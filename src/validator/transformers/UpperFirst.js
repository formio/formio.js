import _ from 'lodash';

import { Transformer } from './Transformer';

export class UpperFirstTransformer extends Transformer {
  static get title() {
    return 'Upper First';
  }

  static get name() {
    return 'upperFirst';
  }

  transform(value) {
    return _.upperFirst(value);
  }
}
