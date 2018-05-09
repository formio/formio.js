import maskInput from 'vanilla-text-mask';
import {createNumberMask} from 'text-mask-addons';
import _ from 'lodash';
import {getCurrencyAffixes} from '../../utils/utils';
import NumberComponent from '../number/Number';

export default class CurrencyComponent extends NumberComponent {
  static schema(...extend) {
    return NumberComponent.schema({
      type: 'currency',
      label: 'Currency',
      key: 'currency'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Currency',
      group: 'advanced',
      icon: 'fa fa-usd',
      documentation: 'http://help.form.io/userguide/#currency',
      weight: 70,
      schema: CurrencyComponent.schema()
    };
  }

  constructor(component, options, data) {
    // Currency should default to have a delimiter unless otherwise specified.
    if (component && !component.hasOwnProperty('delimiter')) {
      component.delimiter = true;
    }
    super(component, options, data);
    this.decimalLimit = _.get(this.component, 'decimalLimit', 2);
    const affixes = getCurrencyAffixes({
      currency: this.component.currency,
      decimalLimit: this.decimalLimit,
      decimalSeparator: this.decimalSeparator,
      lang: this.options.language,
    });
    this.prefix = affixes.prefix;
    this.suffix = affixes.suffix;
  }

  get defaultSchema() {
    return CurrencyComponent.schema();
  }

  parseNumber(value) {
    // Strip out the prefix and suffix before parsing.
    if (this.prefix) {
      value = value.replace(this.prefix, '');
    }

    if (this.suffix) {
      value = value.replace(this.suffix, '');
    }

    return super.parseNumber(value);
  }

  setInputMask(input) {
    input.mask = maskInput({
      inputElement: input,
      mask: createNumberMask({
        prefix: this.prefix,
        suffix: this.suffix,
        thousandsSeparatorSymbol: _.get(this.component, 'thousandsSeparator', this.delimiter),
        decimalSymbol: _.get(this.component, 'decimalSymbol', this.decimalSeparator),
        decimalLimit: this.decimalLimit,
        allowNegative: _.get(this.component, 'allowNegative', true),
        allowDecimal: _.get(this.component, 'allowDecimal', true)
      })
    });
  }

  clearInput(input) {
    try {
      if (this.prefix) {
        input = input.replace(this.prefix, '');
      }
      if (this.suffix) {
        input = input.replace(this.suffix, '');
      }
    }
    catch (err) {
      // If value doesn't have a replace method, continue on as before.
    }

    return super.clearInput(input);
  }

  formatValue(value) {
    if (this.component.requireDecimals && value && !value.includes(this.decimalSeparator)) {
      return `${value}${this.decimalSeparator}${_.repeat('0', this.decimalLimit)}`;
    }

    return value;
  }
}
