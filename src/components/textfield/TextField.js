import Input from '../_classes/input/Input';
import { conformToMask } from '@formio/vanilla-text-mask';
import Inputmask from 'inputmask';
import FormioUtils from '../../utils';
import _ from 'lodash';

export default class TextFieldComponent extends Input {
  static schema(...extend) {
    return Input.schema(
      {
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
          pattern: '',
        },
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {
      title: 'Text Field',
      icon: 'terminal',
      group: 'basic',
      documentation: '/userguide/form-building/form-components#text-field',
      weight: 0,
      schema: TextFieldComponent.schema(),
    };
  }

  static get serverConditionSettings() {
    return TextFieldComponent.conditionOperatorsSettings;
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      operators: [
        ...super.conditionOperatorsSettings.operators,
        'includes',
        'notIncludes',
        'endsWith',
        'startsWith',
      ],
      valueComponent(classComp) {
        return {
          ...classComp,
          type: 'textfield',
        };
      },
    };
  }

  static savedValueTypes(schema) {
    return (
      FormioUtils.getComponentSavedTypes(schema) || [
        FormioUtils.componentValueTypes.string,
      ]
    );
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
    } else {
      info.attr.type = this.component.inputType === 'password' ? 'password' : 'text';
    }
    info.changeEvent = this.component.applyMaskOn === 'blur' ? 'blur' : 'input';
    return info;
  }

  get emptyValue() {
    return '';
  }

  constructor(component, options, data) {
    super(component, options, data);

    const timezone = this.component.widget?.timezone || this.options.timezone;
    const displayInTimezone = this.component.widget?.displayInTimezone || 'viewer';

    if (this.component.widget?.type === 'calendar') {
      this.component.widget = {
        ...this.component.widget,
        readOnly: this.options.readOnly,
        timezone,
        displayInTimezone,
        locale: this.component.widget.locale || this.options.language,
        saveAs: 'text',
      };
      // update originalComponent to include widget settings after component initialization
      // originalComponent is used to restore the component (and widget) after evaluating field logic
      this.originalComponent = FormioUtils.fastCloneDeep(this.component);
    }
  }

  attach(element) {
    this.loadRefs(element, {
      valueMaskInput: 'single',
    });
    return super.attach(element);
  }

  /**
   * Returns the mask value object (mutates value!).
   * @param {any} [value] - The value to convert to a mask value.
   * @param {any} [flags] - The flags to use when converting to a mask value.
   * @returns {*} - The value as a mask value.
   */
  maskValue(value, flags = {}) {
    // Convert it into the correct format.
    if (!value || typeof value !== 'object') {
      value = {
        value,
        maskName: this.component.inputMasks[0].label,
      };
    }

    // If no value is provided, then set the defaultValue.
    if (!value.value) {
      let defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;
      if (Array.isArray(defaultValue)) {
        defaultValue = defaultValue[0];
      }
      // Extract string if defaultValue is a mask object to prevent nesting
      if (defaultValue && typeof defaultValue === 'object' && defaultValue.hasOwnProperty('value')) {
        defaultValue = defaultValue.value;
      }
      value.value = defaultValue;
    }

    return value;
  }

  /**
   * Normalize the value set in the data object.
   * @param {any} value - The value to normalize.
   * @param {any} flags - The flags to use when normalizing the value.
   * @returns {*} - Returns the normalized value.
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
   * @param {number} index - The index to set the value at.
   * @param {any} value - The value to set.
   * @param {any} [flags] - The flags to use when setting the value.
   * @returns {void}
   */
  setValueAt(index, value, flags = {}) {
    if (!this.isMultipleMasksField) {
      return super.setValueAt(index, value, flags);
    }
    value = this.maskValue(value, flags);
    const textValue = value.value || '';
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index] : null;
    const mask = this.getMaskPattern(value.maskName);
    if (textInput && maskInput && mask) {
      // We need to set the maskInput (select dropdown) value before calling inputmask.setValue because, this
      // function will trigger a "change" event, which was calling updateValue setting the mask type to an incorrect value.
      maskInput.value = value.maskName;
      if (textInput.inputmask) {
        this.setInputMask(textInput, mask);
        textInput.inputmask.setValue(textValue);
      } else {
        const placeholderChar = this.placeholderChar;
        textInput.value = conformToMask(textValue, FormioUtils.getInputMask(mask), {
          placeholderChar,
        }).conformedValue;
      }
    } else {
      return super.setValueAt(index, textValue, flags);
    }
  }

  unmaskValue(value, format = this.component.displayMask) {
    const mask = FormioUtils.getInputMask(format, this.placeholderChar);

    return FormioUtils.unmaskValue(value, mask, this.placeholderChar);
  }

  /**
   * Returns the value at this index.
   * @param {number} index - The index to get the value from.
   * @returns {*} - The value at the index.
   */
  getValueAt(index) {
    if (!this.isMultipleMasksField) {
      const value = super.getValueAt(index);
      const valueMask = this.component.inputMask;
      const displayMask = this.component.displayMask;

      // If the input has only the valueMask or the displayMask is the same as the valueMask,
      // just return the value which is already formatted
      if ((valueMask && !displayMask) || displayMask === valueMask) {
        return value;
      }

      // If there is only the displayMask, return the raw (unmasked) value
      if (displayMask && !valueMask) {
        return this.unmaskValue(value, displayMask);
      }

      if (displayMask && displayMask !== valueMask) {
        return Inputmask.format(Inputmask.unmask(value, displayMask), valueMask);
      }

      if (this.refs.valueMaskInput?.mask && this.refs.valueMaskInput.mask.textMaskInputElement) {
        this.refs.valueMaskInput.mask.textMaskInputElement.update(value);
        return this.refs.valueMaskInput?.value;
      }

      return value;
    }
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index] : null;
    return {
      value: textInput ? textInput.value : undefined,
      maskName: maskInput ? maskInput.value : undefined,
    };
  }
  checkInputMaskValue(inputMask) {
    let valid = true;
    const maskValues = _.values(
      inputMask.split('').reduce((acc, el, i, mask) => {
        if (el === '{' || el === '}') {
          if (mask[i + 1] === '{' || mask[i + 1] === '}') {
            valid = false;
          }
          acc[el] = (acc[el] ?? 0) + 1;
        }
        return acc;
      }, {}),
    );
    if (maskValues[0] !== maskValues[1]) {
      valid = false;
    }
    return valid;
  }

  setInputMask(input, inputMask, usePlaceholder) {
    if (this.type !== 'textfield') {
      super.setInputMask(input, inputMask, usePlaceholder);
      return;
    }

    inputMask = inputMask || this.component.displayMask || this.component.inputMask;
    const mask = FormioUtils.getInputMask(inputMask, this.placeholderChar);
    this.defaultMask = mask;

    if (input && inputMask) {
      try {
        //remove previous mask
        if (input.mask) {
          input.mask.remove();
        }
        if (this.checkInputMaskValue(inputMask)) {
          input.mask = new Inputmask(inputMask, {
            clearMaskOnLostFocus: !!this.component.placeholder,
            showMaskOnHover: !this.component.placeholder,
            placeholder: this.placeholderChar || '',
          }).mask(input);
        }
      } catch (e) {
        console.warn(e);
      }
      if (mask.numeric) {
        input.setAttribute('pattern', '\\d*');
      }

      if (this.component.placeholder) {
        input.setAttribute('placeholder', this.component.placeholder);
      }
    }
  }

  isHtmlRenderMode() {
    return (
      super.isHtmlRenderMode() ||
      ((this.options.readOnly || this.disabled) &&
        this.component.inputFormat === 'html' &&
        this.type === 'textfield')
    );
  }

  isEmpty(value = this.dataValue) {
    if (!this.isMultipleMasksField) {
      return super.isEmpty((value || '').toString().trim());
    }
    return (
      super.isEmpty(value) ||
      (this.component.multiple ? value.length === 0 : !value.maskName || !value.value)
    );
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
      return Promise.resolve(value);
    }
    value = this.truncateMultipleSpaces(value);
    this.dataValue = value;
    return Promise.resolve(value).then(() => super.beforeSubmit());
  }

  getValueAsString(value, options) {
    if (options?.email && this.visible && !this.skipInEmail && _.isObject(value)) {
      const result = `
        <table border="1" style="width:100%">
          <tbody>
          <tr>
            <th style="padding: 5px 10px;">${value.maskName}</th>
            <td style="width:100%;padding:5px 10px;">${value.value}</td>
          </tr>
          </tbody>
        </table>
      `;

      return result;
    }

    if (value && this.component.inputFormat === 'plain' && /<[^<>]+>/g.test(value)) {
      value = value.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    }
    return super.getValueAsString(value, options);
  }
}
