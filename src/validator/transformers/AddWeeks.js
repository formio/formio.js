import { AddDateComponentTransformer } from './AddDateComponent';

export class AddWeeksTransformer extends AddDateComponentTransformer {
  static get title() {
    return 'Add Weeks';
  }

  static get name() {
    return 'addWeeks';
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
