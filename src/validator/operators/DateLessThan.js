import * as dayjs from 'dayjs';

import { Operator } from './Operator';

export class DateLessThanOperator extends Operator {
  static get name() {
    return 'dateLessThan';
  }

  static get title() {
    return 'Date Less Than';
  }

  static get arguments() {
    return [
      {
        name: 'Left Side',
        key: 'left',
        required: true,
      },
      {
        name: 'Right Side',
        key: 'right',
        required: true,
      },
      {
        name: 'Granularity',
        key: 'granularity',
        required: false,
      },
    ];
  }

  execute(args) {
    const {
      left,
      right,
      granularity = 'millisecond',
    } = args;

    return dayjs(left).isBefore(right, granularity);
  }
}
