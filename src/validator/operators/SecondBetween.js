import { DateBetweenOperator } from './DateBetween';

export class SecondBetweenOperator extends DateBetweenOperator {
  static get name() {
    return 'secondBetween';
  }

  static get title() {
    return 'Second Between';
  }

  static get presetArguments() {
    return {
      granularity: {
        valueSource: 'string',
        stringInput: 'second',
      },
    };
  }
}
