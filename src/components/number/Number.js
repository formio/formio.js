import { maskInput, conformToMask } from 'vanilla-text-mask';
import _ from 'lodash';
import { createNumberMask } from 'text-mask-addons';
import BaseComponent from '../base/Base';
import { getNumberSeparators, getNumberDecimalLimit } from '../../utils/utils';
import * as consts from '../../utils/constants';

export default class NumberComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'number',
      label: 'Number',
      key: 'number',
      validate: {
        min: '',
        max: '',
        step: 'any',
        integer: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Number',
      icon: 'fa fa-hashtag',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#number',
      weight: 10,
      schema: NumberComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.validators = this.validators.concat(['minSafeNum', 'maxSafeNum', 'min', 'max']);

    const separators = getNumberSeparators(this.options.language);

    this.decimalSeparator = this.options.decimalSeparator = this.options.decimalSeparator
      || separators.decimalSeparator;

    if (this.component.delimiter) {
      if (this.options.hasOwnProperty('thousandsSeparator')) {
        console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
      }

      this.delimiter = this.options.thousandsSeparator || separators.delimiter;
    }
    else {
      this.delimiter = '';
    }

    this.decimalLimit = getNumberDecimalLimit(this.component);

    // Currencies to override BrowserLanguage Config. Object key {}
    if (_.has(this.options, `languageOverride.${this.options.language}`)) {
      const override = _.get(this.options, `languageOverride.${this.options.language}`);
      this.decimalSeparator = override.decimalSeparator;
      this.delimiter = override.delimiter;
    }
    this.numberMask = createNumberMask({
      prefix: '',
      suffix: '',
      requireDecimal: _.get(this.component, 'requireDecimal', false),
      thousandsSeparatorSymbol: _.get(this.component, 'thousandsSeparator', this.delimiter),
      decimalSymbol: _.get(this.component, 'decimalSymbol', this.decimalSeparator),
      decimalLimit: Math.min(_.get(this.component, 'decimalLimit', this.decimalLimit), consts.NUM_DECIMAL_LIMIT),
      integerLimit: consts.NUM_INTEGER_LIMIT,
      allowNegative: _.get(this.component, 'allowNegative', true),
      allowDecimal: _.get(this.component, 'allowDecimal',
        !(this.component.validate && this.component.validate.integer))
    });
  }

  get defaultSchema() {
    return NumberComponent.schema();
  }

  parseNumber(value) {
    // Remove delimiters and convert decimal separator to dot.
    value = value.split(this.delimiter).join('').replace(this.decimalSeparator, '.');

    if (this.component.validate && this.component.validate.integer) {
      return parseInt(value, 10);
    }
    else {
      return parseFloat(value);
    }
  }

  applyBondary(value) {
    let result = value;
    result = Math.min(consts.MAX_SAFE_NUM, result);
    result = Math.max(consts.MIN_SAFE_NUM, result);
    return result;
  }

  setInputMask(input) {
    input.setAttribute('pattern', '\\d*');

    input.mask = maskInput({
      inputElement: input,
      mask: this.numberMask
    });
  }

  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = 'text';
    info.attr.inputmode = 'numeric';
    info.changeEvent = 'input';
    return info;
  }

  getValueAt(index) {
    if (!this.inputs.length || !this.inputs[index]) {
      return null;
    }

    const input = this.inputs[index];
    const val = input.value;

    if (!val) {
      return undefined;
    }

    const current = this.parseNumber(val);
    const limited = this.applyBondary(current);

    if (current === limited) {
      return current;
    }
    else {
      if (input.mask) {
        input.mask.textMaskInputElement.update(limited);
      }
      return limited;
    }
  }

  clearInput(input) {
    let value = parseFloat(input);

    if (!_.isNaN(value)) {
      value = String(value).replace('.', this.decimalSeparator);
    }
    else {
      value = null;
    }

    return value;
  }

  formatValue(value) {
    if (this.component.requireDecimal && value && !value.includes(this.decimalSeparator)) {
      return `${value}${this.decimalSeparator}${_.repeat('0', this.decimalLimit)}`;
    }
    else if (this.component.requireDecimal && value && value.includes(this.decimalSeparator)) {
      return `${value}${_.repeat('0', this.decimalLimit - value.split(this.decimalSeparator)[1].length)})}`;
    }

    return value;
  }

  setValueAt(index, value) {
    let data = value;

    if (!_.isNull(data)) {
      data = this.clearInput(data);
      data = this.formatValue(data);
    }

    return super.setValueAt(index, data);
  }

  focus() {
    const input = this.inputs[0];
    if (input) {
      input.focus();
      input.setSelectionRange(0, input.value.length);
    }
  }

  getMaskedValue(value) {
    return conformToMask(value.toString(), this.numberMask).conformedValue;
  }

  /** @override **/
  createInput(...args) {
    const input = super.createInput(...args);

    if (this.component.requireDecimal) {
      this.addEventListener(input, 'blur', () => {
        const index = this.inputs.indexOf(input);

        if (index !== -1) {
          this.setValueAt(index, this.getValueAt(index));
        }
      });
    }

    return input;
  }

  getView(value) {
    if (!value && value !== 0) {
      return '';
    }
    const widget = this.widget;
    if (widget && widget.getView) {
      return widget.getView(value);
    }

    if (Array.isArray(value)) {
      return value.map(this.getMaskedValue).join(', ');
    }
    return this.getMaskedValue(value);
  }
}
