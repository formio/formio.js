import _ from 'lodash';
import BaseComponent from '../base/Base';

export default class CheckBoxComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'checkbox',
      inputType: 'checkbox',
      label: 'Checkbox',
      key: 'checkbox',
      dataGridLabel: true,
      labelPosition: 'right',
      value: '',
      name: ''
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Checkbox',
      group: 'basic',
      icon: 'fa fa-check-square',
      documentation: 'http://help.form.io/userguide/#checkbox',
      weight: 50,
      schema: CheckBoxComponent.schema()
    };
  }

  get defaultSchema() {
    return CheckBoxComponent.schema();
  }

  get defaultValue() {
    return this.isRadioCheckbox ? '' : (this.component.defaultValue || false).toString() === 'true';
  }

  get hasSetValue() {
    return this.hasValue();
  }

  get isRadioCheckbox() {
    return this.component.inputType === 'radio';
  }

  getRadioGroupItems() {
    if (!this.isRadioCheckbox) {
      return [];
    }

    return this.currentForm ? this.currentForm.getAllComponents().filter(c =>
      c.isRadioCheckbox &&
      c.component.name === this.component.name
    ) : [];
  }

  getRadioGroupValue() {
    if (!this.isRadioCheckbox) {
      return null;
    }

    const selectedRadios = this.getRadioGroupItems().filter(c => c.input.checked);

    return _.get(selectedRadios, '[0].component.value');
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.type = this.component.inputType || 'checkbox';
    info.attr.class = 'form-check-input';
    if (this.component.name) {
      info.attr.name = `data[${this.component.name}][${this.root.id}]`;
    }
    info.attr.value = this.component.value ? this.component.value : 0;
    return info;
  }

  build() {
    // Refresh element info.
    this.info = this.elementInfo();

    if (this.viewOnly) {
      return this.viewOnlyBuild();
    }

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
    this.autofocus();
    this.attachLogic();
  }

  get emptyValue() {
    return false;
  }

  isEmpty(value) {
    return super.isEmpty(value) || value === false;
  }

  createElement() {
    let className = `form-check ${this.className}`;
    if (!this.labelIsHidden()) {
      className += ` ${this.component.inputType || 'checkbox'}`;
    }

    // If the element is already created, don't recreate.
    if (this.element) {
      //update class for case when Logic changed container class (customClass)
      this.element.className = className;
      return this.element;
    }

    this.element = this.ce('div', {
      id: this.id,
      class: className
    });
    this.element.component = this;
  }

  labelOnTheTopOrLeft() {
    return ['top', 'left'].includes(this.component.labelPosition);
  }

  labelOnTheTopOrBottom() {
    return ['top', 'bottom'].includes(this.component.labelPosition);
  }

  setInputLabelStyle(label) {
    if (this.component.labelPosition === 'left') {
      _.assign(label.style, {
        textAlign: 'center',
        paddingLeft: 0,
      });
    }

    if (this.labelOnTheTopOrBottom()) {
      _.assign(label.style, {
        display: 'block',
        textAlign: 'center',
        paddingLeft: 0,
      });
    }
  }

  setInputStyle(input) {
    if (!input) {
      return;
    }
    if (this.component.labelPosition === 'left') {
      _.assign(input.style, {
        position: 'initial',
        marginLeft: '7px'
      });
    }

    if (this.labelOnTheTopOrBottom()) {
      _.assign(input.style, {
        width: '100%',
        position: 'initial',
        marginLeft: 0
      });
    }
  }

  createLabel(container, input) {
    const isLabelHidden = this.labelIsHidden();
    let className = 'control-label form-check-label';
    if (this.component.input
      && !this.options.inputsOnly
      && this.component.validate
      && this.component.validate.required) {
      className += ' field-required';
    }

    this.labelElement = this.ce('label', {
      class: className
    });
    this.addShortcut();

    const labelOnTheTopOrOnTheLeft = this.labelOnTheTopOrLeft();
    if (!isLabelHidden) {
      // Create the SPAN around the textNode for better style hooks
      this.labelSpan = this.ce('span');

      if (this.info.attr.id) {
        this.labelElement.setAttribute('for', this.info.attr.id);
      }
    }
    if (!isLabelHidden && labelOnTheTopOrOnTheLeft) {
      this.setInputLabelStyle(this.labelElement);
      this.setInputStyle(input);
      this.labelSpan.appendChild(this.text(this.component.label));
      this.labelElement.appendChild(this.labelSpan);
    }
    this.addInput(input, this.labelElement);
    if (!isLabelHidden && !labelOnTheTopOrOnTheLeft) {
      this.setInputLabelStyle(this.labelElement);
      this.setInputStyle(input);
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
    let inputId = this.id;
    if (this.options.row) {
      inputId += `-${this.options.row}`;
    }
    inputId += `-${this.root.id}`;
    this.info.attr.id = inputId;
    const input = this.ce(this.info.type, this.info.attr);
    this.errorContainer = container;
    return input;
  }

  set dataValue(value) {
    const setValue = (super.dataValue = value);

    if (this.isRadioCheckbox) {
      _.set(this.data, this.component.key, setValue === this.component.value);

      this.setCheckedState(setValue);
    }

    return setValue;
  }

  get dataValue() {
    const getValue = super.dataValue;
    if (this.isRadioCheckbox) {
      _.set(this.data, this.component.key, getValue === this.component.value);
    }
    return getValue;
  }

  get key() {
    return this.isRadioCheckbox ? this.component.name : super.key;
  }

  getValueAt(index) {
    if (this.isRadioCheckbox) {
      return this.inputs[index].checked ? this.component.value : '';
    }

    return !!this.inputs[index].checked;
  }

  getValue() {
    return super.getValue();
  }

  setCheckedState(value) {
    if (!this.input) {
      return;
    }

    if (this.isRadioCheckbox) {
      this.input.value = (value === this.component.value) ? this.component.value : 0;
      this.input.checked = (value === this.component.value) ? 1 : 0;
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

    return value;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);

    if (this.isRadioCheckbox && !value) {
      return;
    }

    this.setCheckedState(value);
    return this.updateValue(flags, value);
  }

  getView(value) {
    return value ? 'Yes' : 'No';
  }

  destroy() {
    super.destroy();
    this.removeShortcut();
  }

  updateValue(flags, value) {
    if (this.isRadioCheckbox) {
      if (value === undefined && this.input.checked) {
        // Force all siblings elements in radio group to unchecked
        this.getRadioGroupItems()
          .filter(c => c !== this && c.input.checked)
          .forEach(c => c.input.checked = false);

        value = this.component.value;
      }
      else {
        value = this.getRadioGroupValue();
      }
    }
    else if (flags && flags.modified && this.input.checked && value === undefined) {
      value = true;
    }

    const changed = super.updateValue(flags, value);
    if (this.input.checked) {
      this.input.setAttribute('checked', true);
      this.addClass(this.element, 'checkbox-checked');
    }
    else {
      this.input.removeAttribute('checked');
      this.removeClass(this.element, 'checkbox-checked');
    }
    return changed;
  }
}
