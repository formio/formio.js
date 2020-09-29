import * as dayjs from 'dayjs';

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

    return dayjs(value).set(unit, valueToSet);
  }
}
