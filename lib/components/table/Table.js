"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _builder = _interopRequireDefault(require("../../utils/builder"));

var _NestedComponent2 = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var TableComponent = /*#__PURE__*/function (_NestedComponent) {
  _inherits(TableComponent, _NestedComponent);

  var _super = _createSuper(TableComponent);

  _createClass(TableComponent, [{
    key: "defaultSchema",
    get: function get() {
      return TableComponent.schema();
    }
  }, {
    key: "schema",
    get: function get() {
      var _this2 = this;

      var schema = _lodash.default.omit(_get(_getPrototypeOf(TableComponent.prototype), "schema", this), 'components');

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
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
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
        documentation: 'http://help.form.io/userguide/#table',
        schema: TableComponent.schema()
      };
    }
  }]);

  function TableComponent() {
    var _this;

    _classCallCheck(this, TableComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.noField = true;
    return _this;
  }

  _createClass(TableComponent, [{
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

      _lodash.default.each(this.component.rows, function (row, rowIndex) {
        _this3.table[rowIndex] = [];

        _lodash.default.each(row, function (column, colIndex) {
          _this3.table[rowIndex][colIndex] = [];

          if (_this3.component.cloneRows) {
            if (column.components.length) {
              lastNonEmptyRow[colIndex] = column;
            } else if (lastNonEmptyRow[colIndex]) {
              column.components = _lodash.default.cloneDeep(lastNonEmptyRow[colIndex].components);

              _builder.default.uniquify(_this3.root._form.components, column);
            }
          }

          _lodash.default.each(column.components, function (comp) {
            var component = _this3.createComponent(comp);

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
  }]);

  return TableComponent;
}(_NestedComponent2.default);

exports.default = TableComponent;