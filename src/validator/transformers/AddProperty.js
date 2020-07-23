import _ from 'lodash';

import { Transformer } from './Transformer';

export class AddPropertyTransformer extends Transformer {
  static get title() {
    return 'Add Property';
  }

  static get name() {
    return 'addProperty';
  }

  static get arguments() {
    return [
      {
        name: 'Name',
        key: 'name',
        required: true,
      },
      {
        name: 'Value',
        key: 'value',
        required: true,
      },
    ];
  }

  transform(value, args) {
    const {
      name,
      value: propValue,
    } = args;

    return _.assign({}, value, {
      [name]: propValue,
    });
  }
}
