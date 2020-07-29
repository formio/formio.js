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
import _ from 'lodash';
import { createNumberMask } from 'text-mask-addons';
import { maskInput, conformToMask } from 'vanilla-text-mask';
import { getNumberDecimalLimit, getNumberSeparators, superGet, } from '../../utils/utils';
import Input from '../_classes/input/Input';
var NumberComponent = /** @class */ (function (_super) {
    __extends(NumberComponent, _super);
    function NumberComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.validators = _this.validators.concat(['min', 'max']);
        var separators = getNumberSeparators(_this.options.language);
        _this.decimalSeparator = _this.options.decimalSeparator = _this.options.decimalSeparator
            || separators.decimalSeparator;
        if (_this.component.delimiter) {
            if (_this.options.hasOwnProperty('thousandsSeparator')) {
                console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
            }
            _this.delimiter = _this.options.thousandsSeparator || separators.delimiter;
        }
        else {
            _this.delimiter = '';
        }
        var requireDecimal = _.get(_this.component, 'requireDecimal', false);
        _this.decimalLimit = getNumberDecimalLimit(_this.component, requireDecimal ? 2 : 20);
        // Currencies to override BrowserLanguage Config. Object key {}
        if (_.has(_this.options, "languageOverride." + _this.options.language)) {
            var override = _.get(_this.options, "languageOverride." + _this.options.language);
            _this.decimalSeparator = override.decimalSeparator;
            _this.delimiter = override.delimiter;
        }
        _this.numberMask = _this.createNumberMask();
        return _this;
    }
    NumberComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input.schema.apply(Input, __spreadArrays([{
                type: 'number',
                label: 'Number',
                key: 'number',
                validate: {
                    min: '',
                    max: '',
                    step: 'any',
                    integer: ''
                }
            }], extend));
    };
    Object.defineProperty(NumberComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Number',
                icon: 'hashtag',
                group: 'basic',
                documentation: 'http://help.form.io/userguide/#number',
                weight: 30,
                schema: NumberComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    NumberComponent.prototype.attachElement = function (element, index) {
        var _this = this;
        _super.prototype.attachElement.call(this, element, index);
        this.addEventListener(element, 'blur', function () {
            element.value = _this.getValueAsString(_this.formatValue(_this.parseValue(element.value)));
        });
    };
    /**
     * Creates the number mask for normal numbers.
     *
     * @return {*}
     */
    NumberComponent.prototype.createNumberMask = function () {
        return createNumberMask({
            prefix: '',
            suffix: '',
            requireDecimal: _.get(this.component, 'requireDecimal', false),
            thousandsSeparatorSymbol: _.get(this.component, 'thousandsSeparator', this.delimiter),
            decimalSymbol: _.get(this.component, 'decimalSymbol', this.decimalSeparator),
            decimalLimit: _.get(this.component, 'decimalLimit', this.decimalLimit),
            allowNegative: _.get(this.component, 'allowNegative', true),
            allowDecimal: this.isDecimalAllowed(),
        });
    };
    Object.defineProperty(NumberComponent.prototype, "defaultSchema", {
        get: function () {
            return NumberComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NumberComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = superGet(Input, 'defaultValue', this);
            if (!defaultValue && this.component.defaultValue === 0) {
                defaultValue = this.component.defaultValue;
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    NumberComponent.prototype.isDecimalAllowed = function () {
        return _.get(this.component, 'allowDecimal', !(this.component.validate && this.component.validate.integer));
    };
    NumberComponent.prototype.parseNumber = function (value) {
        // Remove delimiters and convert decimal separator to dot.
        value = value.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
        if (this.component.validate && this.component.validate.integer) {
            return parseInt(value, 10);
        }
        else {
            return parseFloat(value);
        }
    };
    NumberComponent.prototype.setInputMask = function (input) {
        var numberPattern = '[0-9';
        numberPattern += this.decimalSeparator || '';
        numberPattern += this.delimiter || '';
        numberPattern += ']*';
        input.setAttribute('pattern', numberPattern);
        input.mask = maskInput({
            inputElement: input,
            mask: this.numberMask
        });
    };
    Object.defineProperty(NumberComponent.prototype, "inputInfo", {
        get: function () {
            var info = superGet(Input, 'inputInfo', this);
            if (this.component.mask) {
                info.attr.type = 'password';
            }
            else {
                info.attr.type = 'text';
            }
            info.attr.inputmode = this.isDecimalAllowed() ? 'decimal' : 'numeric';
            info.changeEvent = 'input';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    NumberComponent.prototype.getValueAt = function (index) {
        if (!this.refs.input.length || !this.refs.input[index]) {
            return null;
        }
        var val = this.refs.input[index].value;
        return val ? this.parseNumber(val) : null;
    };
    NumberComponent.prototype.setValueAt = function (index, value, flags) {
        if (flags === void 0) { flags = {}; }
        return _super.prototype.setValueAt.call(this, index, this.formatValue(this.parseValue(value)), flags);
    };
    NumberComponent.prototype.parseValue = function (input) {
        if (typeof input === 'string') {
            input = input.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
        }
        var value = parseFloat(input);
        if (!_.isNaN(value)) {
            value = String(value).replace('.', this.decimalSeparator);
        }
        else {
            value = null;
        }
        return value;
    };
    NumberComponent.prototype.formatValue = function (value) {
        if (this.component.requireDecimal && value && !value.includes(this.decimalSeparator)) {
            return "" + value + this.decimalSeparator + _.repeat('0', this.decimalLimit);
        }
        else if (this.component.requireDecimal && value && value.includes(this.decimalSeparator)) {
            return "" + value + _.repeat('0', this.decimalLimit - value.split(this.decimalSeparator)[1].length);
        }
        return value;
    };
    NumberComponent.prototype.focus = function () {
        var input = this.refs.input[0];
        if (input) {
            input.focus();
            input.setSelectionRange(0, input.value.length);
        }
    };
    NumberComponent.prototype.getMaskedValue = function (value) {
        value = value === null ? '0' : value.toString();
        if (value.includes('.') && '.' !== this.decimalSeparator) {
            value = value.replace('.', this.decimalSeparator);
        }
        return conformToMask(this.formatValue(value), this.numberMask).conformedValue;
    };
    NumberComponent.prototype.getValueAsString = function (value, options) {
        if (!value && value !== 0) {
            return '';
        }
        value = this.getWidgetValueAsString(value, options);
        if (Array.isArray(value)) {
            return value.map(this.getMaskedValue).join(', ');
        }
        return this.getMaskedValue(value);
    };
    return NumberComponent;
}(Input));
export default NumberComponent;
