"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _textMaskAddons = require("text-mask-addons");

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../utils/utils");

var _Number = _interopRequireDefault(require("../number/Number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CurrencyComponent =
/*#__PURE__*/
function (_NumberComponent) {
  _inherits(CurrencyComponent, _NumberComponent);

  _createClass(CurrencyComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Number.default.schema.apply(_Number.default, [{
        type: 'currency',
        label: 'Currency',
        key: 'currency'
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Currency',
        group: 'advanced',
        icon: 'usd',
        documentation: 'http://help.form.io/userguide/#currency',
        weight: 70,
        schema: CurrencyComponent.schema()
      };
    }
  }]);

  function CurrencyComponent(component, options, data) {
    _classCallCheck(this, CurrencyComponent);

    // Currency should default to have a delimiter unless otherwise specified.
    if (component && !component.hasOwnProperty('delimiter')) {
      component.delimiter = true;
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(CurrencyComponent).call(this, component, options, data));
  }
  /**
   * Creates the number mask for currency numbers.
   *
   * @return {*}
   */


  _createClass(CurrencyComponent, [{
    key: "createNumberMask",
    value: function createNumberMask() {
      var decimalLimit = _lodash.default.get(this.component, 'decimalLimit', 2);

      var affixes = (0, _utils.getCurrencyAffixes)({
        currency: this.component.currency,
        decimalLimit: decimalLimit,
        decimalSeparator: this.decimalSeparator,
        lang: this.options.language
      });
      this.prefix = this.options.prefix || affixes.prefix;
      this.suffix = this.options.suffix || affixes.suffix;
      return (0, _textMaskAddons.createNumberMask)({
        prefix: this.prefix,
        suffix: this.suffix,
        thousandsSeparatorSymbol: _lodash.default.get(this.component, 'thousandsSeparator', this.delimiter),
        decimalSymbol: _lodash.default.get(this.component, 'decimalSymbol', this.decimalSeparator),
        decimalLimit: decimalLimit,
        allowNegative: _lodash.default.get(this.component, 'allowNegative', true),
        allowDecimal: _lodash.default.get(this.component, 'allowDecimal', true)
      });
    }
  }, {
    key: "parseNumber",
    value: function parseNumber(value) {
      return _get(_getPrototypeOf(CurrencyComponent.prototype), "parseNumber", this).call(this, this.stripPrefixSuffix(value));
    }
  }, {
    key: "parseValue",
    value: function parseValue(value) {
      return _get(_getPrototypeOf(CurrencyComponent.prototype), "parseValue", this).call(this, this.stripPrefixSuffix(value));
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      return _get(_getPrototypeOf(CurrencyComponent.prototype), "formatValue", this).call(this, this.stripPrefixSuffix(value));
    }
  }, {
    key: "stripPrefixSuffix",
    value: function stripPrefixSuffix(value) {
      if (typeof value === 'string') {
        try {
          if (this.prefix) {
            value = value.replace(this.prefix, '');
          }

          if (this.suffix) {
            value = value.replace(this.suffix, '');
          }
        } catch (err) {// If value doesn't have a replace method, continue on as before.
        }
      }

      return value;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return CurrencyComponent.schema();
    }
  }]);

  return CurrencyComponent;
}(_Number.default);

exports.default = CurrencyComponent;