import _ from 'lodash';

import {TextFieldComponent} from '../textfield/TextField';
export class PhoneNumberComponent extends TextFieldComponent {
  createInput(container) {
    if (!this.component.allowMultipleMasks || !this.component.inputMasks || !this.component.inputMasks.length) {
      return super.createInput(container);
    }
    //if component should have multiple masks
    const id = `${this.component.key}`;
    const attr = this.info.attr;
    attr.id = id;
    this.phoneNumberInput = this.ce('input', attr);

    const inputGroup = this.ce('div', {
      class: 'input-group'
    });
    this.addPrefix(this.phoneNumberInput, inputGroup);
    this.addMaskInput(inputGroup);
    this.addInput(this.phoneNumberInput, inputGroup);
    this.addSuffix(this.phoneNumberInput, inputGroup);

    //set mask to currently selected in mask dropdown
    this.component.inputMask = this.maskInput.value;
    this.setInputMask(this.phoneNumberInput);

    this.errorContainer = container;
    this.setInputStyles(inputGroup);
    container.appendChild(inputGroup);
    return inputGroup;
  }

  createMaskInput() {
    const id = `${this.component.key}-mask`;
    this.maskInput = this.ce('select', {
      id
    });
    const masks = this.masks;
    const defaultMask = masks && masks[0] ? masks[0].value : undefined;
    this.selectOptions(this.maskInput, 'maskOption', masks, defaultMask);
    const self = this;

    // Change the phonenumber mask when another mask is selected.
    this.maskInput.onchange = function () {
      //destroy previous mask
      if (self.phoneNumberInput.mask) {
        self.phoneNumberInput.mask.destroy();
      }
      //set new phone number field mask
      self.component.inputMask = this.value;
      self.setInputMask(self.phoneNumberInput);
      //update phone number field value after new mask is applied
      self.updateValue();
    };
    return this.maskInput;
  }

  get masks() {
    return _.map(this.component.inputMasks, mask => {
      return {
        label: mask.label,
        value: mask.mask
      }
    });
  }

  addMaskInput(inputGroup) {
    const maskInput = this.createMaskInput();
    const maskAddon = this.ce('div', {
      class: 'input-group-addon'
    });
    maskAddon.appendChild(maskInput);
    inputGroup.appendChild(maskAddon);

    return maskAddon;
  }
}
