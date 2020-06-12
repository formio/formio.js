import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';

export class SetDateToStartOfDayTransformer extends SetDateToStartOfComponentTransformer {
  static get title() {
    return 'Set Date To Start of Day';
  }

  static get name() {
    return 'setDateToStartOfDay';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'day',
      },
    };
  }
}
