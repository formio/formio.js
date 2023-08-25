import { createNumberMask } from '@formio/text-mask-addons';
import { conformToMask,maskInput } from '@formio/vanilla-text-mask';
import _ from 'lodash';
import Input from '../_classes/input/Input';
import { getNumberSeparators, getNumberDecimalLimit, componentValueTypes, getComponentSavedTypes } from '../../utils/utils';

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
      documentation: '/userguide/form-building/form-components#number',
      weight: 30,
      schema: NumberComponent.schema()
    };
  }

  static get serverConditionSettings() {
    return NumberComponent.conditionOperatorsSettings;
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      operators: [...super.conditionOperatorsSettings.operators, 'lessThan', 'greaterThan', 'lessThanOrEqual','greaterThanOrEqual'],
      valueComponent(classComp) {
        return { ... classComp, type: 'number' };
      }
    };
  }

  static savedValueTypes(schema) {
    schema = schema || {};
    return getComponentSavedTypes(schema) || [componentValueTypes.number];
  }

 constructor(...args) {
    super(...args);
    this.validators = this.validators.concat(['min', 'max']);

    const separators = getNumberSeparators(this.options.language || navigator.language);

    this.decimalSeparator = this.options.decimalSeparator = this.options.decimalSeparator
      || this.options.properties?.decimalSeparator
      || separators.decimalSeparator;

    if (this.component.delimiter) {
      if (this.options.hasOwnProperty('thousandsSeparator')) {
        console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
      }

      this.delimiter = this.options.properties?.thousandsSeparator || this.options.thousandsSeparator || separators.delimiter;
    }
    else {
      this.delimiter = '';
    }

    const requireDecimal = _.get(this.component, 'requireDecimal', false);
    this.decimalLimit = getNumberDecimalLimit(this.component, requireDecimal ? 2 : 20);

    // Currencies to override BrowserLanguage Config. Object key {}
    if (_.has(this.options, `languageOverride.${this.options.language}`)) {
      const override = _.get(this.options, `languageOverride.${this.options.language}`);
      this.decimalSeparator = override.decimalSeparator;
      this.delimiter = override.delimiter;
    }
    this.numberMask = this.createNumberMask();
  }

  /**
   * Creates the number mask for normal numbers.
   *
   * @return {*}
   */
  createNumberMask() {
    return createNumberMask({
      prefix: '',
      suffix: '',
      requireDecimal: _.get(this.component, 'requireDecimal', false),
      thousandsSeparatorSymbol: _.get(this.component, 'thousandsSeparator', this.delimiter),
      decimalSymbol: _.get(this.component, 'decimalSymbol', this.decimalSeparator),
      decimalLimit: _.get(this.component, 'decimalLimit', this.decimalLimit),
      allowNegative: _.get(this.component, 'allowNegative', true),
      allowDecimal: this.isDecimalAllowed(),
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

    if (!this.component.multiple && _.isArray(defaultValue)) {
      defaultValue = !defaultValue[0] &&  defaultValue[0] !== 0 ? null :  defaultValue[0];
    }
    return defaultValue;
  }

  isDecimalAllowed() {
    return _.get(this.component, 'allowDecimal', !(this.component.validate && this.component.validate.integer));
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
    let numberPattern = '[0-9';
    numberPattern += this.decimalSeparator || '';
    numberPattern += this.delimiter || '';
    numberPattern += ']*';
    input.setAttribute('pattern', numberPattern);
    input.mask = maskInput({
      inputElement: input,
      mask: this.numberMask,
      shadowRoot: this.root ? this.root.shadowRoot : null,
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
    info.attr.inputmode = this.isDecimalAllowed() ? 'decimal' : 'numeric';
    info.changeEvent = 'input';
    return info;
  }

  getValueAt(index) {
    if (!this.refs.input.length || !this.refs.input[index]) {
      return null;
    }

    const val = this.refs.input[index].value;
    return val && val !== '-_' ? this.parseNumber(val) : null;
  }

  setValueAt(index, value, flags = {}) {
    return super.setValueAt(index, this.formatValue(this.parseValue(value)), flags);
  }

  parseValue(input) {
    if (typeof input === 'string') {
      input = input.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
    }
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

  focus() {
    const input = this.refs.input[0];
    if (input) {
      super.focus.call(this);
      input.setSelectionRange(0, input.value.length);
    }
  }

  getMaskedValue(value) {
    value = value === null ? '0' : value.toString();

    if (value.includes('.') && '.'!== this.decimalSeparator) {
      value = value.replace('.', this.decimalSeparator);
    }

    return conformToMask(this.formatValue(value), this.numberMask).conformedValue;
  }

  getValueAsString(value, options) {
    if (!value && value !== 0) {
      return '';
    }
    value = this.getWidgetValueAsString(value, options);
    if (Array.isArray(value)) {
      return value.map((val) => this.getMaskedValue(val)).join(', ');
    }
    return this.getMaskedValue(value);
  }

  addFocusBlurEvents(element) {
    super.addFocusBlurEvents(element);

    this.addEventListener(element, 'blur', () => {
      element.value = this.getValueAsString(this.formatValue(this.parseValue(element.value)));
    });
  }
}
