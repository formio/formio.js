import { SubtractDateComponentTransformer } from './SubtractDateComponent';

export class SubtractMonthsTransformer extends SubtractDateComponentTransformer {
  static get title() {
    return 'Subtract Months';
  }

  static get name() {
    return 'subtractMonths';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'months',
      },
    };
  }
}
