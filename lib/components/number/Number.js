"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.repeat");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vanillaTextMask = require("vanilla-text-mask");

var _lodash = _interopRequireDefault(require("lodash"));

var _textMaskAddons = require("text-mask-addons");

var _Input2 = _interopRequireDefault(require("../_classes/input/Input"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var NumberComponent = /*#__PURE__*/function (_Input) {
  _inherits(NumberComponent, _Input);

  var _super = _createSuper(NumberComponent);

  _createClass(NumberComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Input2.default.schema.apply(_Input2.default, [{
        type: 'number',
        label: 'Number',
        key: 'number',
        validate: {
          min: '',
          max: '',
          step: 'any',
          integer: ''
        }
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Number',
        icon: 'hashtag',
        group: 'basic',
        documentation: 'http://help.form.io/userguide/#number',
        weight: 30,
        schema: NumberComponent.schema()
      };
    }
  }]);

  function NumberComponent() {
    var _this;

    _classCallCheck(this, NumberComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.validators = _this.validators.concat(['min', 'max']);
    var separators = (0, _utils.getNumberSeparators)(_this.options.language);
    _this.decimalSeparator = _this.options.decimalSeparator = _this.options.decimalSeparator || separators.decimalSeparator;

    if (_this.component.delimiter) {
      if (_this.options.hasOwnProperty('thousandsSeparator')) {
        console.warn("Property 'thousandsSeparator' is deprecated. Please use i18n to specify delimiter.");
      }

      _this.delimiter = _this.options.thousandsSeparator || separators.delimiter;
    } else {
      _this.delimiter = '';
    }

    var requireDecimal = _lodash.default.get(_this.component, 'requireDecimal', false);

    _this.decimalLimit = (0, _utils.getNumberDecimalLimit)(_this.component, requireDecimal ? 2 : 20); // Currencies to override BrowserLanguage Config. Object key {}

    if (_lodash.default.has(_this.options, "languageOverride.".concat(_this.options.language))) {
      var override = _lodash.default.get(_this.options, "languageOverride.".concat(_this.options.language));

      _this.decimalSeparator = override.decimalSeparator;
      _this.delimiter = override.delimiter;
    }

    _this.numberMask = _this.createNumberMask();
    return _this;
  }
  /**
   * Creates the number mask for normal numbers.
   *
   * @return {*}
   */


  _createClass(NumberComponent, [{
    key: "createNumberMask",
    value: function createNumberMask() {
      return (0, _textMaskAddons.createNumberMask)({
        prefix: '',
        suffix: '',
        requireDecimal: _lodash.default.get(this.component, 'requireDecimal', false),
        thousandsSeparatorSymbol: _lodash.default.get(this.component, 'thousandsSeparator', this.delimiter),
        decimalSymbol: _lodash.default.get(this.component, 'decimalSymbol', this.decimalSeparator),
        decimalLimit: _lodash.default.get(this.component, 'decimalLimit', this.decimalLimit),
        allowNegative: _lodash.default.get(this.component, 'allowNegative', true),
        allowDecimal: _lodash.default.get(this.component, 'allowDecimal', !(this.component.validate && this.component.validate.integer))
      });
    }
  }, {
    key: "parseNumber",
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
    key: "setInputMask",
    value: function setInputMask(input) {
      var numberPattern = '[0-9';
      numberPattern += this.decimalSeparator || '';
      numberPattern += this.delimiter || '';
      numberPattern += ']*';
      input.setAttribute('pattern', numberPattern);
      input.mask = (0, _vanillaTextMask.maskInput)({
        inputElement: input,
        mask: this.numberMask
      });
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      if (!this.refs.input.length || !this.refs.input[index]) {
        return null;
      }

      var val = this.refs.input[index].value;
      return val ? this.parseNumber(val) : null;
    }
  }, {
    key: "setValueAt",
    value: function setValueAt(index, value) {
      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _get(_getPrototypeOf(NumberComponent.prototype), "setValueAt", this).call(this, index, this.formatValue(this.parseValue(value)), flags);
    }
  }, {
    key: "parseValue",
    value: function parseValue(input) {
      if (typeof input === 'string') {
        input = input.split(this.delimiter).join('').replace(this.decimalSeparator, '.');
      }

      var value = parseFloat(input);

      if (!_lodash.default.isNaN(value)) {
        value = String(value).replace('.', this.decimalSeparator);
      } else {
        value = null;
      }

      return value;
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      if (this.component.requireDecimal && value && !value.includes(this.decimalSeparator)) {
        return "".concat(value).concat(this.decimalSeparator).concat(_lodash.default.repeat('0', this.decimalLimit));
      } else if (this.component.requireDecimal && value && value.includes(this.decimalSeparator)) {
        return "".concat(value).concat(_lodash.default.repeat('0', this.decimalLimit - value.split(this.decimalSeparator)[1].length));
      }

      return value;
    }
  }, {
    key: "focus",
    value: function focus() {
      var input = this.refs.input[0];

      if (input) {
        input.focus();
        input.setSelectionRange(0, input.value.length);
      }
    }
  }, {
    key: "getMaskedValue",
    value: function getMaskedValue(value) {
      value = value === null ? '0' : value.toString();

      if (value.includes('.') && '.' !== this.decimalSeparator) {
        value = value.replace('.', this.decimalSeparator);
      }

      return (0, _vanillaTextMask.conformToMask)(this.formatValue(value), this.numberMask).conformedValue;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value, options) {
      if (!value && value !== 0) {
        return '';
      }

      value = this.getWidgetValueAsString(value, options);

      if (Array.isArray(value)) {
        return value.map(this.getMaskedValue).join(', ');
      }

      return this.getMaskedValue(value);
    }
  }, {
    key: "addFocusBlurEvents",
    value: function addFocusBlurEvents(element) {
      var _this2 = this;

      _get(_getPrototypeOf(NumberComponent.prototype), "addFocusBlurEvents", this).call(this, element);

      this.addEventListener(element, 'blur', function () {
        element.value = _this2.getValueAsString(_this2.formatValue(_this2.parseValue(element.value)));
      });
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return NumberComponent.schema();
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = _get(_getPrototypeOf(NumberComponent.prototype), "defaultValue", this);

      if (!defaultValue && this.component.defaultValue === 0) {
        defaultValue = this.component.defaultValue;
      }

      return defaultValue;
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(NumberComponent.prototype), "inputInfo", this);

      if (this.component.mask) {
        info.attr.type = 'password';
      } else {
        info.attr.type = 'text';
      }

      info.attr.inputmode = 'numeric';
      info.changeEvent = 'input';
      return info;
    }
  }]);

  return NumberComponent;
}(_Input2.default);

exports.default = NumberComponent;