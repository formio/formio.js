import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';

export class SetDateToEndOfSecondTransformer extends SetDateToEndOfComponentTransformer {
  static get title() {
    return 'Set Date To End of Second';
  }

  static get name() {
    return 'setDateToEndOfSecond';
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
