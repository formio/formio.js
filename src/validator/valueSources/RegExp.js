import { ValueSource } from './ValueSource';

export class RegExpValueSource extends ValueSource {
  static get name() {
    return 'regExp';
  }

  static get title() {
    return 'RegExp';
  }

  static get weight() {
    return 800;
  }

  static getInputEditForm() {
    return {
      type: 'container',
      input: true,
      components: [
        {
          label: 'RegExp',
          key: 'pattern',
          type: 'textfield',
          input: true,
          validate: {
            required: true,
          },
        },
        {
          label: 'Ignore Case',
          key: 'ignoreCase',
          type: 'checkbox',
          input: true,
        },
      ],
    };
  }

  getValue(input = {}) {
    const {
      pattern = '',
      ignoreCase = false,
    } = input;

    let flags = '';
    if (ignoreCase) {
      flags += 'i';
    }

    return RegExp(pattern, flags);
  }
}
