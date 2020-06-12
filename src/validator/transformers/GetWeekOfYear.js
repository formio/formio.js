import { GetDateComponentTransformer } from './GetDateComponent';

export class GetWeekOfYearTransformer extends GetDateComponentTransformer {
  static get title() {
    return 'Get Week of Year';
  }

  static get name() {
    return 'getWeekOfYear';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'isoWeek',
      },
    };
  }
}
