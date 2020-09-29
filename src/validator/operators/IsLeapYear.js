import * as dayjs from 'dayjs';

import { Operator } from './Operator';

export class IsLeapYearOperator extends Operator {
  static get name() {
    return 'isLeapYear';
  }

  static get title() {
    return 'Is Leap Year';
  }

  static get hasComplementaryOperator() {
    return true;
  }

  static get arguments() {
    return [
      {
        name: 'Date',
        key: 'date',
        required: true,
      },
    ];
  }

  execute(args) {
    const {
      date,
    } = args;

    return dayjs(date).isLeapYear();
  }
}
