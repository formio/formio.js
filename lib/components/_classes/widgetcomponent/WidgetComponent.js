"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

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

var _Input2 = _interopRequireDefault(require("../input/Input"));

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

var WidgetComponent =
/*#__PURE__*/
function (_Input) {
  _inherits(WidgetComponent, _Input);

  _createClass(WidgetComponent, null, [{
    key: "schema",
    value: function schema() {
      return _Input2.default.schema.apply(_Input2.default, arguments);
    }
  }]);

  function WidgetComponent(component, options, data) {
    var _this;

    _classCallCheck(this, WidgetComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WidgetComponent).call(this, component, options, data)); // Add the validators date/

    if (_this.component.validate.hasOwnProperty('strictDateValidation') && _this.widget && _this.widget.settings.type === 'calendar') {
      var _this$validators;

      var validators = _this.component.validate.strictDateValidation ? ['date', 'strictDateValidation'] : ['date'];

      (_this$validators = _this.validators).push.apply(_this$validators, validators);
    }

    if (_this.widget) {
      _this.component.checkDataValidity = function () {
        return _this.checkValidity(_this.data, true);
      };
    }

    return _this;
  }

  _createClass(WidgetComponent, [{
    key: "isEmpty",
    value: function isEmpty(value) {
      if (this.widget && this.widget.enteredDate) {
        return false;
      }

      return _get(_getPrototypeOf(WidgetComponent.prototype), "isEmpty", this).call(this, value);
    }
  }, {
    key: "setCustomValidity",
    value: function setCustomValidity(message, dirty) {
      if (this.widget && this.widget.toggleInvalidClassForWidget) {
        this.widget.toggleInvalidClassForWidget(message);
      }

      return _get(_getPrototypeOf(WidgetComponent.prototype), "setCustomValidity", this).call(this, message, dirty);
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      if (this.widget) {
        this.widget.setValue(value);
      }

      return _get(_getPrototypeOf(WidgetComponent.prototype), "setValue", this).call(this, value, flags);
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, rowData) {
      if (this.widget && this.widget.enteredDate) {
        dirty = true;
      }

      return _get(_getPrototypeOf(WidgetComponent.prototype), "checkValidity", this).call(this, data, dirty, rowData);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return WidgetComponent.schema();
    }
  }, {
    key: "widgetLocale",
    get: function get() {
      if (this.widget && 'widgetLocale' in this.widget) {
        return this.widget.widgetLocale;
      }

      return null;
    }
  }, {
    key: "widgetData",
    get: function get() {
      if (this.widget && 'widgetData' in this.widget) {
        return this.widget.widgetData;
      }

      return null;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }]);

  return WidgetComponent;
}(_Input2.default);

exports.default = WidgetComponent;