import { SubtractDateComponentTransformer } from './SubtractDateComponent';

export class SubtractDaysTransformer extends SubtractDateComponentTransformer {
  static get title() {
    return 'Subtract Days';
  }

  static get name() {
    return 'subtractDays';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'days',
      },
    };
  }
}
