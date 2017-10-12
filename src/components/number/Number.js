import i18next from 'i18next';
import maskInput from 'text-mask-all/vanilla';
import _get from 'lodash/get';
import createNumberMask from 'text-mask-all/addons/dist/createNumberMask';
import { BaseComponent } from '../base/Base';

export class NumberComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators = this.validators.concat(['min', 'max']);

    this.decimalSeparator = (12345.6789).toLocaleString(i18next.language).match(/345(.*)67/)[1];
    this.thousandsSeparator = (12345.6789).toLocaleString(i18next.language).match(/12(.*)345/)[1];

    // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
    let decimalLimit = 20;
    if (this.component.validate && this.component.validate.step && this.component.validate.step !== 'any') {
      decimalLimit = this.component.validate.step.split('.')[1].length;
    }
    this.decimalLimit = _get(this.component, 'decimalLimit', decimalLimit);
  }

  build() {
    super.build();
  }

  getFormatOptions() {
    return {
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: this.decimalLimit
    };
  }

  formatNumber(value) {
    // If empty string, zero or other, don't format.
    if (!value) {
      return value;
    }

    return value.toLocaleString(i18next.language, this.getFormatOptions());
  }

  parseNumber(value) {
    // Remove thousands separators and convert decimal separator to dot.
    value = value.split(this.thousandsSeparator).join('').replace(this.decimalSeparator, '.');

    if (this.component.validate && this.component.validate.integer) {
      return parseInt(value, 10);
    }
    else {
      return parseFloat(value);
    }
  }

  setInputMask(input) {
    this.inputMask = maskInput({
      inputElement: input,
      mask: createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: _get(this.component, 'thousandsSeparator', this.thousandsSeparator),
        decimalSymbol: _get(this.component, 'decimalSymbol', this.decimalSeparator),
        decimalLimit: this.decimalLimit,
        allowNegative: _get(this.component, 'allowNegative', true),
        allowDecimal: _get(this.component, 'allowDecimal', !(this.component.validate && this.component.validate.integer))
      })
    });
  }

  elementInfo() {
    let info = super.elementInfo();
    info.attr.type = 'text';
    info.attr.inputmode = 'numeric';
    info.changeEvent = 'input';
    return info;
  }

  getValueAt(index) {
    if (!this.inputs.length || !this.inputs[index]) {
      return null;
    }

    let val = this.inputs[index].value;

    if (!val) {
      return null;
    }

    return this.parseNumber(val);
  }

  setValueAt(index, value) {
    this.inputs[index].value = this.formatNumber(value);
  }
}
