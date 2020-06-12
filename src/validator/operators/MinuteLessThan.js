import { DateLessThanOperator } from './DateLessThan';

export class MinuteLessThanOperator extends DateLessThanOperator {
  static get name() {
    return 'minuteLessThan';
  }

  static get title() {
    return 'Minute Less Than';
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
