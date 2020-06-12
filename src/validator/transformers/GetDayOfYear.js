import { GetDateComponentTransformer } from './GetDateComponent';

export class GetDayOfYearTransformer extends GetDateComponentTransformer {
  static get title() {
    return 'Get Day of Year';
  }

  static get name() {
    return 'getDayOfYear';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'dayOfYear',
      },
    };
  }
}
