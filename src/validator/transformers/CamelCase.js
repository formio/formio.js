import _ from 'lodash';

import { Transformer } from './Transformer';

export class CamelCaseTransformer extends Transformer {
  static get title() {
    return 'Camel Case';
  }

  static get name() {
    return 'camelCase';
  }

  transform(value) {
    return _.camelCase(value);
  }
}
