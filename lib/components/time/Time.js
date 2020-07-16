"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

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

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _TextField = _interopRequireDefault(require("../textfield/TextField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var defaultDataFormat = 'HH:mm:ss';

var TimeComponent = /*#__PURE__*/function (_TextFieldComponent) {
  _inherits(TimeComponent, _TextFieldComponent);

  var _super = _createSuper(TimeComponent);

  _createClass(TimeComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _TextField.default.schema.apply(_TextField.default, [{
        type: 'time',
        label: 'Time',
        key: 'time',
        inputType: 'time',
        format: 'HH:mm',
        dataFormat: defaultDataFormat
      }].concat(extend));
    }
  }]);

  function TimeComponent(component, options, data) {
    var _this;

    _classCallCheck(this, TimeComponent);

    _this = _super.call(this, component, options, data);
    _this.component.inputMask = _this.getInputMaskFromFormat(_this.component.format);
    _this.component.inputType = _this.component.inputType || 'time';
    _this.rawData = _this.component.multiple ? [] : _this.emptyValue;
    return _this;
  }

  _createClass(TimeComponent, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(TimeComponent.prototype), "init", this).call(this);

      if (this.component.inputType === 'text') {
        this.validators.push('time');
      }
    }
  }, {
    key: "isNotCompleteInput",
    value: function isNotCompleteInput(value) {
      return value.includes('_');
    }
  }, {
    key: "removeValue",
    value: function removeValue(index) {
      this.rawData = Array.isArray(this.rawData) ? [].concat(_toConsumableArray(this.rawData.slice(0, index)), _toConsumableArray(this.rawData.slice(index + 1))) : this.emptyValue;

      _get(_getPrototypeOf(TimeComponent.prototype), "removeValue", this).call(this, index);
    }
  }, {
    key: "resetRawData",
    value: function resetRawData(index) {
      if (index) {
        this.setRawValue(this.emptyValue, index);
      } else {
        this.rawData = [];
      }
    }
  }, {
    key: "setRawValue",
    value: function setRawValue(value, index) {
      if (Array.isArray(this.rawData)) {
        this.rawData[index] = value;
      } else {
        this.rawData = value;
      }
    }
  }, {
    key: "getRawValue",
    value: function getRawValue(index) {
      if (index && Array.isArray(this.rawData)) {
        return this.rawData[index] || this.emptyValue;
      } else {
        return this.rawData;
      }
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      if (!this.refs.input.length || !this.refs.input[index]) {
        return this.emptyValue;
      }

      var value = this.refs.input[index].value;

      if (!value) {
        this.resetRawData(index);
        return this.emptyValue;
      }

      this.setRawValue(value, index);
      return this.getStringAsValue(value);
    }
  }, {
    key: "setValueAt",
    value: function setValueAt(index, value) {
      if (value) {
        this.setRawValue(this.getValueAsString(value), index);
      }

      this.refs.input[index].value = this.getRawValue(index);
    }
  }, {
    key: "getStringAsValue",
    value: function getStringAsValue(view) {
      return view && this.component.inputType !== 'text' ? (0, _moment.default)(view, this.component.format).format(this.component.dataFormat) : view;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      return (value ? (0, _moment.default)(value, this.component.dataFormat).format(this.component.format) : value) || '';
    }
  }, {
    key: "getInputMaskFromFormat",
    value: function getInputMaskFromFormat(format) {
      if (format === 'LT') {
        return '99:99 AA';
      }

      if (format === 'LTS') {
        return '99:99:99 AA';
      }

      return format.replace(/[hHmMsSk]/g, '9').replace(/[aA]/, 'AA');
    }
  }, {
    key: "addFocusBlurEvents",
    value: function addFocusBlurEvents(element) {
      var _this2 = this;

      _get(_getPrototypeOf(TimeComponent.prototype), "addFocusBlurEvents", this).call(this, element);

      this.addEventListener(element, 'blur', function () {
        element.value = _this2.getValueAsString(element.value);
      });
    }
  }, {
    key: "dataFormat",
    get: function get() {
      return this.component.dataFormat || defaultDataFormat;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TimeComponent.schema();
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var _this3 = this;

      var value = _get(_getPrototypeOf(TimeComponent.prototype), "defaultValue", this);

      if (this.component.multiple && Array.isArray(value)) {
        value = value.map(function (item) {
          return item ? _this3.getStringAsValue(item) : item;
        });
      } else {
        if (value) {
          value = this.getStringAsValue(value);
        }
      }

      return value;
    }
  }, {
    key: "validationValue",
    get: function get() {
      return this.rawData || this.dataValue;
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(TimeComponent.prototype), "inputInfo", this);

      info.attr.type = this.component.inputType;
      return info;
    }
  }, {
    key: "skipMaskValidation",
    get: function get() {
      return true;
    }
  }], [{
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Time',
        icon: 'clock-o',
        group: 'advanced',
        documentation: 'http://help.form.io/userguide/#time',
        weight: 55,
        schema: TimeComponent.schema()
      };
    }
  }]);

  return TimeComponent;
}(_TextField.default);

exports.default = TimeComponent;