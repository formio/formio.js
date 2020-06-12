import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';

export class SetDateToStartOfSecondTransformer extends SetDateToStartOfComponentTransformer {
  static get title() {
    return 'Set Date To Start of Second';
  }

  static get name() {
    return 'setDateToStartOfSecond';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'second',
      },
    };
  }
}
