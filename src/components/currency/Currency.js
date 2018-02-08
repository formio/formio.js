import maskInput from 'vanilla-text-mask';
import {createNumberMask} from 'text-mask-addons';
import _ from 'lodash';

import {NumberComponent} from '../number/Number';

export class CurrencyComponent extends NumberComponent {
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
    super(component, options, data);

    this.currency = this.component.currency || 'USD';
    this.decimalLimit = this.component.decimalLimit || 2;

    // Get the prefix and suffix from the localized string.
    const regex = `(.*)?100(${this.decimalSeparator === '.'
      ? '\\.'
      : this.decimalSeparator}0{${this.decimalLimit}})?(.*)?`;
    const parts = (100).toLocaleString(options.language, this.getFormatOptions()).match(new RegExp(regex));
    this.prefix = parts[1] || '';
    this.suffix = parts[3] || '';
  }

  getFormatOptions() {
    return {
      style: 'currency',
      currency: this.currency,
      useGrouping: true,
      maximumFractionDigits: _.get(this.component, 'decimalLimit', this.decimalLimit)
    };
  }

  formatNumber(value) {
    try {
      // Strip out the prefix and suffix before parsing. This occurs when numbers are from an old renderer.
      value = value.replace(this.prefix, '').replace(this.suffix, '');
    }
    catch (e) {
      // If value doesn't have a replace method, continue on as before.
    }

    return super.formatNumber(value);
  }

  parseNumber(value) {
    // Strip out the prefix and suffix before parsing.
    value = value.replace(this.prefix, '').replace(this.suffix, '');

    return super.parseNumber(value);
  }

  setInputMask(input) {
    this.inputMask = maskInput({
      inputElement: input,
      mask: createNumberMask({
        prefix: this.prefix,
        suffix: this.suffix,
        thousandsSeparatorSymbol: _.get(this.component, 'thousandsSeparator', this.delimiter),
        decimalSymbol: _.get(this.component, 'decimalSymbol', this.decimalSeparator),
        decimalLimit: _.get(this.component, 'decimalLimit', this.decimalLimit),
        allowNegative: _.get(this.component, 'allowNegative', true),
        allowDecimal: _.get(this.component, 'allowDecimal', true)
      })
    });
  }
}
