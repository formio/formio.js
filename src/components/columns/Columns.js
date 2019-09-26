"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ColumnsComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(ColumnsComponent, _NestedComponent);

  _createClass(ColumnsComponent, [{
    key: "defaultSchema",
    get: function get() {
      return ColumnsComponent.schema();
    }
  }, {
    key: "schema",
    get: function get() {
      var _this2 = this;

      var schema = _lodash.default.omit(_get(_getPrototypeOf(ColumnsComponent.prototype), "schema", this), 'components');

      schema.columns = [];
      this.eachComponent(function (component, index) {
        _lodash.default.merge(component.component, _lodash.default.omit(_this2.component.columns[index], 'components'));

        schema.columns.push(component.schema);
      });

      for (var i = this.components.length; i < this.component.columns.length; i++) {
        schema.columns.push(this.component.columns[i]);
      }

      return schema;
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
          pull: 0
        }, {
          components: [],
          width: 6,
          offset: 0,
          push: 0,
          pull: 0
        }],
        clearOnHide: false,
        input: false,
        tableView: false,
        persistent: false,
        autoAdjust: false,
        hideOnChildrenHidden: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Columns',
        icon: 'fa fa-columns',
        group: 'layout',
        documentation: 'http://help.form.io/userguide/#columns',
        weight: 10,
        schema: ColumnsComponent.schema()
      };
    }
  }]);

  function ColumnsComponent(component, options, data) {
    var _this;

    _classCallCheck(this, ColumnsComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColumnsComponent).call(this, component, options, data));
    _this.rows = [];
    return _this;
  }

  _createClass(ColumnsComponent, [{
    key: "justifyRow",

    /**
     * Justify columns width according to `this.gridSize`.
     * @param {ColumnComponent[]} columns
     * @return {*}
     */
    value: function justifyRow(columns) {
      var visible = _lodash.default.filter(columns, 'visible');

      var nbColumns = columns.length;
      var nbVisible = visible.length;

      if (nbColumns > 0 && nbVisible > 0) {
        var w = Math.floor(this.gridSize / nbVisible);
        var totalWidth = w * nbVisible;
        var span = this.gridSize - totalWidth;

        _lodash.default.each(visible, function (column) {
          column.component.width = w;
        }); // In case when row is not fully filled,
        // extending last col to fill empty space.


        _lodash.default.last(visible).component.width += span;

        _lodash.default.each(visible, function (col) {
          col.element.setAttribute('class', col.className);
        });
      }
    }
    /**
     * Group columns in rows.
     * @return {Array.<ColumnComponent[]>}
     */

  }, {
    key: "groupByRow",
    value: function groupByRow() {
      var _this3 = this;

      var initVal = {
        stack: [],
        rows: []
      };

      var width = function width(x) {
        return x.component.width;
      };

      var result = _lodash.default.reduce(this.components, function (acc, next) {
        var stack = [].concat(_toConsumableArray(acc.stack), [next]);

        if (_lodash.default.sumBy(stack, width) <= _this3.gridSize) {
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
    key: "justify",
    value: function justify() {
      _lodash.default.each(this.rows, this.justifyRow.bind(this));
    }
  }, {
    key: "addComponents",
    value: function addComponents(element, data, options, state) {
      var _this4 = this;

      var container = this.getContainer();
      container.noDrop = true;

      _lodash.default.each(this.component.columns, function (column, index) {
        column.type = 'column'; //fix input: true issue for existent forms

        column.input = false;
        column.hideOnChildrenHidden = _this4.component.hideOnChildrenHidden;

        var component = _this4.addComponent(column, container, _this4.data, null, null, state);

        component.column = index;
      });

      this.rows = this.groupByRow();
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data) {
      if (this.component.autoAdjust) {
        var result = _get(_getPrototypeOf(ColumnsComponent.prototype), "checkConditions", this).call(this, data);

        this.justify();
        return result;
      } else {
        return _get(_getPrototypeOf(ColumnsComponent.prototype), "checkConditions", this).call(this, data);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.rows = [];
      return _get(_getPrototypeOf(ColumnsComponent.prototype), "destroy", this).call(this);
    }
  }, {
    key: "className",
    get: function get() {
      return "row ".concat(_get(_getPrototypeOf(ColumnsComponent.prototype), "className", this));
    }
  }, {
    key: "gridSize",
    get: function get() {
      return 12;
    }
    /** @type {number} */

  }, {
    key: "nbVisible",
    get: function get() {
      return _lodash.default.filter(this.components, 'visible').length;
    }
  }]);

  return ColumnsComponent;
}(_NestedComponent2.default);

exports.default = ColumnsComponent;