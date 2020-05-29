import Input from '../_classes/input/Input';
import { conformToMask } from 'vanilla-text-mask';
import * as FormioUtils from '../../utils/utils';

export default class TextFieldComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      label: 'Text Field',
      key: 'textField',
      type: 'textfield',
      mask: false,
      inputType: 'text',
      inputFormat: 'plain',
      inputMask: '',
      tableView: true,
      spellcheck: true,
      validate: {
        minLength: '',
        maxLength: '',
        pattern: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Text Field',
      icon: 'terminal',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#textfield',
      weight: 0,
      schema: TextFieldComponent.schema()
    };
  }

  get defaultSchema() {
    return TextFieldComponent.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.type = 'input';

    if (this.component.hasOwnProperty('spellcheck')) {
      info.attr.spellcheck = this.component.spellcheck;
    }

    if (this.component.mask) {
      info.attr.type = 'password';
    }
    else {
      info.attr.type = (this.component.inputType === 'password') ? 'password' : 'text';
    }
    info.changeEvent = 'input';
    return info;
  }

  get emptyValue() {
    return '';
  }

  /**
   * Returns the mask value object.
   *
   * @param value
   * @param flags
   * @return {*}
   */
  maskValue(value, flags = {}) {
    // Convert it into the correct format.
    if (!value || (typeof value !== 'object')) {
      value = {
        value,
        maskName: this.component.inputMasks[0].label
      };
    }

    // If no value is provided, then set the defaultValue.
    if (!value.value) {
      const defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;
      value.value = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
    }

    return value;
  }

  /**
   * Normalize the value set in the data object.
   *
   * @param value
   * @param flags
   * @return {*}
   */
  normalizeValue(value, flags = {}) {
    if (!this.isMultipleMasksField) {
      return super.normalizeValue(value);
    }
    if (Array.isArray(value)) {
      return super.normalizeValue(value.map((val) => this.maskValue(val, flags)));
    }
    return super.normalizeValue(this.maskValue(value, flags));
  }

  /**
   * Sets the value at this index.
   *
   * @param index
   * @param value
   * @param flags
   */
  setValueAt(index, value, flags = {}) {
    if (!this.isMultipleMasksField) {
      return super.setValueAt(index, value, flags);
    }
    value = this.maskValue(value, flags);
    const textValue = value.value || '';
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index]: null;
    const mask = this.getMaskPattern(value.maskName);
    if (textInput && maskInput && mask) {
      textInput.value = conformToMask(textValue, FormioUtils.getInputMask(mask)).conformedValue;
      maskInput.value = value.maskName;
    }
    else {
      return super.setValueAt(index, textValue, flags);
    }
  }

  /**
   * Returns the value at this index.
   *
   * @param index
   * @return {*}
   */
  getValueAt(index) {
    if (!this.isMultipleMasksField) {
      return super.getValueAt(index);
    }
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index]: null;
    return {
      value: textInput ? textInput.value : undefined,
      maskName: maskInput ? maskInput.value : undefined
    };
  }

  isEmpty(value = this.dataValue) {
    if (!this.isMultipleMasksField) {
      return super.isEmpty((value || '').toString().trim());
    }
    return super.isEmpty(value) || (this.component.multiple ? value.length === 0 : (!value.maskName || !value.value));
  }
}
