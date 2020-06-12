import moment from 'moment';

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

    return moment(date).isDST();
  }
}
