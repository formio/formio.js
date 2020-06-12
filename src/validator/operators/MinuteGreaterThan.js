import { DateGreaterThanOperator } from './DateGreaterThan';

export class MinuteGreaterThanOperator extends DateGreaterThanOperator {
  static get name() {
    return 'minuteGreaterThan';
  }

  static get title() {
    return 'Minute Greater Than';
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
