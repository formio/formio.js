import maskInput from 'vanilla-text-mask';
import Multivalue from '../multivalue/Multivalue';
import { getInputMask } from '../../../utils/utils';
import _ from 'lodash';

export default class Input extends Multivalue {
  get inputInfo() {
    const attr = {
      name: this.options.name,
      type: this.component.inputType || 'text',
      class: 'form-control',
      lang: this.options.language
    };

    if (this.component.placeholder) {
      attr.placeholder = this.t(this.component.placeholder);
    }

    if (this.component.tabindex) {
      attr.tabindex = this.component.tabindex;
    }

    if (this.shouldDisable) {
      attr.disabled = 'disabled';
    }

    return {
      id: this.key,
      type: 'input',
      changeEvent: 'input',
      content: '',
      attr
    };
  }

  updateMask(textInput, newMaskName) {
    const newMask = this.getMaskByName(newMaskName);
    //destroy previous mask
    if (textInput.mask) {
      textInput.mask.destroy();
    }
    //set new text field mask
    this.setInputMask(textInput, newMask);
    //update text field value after new mask is applied
    this.updateValue();
  }

  get maskOptions() {
    return _.map(this.component.inputMasks, mask => {
      return {
        label: mask.label,
        value: mask.label
      };
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

  /**
   * Sets the input mask for an input.
   * @param {HTMLElement} input - The html input to apply the mask to.
   */
  setInputMask(input) {
    if (input && this.component.inputMask) {
      const mask = getInputMask(this.component.inputMask);
      this._inputMask = mask;
      input.mask = maskInput({
        inputElement: input,
        mask
      });
      if (mask.numeric) {
        input.setAttribute('pattern', '\\d*');
      }
      if (!this.component.placeholder) {
        input.setAttribute('placeholder', this.maskPlaceholder(mask));
      }
    }
  }

  renderElement(value, index) {
    const info = this.inputInfo;
    info.attr = info.attr || {};
    info.attr.value = value;
    return this.renderTemplate('input', {
      input: info,
      index
    });
  }

  attachElement(element, index) {
    this.addEventListener(this.refs.input[index], this.inputInfo.changeEvent, () => this.updateValue());

    if (this.options.submitOnEnter) {
      this.addEventListener(this.refs.input[index], 'keypress', (event) => {
        const key = event.keyCode || event.which;
        if (key === 13) {
          event.preventDefault();
          event.stopPropagation();
          this.emit('submitButton');
        }
      });
    }

    this.setInputMask(this.refs.input[index]);
  }
}
