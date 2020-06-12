import _ from 'lodash';

import { Transformer } from './Transformer';

export class SnakeCaseTransformer extends Transformer {
  static get title() {
    return 'Snake Case';
  }

  static get name() {
    return 'snakeCase';
  }

  transform(value) {
    return _.snakeCase(value);
  }
}
