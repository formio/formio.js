import { ComponentByPathValueSource } from './ComponentByPath';

export class ComponentValueByPathValueSource extends ComponentByPathValueSource {
  static get name() {
    return 'componentValueByPath';
  }

  static get title() {
    return 'Component Value By Path';
  }

  static get weight() {
    return 110;
  }

  getValue(input) {
    return super.getValue(input)?.dataValue ?? null;
  }
}
