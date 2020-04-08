import { ValueSource } from './ValueSource';

export class ThisComponentValueSource extends ValueSource {
  static get name() {
    return 'thisComponent';
  }

  static get title() {
    return 'This Component';
  }

  static get weight() {
    return 0;
  }

  getValue() {
    const { componentInstance } = this.options;

    if (!componentInstance) {
      throw new Error('`componentInstance` is not defined.');
    }

    return componentInstance;
  }
}
