import moment from 'moment';

import { Operator } from './Operator';

export class DateGreaterThanOrEqualOperator extends Operator {
  static get name() {
    return 'dateGreaterThanOrEqual';
  }

  static get title() {
    return 'Date Greater Than Or Equal';
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
    ];
  }

  execute(args) {
    const {
      left,
      right,
    } = args;

    return moment(left).isSameOrAfter(right);
  }
}
