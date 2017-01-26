let _each = require('lodash/each');
let BaseComponent = require('./Base');
class FormioComponents extends BaseComponent {
  build() {
    this.createElement();
    this.addComponents();
  }

  addComponent(component, element, data) {
    let components = require('./index');
    let comp = components.create(component, this.events, data);
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

  assign(data) {
    _each(this.components, (component) => {
      if (!component.component) {
        return;
      }
      if (!component.component.input && (typeof component.assign === 'function')) {
        component.assign(data);
      }
      else if (component.component.input) {
        data[component.component.key] = component.value;
      }
    });
  }

  getValue() {
    this.assign(this.data);
    return this.data;
  }

  get value() {
    return this.getValue();
  }

  setValue(value) {
    _each(this.components, (component) => {
      if (typeof component.setValue === 'function') {
        component.setValue(value);
      }
      else if (value.hasOwnProperty(component.component.key)) {
        component.value = value[component.component.key];
      }
    });
  }

  set value(value) {
    this.setValue(value);
  }
}

module.exports = FormioComponents;
