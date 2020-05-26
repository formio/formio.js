import { FormValueSource } from './Form';

export class FormDataValueSource extends FormValueSource {
  static get name() {
    return 'formData';
  }

  static get title() {
    return 'Form Data';
  }

  static get weight() {
    return 310;
  }

  getValue() {
    return super.getValue()?.data ?? null;
  }
}
