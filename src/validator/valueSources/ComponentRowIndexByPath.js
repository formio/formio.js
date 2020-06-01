import { ComponentByPathValueSource } from './ComponentByPath';

export class ComponentRowIndexByPathValueSource extends ComponentByPathValueSource {
  static get name() {
    return 'componentRowIndexByPath';
  }

  static get title() {
    return 'Component Row Index By Path';
  }

  static get weight() {
    return 130;
  }

  getValue(input) {
    const component = super.getValue(input);
    return Array.isArray(component)
      ? component.map((comp) => comp?.rowIndex ?? null)
      : (component?.rowIndex ?? null);
  }
}
