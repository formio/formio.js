import { DateEqualsOperator } from './DateEquals';

export class YearEqualsOperator extends DateEqualsOperator {
  static get name() {
    return 'yearEquals';
  }

  static get title() {
    return 'Year Equals';
  }

  static get presetArguments() {
    return {
      granularity: {
        valueSource: 'string',
        stringInput: 'year',
      },
    };
  }
}
