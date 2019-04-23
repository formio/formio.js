import _ from 'lodash';
import BaseComponent from '../base/Base';

export default class TextFieldComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      label: 'Text Field',
      key: 'textField',
      type: 'textfield',
      mask: false,
      inputType: 'text',
      inputMask: '',
      widget: {
        format: 'yyyy-MM-dd hh:mm a',
        dateFormat: 'yyyy-MM-dd hh:mm a',
        saveAs: 'text'
      },
      validate: {
        minLength: '',
        maxLength: '',
        minWords: '',
        maxWords: '',
        pattern: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Text Field',
      icon: 'fa fa-terminal',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#textfield',
      weight: 0,
      schema: TextFieldComponent.schema()
    };
  }

  get defaultSchema() {
    return TextFieldComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
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

  createInput(container) {
    if (!this.isMultipleMasksField) {
      const inputGroup = super.createInput(container);
      this.addCounter(container);
      return inputGroup;
    }
    //if component should have multiple masks
    const attr = this.info.attr;
    attr.class += ' formio-multiple-mask-input';
    const textInput = this.ce('input', attr);

    const inputGroup = this.ce('div', {
      class: 'input-group formio-multiple-mask-container'
    });
    this.addPrefix(textInput, inputGroup);
    const maskInput = this.createMaskInput(textInput);
    this.addTextInputs(textInput, maskInput, inputGroup);
    this.addSuffix(textInput, inputGroup);

    this.errorContainer = container;
    this.setInputStyles(inputGroup);
    this.addCounter(inputGroup);
    container.appendChild(inputGroup);
    return inputGroup;
  }

  addCounter(container) {
    if (_.get(this.component, 'showWordCount', false)) {
      this.maxWordCount = _.parseInt(_.get(this.component, 'validate.maxWords', 0), 10);
      this.wordCount = this.ce('span', {
        class: 'text-muted pull-right',
        style: 'margin-left: 4px'
      });
      container.appendChild(this.wordCount);
    }
    if (_.get(this.component, 'showCharCount', false)) {
      this.maxCharCount = _.parseInt(_.get(this.component, 'validate.maxLength', 0), 10);
      this.charCount = this.ce('span', {
        class: 'text-muted pull-right'
      });
      container.appendChild(this.charCount);
    }
    return container;
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

  removeTags(value) {
    if (!value) {
      return;
    }

    const removeEditorBlank = function(input) {
      if (typeof input !== 'string') {
        return input;
      }

      return input.replace(/<(.*?)>/g, '');
    };

    if (Array.isArray(value)) {
      value.forEach((input, index) => {
        value[index] = removeEditorBlank(input);
      });
    }
    else {
      value = removeEditorBlank(value);
    }

    return value;
  }

  onChange(flags, fromRoot) {
    super.onChange(flags, fromRoot);
    if (this.wordCount) {
      this.setCounter('words', this.wordCount, this.dataValue.trim().split(/\s+/).length, this.maxWordCount);
    }
    if (this.charCount) {
      const value = this.component.wysiwyg ? this.removeTags(this.dataValue) : this.dataValue;
      this.setCounter('characters', this.charCount, value.length, this.maxCharCount);
    }
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
    const textValue = value.value || '';
    const textInput = this.inputs[index] ? this.inputs[index].text : undefined;
    const maskInput = this.inputs[index] ? this.inputs[index].mask : undefined;
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
    const textField = this.inputs[index];
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

  addTextInputs(textInput, maskInput, container) {
    if (textInput && maskInput && container) {
      const input = {
        mask: maskInput,
        text: textInput
      };
      this.inputs.push(input);
      container.appendChild(maskInput);
      container.appendChild(textInput);
    }
    this.hook('input', textInput, container);
    this.addFocusBlurEvents(textInput);
    this.addInputEventListener(textInput);
    this.addInputSubmitListener(textInput);
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
}
