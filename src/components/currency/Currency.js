import maskInput from 'text-mask-all/vanilla';
import createNumberMask from 'text-mask-all/addons/dist/createNumberMask';
import _get from 'lodash/get';
import { NumberComponent } from '../number/Number';
export class CurrencyComponent extends NumberComponent {
  getFormatOptions() {
    return {
      style: 'currency',
      currency: 'USD',
      useGrouping: true,
      maximumFractionDigits: 2
    };
  }

  setInputMask(input) {
    this.localize().then(() => {
      this.inputMask = maskInput({
        inputElement: input,
        mask: createNumberMask({
          prefix: '',
          suffix: '',
          thousandsSeparatorSymbol: _get(this.component, 'thousandsSeparator', this.thousandsSeparator),
          decimalSymbol: _get(this.component, 'decimalSymbol', this.decimalSeparator),
          decimalLimit: 2,
          allowNegative: _get(this.component, 'allowNegative', false),
          allowDecimal: _get(this.component, 'allowDecimal', true)
        })
      });
    });
  }
}
