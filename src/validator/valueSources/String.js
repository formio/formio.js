import { ValueSource } from './ValueSource';

export class StringValueSource extends ValueSource {
  static get name() {
    return 'string';
  }

  static get title() {
    return 'String';
  }

  static get weight() {
    return 200;
  }

  static getInputEditForm() {
    return {
      label: 'String',
      type: 'textfield',
      input: true,
      validate: {
        required: true,
      },
    };
  }

  getValue(input) {
    return String(input);
  }
}
