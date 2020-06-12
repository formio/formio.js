import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';

export class DayGreaterThanOrEqualOperator extends DateGreaterThanOrEqualOperator {
  static get name() {
    return 'dayGreaterThanOrEqual';
  }

  static get title() {
    return 'Day Greater Than Or Equal';
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
