import _ from 'lodash';

import { Transformer } from './Transformer';

export class UpperCaseTransformer extends Transformer {
  static get title() {
    return 'Upper Case';
  }

  static get name() {
    return 'upperCase';
  }

  transform(value) {
    return _.upperCase(value);
  }
}
