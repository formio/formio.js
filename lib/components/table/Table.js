'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Components = require('../Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableComponent = exports.TableComponent = function (_FormioComponents) {
  _inherits(TableComponent, _FormioComponents);

  function TableComponent() {
    _classCallCheck(this, TableComponent);

    return _possibleConstructorReturn(this, (TableComponent.__proto__ || Object.getPrototypeOf(TableComponent)).apply(this, arguments));
  }

  _createClass(TableComponent, [{
    key: 'addComponents',


    /**
     *
     * @param element
     * @param data
     */
    value: function addComponents(element, data) {
      var _this2 = this;

      // Build the body.
      this.tbody = this.ce('tbody');
      _lodash2.default.each(this.component.rows, function (row, rowIndex) {
        var tr = _this2.ce('tr');
        _lodash2.default.each(row, function (column, colIndex) {
          var td = _this2.ce('td', {
            id: _this2.id + '-' + rowIndex + '-' + colIndex
          });
          _lodash2.default.each(column.components, function (comp) {
            comp.tableRow = rowIndex;
            comp.tableColumn = colIndex;
            _this2.addComponent(comp, td, data);
          });

          if (_this2.options.builder) {
            if (!column.components || !column.components.length) {
              td.appendChild(_this2.ce('div', {
                id: _this2.id + '-' + rowIndex + '-' + colIndex + '-placeholder',
                class: 'alert alert-info',
                style: 'text-align:center; margin-bottom: 0px;',
                role: 'alert'
              }, _this2.text('Drag and Drop a form component')));
              td.tableRow = rowIndex;
              td.tableColumn = colIndex;
            }
            _this2.root.addDragContainer(td, _this2, {
              onDrop: function onDrop(element, target, source, sibling, component) {
                component.tableRow = target.tableRow;
                component.tableColumn = target.tableColumn;
              },
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
    key: 'buildHeader',
    value: function buildHeader() {
      var _this3 = this;

      if (this.component.header && this.component.header.length) {
        var thead = this.ce('thead');
        var thr = this.ce('tr');
        _lodash2.default.each(this.component.header, function (header) {
          var th = _this3.ce('th');
          th.appendChild(_this3.text(header));
          thr.appendChild(th);
        });
        thead.appendChild(thr);
        this.table.appendChild(thead);
      }
    }
  }, {
    key: 'build',
    value: function build() {
      var _this4 = this;

      this.element = this.ce('div', {
        id: this.id,
        class: 'table-responsive'
      });
      this.element.component = this;

      var tableClass = 'table ';
      _lodash2.default.each(['striped', 'bordered', 'hover', 'condensed'], function (prop) {
        if (_this4.component[prop]) {
          tableClass += 'table-' + prop + ' ';
        }
      });
      this.table = this.ce('table', {
        class: tableClass
      });

      this.buildHeader();
      this.addComponents();
      this.table.appendChild(this.tbody);
      this.element.appendChild(this.table);
    }
  }, {
    key: 'defaultSchema',
    get: function get() {
      return TableComponent.schema();
    }
  }, {
    key: 'schema',
    get: function get() {
      var schema = _lodash2.default.omit(_get(TableComponent.prototype.__proto__ || Object.getPrototypeOf(TableComponent.prototype), 'schema', this), 'components');
      schema.rows = [];
      this.eachComponent(function (component) {
        if (!schema.rows || !schema.rows.length) {
          schema.rows = [[{ components: [] }, { components: [] }, { components: [] }], [{ components: [] }, { components: [] }, { components: [] }], [{ components: [] }, { components: [] }, { components: [] }]];
        }
        if (!schema.rows[component.tableRow]) {
          schema.rows[component.tableRow] = [];
        }
        if (!schema.rows[component.tableRow][component.tableColumn]) {
          schema.rows[component.tableRow][component.column] = { components: [] };
        }
        schema.rows[component.tableRow][component.tableColumn].components.push(component.schema);
      });
      if (!schema.rows.length) {
        schema.rows = [[{ components: [] }, { components: [] }, { components: [] }], [{ components: [] }, { components: [] }, { components: [] }], [{ components: [] }, { components: [] }, { components: [] }]];
      }
      return schema;
    }
  }], [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Components.FormioComponents.schema.apply(_Components.FormioComponents, [{
        type: 'table',
        input: false,
        key: 'table',
        numRows: 3,
        numCols: 3,
        rows: [[{ components: [] }, { components: [] }, { components: [] }], [{ components: [] }, { components: [] }, { components: [] }], [{ components: [] }, { components: [] }, { components: [] }]],
        header: [],
        caption: '',
        striped: false,
        bordered: false,
        hover: false,
        condensed: false
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
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

  return TableComponent;
}(_Components.FormioComponents);