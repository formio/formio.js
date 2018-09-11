import maskInput from 'vanilla-text-mask';
import Multivalue from '../multivalue/Multivalue';
import { getInputMask } from '../../../utils/utils';
import _ from 'lodash';

export default class Input extends Multivalue {
  constructor(component, options, data) {
    super(component, options, data);
    this.triggerUpdateValueAt = _.debounce(this.updateValueAt.bind(this), 100);
  }

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

  get hasCounter() {
    if (
      _.get(this.component, 'showWordCount', false) ||
      _.get(this.component, 'showCharCount', false)
    ) {
      return true;
    }
    return false;
  }

  get remainingWords() {
    const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords'), 10);
    const wordCount = this.dataValue.trim().split(/\s+/).length;
    return maxWords - wordCount;
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

  setCounter(type, element, count, max) {
    if (max) {
      const remaining = max - count;
      if (remaining > 0) {
        this.removeClass(element, 'text-danger');
      }
      else {
        this.addClass(element, 'text-danger');
      }
      element.innerHTML = this.t(`{{ remaining }} ${type} remaining.`, {
        remaining: remaining
      });
    }
    else {
      element.innerHTML = this.t(`{{ count }} ${type}`, {
        count: count
      });
    }
  }

  updateValueAt(flags, value, index) {
    if (this.refs.counter && this.refs.counter[index]) {
      if (_.get(this.component, 'showWordCount', false)) {
        const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords', 0), 10);
        if (maxWords) {
          this.setCounter('words', this.refs.counter[index], value.trim().split(/\s+/).length, maxWords);
        }
      }
      if (_.get(this.component, 'showCharCount', false)) {
        const maxChars = _.parseInt(_.get(this.component, 'validate.maxLength', 0), 10);
        if (maxChars) {
          this.setCounter('characters', this.refs.counter[index], value.length, maxChars);
        }
      }
    }
  }

  updateValue(flags, value, index) {
    flags = flags || {};
    value = value || this.dataValue;
    index = index || 0;
    this.triggerUpdateValueAt(flags, value, index);
    return super.updateValue(flags, value);
  }

  attach(element) {
    const ret = super.attach(element);
    this.loadRefs(element, {
      counter: 'multiple'
    });
    return ret;
  }

  attachElement(element, index) {
    this.addEventListener(element, this.inputInfo.changeEvent, () => {
      return this.updateValue(null, element.value, index);
    });

    if (this.options.submitOnEnter) {
      this.addEventListener(element, 'keypress', (event) => {
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
