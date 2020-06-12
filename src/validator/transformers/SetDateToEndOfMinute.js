import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';

export class SetDateToEndOfMinuteTransformer extends SetDateToEndOfComponentTransformer {
  static get title() {
    return 'Set Date To End of Minute';
  }

  static get name() {
    return 'setDateToEndOfMinute';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'minute',
      },
    };
  }
}
