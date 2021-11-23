import Input from '../_classes/input/Input';
import { conformToMask } from '@formio/vanilla-text-mask';
import * as FormioUtils from '../../utils/utils';
import NativePromise from 'native-promise-only';

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
      displayMask: '',
      tableView: true,
      spellcheck: true,
      truncateMultipleSpaces: false,
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
      documentation: '/userguide/#textfield',
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

  constructor(component, options, data) {
    super(component, options, data);

    const timezone = (this.component.widget?.timezone || this.options.timezone);

    if (this.component.widget?.type === 'calendar') {
      this.component.widget = {
        ...this.component.widget,
        readOnly: this.options.readOnly,
        timezone,
        locale: this.options.language,
      };
    }
  }

  attach(element) {
    this.loadRefs(element, {
      valueMaskInput: 'single',
    });
    return super.attach(element);
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
      const placeholderChar = this.placeholderChar;
      textInput.value = conformToMask(textValue, FormioUtils.getInputMask(mask), { placeholderChar }).conformedValue;
      maskInput.value = value.maskName;
    }
    else {
      return super.setValueAt(index, textValue, flags);
    }
  }

  unmaskValue(value, format = this.component.displayMask) {
    const mask = FormioUtils.getInputMask(format, this.placeholderChar);

    return FormioUtils.unmaskValue(value, mask, this.placeholderChar);
  }

  /**
   * Returns the value at this index.
   *
   * @param index
   * @return {*}
   */
  getValueAt(index) {
    if (!this.isMultipleMasksField) {
      const value = super.getValueAt(index);
      const valueMask = this.component.inputMask;
      const displayMask = this.component.displayMask;

      // If the input has only the valueMask or the displayMask is the same as the valueMask,
      // just return the value which is already formatted
      if (valueMask && !displayMask || displayMask === valueMask) {
        return value;
      }

      // If there is only the displayMask, return the raw (unmasked) value
      if (displayMask && !valueMask) {
        return this.unmaskValue(value, displayMask);
      }

      if (this.refs.valueMaskInput?.mask) {
        this.refs.valueMaskInput.mask.textMaskInputElement.update(value);
        return this.refs.valueMaskInput?.value;
      }

      return value;
    }
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index]: null;
    return {
      value: textInput ? textInput.value : undefined,
      maskName: maskInput ? maskInput.value : undefined
    };
  }

  isHtmlRenderMode() {
    return super.isHtmlRenderMode() ||
      ((this.options.readOnly || this.disabled) &&
      this.component.inputFormat === 'html' &&
      this.type === 'textfield');
  }

  isEmpty(value = this.dataValue) {
    if (!this.isMultipleMasksField) {
      return super.isEmpty((value || '').toString().trim());
    }
    return super.isEmpty(value) || (this.component.multiple ? value.length === 0 : (!value.maskName || !value.value));
  }

  truncateMultipleSpaces(value) {
    if (value) {
      return value.trim().replace(/\s{2,}/g, ' ');
    }
    return value;
  }

  get validationValue() {
    const value = super.validationValue;
    if (value && this.component.truncateMultipleSpaces) {
      return this.truncateMultipleSpaces(value);
    }
    return value;
  }

  beforeSubmit() {
    let value = this.dataValue;

    if (!this.component.truncateMultipleSpaces || !value) {
      return NativePromise.resolve(value);
    }
    value = this.truncateMultipleSpaces(value);
    this.dataValue = value;
    return NativePromise.resolve(value).then(() => super.beforeSubmit());
  }
}
