import { GetDateComponentTransformer } from './GetDateComponent';

export class GetQuarterTransformer extends GetDateComponentTransformer {
  static get title() {
    return 'Get Quarter';
  }

  static get name() {
    return 'getQuarter';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'quarter',
      },
    };
  }
}
