import moment from 'moment';

import { Transformer } from './Transformer';

export class GetDateComponentTransformer extends Transformer {
  static get title() {
    return 'Get Date Component';
  }

  static get name() {
    return 'getDateComponent';
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

    return moment(value).get(unit);
  }
}
