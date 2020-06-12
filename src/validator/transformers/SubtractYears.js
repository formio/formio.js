import { SubtractDateComponentTransformer } from './SubtractDateComponent';

export class SubtractYearsTransformer extends SubtractDateComponentTransformer {
  static get title() {
    return 'Subtract Years';
  }

  static get name() {
    return 'subtractYears';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'years',
      },
    };
  }
}
