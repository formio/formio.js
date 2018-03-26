'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrencyComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _vanillaTextMask = require('vanilla-text-mask');

var _vanillaTextMask2 = _interopRequireDefault(_vanillaTextMask);

var _textMaskAddons = require('text-mask-addons');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../../utils');

var _Number = require('../number/Number');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyComponent = exports.CurrencyComponent = function (_NumberComponent) {
  _inherits(CurrencyComponent, _NumberComponent);

  function CurrencyComponent(component, options, data) {
    _classCallCheck(this, CurrencyComponent);

    // Currency should default to have a delimiter unless otherwise specified.
    if (component && !component.hasOwnProperty('delimiter')) {
      component.delimiter = true;
    }

    var _this = _possibleConstructorReturn(this, (CurrencyComponent.__proto__ || Object.getPrototypeOf(CurrencyComponent)).call(this, component, options, data));

    _this.decimalLimit = _lodash2.default.get(_this.component, 'decimalLimit', 2);
    var affixes = (0, _utils.getCurrencyAffixes)({
      currency: _this.component.currency,
      decimalLimit: _this.decimalLimit,
      decimalSeparator: _this.decimalSeparator,
      lang: _this.options.language
    });
    _this.prefix = affixes.prefix;
    _this.suffix = affixes.suffix;
    return _this;
  }

  _createClass(CurrencyComponent, [{
    key: 'parseNumber',
    value: function parseNumber(value) {
      // Strip out the prefix and suffix before parsing.
      value = value.replace(this.prefix, '').replace(this.suffix, '');

      return _get(CurrencyComponent.prototype.__proto__ || Object.getPrototypeOf(CurrencyComponent.prototype), 'parseNumber', this).call(this, value);
    }
  }, {
    key: 'setInputMask',
    value: function setInputMask(input) {
      input.mask = (0, _vanillaTextMask2.default)({
        inputElement: input,
        mask: (0, _textMaskAddons.createNumberMask)({
          prefix: this.prefix,
          suffix: this.suffix,
          thousandsSeparatorSymbol: _lodash2.default.get(this.component, 'thousandsSeparator', this.delimiter),
          decimalSymbol: _lodash2.default.get(this.component, 'decimalSymbol', this.decimalSeparator),
          decimalLimit: this.decimalLimit,
          allowNegative: _lodash2.default.get(this.component, 'allowNegative', true),
          allowDecimal: _lodash2.default.get(this.component, 'allowDecimal', true)
        })
      });
    }
  }, {
    key: 'clearInput',
    value: function clearInput(input) {
      try {
        input = input.replace(this.prefix, '').replace(this.suffix, '');
      } catch (err) {
        // If value doesn't have a replace method, continue on as before.
      }

      return _get(CurrencyComponent.prototype.__proto__ || Object.getPrototypeOf(CurrencyComponent.prototype), 'clearInput', this).call(this, input);
    }
  }, {
    key: 'formatValue',
    value: function formatValue(value) {
      if (this.component.requireDecimals && value && !(value.indexOf(this.decimalSeparator) !== -1)) {
        return '' + value + this.decimalSeparator + _lodash2.default.repeat('0', this.decimalLimit);
      }

      return value;
    }
  }]);

  return CurrencyComponent;
}(_Number.NumberComponent);