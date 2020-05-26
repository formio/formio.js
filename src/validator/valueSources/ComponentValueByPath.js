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
    const component = super.getValue(input);
    return Array.isArray(component)
      ? component.map((comp) => comp?.dataValue ?? null)
      : (component?.dataValue ?? null);
  }
}
