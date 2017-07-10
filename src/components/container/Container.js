import { FormioComponents } from '../Components';
import _isObject from 'lodash/isObject';
import _each from 'lodash/each';
export class ContainerComponent extends FormioComponents {
  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'container';
  }

  build() {
    this.element = this.ce('div', {
      class: 'formio-container-component ' + this.component.customClass
    });
    if (!this.data[this.component.key]) {
      this.data[this.component.key] = {};
    }
    this.addComponents(this.element, this.data[this.component.key]);
  }

  getValue() {
    let value = {};
    _each(this.components, (component) => {
      value[component.component.key] = component.getValue();
    });
    return value;
  }

  setValue(value, noUpdate, noValidate) {
    if (!value || !_isObject(value)) {
      return;
    }
    this.value = value;
    _each(this.components, (component) => {
      if (component.type === 'components') {
        component.setValue(value, noUpdate, noValidate);
      }
      else if (value.hasOwnProperty(component.component.key)) {
        component.setValue(value[component.component.key], noUpdate, noValidate);
      }
    });
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
  }
}
