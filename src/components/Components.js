let _each = require('lodash/each');
let BaseComponent = require('./Base');
class FormioComponents extends BaseComponent {
  build() {
    this.createElement();
    this.addComponents();
  }

  addComponent(component, element, data) {
    let components = require('./index');
    let comp = components.create(component, this._events, data);
    this._components.push(comp);
    element.appendChild(comp._element);
  }

  addComponents(element, data) {
    element = element || this._element;
    data = data || this._data;
    _each(this._component.components, (component) => this.addComponent(component, element, data));
  }

  checkConditions(data) {
    super.checkConditions(data);
    _each(this._components, (comp) => comp.checkConditions(data));
  }

  set disable(disable) {
    _each(this._components, (component) => (component.disable = disable));
  }

  assign(data) {
    _each(this._components, (component) => {
      if (!component._component) {
        return;
      }
      if (!component._component.input && (typeof component.assign === 'function')) {
        component.assign(data);
      }
      else if (component._component.input) {
        data[component._component.key] = component.value;
      }
    });
  }

  getValue() {
    this.assign(this._data);
    return this._data;
  }

  get value() {
    return this.getValue();
  }

  setValue(value) {
    _each(this._components, (component) => {
      if (typeof component.setValue === 'function') {
        component.setValue(value);
      }
      else if (value.hasOwnProperty(component._component.key)) {
        component.value = value[component._component.key];
      }
    });
  }

  set value(value) {
    this.setValue(value);
  }
}

module.exports = FormioComponents;
