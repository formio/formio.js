import { createNumberMask } from 'text-mask-addons';
import _ from 'lodash';
import { getCurrencyAffixes } from '../../utils/utils';
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
      icon: 'usd',
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
  }

  /**
   * Creates the number mask for currency numbers.
   *
   * @return {*}
   */
  createNumberMask() {
    const decimalLimit = _.get(this.component, 'decimalLimit', 2);
    const affixes = getCurrencyAffixes({
      currency: this.component.currency,
      decimalLimit: decimalLimit,
      decimalSeparator: this.decimalSeparator,
      lang: this.options.language
    });
    this.prefix = this.options.prefix || affixes.prefix;
    this.suffix = this.options.suffix || affixes.suffix;
    return createNumberMask({
      prefix: this.prefix,
      suffix: this.suffix,
      thousandsSeparatorSymbol: _.get(this.component, 'thousandsSeparator', this.delimiter),
      decimalSymbol: _.get(this.component, 'decimalSymbol', this.decimalSeparator),
      decimalLimit: decimalLimit,
      allowNegative: _.get(this.component, 'allowNegative', true),
      allowDecimal: _.get(this.component, 'allowDecimal', true)
    });
  }

  get defaultSchema() {
    return CurrencyComponent.schema();
  }

  parseNumber(value) {
    return super.parseNumber(this.stripPrefixSuffix(value));
  }

  parseValue(value) {
    return super.parseValue(this.stripPrefixSuffix(value));
  }

  formatValue(value) {
    return super.formatValue(this.stripPrefixSuffix(value));
  }

  stripPrefixSuffix(value) {
    if (typeof value === 'string') {
      try {
        if (this.prefix) {
          value = value.replace(this.prefix, '');
        }
        if (this.suffix) {
          value = value.replace(this.suffix, '');
        }
      }
      catch (err) {
        // If value doesn't have a replace method, continue on as before.
      }
    }
    return value;
  }
}
