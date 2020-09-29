import * as dayjs from 'dayjs';

import { Transformer } from './Transformer';

export class SetDateToStartOfComponentTransformer extends Transformer {
  static get title() {
    return 'Set Date To Start of Component';
  }

  static get name() {
    return 'setDateToStartOfComponent';
  }

  static get arguments() {
    return [
      {
        name: 'Unit',
        key: 'unit',
        required: true,
      },
    ];
  }

  transform(value, args) {
    const {
      unit,
    } = args;

    return dayjs(value).startOf(unit);
  }
}
