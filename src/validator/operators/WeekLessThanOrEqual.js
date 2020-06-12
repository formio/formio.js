import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';

export class WeekLessThanOrEqualOperator extends DateLessThanOrEqualOperator {
  static get name() {
    return 'weekLessThanOrEqual';
  }

  static get title() {
    return 'Week Less Than Or Equal';
  }

  static get presetArguments() {
    return {
      granularity: {
        valueSource: 'string',
        stringInput: 'isoWeek',
      },
    };
  }
}
