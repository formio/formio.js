import moment from 'moment';

import { Operator } from './Operator';

export class DateGreaterThanOperator extends Operator {
  static get name() {
    return 'dateGreaterThan';
  }

  static get title() {
    return 'Date Greater Than';
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

    return moment(left).isAfter(right);
  }
}
