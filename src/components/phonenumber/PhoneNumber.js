import _ from 'lodash';
import maskInput from 'vanilla-text-mask';

import FormioUtils from '../../utils';

import {TextFieldComponent} from '../textfield/TextField';
export class PhoneNumberComponent extends TextFieldComponent {
  createInput(container) {
    if (!this.isMultipleMasksField) {
      return super.createInput(container);
    }
    //if component should have multiple masks
    const id = `${this.component.key}`;
    const attr = this.info.attr;
    attr.class += ' formio-multiple-mask-input';
    attr.id = id;
    const phoneNumberInput = this.ce('input', attr);

    const inputGroup = this.ce('div', {
      class: 'input-group formio-multiple-mask-container'
    });
    this.addPrefix(phoneNumberInput, inputGroup);
    const maskInput = this.createMaskInput(phoneNumberInput);
    this.addPhoneInputs(phoneNumberInput, maskInput, inputGroup);
    this.addSuffix(phoneNumberInput, inputGroup);

    this.errorContainer = container;
    this.setInputStyles(inputGroup);
    container.appendChild(inputGroup);
    return inputGroup;
  }

  setInputMask(input, inputMask) {
    if (!this.isMultipleMasksField) {
      return super.setInputMask(input);
    }
    if (input && inputMask) {
      const mask = FormioUtils.getInputMask(inputMask);
      input.mask = maskInput({
        inputElement: input,
        mask
      });
      if (!this.component.placeholder) {
        input.setAttribute('placeholder', this.maskPlaceholder(mask));
      }
    }
  }

  setValueAt(index, value) {
    if (!this.isMultipleMasksField) {
      return super.setValueAt(index, value);
    }
    if (!value) {
      if (this.defaultValue) {
        value = this.defaultValue;
      } else {
        value = {
          maskName: this.component.inputMasks[0].label
        };
      }
    }
    //if value is a string, treat it as phone number and use default mask or first mask in the list
    if (typeof value === "string") {
      value = {
        value: value,
        maskName: this.defaultValue && this.defaultValue.maskName ? this.defaultValue.maskName : this.component.inputMasks[0].label
      };
    }
    const maskName = value.maskName || "";
    const phoneValue = value.value || "";
    const phoneInput = this.inputs[index] ? this.inputs[index].phone : undefined;
    const maskInput = this.inputs[index] ? this.inputs[index].mask : undefined;
    if (phoneInput && maskInput) {
      maskInput.value = maskName;
      phoneInput.value = phoneValue;
      this.updateMask(phoneInput, maskName);
    }
  }

  getValueAt(index) {
    if (!this.isMultipleMasksField) {
      return super.getValueAt(index);
    }
    const phoneField = this.inputs[index];
    return {
      value: phoneField && phoneField.phone ? phoneField.phone.value : undefined,
      maskName: phoneField && phoneField.mask ? phoneField.mask.value : undefined
    };
  }

  performInputMapping(input) {
    if (!this.isMultipleMasksField) {
      return super.performInputMapping(input);
    }
    return input ? input.phone : undefined;
  }

  buildInput(container, value, index) {
    if (!this.isMultipleMasksField) {
      return super.buildInput(container, value, index);
    }
    this.createInput(container);
    this.setValueAt(index, value);
  }

  isEmpty(value) {
    if (!this.isMultipleMasksField) {
      return super.isEmpty(value);
    }
    return this.component.multiple ? value.length === 0 : (!value.maskName || !value.value);
  }

  createMaskInput(phoneNumberInput) {
    const id = `${this.component.key}-mask`;
    const maskInput = this.ce('select', {
      class: 'form-control formio-multiple-mask-select',
      id
    });
    const self = this;
    const maskOptions = this.maskOptions;
    this.selectOptions(maskInput, 'maskOption', maskOptions);
    // Change the phonenumber mask when another mask is selected.
    maskInput.onchange = function () {
      self.updateMask(phoneNumberInput, this.value);
    };
    return maskInput;
  }

  addPhoneInputs(phoneInput, maskInput, container) {
    if (phoneInput && maskInput && container) {
      let input = {
        mask: maskInput,
        phone: phoneInput
      };
      this.inputs.push(input);
      container.appendChild(maskInput);
      container.appendChild(phoneInput);
    }
    this.hook('input', phoneInput, container);
    this.addInputEventListener(phoneInput);
    this.addInputSubmitListener(phoneInput);
  }

  updateMask(phoneNumberInput, newMaskName) {
    const newMask = this.getMaskByName(newMaskName);
    //destroy previous mask
    if (phoneNumberInput.mask) {
      phoneNumberInput.mask.destroy();
    }
    //set new phone number field mask
    this.setInputMask(phoneNumberInput, newMask);
    //update phone number field value after new mask is applied
    this.updateValue();
  }

  get maskOptions() {
    return _.map(this.component.inputMasks, mask => {
      return {
        label: mask.label,
        value: mask.label
      }
    });
  }

  get isMultipleMasksField() {
    return this.component.allowMultipleMasks && !!this.component.inputMasks && !!this.component.inputMasks.length;
  }

  getMaskByName(maskName) {
    const inputMask = _.find(this.component.inputMasks, (inputMask) => {
      return inputMask.label === maskName;
    });
    return inputMask ? inputMask.mask : undefined;
  }
}
