import { SubtractDateComponentTransformer } from './SubtractDateComponent';

export class SubtractQuartersTransformer extends SubtractDateComponentTransformer {
  static get title() {
    return 'Subtract Quarters';
  }

  static get name() {
    return 'subtractQuarters';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'quarters',
      },
    };
  }
}
