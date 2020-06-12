import { AddDateComponentTransformer } from './AddDateComponent';

export class AddMonthsTransformer extends AddDateComponentTransformer {
  static get title() {
    return 'Add Months';
  }

  static get name() {
    return 'addMonths';
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
