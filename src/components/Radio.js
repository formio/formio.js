let BaseComponent = require('./Base');
let _each = require('lodash/each');
class RadioComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.class = '';
    return info;
  }

  createInput(container) {
    let inputGroup = this.ce('div');
    inputGroup.setAttribute('class', 'input-group');
    let inputType = this._component.inputType;
    _each(this._component.values, (value) => {
      let labelWrapper = this.ce('div');
      var wrapperClass = (this._component.inline ? inputType + '-inline' : inputType);
      labelWrapper.setAttribute('class', wrapperClass);
      let label = this.ce('label');
      label.setAttribute('class', 'control-label');

      // Determine the attributes for this input.
      let inputId = this.inputId + '-' + value.value;
      this._info.attr.id = inputId;
      this._info.attr.value = value.value;
      label.setAttribute('for', this._info.attr.id);

      // Create the input.
      let input = this.ce('input');
      _each(this._info.attr, function(value, key) {
        input.setAttribute(key, value);
      });
      this.addInput(input, label, value.value);
      label.appendChild(document.createTextNode(value.label));
      labelWrapper.appendChild(label);
      inputGroup.appendChild(labelWrapper);
    });
    container.appendChild(inputGroup);
  }

  addInputEventListener(input) {
    this.addAnEventListener(input, this._info.changeEvent, () => {
      if (input.value) {
        this.onChange();
      }
    });
  }

  get value() {
    let value = '';
    _each(this._inputs, (input) => {
      if (input.checked) {
        value = input.value;
      }
    });
    return value;
  }

  set value(value) {
    _each(this._inputs, (input) => {
      input.checked = (input.value === value);
    });
  }
}
window.customElements.define('formio-radio', RadioComponent);
module.exports = RadioComponent;
