"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NestedComponent2 = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

var _utils = require("../../utils/utils");

var _Form = _interopRequireDefault(require("../form/Form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PanelComponent = /*#__PURE__*/function (_NestedComponent) {
  _inherits(PanelComponent, _NestedComponent);

  var _super = _createSuper(PanelComponent);

  _createClass(PanelComponent, [{
    key: "checkValidity",
    value: function checkValidity(data, dirty, row, silentCheck) {
      if (!this.checkCondition(row, data)) {
        this.setCustomValidity('');
        return true;
      }

      return this.getComponents().reduce(function (check, comp) {
        return comp.checkValidity(data, dirty, row, silentCheck) && check;
      }, _get(_getPrototypeOf(PanelComponent.prototype), "checkValidity", this).call(this, data, dirty, row, silentCheck));
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return PanelComponent.schema();
    }
  }, {
    key: "templateName",
    get: function get() {
      return 'panel';
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Panel',
        type: 'panel',
        key: 'panel',
        title: 'Panel',
        theme: 'default',
        breadcrumb: 'default',
        components: [],
        clearOnHide: false,
        input: false,
        tableView: false,
        persistent: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Panel',
        icon: 'list-alt',
        group: 'layout',
        documentation: '/userguide/#panels',
        weight: 30,
        schema: PanelComponent.schema()
      };
    }
  }]);

  function PanelComponent() {
    var _this;

    _classCallCheck(this, PanelComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.noField = true;

    _this.on('componentError', function () {
      //change collapsed value only when the panel is collapsed to avoid additional redrawing that prevents validation messages
      if ((0, _utils.hasInvalidComponent)(_assertThisInitialized(_this)) && _this.collapsed) {
        _this.collapsed = false;
      }
    });

    return _this;
  }

  _createClass(PanelComponent, [{
    key: "getComponent",
    value: function getComponent(path, fn, originalPath) {
      var _this$root;

      if (((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.parent) instanceof _Form.default) {
        path = path.replace(this._parentPath, '');
      }

      return _get(_getPrototypeOf(PanelComponent.prototype), "getComponent", this).call(this, path, fn, originalPath);
    }
  }]);

  return PanelComponent;
}(_NestedComponent2.default);

exports.default = PanelComponent;