import maskInput from 'vanilla-text-mask';
import _ from 'lodash';
import {createNumberMask} from 'text-mask-addons';
import {BaseComponent} from '../base/Base';

export class NumberComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators = this.validators.concat(['min', 'max']);

    const formattedNumberString = (12345.6789).toLocaleString(options.language || 'en');

    this.decimalSeparator = options.decimalSeparator = options.decimalSeparator
      || formattedNumberString.match(/345(.*)67/)[1];

    if (component.delimiter) {
      if (options.hasOwnProperty('thousandsSeparator')) {
        console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
      }

      this.delimiter = options.thousandsSeparator || formattedNumberString.match(/12(.*)345/)[1];
    }
    else {
      this.delimiter = '';
    }

    // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
    this.decimalLimit = 20;
    if (
      this.component.validate &&
      this.component.validate.step &&
      this.component.validate.step !== 'any'
    ) {
      const parts = this.component.validate.step.toString().split('.');
      if (parts.length > 1) {
        this.decimalLimit = parts[1].length;
      }
    }
  }

  getFormatOptions() {
    return {
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: _.get(this.component, 'decimalLimit', this.decimalLimit)
    };
  }

  parseNumber(value) {
    // Remove thousands separators and convert decimal separator to dot.
    value = value.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
    return parseFloat(value);
  }

  setInputMask(input) {
    this.inputMask = maskInput({
      inputElement: input,
      mask: createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: _.get(this.component, 'thousandsSeparator', this.delimiter),
        decimalSymbol: _.get(this.component, 'decimalSymbol', this.decimalSeparator),
        decimalLimit: _.get(this.component, 'decimalLimit', this.decimalLimit),
        allowNegative: _.get(this.component, 'allowNegative', true),
        allowDecimal: _.get(this.component, 'allowDecimal',
          !(this.component.validate && this.component.validate.integer))
      })
    });
  }

  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = 'text';
    info.attr.inputmode = 'numeric';
    info.changeEvent = 'input';
    return info;
  }

  getValueAt(index) {
    if (!this.inputs.length || !this.inputs[index]) {
      return null;
    }

    const val = this.inputs[index].value;

    if (!val) {
      return null;
    }

    return this.parseNumber(val);
  }

  setValueAt(index, value) {
    if (_.isNumber(value)) {
      value = String(value).replace('.', this.decimalSeparator);
    }

    this.inputMask.textMaskInputElement.update(value);
  }
}
