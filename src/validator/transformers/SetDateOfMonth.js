import { SetDateComponentTransformer } from './SetDateComponent';

export class SetDateOfMonthTransformer extends SetDateComponentTransformer {
  static get title() {
    return 'Set Date of Month';
  }

  static get name() {
    return 'setDateOfMonth';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'date',
      },
    };
  }
}
