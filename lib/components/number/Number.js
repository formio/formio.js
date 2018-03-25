'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _vanillaTextMask = require('vanilla-text-mask');

var _vanillaTextMask2 = _interopRequireDefault(_vanillaTextMask);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _textMaskAddons = require('text-mask-addons');

var _Base = require('../base/Base');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

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

    var separators = _utils2.default.getNumberSeparators(_this.options.language);

    _this.decimalSeparator = options.decimalSeparator = options.decimalSeparator || separators.decimalSeparator;

    if (_this.component.delimiter) {
      if (options.hasOwnProperty('thousandsSeparator')) {
        console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
      }

      _this.delimiter = options.thousandsSeparator || separators.delimiter;
    } else {
      _this.delimiter = '';
    }

    _this.decimalLimit = _utils2.default.getNumberDecimalLimit(_this.component);

    // Currencies to override BrowserLanguage Config. Object key {}
    if (_lodash2.default.has(_this.options, 'languageOverride.' + _this.options.language)) {
      var override = _lodash2.default.get(_this.options, 'languageOverride.' + _this.options.language);
      _this.decimalSeparator = override.decimalSeparator;
      _this.delimiter = override.delimiter;
    }
    return _this;
  }

  _createClass(NumberComponent, [{
    key: 'parseNumber',
    value: function parseNumber(value) {
      // Remove delimiters and convert decimal separator to dot.
      value = value.split(this.delimiter).join('').replace(this.decimalSeparator, '.');

      if (this.component.validate && this.component.validate.integer) {
        return parseInt(value, 10);
      } else {
        return parseFloat(value);
      }
    }
  }, {
    key: 'setInputMask',
    value: function setInputMask(input) {
      input.setAttribute('pattern', '\\d*');
      input.mask = (0, _vanillaTextMask2.default)({
        inputElement: input,
        mask: (0, _textMaskAddons.createNumberMask)({
          prefix: '',
          suffix: '',
          thousandsSeparatorSymbol: _lodash2.default.get(this.component, 'thousandsSeparator', this.delimiter),
          decimalSymbol: _lodash2.default.get(this.component, 'decimalSymbol', this.decimalSeparator),
          decimalLimit: _lodash2.default.get(this.component, 'decimalLimit', this.decimalLimit),
          allowNegative: _lodash2.default.get(this.component, 'allowNegative', true),
          allowDecimal: _lodash2.default.get(this.component, 'allowDecimal', !(this.component.validate && this.component.validate.integer))
        })
      });
    }
  }, {
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(NumberComponent.prototype.__proto__ || Object.getPrototypeOf(NumberComponent.prototype), 'elementInfo', this).call(this);
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
    key: 'clearInput',
    value: function clearInput(input) {
      var value = parseFloat(input);

      if (!_lodash2.default.isNaN(value)) {
        value = String(value).replace('.', this.decimalSeparator);
      } else {
        value = null;
      }

      return value;
    }
  }, {
    key: 'formatValue',
    value: function formatValue(value) {
      return value;
    }
  }, {
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      return _get(NumberComponent.prototype.__proto__ || Object.getPrototypeOf(NumberComponent.prototype), 'setValueAt', this).call(this, index, this.formatValue(this.clearInput(value)));
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return 0;
    }
  }]);

  return NumberComponent;
}(_Base.BaseComponent);