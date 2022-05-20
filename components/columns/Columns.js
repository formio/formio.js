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

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _NestedComponent2 = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var ColumnsComponent = /*#__PURE__*/function (_NestedComponent) {
  _inherits(ColumnsComponent, _NestedComponent);

  var _super = _createSuper(ColumnsComponent);

  function ColumnsComponent(component, options, data) {
    var _this;

    _classCallCheck(this, ColumnsComponent);

    _this = _super.call(this, component, options, data);
    _this.rows = [];
    return _this;
  }

  _createClass(ColumnsComponent, [{
    key: "schema",
    get: function get() {
      var _schema$columns,
          _this2 = this;

      var schema = _lodash.default.omit(_get(_getPrototypeOf(ColumnsComponent.prototype), "schema", this), ['components']);

      (_schema$columns = schema.columns) === null || _schema$columns === void 0 ? void 0 : _schema$columns.map(function (column, colIndex) {
        column.components.map(function (comp, compIndex) {
          var clonedComp = _lodash.default.clone(comp);

          clonedComp.internal = true;

          var component = _this2.createComponent(clonedComp);

          delete component.component.internal;
          schema.columns[colIndex].components[compIndex] = component.schema;
        });
      });
      return schema;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return ColumnsComponent.schema();
    }
  }, {
    key: "className",
    get: function get() {
      return "row ".concat(_get(_getPrototypeOf(ColumnsComponent.prototype), "className", this));
    }
  }, {
    key: "columnKey",
    get: function get() {
      return "column-".concat(this.id);
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      _get(_getPrototypeOf(ColumnsComponent.prototype), "init", this).call(this);

      this.columns = [];

      _lodash.default.each(this.component.columns, function (column, index) {
        _this3.columns[index] = [];

        if (!column.size) {
          column.size = 'md';
        }

        column.currentWidth = column.width || 0; // Ensure there is a components array.

        if (!Array.isArray(column.components)) {
          column.components = [];
        }

        _lodash.default.each(column.components, function (comp) {
          var component = _this3.createComponent(comp);

          component.column = index;

          _this3.columns[index].push(component);
        });
      });

      if (this.component.autoAdjust && this.options.display !== 'pdf') {
        this.justify();
      }

      this.rows = this.groupByRow();
    }
  }, {
    key: "labelIsHidden",
    value: function labelIsHidden() {
      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _get(_getPrototypeOf(ColumnsComponent.prototype), "render", this).call(this, this.renderTemplate('columns', {
        columnKey: this.columnKey,
        columnComponents: this.columns.map(function (column) {
          return _this4.renderComponents(column);
        })
      }));
    }
  }, {
    key: "justifyColumn",
    value: function justifyColumn(items, index) {
      var toAdjust = _lodash.default.every(items, function (item) {
        return !item.visible;
      });

      var column = this.component.columns[index];
      var width = toAdjust && items.length ? 0 : column.width;
      var shouldRedraw = !_lodash.default.isEqual(width, column.currentWidth);
      column.currentWidth = width;
      return shouldRedraw;
    }
  }, {
    key: "justify",
    value: function justify() {
      var _this5 = this;

      return this.columns.reduce(function (redraw, items, index) {
        return _this5.justifyColumn(items, index) || redraw;
      }, false);
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this6 = this;

      this.loadRefs(element, _defineProperty({}, this.columnKey, 'multiple'));

      var superAttach = _get(_getPrototypeOf(ColumnsComponent.prototype), "attach", this).call(this, element);

      if (this.refs[this.columnKey]) {
        this.refs[this.columnKey].forEach(function (column, index) {
          return _this6.attachComponents(column, _this6.columns[index], _this6.component.columns[index].components);
        });
      }

      return superAttach;
    }
  }, {
    key: "gridSize",
    get: function get() {
      return 12;
    }
    /**
     * Group columns in rows.
     * @return {Array.<ColumnComponent[]>}
     */

  }, {
    key: "groupByRow",
    value: function groupByRow() {
      var _this7 = this;

      var initVal = {
        stack: [],
        rows: []
      };

      var width = function width(x) {
        return x.component.width;
      };

      var result = _lodash.default.reduce(this.components, function (acc, next) {
        var stack = [].concat(_toConsumableArray(acc.stack), [next]);

        if (_lodash.default.sumBy(stack, width) <= _this7.gridSize) {
          acc.stack = stack;
          return acc;
        } else {
          acc.rows = [].concat(_toConsumableArray(acc.rows), [acc.stack]);
          acc.stack = [next];
          return acc;
        }
      }, initVal);

      return _lodash.default.concat(result.rows, [result.stack]);
    }
  }, {
    key: "checkData",
    value: function checkData(data, flags, row, components) {
      var isValid = _get(_getPrototypeOf(ColumnsComponent.prototype), "checkData", this).call(this, data, flags, row, components);

      if (this.component.autoAdjust && this.options.display !== 'pdf') {
        var redraw = this.justify();

        if (redraw) {
          this.redraw();
        }
      }

      return isValid;
    }
  }, {
    key: "detach",
    value: function detach(all) {
      _get(_getPrototypeOf(ColumnsComponent.prototype), "detach", this).call(this, all);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(ColumnsComponent.prototype), "destroy", this).call(this);

      this.columns = [];
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Columns',
        key: 'columns',
        type: 'columns',
        columns: [{
          components: [],
          width: 6,
          offset: 0,
          push: 0,
          pull: 0,
          size: 'md'
        }, {
          components: [],
          width: 6,
          offset: 0,
          push: 0,
          pull: 0,
          size: 'md'
        }],
        clearOnHide: false,
        input: false,
        tableView: false,
        persistent: false,
        autoAdjust: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Columns',
        icon: 'columns',
        group: 'layout',
        documentation: '/userguide/#columns',
        weight: 10,
        schema: ColumnsComponent.schema()
      };
    }
  }]);

  return ColumnsComponent;
}(_NestedComponent2.default);

exports.default = ColumnsComponent;