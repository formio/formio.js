import { GetDateComponentTransformer } from './GetDateComponent';

export class GetDayOfWeekTransformer extends GetDateComponentTransformer {
  static get title() {
    return 'Get Day of Week';
  }

  static get name() {
    return 'getDayOfWeek';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'isoWeekday',
      },
    };
  }
}
