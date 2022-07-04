"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _builder = _interopRequireDefault(require("../../utils/builder"));

var _NestedComponent2 = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TableComponent = /*#__PURE__*/function (_NestedComponent) {
  _inherits(TableComponent, _NestedComponent);

  var _super = _createSuper(TableComponent);

  function TableComponent() {
    var _this;

    _classCallCheck(this, TableComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.noField = true;
    return _this;
  }

  _createClass(TableComponent, [{
    key: "defaultSchema",
    get: function get() {
      return TableComponent.schema();
    }
  }, {
    key: "schema",
    get: function get() {
      var _this2 = this;

      var schema = _lodash["default"].omit(_get(_getPrototypeOf(TableComponent.prototype), "schema", this), 'components');

      schema.rows = [];
      this.eachComponent(function (component) {
        if (!schema.rows || !schema.rows.length) {
          schema.rows = TableComponent.emptyTable(_this2.component.numRows, _this2.component.numCols);
        }

        if (!schema.rows[component.tableRow]) {
          schema.rows[component.tableRow] = [];
        }

        if (!schema.rows[component.tableRow][component.tableColumn]) {
          schema.rows[component.tableRow][component.column] = {
            components: []
          };
        }

        schema.rows[component.tableRow][component.tableColumn].components.push(component.schema);
      });

      if (!schema.rows.length) {
        schema.rows = TableComponent.emptyTable(this.component.numRows, this.component.numCols);
      }

      return schema;
    }
  }, {
    key: "className",
    get: function get() {
      var name = "table-responsive ".concat(_get(_getPrototypeOf(TableComponent.prototype), "className", this));

      if (!this.component.bordered) {
        name += ' no-top-border-table';
      }

      return name;
    }
  }, {
    key: "cellClassName",
    get: function get() {
      var name = '';

      if (this.component.cellAlignment) {
        name = "cell-align-".concat(this.component.cellAlignment);
      }

      return name;
    }
  }, {
    key: "tableKey",
    get: function get() {
      return "table-".concat(this.key);
    }
  }, {
    key: "colWidth",
    get: function get() {
      var numCols = this.component.numCols;

      if (!numCols || typeof numCols !== 'number') {
        return '';
      }

      return Math.floor(12 / numCols).toString();
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      _get(_getPrototypeOf(TableComponent.prototype), "init", this).call(this); // Ensure component.rows has the correct number of rows and columns.


      for (var rowIndex = 0; rowIndex < this.component.numRows; rowIndex++) {
        this.component.rows[rowIndex] = this.component.rows[rowIndex] || [];

        for (var colIndex = 0; colIndex < this.component.numCols; colIndex++) {
          this.component.rows[rowIndex][colIndex] = this.component.rows[rowIndex][colIndex] || {
            components: []
          };
        }

        this.component.rows[rowIndex] = this.component.rows[rowIndex].slice(0, this.component.numCols);
      }

      this.component.rows = this.component.rows.slice(0, this.component.numRows);
      var lastNonEmptyRow = [];
      this.table = [];

      _lodash["default"].each(this.component.rows, function (row, rowIndex) {
        _this3.table[rowIndex] = [];

        _lodash["default"].each(row, function (column, colIndex) {
          _this3.table[rowIndex][colIndex] = [];

          if (_this3.component.cloneRows) {
            if (column.components.length) {
              lastNonEmptyRow[colIndex] = column;
            } else if (lastNonEmptyRow[colIndex]) {
              column.components = _lodash["default"].cloneDeep(lastNonEmptyRow[colIndex].components);

              _builder["default"].uniquify(_this3.root._form.components, column);
            }
          }

          _lodash["default"].each(column.components, function (comp) {
            var columnComponent;

            if (_this3.builderMode) {
              comp.id = comp.id + rowIndex;
              columnComponent = comp;
            } else {
              columnComponent = _objectSpread(_objectSpread({}, comp), {}, {
                id: comp.id + rowIndex
              });
            }

            var component = _this3.createComponent(columnComponent);

            component.tableRow = rowIndex;
            component.tableColumn = colIndex;

            _this3.table[rowIndex][colIndex].push(component);
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _get(_getPrototypeOf(TableComponent.prototype), "render", this).call(this, this.renderTemplate('table', {
        cellClassName: this.cellClassName,
        tableKey: this.tableKey,
        colWidth: this.colWidth,
        tableComponents: this.table.map(function (row) {
          return row.map(function (column) {
            return _this4.renderComponents(column);
          });
        })
      }));
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this5 = this;

      var keys = this.table.reduce(function (prev, row, rowIndex) {
        prev["".concat(_this5.tableKey, "-").concat(rowIndex)] = 'multiple';
        return prev;
      }, {});
      this.loadRefs(element, keys);

      var superAttach = _get(_getPrototypeOf(TableComponent.prototype), "attach", this).call(this, element);

      this.table.forEach(function (row, rowIndex) {
        row.forEach(function (column, columnIndex) {
          _this5.attachComponents(_this5.refs["".concat(_this5.tableKey, "-").concat(rowIndex)][columnIndex], _this5.table[rowIndex][columnIndex], _this5.component.rows[rowIndex][columnIndex].components);
        });
      });
      return superAttach;
    }
  }, {
    key: "destroy",
    value: function destroy(all) {
      _get(_getPrototypeOf(TableComponent.prototype), "destroy", this).call(this, all);

      delete this.table;
    }
  }], [{
    key: "emptyTable",
    value: function emptyTable(numRows, numCols) {
      var rows = [];

      for (var i = 0; i < numRows; i++) {
        var cols = [];

        for (var j = 0; j < numCols; j++) {
          cols.push({
            components: []
          });
        }

        rows.push(cols);
      }

      return rows;
    }
  }, {
    key: "schema",
    value: function schema() {
      for (var _len2 = arguments.length, extend = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        extend[_key2] = arguments[_key2];
      }

      return _NestedComponent2["default"].schema.apply(_NestedComponent2["default"], [{
        label: 'Table',
        type: 'table',
        input: false,
        key: 'table',
        numRows: 3,
        numCols: 3,
        rows: TableComponent.emptyTable(3, 3),
        header: [],
        caption: '',
        cloneRows: false,
        striped: false,
        bordered: false,
        hover: false,
        condensed: false,
        persistent: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Table',
        group: 'layout',
        icon: 'table',
        weight: 40,
        documentation: '/userguide/forms/layout-components#table',
        schema: TableComponent.schema()
      };
    }
  }]);

  return TableComponent;
}(_NestedComponent2["default"]);

exports["default"] = TableComponent;