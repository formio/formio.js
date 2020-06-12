import { AddDateComponentTransformer } from './AddDateComponent';

export class AddMillsecondsTransformer extends AddDateComponentTransformer {
  static get title() {
    return 'Add Millseconds';
  }

  static get name() {
    return 'addMillseconds';
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
