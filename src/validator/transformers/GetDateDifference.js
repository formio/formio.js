import moment from 'moment';

import { Transformer } from './Transformer';

export class GetDateDifferenceTransformer extends Transformer {
  static get title() {
    return 'Get Date Difference';
  }

  static get name() {
    return 'getDateDifference';
  }

  static get arguments() {
    return [
      {
        name: 'Different Date',
        key: 'differentDate',
        required: true,
      },
      {
        name: 'Unit',
        key: 'unit',
        required: true,
      },
    ];
  }

  static get optionsEditForm() {
    return [
      {
        label: 'Precise Result',
        key: 'preciseResult',
        type: 'checkbox',
        input: true,
      },
    ];
  }

  transform(value, args, opts = {}) {
    const {
      differentDate,
      unit,
    } = args;
    const {
      preciseResult = false,
    } = opts;

    return moment(value).diff(differentDate, unit, preciseResult);
  }
}
