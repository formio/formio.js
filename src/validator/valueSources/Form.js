import { ValueSource } from './ValueSource';

export class FormValueSource extends ValueSource {
  static get name() {
    return 'form';
  }

  static get title() {
    return 'Form';
  }

  static get weight() {
    return 300;
  }

  getValue() {
    return this.formInstance;
  }
}
