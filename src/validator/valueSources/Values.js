import { ValueSource } from './ValueSource';

export class ValuesValueSource extends ValueSource {
  static get name() {
    return 'values';
  }

  static get title() {
    return 'Values';
  }

  static get weight() {
    return 650;
  }

  getValue() {
    return this.getOption('values');
  }
}
