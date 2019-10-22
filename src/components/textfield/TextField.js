import _ from 'lodash';
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
      info.attr.type = 'text';
    }
    info.changeEvent = 'input';
    return info;
  }

  get emptyValue() {
    return '';
  }

  setValueAt(index, value, flags) {
    flags = flags || {};
    if (!this.isMultipleMasksField) {
      return super.setValueAt(index, value, flags);
    }
    const defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;
    if (!value) {
      if (defaultValue) {
        value = defaultValue;
      }
      else {
        value = {
          maskName: this.component.inputMasks[0].label
        };
      }
    }
    //if value is a string, treat it as text value itself and use default mask or first mask in the list
    const defaultMaskName = _.get(defaultValue, 'maskName', '');
    if (typeof value === 'string') {
      value = {
        value: value,
        maskName: defaultMaskName ? defaultMaskName : this.component.inputMasks[0].label
      };
    }
    const maskName = value.maskName || '';

    // Ensure we have an active mask.
    if (!this.activeMask && maskName) {
      const inputMask = this.component.inputMasks.find((mask) => mask.label === maskName);
      if (inputMask) {
        this.activeMask = inputMask.mask;
      }
    }

    // Set the text input and mask inputs.
    const textValue = value.value || '';
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index]: null;
    if (textInput && maskInput && this.activeMask) {
      textInput.value = conformToMask(textValue, FormioUtils.getInputMask(this.activeMask)).conformedValue;
      maskInput.value = maskName;
    }
    else {
      return super.setValueAt(index, textValue, flags);
    }
  }

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
