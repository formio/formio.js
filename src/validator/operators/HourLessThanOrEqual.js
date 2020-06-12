import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';

export class HourLessThanOrEqualOperator extends DateLessThanOrEqualOperator {
  static get name() {
    return 'hourLessThanOrEqual';
  }

  static get title() {
    return 'Hour Less ThanOrEqual';
  }

  static get presetArguments() {
    return {
      granularity: {
        valueSource: 'string',
        stringInput: 'hour',
      },
    };
  }
}
