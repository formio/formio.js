'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _vanilla = require('text-mask-all/vanilla');

var _vanilla2 = _interopRequireDefault(_vanilla);

var _get3 = require('lodash/get');

var _get4 = _interopRequireDefault(_get3);

var _createNumberMask = require('text-mask-all/addons/dist/createNumberMask');

var _createNumberMask2 = _interopRequireDefault(_createNumberMask);

var _Base = require('../base/Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberComponent = exports.NumberComponent = function (_BaseComponent) {
  _inherits(NumberComponent, _BaseComponent);

  function NumberComponent(component, options, data) {
    _classCallCheck(this, NumberComponent);

    var _this = _possibleConstructorReturn(this, (NumberComponent.__proto__ || Object.getPrototypeOf(NumberComponent)).call(this, component, options, data));

    _this.validators = _this.validators.concat(['min', 'max']);

    _this.decimalSeparator = options.decimalSeparator = options.decimalSeparator || 12345.6789.toLocaleString(_this.options.i18n.lng).match(/345(.*)67/)[1];
    _this.thousandsSeparator = options.thousandsSeparator = options.thousandsSeparator || 12345.6789.toLocaleString(_this.options.i18n.lng).match(/12(.*)345/)[1];

    // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
    _this.decimalLimit = 20;
    if (_this.component.validate && _this.component.validate.step && _this.component.validate.step !== 'any') {
      var parts = _this.component.validate.step.toString().split('.');
      if (parts.length > 1) {
        _this.decimalLimit = parts[1].length;
      }
    }
    return _this;
  }

  _createClass(NumberComponent, [{
    key: 'getFormatOptions',
    value: function getFormatOptions() {
      return {
        style: 'decimal',
        useGrouping: true,
        maximumFractionDigits: (0, _get4.default)(this.component, 'decimalLimit', this.decimalLimit)
      };
    }
  }, {
    key: 'formatNumber',
    value: function formatNumber(value) {
      // If not a number, return empty string.
      if (isNaN(value)) {
        return '';
      }

      // If empty string, zero or other, don't format.
      if (!value) {
        return value;
      }

      if (this.component.validate && this.component.validate.integer) {
        return parseInt(value, 10).toLocaleString(this.options.i18n.lng, this.getFormatOptions());
      } else {
        return parseFloat(value).toLocaleString(this.options.i18n.lng, this.getFormatOptions());
      }
    }
  }, {
    key: 'parseNumber',
    value: function parseNumber(value) {
      // Remove thousands separators and convert decimal separator to dot.
      value = value.split(this.thousandsSeparator).join('').replace(this.decimalSeparator, '.');

      if (this.component.validate && this.component.validate.integer) {
        return parseInt(value, 10);
      } else {
        return parseFloat(value);
      }
    }
  }, {
    key: 'setInputMask',
    value: function setInputMask(input) {
      this.inputMask = (0, _vanilla2.default)({
        inputElement: input,
        mask: (0, _createNumberMask2.default)({
          prefix: '',
          suffix: '',
          thousandsSeparatorSymbol: (0, _get4.default)(this.component, 'thousandsSeparator', this.thousandsSeparator),
          decimalSymbol: (0, _get4.default)(this.component, 'decimalSymbol', this.decimalSeparator),
          decimalLimit: (0, _get4.default)(this.component, 'decimalLimit', this.decimalLimit),
          allowNegative: (0, _get4.default)(this.component, 'allowNegative', true),
          allowDecimal: (0, _get4.default)(this.component, 'allowDecimal', !(this.component.validate && this.component.validate.integer))
        })
      });
    }
  }, {
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get2(NumberComponent.prototype.__proto__ || Object.getPrototypeOf(NumberComponent.prototype), 'elementInfo', this).call(this);
      info.attr.type = 'text';
      info.attr.inputmode = 'numeric';
      info.changeEvent = 'input';
      return info;
    }
  }, {
    key: 'getValueAt',
    value: function getValueAt(index) {
      if (!this.inputs.length || !this.inputs[index]) {
        return null;
      }

      var val = this.inputs[index].value;

      if (!val) {
        return null;
      }

      return this.parseNumber(val);
    }
  }, {
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      this.inputs[index].value = this.formatNumber(value);
    }
  }]);

  return NumberComponent;
}(_Base.BaseComponent);