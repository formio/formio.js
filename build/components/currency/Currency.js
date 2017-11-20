'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrencyComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _vanilla = require('text-mask-all/vanilla');

var _vanilla2 = _interopRequireDefault(_vanilla);

var _createNumberMask = require('text-mask-all/addons/dist/createNumberMask');

var _createNumberMask2 = _interopRequireDefault(_createNumberMask);

var _get3 = require('lodash/get');

var _get4 = _interopRequireDefault(_get3);

var _Number = require('../number/Number');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyComponent = exports.CurrencyComponent = function (_NumberComponent) {
  _inherits(CurrencyComponent, _NumberComponent);

  function CurrencyComponent(component, options, data) {
    _classCallCheck(this, CurrencyComponent);

    var _this = _possibleConstructorReturn(this, (CurrencyComponent.__proto__ || Object.getPrototypeOf(CurrencyComponent)).call(this, component, options, data));

    _this.currency = _this.component.currency || 'USD';
    _this.decimalLimit = _this.component.decimalLimit || 2;

    // Get the prefix and suffix from the localized string.
    var regex = '(.*)?100(' + (_this.decimalSeparator === '.' ? '\.' : _this.decimalSeparator) + '0{' + _this.decimalLimit + '})?(.*)?';
    var parts = 100 .toLocaleString(_this.options.i18n.lng, _this.getFormatOptions()).match(new RegExp(regex));
    _this.prefix = parts[1] || '';
    _this.suffix = parts[3] || '';
    return _this;
  }

  _createClass(CurrencyComponent, [{
    key: 'getFormatOptions',
    value: function getFormatOptions() {
      return {
        style: 'currency',
        currency: this.currency,
        useGrouping: true,
        maximumFractionDigits: (0, _get4.default)(this.component, 'decimalLimit', this.decimalLimit)
      };
    }
  }, {
    key: 'formatNumber',
    value: function formatNumber(value) {
      try {
        // Strip out the prefix and suffix before parsing. This occurs when numbers are from an old renderer.
        value = value.replace(this.prefix, '').replace(this.suffix, '');
      } catch (e) {
        // If value doesn't have a replace method, continue on as before.
      }

      return _get2(CurrencyComponent.prototype.__proto__ || Object.getPrototypeOf(CurrencyComponent.prototype), 'formatNumber', this).call(this, value);
    }
  }, {
    key: 'parseNumber',
    value: function parseNumber(value) {
      // Strip out the prefix and suffix before parsing.
      value = value.replace(this.prefix, '').replace(this.suffix, '');

      return _get2(CurrencyComponent.prototype.__proto__ || Object.getPrototypeOf(CurrencyComponent.prototype), 'parseNumber', this).call(this, value);
    }
  }, {
    key: 'setInputMask',
    value: function setInputMask(input) {
      this.inputMask = (0, _vanilla2.default)({
        inputElement: input,
        mask: (0, _createNumberMask2.default)({
          prefix: this.prefix,
          suffix: this.suffix,
          thousandsSeparatorSymbol: (0, _get4.default)(this.component, 'thousandsSeparator', this.thousandsSeparator),
          decimalSymbol: (0, _get4.default)(this.component, 'decimalSymbol', this.decimalSeparator),
          decimalLimit: (0, _get4.default)(this.component, 'decimalLimit', this.decimalLimit),
          allowNegative: (0, _get4.default)(this.component, 'allowNegative', true),
          allowDecimal: (0, _get4.default)(this.component, 'allowDecimal', true)
        })
      });
    }
  }]);

  return CurrencyComponent;
}(_Number.NumberComponent);