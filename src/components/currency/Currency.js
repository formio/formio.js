import maskInput from 'text-mask-all/vanilla';
import createNumberMask from 'text-mask-all/addons/dist/createNumberMask';
import _get from 'lodash/get';
import { TextFieldComponent } from '../textfield/TextField';
export class CurrencyComponent extends TextFieldComponent {
  setInputMask(input) {
    this.inputMask = maskInput({
      inputElement: input,
      mask: createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: _get(this.component, 'thousandsSeparator', ','),
        decimalSymbol: _get(this.component, 'decimalSymbol', '.'),
        allowNegative: _get(this.component, 'allowNegative', false),
        allowDecimal: _get(this.component, 'allowDecimal', true)
      }),
    });
  }
}
