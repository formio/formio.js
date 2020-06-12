import { SubtractDateComponentTransformer } from './SubtractDateComponent';

export class SubtractWeeksTransformer extends SubtractDateComponentTransformer {
  static get title() {
    return 'Subtract Weeks';
  }

  static get name() {
    return 'subtractWeeks';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'weeks',
      },
    };
  }
}
