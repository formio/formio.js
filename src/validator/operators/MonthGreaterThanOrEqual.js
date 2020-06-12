import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';

export class MonthGreaterThanOrEqualOperator extends DateGreaterThanOrEqualOperator {
  static get name() {
    return 'monthGreaterThanOrEqual';
  }

  static get title() {
    return 'Month Greater Than Or Equal';
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
