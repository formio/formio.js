"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../utils/utils");

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

var _Field = _interopRequireDefault(require("../_classes/field/Field"));

var _NestedDataComponent2 = _interopRequireDefault(require("../_classes/nesteddata/NestedDataComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ContainerComponent = /*#__PURE__*/function (_NestedDataComponent) {
  _inherits(ContainerComponent, _NestedDataComponent);

  var _super = _createSuper(ContainerComponent);

  function ContainerComponent() {
    var _this;

    _classCallCheck(this, ContainerComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.type = 'container';
    return _this;
  }

  _createClass(ContainerComponent, [{
    key: "addComponents",
    value: function addComponents(data, options) {
      return _get(_getPrototypeOf(ContainerComponent.prototype), "addComponents", this).call(this, this.dataValue, options);
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
    key: "componentContext",
    value: function componentContext() {
      return this.dataValue;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var changed = false;
      var hasValue = this.hasValue();

      if (hasValue && _lodash.default.isEmpty(this.dataValue)) {
        flags.noValidate = true;
      }

      if (!value || !_lodash.default.isObject(value) || !hasValue) {
        changed = true;
        this.dataValue = this.defaultValue;
      }

      changed = _get(_getPrototypeOf(ContainerComponent.prototype), "setValue", this).call(this, value, flags) || changed;
      this.updateOnChange(flags, changed);
      return changed;
    }
  }, {
    key: "checkData",
    value: function checkData(data, flags, row, components) {
      var _this2 = this;

      data = data || this.rootValue;
      flags = flags || {};
      row = row || this.data;
      components = components && _lodash.default.isArray(components) ? components : this.getComponents();
      return components.reduce(function (valid, comp) {
        return comp.checkData(data, flags, _this2.dataValue) && valid;
      }, _Component.default.prototype.checkData.call(this, data, flags, row));
    }
  }, {
    key: "focus",
    value: function focus() {
      var focusableElements = (0, _utils.getFocusableElements)(this.element);

      if (focusableElements && focusableElements[0]) {
        focusableElements[0].focus();
      }
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data, flags, row) {
      var _this3 = this;

      // check conditions of parent component first, because it may influence on visibility of it's children
      var check = _Field.default.prototype.checkConditions.call(this, data, flags, row);

      this.getComponents().forEach(function (comp) {
        return comp.checkConditions(data, flags, _this3.dataValue);
      });
      return check;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len2 = arguments.length, extend = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        extend[_key2] = arguments[_key2];
      }

      return _NestedDataComponent2.default.schema.apply(_NestedDataComponent2.default, [{
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
        documentation: '/userguide/#container',
        weight: 10,
        schema: ContainerComponent.schema()
      };
    }
  }]);

  return ContainerComponent;
}(_NestedDataComponent2.default);

exports.default = ContainerComponent;