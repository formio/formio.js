import moment from 'moment';

import { Transformer } from './Transformer';

export class AddDateComponentTransformer extends Transformer {
  static get title() {
    return 'Add Date Component';
  }

  static get name() {
    return 'addDateComponent';
  }

  static get arguments() {
    return [
      {
        name: 'Value To Add',
        key: 'valueToAdd',
        required: true,
      },
      {
        name: 'Unit',
        key: 'unit',
        required: true,
      },
    ];
  }

  transform(value, args) {
    const {
      valueToAdd,
      unit,
    } = args;

    return moment(value).add(valueToAdd, unit);
  }
}
