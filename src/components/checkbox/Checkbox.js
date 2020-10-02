import Field from '../_classes/field/Field';

export default class CheckBoxComponent extends Field {
  static schema(...extend) {
    return Field.schema({
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
      icon: 'check-square',
      documentation: 'http://help.form.io/userguide/#checkbox',
      weight: 50,
      schema: CheckBoxComponent.schema()
    };
  }

  get defaultSchema() {
    return CheckBoxComponent.schema();
  }

  get defaultValue() {
    const { name } = this.component;

    return name ? (this.component[name] || this.emptyValue) : (this.component.defaultValue || false).toString() === 'true';
  }

  get labelClass() {
    let className = '';
    if (this.isInputComponent
      && !this.options.inputsOnly
      && this.component.validate
      && this.component.validate.required) {
      className += ' field-required';
    }
    return `${className}`;
  }

  get hasSetValue() {
    return this.hasValue();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.type = this.component.inputType || 'checkbox';
    info.attr.class = 'form-check-input';
    if (this.component.name) {
      info.attr.name = `data[${this.component.name}]`;
    }
    info.attr.value = this.component.value ? this.component.value : 0;
    info.label = this.t(this.component.label);
    info.labelClass = this.labelClass;
    return info;
  }

  get labelInfo() {
    return {
      hidden: true
    };
  }

  render() {
    return super.render(this.renderTemplate('checkbox', {
      input: this.inputInfo,
      checked: this.checked,
      tooltip: this.interpolate(this.t(this.component.tooltip) || '').replace(/(?:\r\n|\r|\n)/g, '<br />')
    }));
  }

  attach(element) {
    this.loadRefs(element, { input: 'multiple' });
    this.input = this.refs.input[0];
    if (this.refs.input) {
      this.addEventListener(this.input, this.inputInfo.changeEvent, () => this.updateValue(null, {
        modified: true
      }));
      this.addShortcut(this.input);
    }
    return super.attach(element);
  }

  detach(element) {
    if (element && this.input) {
      this.removeShortcut(this.input);
    }
    super.detach();
  }

  get emptyValue() {
    return this.component.inputType === 'radio' ? null : false;
  }

  isEmpty(value = this.dataValue) {
    return super.isEmpty(value) || value === false;
  }

  get key() {
    return this.component.name ? this.component.name : super.key;
  }

  getValueAt(index) {
    if (this.component.name) {
      return this.refs.input[index].checked ? this.component.value : '';
    }
    return !!this.refs.input[index].checked;
  }

  getValue() {
    const value = super.getValue();
    if (this.component.name) {
      return value ? this.setCheckedState(value) : this.setCheckedState(this.dataValue);
    }
    else {
      return (value === '') ? this.dataValue : !!value;
    }
  }

  get checked() {
    if (this.component.name) {
      return (this.dataValue === this.component.value);
    }
    return !!this.dataValue;
  }

  setCheckedState(value) {
    if (!this.input) {
      return;
    }
    if (this.component.name) {
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
    if (this.input.checked) {
      this.input.setAttribute('checked', true);
    }
    else {
      this.input.removeAttribute('checked');
    }
    return value;
  }

  setValue(value, flags = {}) {
    if (
      this.setCheckedState(value) !== undefined ||
      (!this.input && value !== undefined && (this.visible || !this.component.clearOnHide))
    ) {
      return this.updateValue(value, flags);
    }
    return false;
  }

  getValueAsString(value) {
    return value ? 'Yes' : 'No';
  }
}
