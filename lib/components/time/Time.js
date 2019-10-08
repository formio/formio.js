"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _TextField = _interopRequireDefault(require("../textfield/TextField"));

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

var defaultDataFormat = 'HH:mm:ss';

var TimeComponent =
/*#__PURE__*/
function (_TextFieldComponent) {
  _inherits(TimeComponent, _TextFieldComponent);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeComponent).call(this, component, options, data));
    _this.component.inputMask = '99:99';
    _this.component.inputType = _this.component.inputType || 'time';
    return _this;
  }

  _createClass(TimeComponent, [{
    key: "getValueAt",
    value: function getValueAt(index) {
      if (!this.refs.input.length || !this.refs.input[index]) {
        return this.emptyValue;
      }

      var value = this.refs.input[index].value;

      if (!value) {
        return this.emptyValue;
      }

      return this.getStringAsValue(value);
    }
  }, {
    key: "setValueAt",
    value: function setValueAt(index, value) {
      this.refs.input[index].value = value ? this.getValueAsString(value) : value;
    }
  }, {
    key: "getStringAsValue",
    value: function getStringAsValue(view) {
      return view ? (0, _moment.default)(view, this.component.format).format(this.dataFormat) : view;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      return value ? (0, _moment.default)(value, this.dataFormat).format(this.component.format) : value;
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
      var _this2 = this;

      var value = _get(_getPrototypeOf(TimeComponent.prototype), "defaultValue", this);

      if (this.component.multiple && Array.isArray(value)) {
        value = value.map(function (item) {
          return item ? _this2.getStringAsValue(item) : item;
        });
      } else {
        if (value) {
          value = this.getStringAsValue(value);
        }
      }

      return value;
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