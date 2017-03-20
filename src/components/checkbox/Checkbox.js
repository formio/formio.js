import { BaseComponent } from '../base/Base';
export class CheckBoxComponent extends BaseComponent {
  elementInfo() {
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
    let className = 'form-group checkbox';
    if (this.component.validate && this.component.validate.required) {
      className += ' required';
    }
    this.element = this.ce('element', 'div', {
      id: this.id,
      class: className
    });
  }

  createLabel(container, input) {
    if (!this.component.label) {
      return null;
    }
    this.label = this.ce('label', 'label', {
      class: 'control-label'
    });
    if (this.info.attr.id) {
      this.label.setAttribute('for', this.info.attr.id);
    }
    this.addInput(input, this.label);
    if (!this.options.inputsOnly) {
      this.label.appendChild(document.createTextNode(this.component.label));
    }
    container.appendChild(this.label);
  }

  createInput(container) {
    if (!this.component.input) {
      return;
    }
    let input = this.ce('input', this.info.type, this.info.attr);
    this.errorContainer = container;
    return input;
  }

  getValueAt(index) {
    return !!this.inputs[index].checked;
  }

  setValue(value, noUpdate, noValidate) {
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
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
  }
}
