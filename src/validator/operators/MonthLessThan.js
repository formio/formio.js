import { DateLessThanOperator } from './DateLessThan';

export class MonthLessThanOperator extends DateLessThanOperator {
  static get name() {
    return 'monthLessThan';
  }

  static get title() {
    return 'Month Less Than';
  }

  static get presetArguments() {
    return {
      granularity: {
        valueSource: 'string',
        stringInput: 'month',
      },
    };
  }
}
