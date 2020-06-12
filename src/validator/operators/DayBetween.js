import { DateBetweenOperator } from './DateBetween';

export class DayBetweenOperator extends DateBetweenOperator {
  static get name() {
    return 'dayBetween';
  }

  static get title() {
    return 'Day Between';
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
