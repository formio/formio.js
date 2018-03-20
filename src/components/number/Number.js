import maskInput from 'vanilla-text-mask';
import _ from 'lodash';
import {createNumberMask} from 'text-mask-addons';
import {BaseComponent} from '../base/Base';
import currencyData from '../../currencyData';

export class NumberComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.currencies = currencyData;
    this.validators = this.validators.concat(['min', 'max']);
    // Currencies to override BrowserLanguage Config. Object key {}
    if(options.currency) {
      const override = this.getOverrideBrowser(options.currency);
      this.overrideLanguage = override[this.getBrowserLanguage()];
    }
    
    const formattedNumberString = (12345.6789).toLocaleString(this.getBrowserLanguage() || 'en');
    this.decimalSeparator = options.decimalSeparator = this.overrideLanguage.separator || options.decimalSeparator
      || formattedNumberString.match(/345(.*)67/)[1];
    if (component.delimiter) {
      if (options.hasOwnProperty('thousandsSeparator')) {
        console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
      }

      this.delimiter = this.overrideLanguage.delimiter || options.thousandsSeparator || formattedNumberString.match(/12(.*)345/)[1];
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

  getOverrideBrowser(currency) {
    Object.keys(currency).map((curr)=>{
      this.currencies[curr] = {
        delimiter: currency[curr].delimiter,
        separator: currency[curr].separator
      };
      return this.currencies
    });
    return this.currencies;
  }

  getFormatOptions() {
    return {
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: _.get(this.component, 'decimalLimit', this.decimalLimit)
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
      return parseInt(value, 10).toLocaleString(this.options.language || 'en', this.getFormatOptions());
    }
    else {
      return parseFloat(value).toLocaleString(this.options.language || 'en', this.getFormatOptions());
    }
  }

  parseNumber(value) {
    // Remove thousands separators and convert decimal separator to dot.
    value = value.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
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
    this.inputs[index].value = this.formatNumber(value);
  }
}
