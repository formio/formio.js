import BaseComponent from '../base/Base';
class CheckBoxComponent extends BaseComponent {
  elementInfo() {
    if (this.component.overlay) {
      this.component.overlay.width = 0;
      this.component.overlay.height = 0;
    }
    let info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.type = this.component.inputType;
    info.attr.class = '';
    if (this.component.name) {
      info.attr.name = 'data[' + this.component.name + ']';
    }
    info.attr.value = this.component.value ? this.component.value : 0;
    return info;
  }

  build() {
    if (!this.component.input) {
      return;
    }
    this.createElement();
    this.input = this.createInput(this.element);
    this.createLabel(this.element, this.input);
    if (!this.label) {
      this.addInput(this.input, this.element);
    }
  }

  createElement() {
    this.element = this.ce('div');
    let className = 'form-group checkbox';
    if (this.component.validate && this.component.validate.required) {
      className += ' required';
    }
    this.element.setAttribute('class', className);
  }

  createLabel(container, input) {
    if (!this.component.label) {
      return null;
    }
    this.label = this.ce('label');
    this.label.setAttribute('class', 'control-label');
    if (this.info.attr.id) {
      this.label.setAttribute('for', this.info.attr.id);
    }
    this.addInput(input, this.label);
    this.label.appendChild(document.createTextNode(this.component.label));
    container.appendChild(this.label);
  }

  createInput(container) {
    if (!this.component.input) {
      return;
    }
    let input = this.ce(this.info.type, this.info.attr);
    this.createErrorElement(container);
    return input;
  }

  getValueAt(index) {
    return parseInt(super.getValueAt(index), 10);
  }

  setValue(value) {
    if (this.component.inputType === 'radio') {
      this.input.checked = (value === this.input.value) ? 1 : 0;
    }
    else if (value === 'on') {
      this.input.value = 1;
      this.input.checked = 1;
    }
    else if (value === 'off') {
      this.input.value = 0;
      this.input.checked = 0;
    }
    else if (value) {
      this.input.value = 1;
      this.input.checked = 1;
    }
    else {
      this.input.value = 0;
      this.input.checked = 0;
    }
    this.updateValue();
  }
}

module.exports = CheckBoxComponent;
