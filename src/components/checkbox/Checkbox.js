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
    if (!this.labelElement) {
      this.addInput(this.input, this.element);
    }
    this.createDescription(this.element);
    this.restoreValue();
    if (this.shouldDisable) {
      this.disabled = true;
    }
  }

  createElement() {
    let className = this.className;
    if (this.component.label) {
      className += ' checkbox';
    }
    this.element = this.ce('div', {
      id: this.id,
      class: className
    });
  }

  createLabel(container, input) {
    if (!this.component.label) {
      return null;
    }
    this.labelElement = this.ce('label', {
      class: 'control-label'
    });
    this.addShortcut();

    // Create the SPAN around the textNode for better style hooks
    this.labelSpan = this.ce('span');

    if (this.info.attr.id) {
      this.labelElement.setAttribute('for', this.info.attr.id);
    }
    this.addInput(input, this.labelElement);
    if (!this.options.inputsOnly) {
      this.labelSpan.appendChild(this.text(this.addShortcutToLabel()));
      this.labelElement.appendChild(this.labelSpan);
    }
    this.createTooltip(this.labelElement);
    container.appendChild(this.labelElement);
  }

  createInput(container) {
    if (!this.component.input) {
      return;
    }
    let input = this.ce(this.info.type, this.info.attr);
    this.errorContainer = container;
    return input;
  }

  addInputEventListener(input) {
    this.addEventListener(input, this.info.changeEvent, () => {
      // If this input has a "name", then its other input elements are elsewhere on
      // the form. To get the correct submission object, we need to refresh the whole
      // data object.
      if (this.component.name) {
        this.emit('refreshData');
      }
      else {
        this.updateValue();
      }
    });
  }

  getValueAt(index) {
    return !!this.inputs[index].checked;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    this.value = value;
    if (!this.input) {
      return;
    }
    if (value === 'on') {
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
    this.updateValue(flags);
  }

  destroy() {
    super.destroy.apply(this, Array.prototype.slice.apply(arguments));
    this.removeShortcut();
  }
}
