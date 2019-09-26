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

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

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

var ColumnComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(ColumnComponent, _NestedComponent);

  _createClass(ColumnComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Column',
        key: 'column',
        type: 'column',
        input: false
      }].concat(extend));
    }
  }]);

  function ColumnComponent(component, options, data) {
    var _this;

    _classCallCheck(this, ColumnComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColumnComponent).call(this, component, options, data));
    _this.noEdit = true;
    return _this;
  }

  _createClass(ColumnComponent, [{
    key: "conditionallyVisible",
    value: function conditionallyVisible(data) {
      if (!this.component.hideOnChildrenHidden) {
        return _get(_getPrototypeOf(ColumnComponent.prototype), "conditionallyVisible", this).call(this, data);
      } // Check children components for visibility.


      if (_lodash.default.every(this.getComponents(), ['visible', false])) {
        return false;
      }

      return _get(_getPrototypeOf(ColumnComponent.prototype), "conditionallyVisible", this).call(this, data);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return ColumnComponent.schema();
    }
  }, {
    key: "className",
    get: function get() {
      var comp = this.component;
      var width = " col-sm-".concat(comp.width ? comp.width : 6);
      var offset = " col-sm-offset-".concat(comp.offset ? comp.offset : 0);
      var push = " col-sm-push-".concat(comp.push ? comp.push : 0);
      var pull = " col-sm-pull-".concat(comp.pull ? comp.pull : 0);
      return "col".concat(width).concat(offset).concat(push).concat(pull);
    }
  }]);

  return ColumnComponent;
}(_NestedComponent2.default);

exports.default = ColumnComponent;