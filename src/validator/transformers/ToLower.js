import _ from 'lodash';

import { Transformer } from './Transformer';

export class ToLowerTransformer extends Transformer {
  static get title() {
    return 'To Lower';
  }

  static get name() {
    return 'toLower';
  }

  transform(value) {
    return _.toLower(value);
  }
}
