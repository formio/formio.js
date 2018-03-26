import maskInput from 'vanilla-text-mask';
import {createNumberMask} from 'text-mask-addons';
import _ from 'lodash';
import {getCurrencyAffixes} from '../../utils';

import {NumberComponent} from '../number/Number';

export class CurrencyComponent extends NumberComponent {
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

  parseNumber(value) {
    // Strip out the prefix and suffix before parsing.
    value = value.replace(this.prefix, '').replace(this.suffix, '');

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
      input = input.replace(this.prefix, '').replace(this.suffix, '');
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
