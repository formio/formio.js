import { ValueSource } from './ValueSource';

export class ItemValueSource extends ValueSource {
  static get name() {
    return 'item';
  }

  static get title() {
    return 'Item';
  }

  static get weight() {
    return 600;
  }

  getValue() {
    return this.getOption('item');
  }
}
