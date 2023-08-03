import NestedComponent from '../_classes/nested/NestedComponent';

export default class FieldsetComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Field Set',
      key: 'fieldSet',
      type: 'fieldset',
      legend: '',
      components: [],
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Field Set',
      icon: 'th-large',
      group: 'layout',
      documentation: '/userguide/form-building/layout-components#field-set',
      showPreview: false,
      weight: 20,
      schema: FieldsetComponent.schema()
    };
  }

  static savedValueTypes() {
    return [];
  }

  get defaultSchema() {
    return FieldsetComponent.schema();
  }

  get className() {
    return `${this.transform('class', 'form-group')} ${super.className}`;
  }

  get templateName() {
    return 'fieldset';
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
  }
}
