let BaseComponent = require('./Base');
class CheckBoxComponent extends BaseComponent {
  elementInfo() {
    if (this._component.overlay) {
      this._component.overlay.width = 0;
      this._component.overlay.height = 0;
    }
    let info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.type = this._component.inputType;
    info.attr.class = '';
    if (this._component.name) {
      info.attr.name = 'data[' + this._component.name + ']';
    }
    info.attr.value = this._component.value ? this._component.value : 0;
    return info;
  }

  build() {
    if (!this._component.input) {
      return;
    }
    this.createElement();
    this.input = this.createInput(this._element);
    this.createLabel(this._element, this.input);
    if (!this._label) {
      this.addInput(this.input, this._element);
    }
  }

  createElement() {
    this._element = this.ce('div');
    let className = 'form-group checkbox';
    if (this._component.validate && this._component.validate.required) {
      className += ' required';
    }
    this._element.setAttribute('class', className);
  }

  createLabel(container, input) {
    if (!this._component.label) {
      return null;
    }
    this._label = this.ce('label');
    this._label.setAttribute('class', 'control-label');
    if (this._info.attr.id) {
      this._label.setAttribute('for', this._info.attr.id);
    }
    this._label.appendChild(input);
    this._label.appendChild(document.createTextNode(this._component.label));
    container.appendChild(this._label);
  }

  createInput(container) {
    if (!this._component.input) {
      return;
    }
    let input = this.ce(this._info.type, this._info.attr);
    this.createErrorElement(container);
    return input;
  }

  set value(value) {
    if (this._component.inputType === 'radio') {
      if (value === this.input.value) {
        this.input.checked = 1;
      }
    }
    else {
      if (value === 'on') {
        this.input.value = 1;
        this.input.checked = 1;
        return;
      }
      else if (value) {
        this.input.value = 1;
        this.input.checked = 1;
        return;
      }
      this.input.value = 0;
      this.input.checked = 0;
    }
  }
}

module.exports = CheckBoxComponent;
