import { SetDateComponentTransformer } from './SetDateComponent';

export class SetSecondTransformer extends SetDateComponentTransformer {
  static get title() {
    return 'Set Second';
  }

  static get name() {
    return 'setSecond';
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
