import _each from 'lodash/each';
import BaseComponent from './base/Base';
class FormioComponents extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'components';
  }

  build() {
    this.createElement();
    this.addComponents();
  }

  addComponent(component, element, data) {
    let components = require('./index');
    let comp = components.create(component, this.options, data);
    this.components.push(comp);
    element.appendChild(comp.element);
  }

  addComponents(element, data) {
    element = element || this.element;
    data = data || this.data;
    _each(this.component.components, (component) => this.addComponent(component, element, data));
  }

  checkConditions(data) {
    super.checkConditions(data);
    _each(this.components, (comp) => comp.checkConditions(data));
  }

  set disable(disable) {
    _each(this.components, (component) => (component.disable = disable));
  }

  getValue() {
    return this.data;
  }

  setValue(value) {
    _each(this.components, (component) => {
      if (component.type === 'components') {
        component.setValue(value);
      }
      else if (value.hasOwnProperty(component.component.key)) {
        component.setValue(value[component.component.key]);
      }
    });
  }
}

module.exports = FormioComponents;
