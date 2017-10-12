import i18next from 'i18next';
import maskInput from 'text-mask-all/vanilla';
import createNumberMask from 'text-mask-all/addons/dist/createNumberMask';
import _get from 'lodash/get';
import { NumberComponent } from '../number/Number';
export class CurrencyComponent extends NumberComponent {
  constructor(component, options, data) {
    super(component, options, data);

    this.currency = this.component.currency || 'USD';
    this.decimalLimit = this.component.decimalLimit || 2;

    // Get the prefix and suffix from the localized string.
    const regex = '(.*)?100(' + (this.decimalSeparator === '.' ? '\.' : this.decimalSeparator) + '0{' + this.decimalLimit + '})?(.*)?';
    const parts = (100).toLocaleString(i18next.language, this.getFormatOptions()).match(new RegExp(regex));
    this.prefix = parts[1] || '';
    this.suffix = parts[3] || '';
  }

  getFormatOptions() {
    return {
      style: 'currency',
      currency: this.currency,
      useGrouping: true,
      maximumFractionDigits: this.decimalLimit
    };
  }

  setInputMask(input) {
    this.localize().then(() => {
      this.inputMask = maskInput({
        inputElement: input,
        mask: createNumberMask({
          prefix: this.prefix,
          suffix: this.suffix,
          thousandsSeparatorSymbol: _get(this.component, 'thousandsSeparator', this.thousandsSeparator),
          decimalSymbol: _get(this.component, 'decimalSymbol', this.decimalSeparator),
          decimalLimit: this.decimalLimit,
          allowNegative: _get(this.component, 'allowNegative', true),
          allowDecimal: _get(this.component, 'allowDecimal', true)
        })
      });
    });
  }
}
