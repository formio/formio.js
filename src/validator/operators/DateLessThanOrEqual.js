import moment from 'moment';

import { Operator } from './Operator';

export class DateLessThanOrEqualOperator extends Operator {
  static get name() {
    return 'dateLessThanOrEqual';
  }

  static get title() {
    return 'Date Less Than Or Equal';
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

    return moment(left).isSameOrBefore(right, granularity);
  }
}
