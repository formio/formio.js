import maskInput from 'vanilla-text-mask';
import _get from 'lodash/get';
import { createNumberMask } from 'text-mask-addons';
import { BaseComponent } from '../base/Base';

export class NumberComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators = this.validators.concat(['min', 'max']);

    this.decimalSeparator = options.decimalSeparator = options.decimalSeparator || (12345.6789).toLocaleString(options.language).match(/345(.*)67/)[1];
    this.thousandsSeparator = options.thousandsSeparator = options.thousandsSeparator || (12345.6789).toLocaleString(options.language).match(/12(.*)345/)[1];

    // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
    this.decimalLimit = 20;
    if (
      this.component.validate &&
      this.component.validate.step &&
      this.component.validate.step !== 'any'
    ) {
      var parts = this.component.validate.step.toString().split('.');
      if (parts.length > 1) {
        this.decimalLimit = parts[1].length;
      }
    }
  }

  getFormatOptions() {
    return {
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: _get(this.component, 'decimalLimit', this.decimalLimit)
    };
  }

  formatNumber(value) {
    // If not a number, return empty string.
    if (isNaN(value)) {
      return '';
    }

    // If empty string, zero or other, don't format.
    if (!value) {
      return value;
    }

    if (this.component.validate && this.component.validate.integer) {
      return parseInt(value, 10).toLocaleString(this.options.language, this.getFormatOptions());
    }
    else {
      return parseFloat(value).toLocaleString(this.options.language, this.getFormatOptions());
    }
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
        decimalLimit: _get(this.component, 'decimalLimit', this.decimalLimit),
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
