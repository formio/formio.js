import { ValueSource } from './ValueSource';

export class EmptyArrayValueSource extends ValueSource {
  static get name() {
    return 'emptyArray';
  }

  static get title() {
    return 'Empty Array';
  }

  static get weight() {
    return 510;
  }

  getValue() {
    return [];
  }
}
