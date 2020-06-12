import { SubtractDateComponentTransformer } from './SubtractDateComponent';

export class SubtractMillsecondsTransformer extends SubtractDateComponentTransformer {
  static get title() {
    return 'Subtract Millseconds';
  }

  static get name() {
    return 'subtractMillseconds';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'milliseconds',
      },
    };
  }
}
