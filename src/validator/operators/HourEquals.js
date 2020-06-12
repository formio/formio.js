import { DateEqualsOperator } from './DateEquals';

export class HourEqualsOperator extends DateEqualsOperator {
  static get name() {
    return 'hourEquals';
  }

  static get title() {
    return 'Hour Equals';
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
