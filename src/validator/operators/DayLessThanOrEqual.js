import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';

export class DayLessThanOrEqualOperator extends DateLessThanOrEqualOperator {
  static get name() {
    return 'dayLessThanOrEqual';
  }

  static get title() {
    return 'Day Less ThanOrEqual';
  }

  static get presetArguments() {
    return {
      granularity: {
        valueSource: 'string',
        stringInput: 'day',
      },
    };
  }
}
