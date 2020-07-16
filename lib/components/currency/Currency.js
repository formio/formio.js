"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-nan");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _textMaskAddons = require("text-mask-addons");

var _vanillaTextMask = require("vanilla-text-mask");

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../utils/utils");

var _Number = _interopRequireDefault(require("../number/Number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CurrencyComponent = /*#__PURE__*/function (_NumberComponent) {
  _inherits(CurrencyComponent, _NumberComponent);

  var _super = _createSuper(CurrencyComponent);

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

    return _super.call(this, component, options, data);
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
    key: "setInputMask",
    value: function setInputMask(input) {
      var affixes = (0, _utils.getCurrencyAffixes)({
        currency: this.component.currency,
        decimalSeparator: this.decimalSeparator,
        lang: this.options.language
      });
      var numberPattern = "\\".concat(affixes.prefix, "[0-9");
      numberPattern += this.decimalSeparator || '';
      numberPattern += this.delimiter || '';
      numberPattern += ']*';
      input.setAttribute('pattern', numberPattern);
      input.mask = (0, _vanillaTextMask.maskInput)({
        inputElement: input,
        mask: this.numberMask || ''
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
    key: "addZerosAndFormatValue",
    value: function addZerosAndFormatValue(value) {
      if (!value && value !== 0) return;

      var decimalLimit = _lodash.default.get(this.component, 'decimalLimit', 2);

      var integerPart;
      var decimalPart = '';
      var decimalPartNumbers = [];
      var negativeValueSymbol = '-';
      var hasPrefix = this.prefix ? value.includes(this.prefix) : false;
      var hasSuffix = this.suffix ? value.includes(this.suffix) : false;
      var isNegative = value.includes(negativeValueSymbol) || false;
      value = this.stripPrefixSuffix(isNegative ? value.replace(negativeValueSymbol, '') : value);

      if (value.includes(this.decimalSeparator)) {
        var _value$split = value.split(this.decimalSeparator);

        var _value$split2 = _slicedToArray(_value$split, 2);

        integerPart = _value$split2[0];
        decimalPart = _value$split2[1];
        decimalPartNumbers = _toConsumableArray(decimalPart.split(''));
      } else {
        integerPart = value;
      }

      if (decimalPart.length < decimalLimit) {
        while (decimalPartNumbers.length < decimalLimit) {
          decimalPartNumbers.push('0');
        }
      }

      var formattedValue = "".concat(isNegative ? negativeValueSymbol : '').concat(hasPrefix ? this.prefix : '').concat(integerPart).concat(this.decimalSeparator).concat(decimalPartNumbers.join('')).concat(hasSuffix ? this.suffix : '');
      return _get(_getPrototypeOf(CurrencyComponent.prototype), "formatValue", this).call(this, formattedValue);
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value, options) {
      var stringValue = _get(_getPrototypeOf(CurrencyComponent.prototype), "getValueAsString", this).call(this, value, options); // eslint-disable-next-line eqeqeq


      if (value || value == '0') {
        return this.addZerosAndFormatValue(stringValue);
      }

      return stringValue;
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      if (value || value === '0') {
        return this.addZerosAndFormatValue(value);
      }

      return _get(_getPrototypeOf(CurrencyComponent.prototype), "formatValue", this).call(this, value);
    }
  }, {
    key: "stripPrefixSuffix",
    value: function stripPrefixSuffix(value) {
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
          } //when we enter $ in the field using dashboard, it contains '_' that is NaN


          if ((hasPrefix || hasSuffix) && !hasDelimiter && !hasDecimalSeparator && (Number.isNaN(+value) || !value)) {
            value = '0';
          }
        } catch (err) {// If value doesn't have a replace method, continue on as before.
        }
      }

      return value;
    }
  }, {
    key: "addFocusBlurEvents",
    value: function addFocusBlurEvents(element) {
      var _this = this;

      _get(_getPrototypeOf(CurrencyComponent.prototype), "addFocusBlurEvents", this).call(this, element);

      this.addEventListener(element, 'blur', function () {
        element.value = _this.getValueAsString(_this.addZerosAndFormatValue(_this.parseValue(element.value)));
      });
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