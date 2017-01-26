let FormioComponents = require('./Components');
let _isObject = require('lodash/isObject');
let _each = require('lodash/each');
class ContainerComponent extends FormioComponents {
  build() {
    this.element = this.ce('div');
    this.element.setAttribute('class', 'formio-container-component');
    if (!this.data[this.component.key]) {
      this.data[this.component.key] = {};
    }
    this.addComponents(this.element, this.data[this.component.key]);
  }

  getValue() {
    this.assign(this.data[this.component.key]);
    return this.data[this.component.key];
  }

  setValue(value) {
    if (!value.hasOwnProperty(this.component.key)) {
      return;
    }
    if (!_isObject(value[this.component.key])) {
      return;
    }
    _each(this.components, (component) => {
      if (value.hasOwnProperty(component.component.key)) {
        component.value = value[this.component.key][component.component.key];
      }
    });
  }
}

module.exports = ContainerComponent;
