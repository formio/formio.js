import { DateEqualsOperator } from './DateEquals';

export class DayEqualsOperator extends DateEqualsOperator {
  static get name() {
    return 'dayEquals';
  }

  static get title() {
    return 'Day Equals';
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
