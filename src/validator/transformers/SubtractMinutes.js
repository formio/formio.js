import { SubtractDateComponentTransformer } from './SubtractDateComponent';

export class SubtractMinutesTransformer extends SubtractDateComponentTransformer {
  static get title() {
    return 'Subtract Minutes';
  }

  static get name() {
    return 'subtractMinutes';
  }

  static get presetArguments() {
    return {
      unit: {
        valueSource: 'string',
        stringInput: 'minutes',
      },
    };
  }
}
