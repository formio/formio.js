import _ from 'lodash';
import Input from '../_classes/input/Input';

export default class TextFieldComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      label: 'Text Field',
      key: 'textField',
      type: 'textfield',
      mask: false,
      inputType: 'text',
      inputMask: '',
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

  // createInput(container) {
  //   if (!this.isMultipleMasksField) {
  //     return super.createInput(container);
  //   }
  //   //if component should have multiple masks
  //   const id = `${this.key}`;
  //   const attr = this.info.attr;
  //   attr.class += ' formio-multiple-mask-input';
  //   attr.id = id;
  //   const textInput = this.ce('input', attr);
  //
  //   const inputGroup = this.ce('div', {
  //     class: 'input-group formio-multiple-mask-container'
  //   });
  //   this.addPrefix(textInput, inputGroup);
  //   const maskInput = this.createMaskInput(textInput);
  //   this.addTextInputs(textInput, maskInput, inputGroup);
  //   this.addSuffix(textInput, inputGroup);
  //
  //   this.errorContainer = container;
  //   this.setInputStyles(inputGroup);
  //   container.appendChild(inputGroup);
  //   return inputGroup;
  // }

  setValueAt(index, value) {
    if (!this.isMultipleMasksField) {
      return super.setValueAt(index, value);
    }
    const defaultValue = this.defaultValue;
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
    const textValue = value.value || '';
    const textInput = this.refs.input[index] ? this.refs.input[index].text : undefined;
    const maskInput = this.refs.input[index] ? this.refs.input[index].mask : undefined;
    if (textInput && maskInput) {
      maskInput.value = maskName;
      textInput.value = textValue;
      this.updateMask(textInput, maskName);
    }
  }

  getValueAt(index) {
    if (!this.isMultipleMasksField) {
      return super.getValueAt(index);
    }
    const textField = this.refs.input[index];
    return {
      value: textField && textField.text ? textField.text.value : undefined,
      maskName: textField && textField.mask ? textField.mask.value : undefined
    };
  }

  performInputMapping(input) {
    if (!this.isMultipleMasksField) {
      return super.performInputMapping(input);
    }
    return input && input.text ? input.text : input;
  }

  // buildInput(container, value, index) {
  //   if (!this.isMultipleMasksField) {
  //     return super.buildInput(container, value, index);
  //   }
  //   this.createInput(container);
  //   this.setValueAt(index, value);
  // }

  isEmpty(value) {
    if (!this.isMultipleMasksField) {
      return super.isEmpty(value);
    }
    return super.isEmpty(value) || (this.component.multiple ? value.length === 0 : (!value.maskName || !value.value));
  }

  createMaskInput(textInput) {
    const id = `${this.key}-mask`;
    const maskInput = this.ce('select', {
      class: 'form-control formio-multiple-mask-select',
      id
    });
    const self = this;
    const maskOptions = this.maskOptions;
    this.selectOptions(maskInput, 'maskOption', maskOptions);
    // Change the text field mask when another mask is selected.
    maskInput.onchange = function() {
      self.updateMask(textInput, this.value);
    };
    return maskInput;
  }

  // addTextInputs(textInput, maskInput, container) {
  //   if (textInput && maskInput && container) {
  //     const input = {
  //       mask: maskInput,
  //       text: textInput
  //     };
  //   this.refs.input.push(input);
  //     container.appendChild(maskInput);
  //     container.appendChild(textInput);
  //   }
  //   this.hook('input', textInput, container);
  // }
}
