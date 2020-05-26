import { ComponentByPathValueSource } from './ComponentByPath';

export class ComponentRowByPathValueSource extends ComponentByPathValueSource {
  static get name() {
    return 'componentRowByPath';
  }

  static get title() {
    return 'Component Row By Path';
  }

  static get weight() {
    return 120;
  }

  getValue(input) {
    const component = super.getValue(input);
    return Array.isArray(component)
      ? component.map((comp) => comp?.data ?? null)
      : (component?.data ?? null);
  }
}
