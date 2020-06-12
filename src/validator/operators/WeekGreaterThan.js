import { DateGreaterThanOperator } from './DateGreaterThan';

export class WeekGreaterThanOperator extends DateGreaterThanOperator {
  static get name() {
    return 'weekGreaterThan';
  }

  static get title() {
    return 'Week Greater Than';
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
