import NestedComponent from '../_classes/nested/NestedComponent';
import { getRandomComponentId } from '../../utils/utils';

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
      documentation: '/userguide/forms/layout-components#field-set',
      weight: 20,
      schema: FieldsetComponent.schema()
    };
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

  createComponent(component, options, data, before) {
    component.id =  getRandomComponentId();
    return super.createComponent(component, options, data, before);
  }
}
