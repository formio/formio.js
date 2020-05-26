import { ValueSource } from './ValueSource';

export class StringValueSource extends ValueSource {
  static get name() {
    return 'string';
  }

  static get title() {
    return 'String';
  }

  static get weight() {
    return 400;
  }

  static getInputEditForm() {
    return {
      label: 'String',
      type: 'textfield',
      input: true,
    };
  }

  getValue(input) {
    return String(input);
  }
}
