import { SetDateComponentTransformer } from './SetDateComponent';

export class SetYearTransformer extends SetDateComponentTransformer {
  static get title() {
    return 'Set Year';
  }

  static get name() {
    return 'setYear';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'year',
      },
    };
  }
}
