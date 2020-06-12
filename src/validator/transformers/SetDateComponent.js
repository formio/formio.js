import moment from 'moment';

import { Transformer } from './Transformer';

export class SetDateComponentTransformer extends Transformer {
  static get title() {
    return 'Set Date Component';
  }

  static get name() {
    return 'setDateComponent';
  }

  static get arguments() {
    return [
      {
        name: 'Value To Set',
        key: 'valueToSet',
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
      valueToSet,
      unit,
    } = args;

    return moment(value).set(unit, valueToSet);
  }
}
