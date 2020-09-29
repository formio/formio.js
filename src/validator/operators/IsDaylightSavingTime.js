import * as dayjs from 'dayjs';

import { Operator } from './Operator';

export class IsDaylightSavingTimeOperator extends Operator {
  static get name() {
    return 'isDaylightSavingTime';
  }

  static get title() {
    return 'Is Daylight Saving Time';
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

    // TODO: Implement isDST method as dayjs plugin
    // return dayjs(date).isDST();
    return false;
  }
}
