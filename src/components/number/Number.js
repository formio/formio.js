import { maskInput, conformToMask } from 'vanilla-text-mask';
import _ from 'lodash';
import { createNumberMask } from 'text-mask-addons';
import Input from '../_classes/input/Input';
import { getNumberSeparators, getNumberDecimalLimit } from '../../utils/utils';

export default class NumberComponent extends Input {
  static schema(...extend) {
    return Input.schema({
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
      icon: 'hashtag',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#number',
      weight: 30,
      schema: NumberComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    this.validators = this.validators.concat(['min', 'max']);

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
      decimalLimit: _.get(this.component, 'decimalLimit', this.decimalLimit),
      allowNegative: _.get(this.component, 'allowNegative', true),
      allowDecimal: _.get(this.component, 'allowDecimal',
        !(this.component.validate && this.component.validate.integer))
    });
  }

  get defaultSchema() {
    return NumberComponent.schema();
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (!defaultValue && this.component.defaultValue === 0) {
      defaultValue = this.component.defaultValue;
    }
    return defaultValue;
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

  setInputMask(input) {
    input.setAttribute('pattern', '\\d*');

    input.mask = maskInput({
      inputElement: input,
      mask: this.numberMask
    });
  }

  get inputInfo() {
    const info = super.inputInfo;
    if (this.component.mask) {
      info.attr.type = 'password';
    }
    else {
      info.attr.type = 'text';
    }
    info.attr.inputmode = 'numeric';
    info.changeEvent = 'input';
    return info;
  }

  getValueAt(index) {
    if (!this.refs.input.length || !this.refs.input[index]) {
      return null;
    }

    const val = this.refs.input[index].value;
    return val ? this.parseNumber(val) : val;
  }

  parseValue(input) {
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
      return `${value}${_.repeat('0', this.decimalLimit - value.split(this.decimalSeparator)[1].length)}`;
    }

    return value;
  }

  setValueAt(index, value) {
    return super.setValueAt(index, this.formatValue(this.parseValue(value)));
  }

  focus() {
    const input = this.refs.input[0];
    if (input) {
      input.focus();
      input.setSelectionRange(0, input.value.length);
    }
  }

  getMaskedValue(value) {
    return conformToMask(value.toString(), this.numberMask).conformedValue;
  }

  getValueAsString(value) {
    if (!value && value !== 0) {
      return '';
    }
    // TODO: Number's don't have widgets so what does this do?
    const widget = this.widget;
    if (widget && widget.getValueAsString) {
      return widget.getValueAsString(value);
    }

    if (Array.isArray(value)) {
      return value.map(this.getMaskedValue).join(', ');
    }
    return this.getMaskedValue(value);
  }
}
