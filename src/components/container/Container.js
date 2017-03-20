import { FormioComponents } from '../Components';
import _isObject from 'lodash/isObject';
import _each from 'lodash/each';
export class ContainerComponent extends FormioComponents {
  build() {
    this.element = this.ce('element', 'div', {
      class: 'formio-container-component'
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
    _each(this.components, (component) => {
      if (value.hasOwnProperty(component.component.key)) {
        component.setValue(value[component.component.key], noUpdate, noValidate);
      }
    });
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
  }
}
