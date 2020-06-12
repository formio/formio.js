import { GetDateComponentTransformer } from './GetDateComponent';

export class GetWeekYearTransformer extends GetDateComponentTransformer {
  static get title() {
    return 'Get Week Year';
  }

  static get name() {
    return 'getWeekYear';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'isoWeekYear',
      },
    };
  }
}
