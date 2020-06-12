import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';

export class MinuteLessThanOrEqualOperator extends DateLessThanOrEqualOperator {
  static get name() {
    return 'minuteLessThanOrEqual';
  }

  static get title() {
    return 'Minute Less Than Or Equal';
  }

  static get presetArguments() {
    return {
      granularity: {
        valueSource: 'string',
        stringInput: 'minute',
      },
    };
  }
}
