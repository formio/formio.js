import { DateBetweenOperator } from './DateBetween';

export class MinuteBetweenOperator extends DateBetweenOperator {
  static get name() {
    return 'minuteBetween';
  }

  static get title() {
    return 'Minute Between';
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
