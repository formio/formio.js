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

var TableComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(TableComponent, _NestedComponent);

  _createClass(TableComponent, null, [{
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
        type: 'table',
        input: false,
        key: 'table',
        numRows: 3,
        numCols: 3,
        rows: TableComponent.emptyTable(3, 3),
        header: [],
        caption: '',
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
        icon: 'fa fa-table',
        weight: 40,
        documentation: 'http://help.form.io/userguide/#table',
        schema: TableComponent.schema()
      };
    }
  }]);

  function TableComponent(component, options, data) {
    var _this;

    _classCallCheck(this, TableComponent);

    var originalRows = _lodash.default.cloneDeep(component.rows);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableComponent).call(this, component, options, data));

    if (!_lodash.default.isEqual(originalRows, _this.component.rows)) {
      _this.component.rows = originalRows;
    }

    return _this;
  }

  _createClass(TableComponent, [{
    key: "addComponents",

    /**
     *
     * @param element
     * @param data
     */
    value: function addComponents(element, data, options, state) {
      var _this2 = this;

      // Build the body.
      this.tbody = this.ce('tbody');

      _lodash.default.each(this.component.rows, function (row, rowIndex) {
        var tr = _this2.ce('tr');

        _lodash.default.each(row, function (column, colIndex) {
          var td = _this2.ce('td', {
            id: "".concat(_this2.id, "-").concat(rowIndex, "-").concat(colIndex)
          });

          _lodash.default.each(column.components, function (comp) {
            var component = _this2.addComponent(comp, td, data, null, null, state);

            component.tableRow = rowIndex;
            component.tableColumn = colIndex;
          });

          if (_this2.options.builder) {
            if (!column.components || !column.components.length) {
              td.appendChild(_this2.ce('div', {
                id: "".concat(_this2.id, "-").concat(rowIndex, "-").concat(colIndex, "-placeholder"),
                class: 'alert alert-info',
                style: 'text-align:center; margin-bottom: 0px;',
                role: 'alert'
              }, _this2.text('Drag and Drop a form component')));
            }

            _this2.root.addDragContainer(td, _this2, {
              onSave: function onSave(component) {
                component.tableRow = rowIndex;
                component.tableColumn = colIndex;
              }
            });
          }

          tr.appendChild(td);
        });

        _this2.tbody.appendChild(tr);
      });
    }
  }, {
    key: "buildHeader",
    value: function buildHeader() {
      var _this3 = this;

      if (this.component.header && this.component.header.length) {
        var thead = this.ce('thead');
        var thr = this.ce('tr');

        _lodash.default.each(this.component.header, function (header) {
          var th = _this3.ce('th');

          th.appendChild(_this3.text(header));
          thr.appendChild(th);
        });

        thead.appendChild(thr);
        this.table.appendChild(thead);
      }
    }
  }, {
    key: "build",
    value: function build(state) {
      var _this4 = this;

      this.element = this.ce('div', {
        id: this.id,
        class: "".concat(this.className, "  table-responsive")
      });
      this.element.component = this;
      var tableClass = 'table ';

      _lodash.default.each(['striped', 'bordered', 'hover', 'condensed'], function (prop) {
        if (_this4.component[prop]) {
          tableClass += "table-".concat(prop, " ");
        }
      });

      this.table = this.ce('table', {
        class: tableClass
      });
      this.buildHeader();
      this.addComponents(null, null, null, state);
      this.table.appendChild(this.tbody);
      this.element.appendChild(this.table);
      this.attachLogic();
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TableComponent.schema();
    }
  }, {
    key: "schema",
    get: function get() {
      var schema = _lodash.default.omit(_get(_getPrototypeOf(TableComponent.prototype), "schema", this), 'components');

      schema.rows = TableComponent.emptyTable(this.component.numRows, this.component.numCols);
      this.eachComponent(function (component) {
        var row = schema.rows[component.tableRow];
        var col = row && row[component.tableColumn];

        if (!row || !col) {
          return false;
        }

        schema.rows[component.tableRow][component.tableColumn].components.push(component.schema);
      });
      return schema;
    }
  }]);

  return TableComponent;
}(_NestedComponent2.default);

exports.default = TableComponent;