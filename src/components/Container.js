let FormioComponents = require('./Components');
let _isObject = require('lodash/isObject');
let _each = require('lodash/each');
class ContainerComponent extends FormioComponents {
  build() {
    this._element = this.ce('div');
    this._element.setAttribute('class', 'formio-container-component');
    if (!this._data[this._component.key]) {
      this._data[this._component.key] = {};
    }
    this.addComponents(this._element, this._data[this._component.key]);
  }

  getValue() {
    this.assign(this._data[this._component.key]);
    return this._data[this._component.key];
  }

  setValue(value) {
    if (!value.hasOwnProperty(this._component.key)) {
      return;
    }
    if (!_isObject(value[this._component.key])) {
      return;
    }
    _each(this._components, (component) => {
      if (value.hasOwnProperty(component._component.key)) {
        component.value = value[this._component.key][component._component.key];
      }
    });
  }
}

module.exports = ContainerComponent;
