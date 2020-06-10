var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { createNumberMask } from 'text-mask-addons';
import { maskInput } from 'vanilla-text-mask';
import _ from 'lodash';
import { getCurrencyAffixes } from '../../utils/utils';
import NumberComponent from '../number/Number';
var CurrencyComponent = /** @class */ (function (_super) {
    __extends(CurrencyComponent, _super);
    function CurrencyComponent(component, options, data) {
        var _this = this;
        // Currency should default to have a delimiter unless otherwise specified.
        if (component && !component.hasOwnProperty('delimiter')) {
            component.delimiter = true;
        }
        _this = _super.call(this, component, options, data) || this;
        return _this;
    }
    CurrencyComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NumberComponent.schema.apply(NumberComponent, __spreadArrays([{
                type: 'currency',
                label: 'Currency',
                key: 'currency'
            }], extend));
    };
    Object.defineProperty(CurrencyComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Currency',
                group: 'advanced',
                icon: 'usd',
                documentation: 'http://help.form.io/userguide/#currency',
                weight: 70,
                schema: CurrencyComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    CurrencyComponent.prototype.attachElement = function (element, index) {
        var _this = this;
        _super.prototype.attachElement.call(this, element, index);
        this.addEventListener(element, 'blur', function () {
            element.value = _this.getValueAsString(_this.addZerosAndFormatValue(_this.parseValue(element.value)));
        });
    };
    /**
     * Creates the number mask for currency numbers.
     *
     * @return {*}
     */
    CurrencyComponent.prototype.createNumberMask = function () {
        var decimalLimit = _.get(this.component, 'decimalLimit', 2);
        var affixes = getCurrencyAffixes({
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
    };
    CurrencyComponent.prototype.setInputMask = function (input) {
        var affixes = getCurrencyAffixes({
            currency: this.component.currency,
            decimalSeparator: this.decimalSeparator,
            lang: this.options.language,
        });
        var numberPattern = "\\" + affixes.prefix + "[0-9";
        numberPattern += this.decimalSeparator || '';
        numberPattern += this.delimiter || '';
        numberPattern += ']*';
        input.setAttribute('pattern', numberPattern);
        input.mask = maskInput({
            inputElement: input,
            mask: this.numberMask || '',
        });
    };
    Object.defineProperty(CurrencyComponent.prototype, "defaultSchema", {
        get: function () {
            return CurrencyComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    CurrencyComponent.prototype.parseNumber = function (value) {
        return _super.prototype.parseNumber.call(this, this.stripPrefixSuffix(value));
    };
    CurrencyComponent.prototype.parseValue = function (value) {
        return _super.prototype.parseValue.call(this, this.stripPrefixSuffix(value));
    };
    CurrencyComponent.prototype.addZerosAndFormatValue = function (value) {
        var _a;
        if (!value && value !== 0)
            return;
        var decimalLimit = _.get(this.component, 'decimalLimit', 2);
        var integerPart;
        var decimalPart = '';
        var decimalPartNumbers = [];
        var negativeValueSymbol = '-';
        var hasPrefix = this.prefix ? value.includes(this.prefix) : false;
        var hasSuffix = this.suffix ? value.includes(this.suffix) : false;
        var isNegative = value.includes(negativeValueSymbol) || false;
        value = this.stripPrefixSuffix(isNegative ? value.replace(negativeValueSymbol, '') : value);
        if (value.includes(this.decimalSeparator)) {
            _a = value.split(this.decimalSeparator), integerPart = _a[0], decimalPart = _a[1];
            decimalPartNumbers = __spreadArrays(decimalPart.split(''));
        }
        else {
            integerPart = value;
        }
        if (decimalPart.length < decimalLimit) {
            while (decimalPartNumbers.length < decimalLimit) {
                decimalPartNumbers.push('0');
            }
        }
        var formattedValue = "" + (isNegative ? negativeValueSymbol : '') + (hasPrefix ? this.prefix : '') + integerPart + this.decimalSeparator + decimalPartNumbers.join('') + (hasSuffix ? this.suffix : '');
        return _super.prototype.formatValue.call(this, formattedValue);
    };
    CurrencyComponent.prototype.getValueAsString = function (value, options) {
        var stringValue = _super.prototype.getValueAsString.call(this, value, options);
        // eslint-disable-next-line eqeqeq
        if (value || value == '0') {
            return this.addZerosAndFormatValue(stringValue);
        }
        return stringValue;
    };
    CurrencyComponent.prototype.formatValue = function (value) {
        if (value || value === '0') {
            return this.addZerosAndFormatValue(value);
        }
        return _super.prototype.formatValue.call(this, value);
    };
    CurrencyComponent.prototype.stripPrefixSuffix = function (value) {
        if (typeof value === 'string') {
            try {
                var hasPrefix = this.prefix ? value.includes(this.prefix) : false;
                var hasSuffix = this.suffix ? value.includes(this.suffix) : false;
                var hasDelimiter = value.includes(this.delimiter);
                var hasDecimalSeparator = value.includes(this.decimalSeparator);
                if (this.prefix) {
                    value = value.replace(this.prefix, '');
                }
                if (this.suffix) {
                    value = value.replace(this.suffix, '');
                }
                //when we enter $ in the field using dashboard, it contains '_' that is NaN
                if ((hasPrefix || hasSuffix) && !hasDelimiter && !hasDecimalSeparator && (Number.isNaN(+value) || !value)) {
                    value = '0';
                }
            }
            catch (err) {
                // If value doesn't have a replace method, continue on as before.
            }
        }
        return value;
    };
    return CurrencyComponent;
}(NumberComponent));
export default CurrencyComponent;
