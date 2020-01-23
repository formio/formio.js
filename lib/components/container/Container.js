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

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _NestedComponent2 = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

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

var ContainerComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(ContainerComponent, _NestedComponent);

  _createClass(ContainerComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Container',
        type: 'container',
        key: 'container',
        clearOnHide: true,
        input: true,
        tree: true,
        hideLabel: true,
        components: []
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Container',
        icon: 'folder-open',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#container',
        weight: 10,
        schema: ContainerComponent.schema()
      };
    }
  }]);

  function ContainerComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContainerComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContainerComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.type = 'container';
    return _this;
  }

  _createClass(ContainerComponent, [{
    key: "addComponents",
    value: function addComponents(data, options) {
      return _get(_getPrototypeOf(ContainerComponent.prototype), "addComponents", this).call(this, this.dataValue, options);
    }
  }, {
    key: "hasChanged",
    value: function hasChanged(newValue, oldValue) {
      return !_lodash.default.isEqual(newValue, oldValue);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString() {
      return '[Complex Data]';
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, flags) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Component.default.prototype.updateValue.call(this, value, flags);
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      flags = flags || {};

      if (!value || !_lodash.default.isObject(value)) {
        return false;
      }

      var hasValue = this.hasValue();

      if (hasValue && _lodash.default.isEmpty(this.dataValue)) {
        flags.noValidate = true;
      }

      if (!hasValue) {
        // Set the data value and then reset each component to use the new data object.
        this.dataValue = {};
      }

      return _get(_getPrototypeOf(ContainerComponent.prototype), "setValue", this).call(this, value, flags);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return ContainerComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return {};
    }
  }, {
    key: "templateName",
    get: function get() {
      return 'container';
    }
  }, {
    key: "allowData",
    get: function get() {
      return true;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      var _this2 = this;

      this._data = value;
      this.eachComponent(function (component) {
        component.data = _this2.dataValue;
      });
    }
  }]);

  return ContainerComponent;
}(_NestedComponent2.default);

exports.default = ContainerComponent;