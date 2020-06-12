import { DateGreaterThanOperator } from './DateGreaterThan';

export class HourGreaterThanOperator extends DateGreaterThanOperator {
  static get name() {
    return 'hourGreaterThan';
  }

  static get title() {
    return 'Hour Greater Than';
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
