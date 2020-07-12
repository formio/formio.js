import { ValueSource } from './ValueSource';

export class EmptyObjectValueSource extends ValueSource {
  static get name() {
    return 'emptyObject';
  }

  static get title() {
    return 'Empty Object';
  }

  static get weight() {
    return 520;
  }

  getValue() {
    return {};
  }
}
