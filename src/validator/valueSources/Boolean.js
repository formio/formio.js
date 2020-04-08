import { ValueSource } from './ValueSource';

export class BooleanValueSource extends ValueSource {
  static get name() {
    return 'boolean';
  }

  static get title() {
    return 'Boolean';
  }

  static get weight() {
    return 400;
  }

  static getInputEditForm() {
    return {
      label: 'Boolean',
      type: 'select',
      input: true,
      data: {
        values: [
          {
            label: 'True',
            value: true,
          },
          {
            label: 'False',
            value: false,
          },
        ],
      },
      dataType: 'boolean',
      validate: {
        required: true,
      },
    };
  }

  getValue(input) {
    return Boolean(input);
  }
}
