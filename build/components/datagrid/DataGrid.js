'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _Components = require('../Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataGridComponent = exports.DataGridComponent = function (_FormioComponents) {
  _inherits(DataGridComponent, _FormioComponents);

  function DataGridComponent(component, options, data) {
    _classCallCheck(this, DataGridComponent);

    var _this = _possibleConstructorReturn(this, (DataGridComponent.__proto__ || Object.getPrototypeOf(DataGridComponent)).call(this, component, options, data));

    _this.type = 'datagrid';
    return _this;
  }

  _createClass(DataGridComponent, [{
    key: 'build',
    value: function build() {
      this.createElement();
      this.createLabel(this.element);
      if (!this.data.hasOwnProperty(this.component.key)) {
        this.addNewValue();
      }
      this.visibleColumns = true;
      this.buildTable();
      this.createDescription(this.element);
    }
  }, {
    key: 'buildTable',
    value: function buildTable(data) {
      var _this2 = this;

      data = data || {};
      if (this.tableElement) {
        this.element.removeChild(this.tableElement);
        this.tableElement.innerHTML = '';
      }

      var tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
      (0, _each3.default)(['striped', 'bordered', 'hover', 'condensed'], function (prop) {
        if (_this2.component[prop]) {
          tableClass += 'table-' + prop + ' ';
        }
      });
      this.tableElement = this.ce('table', {
        class: tableClass
      });

      var thead = this.ce('thead');

      // Build the header.
      var tr = this.ce('tr');
      (0, _each3.default)(this.component.components, function (comp) {
        if (_this2.visibleColumns === true || _this2.visibleColumns[comp.key]) {
          var th = _this2.ce('th');
          if (comp.validate && comp.validate.required) {
            th.setAttribute('class', 'field-required');
          }
          var title = comp.label || comp.title;
          if (title) {
            th.appendChild(_this2.text(title));
            _this2.createTooltip(th, comp);
          }
          tr.appendChild(th);
        }
      });

      // Add the remove column if it is not disabled.
      if (!this.shouldDisable) {
        var th = this.ce('th');
        tr.appendChild(th);
      }

      thead.appendChild(tr);
      this.tableElement.appendChild(thead);

      // Create the table body.
      this.tbody = this.ce('tbody');

      // Build the rows.
      this.buildRows(data);

      // Add the body to the table and to the element.
      this.tableElement.appendChild(this.tbody);
      this.element.appendChild(this.tableElement);
    }
  }, {
    key: 'buildRows',
    value: function buildRows(data) {
      var _this3 = this;

      this.tbody.innerHTML = '';
      this.rows = [];
      this.components = [];
      (0, _each3.default)(this.data[this.component.key], function (row, index) {
        var tr = _this3.ce('tr');
        var cols = {};
        (0, _each3.default)(_this3.component.components, function (col) {
          var column = (0, _cloneDeep3.default)(col);
          column.label = false;
          column.row = _this3.row + '-' + index;
          var options = (0, _clone3.default)(_this3.options);
          options.name += '[' + index + ']';
          var comp = _this3.createComponent(column, options, row);
          if (row.hasOwnProperty(column.key)) {
            comp.setValue(row[column.key]);
          } else if (comp.type === 'components') {
            comp.setValue(row);
          }
          cols[column.key] = comp;
          if (_this3.visibleColumns === true || _this3.visibleColumns[col.key]) {
            var td = _this3.ce('td');
            td.appendChild(comp.element);
            tr.appendChild(td);
            comp.checkConditions(data);
          }
        });
        _this3.rows.push(cols);

        // Add the remove column if not disabled.
        if (!_this3.shouldDisable) {
          var td = _this3.ce('td');
          td.appendChild(_this3.removeButton(index));
          tr.appendChild(td);
        }

        _this3.tbody.appendChild(tr);
      });

      // Add the add button if not disabled.
      if (!this.shouldDisable) {
        var tr = this.ce('tr');
        var td = this.ce('td', {
          colspan: this.component.components.length + 1
        });
        td.appendChild(this.addButton());
        tr.appendChild(td);
        this.tbody.appendChild(tr);
      }
    }
  }, {
    key: 'checkConditions',
    value: function checkConditions(data) {
      var _this4 = this;

      var show = _get(DataGridComponent.prototype.__proto__ || Object.getPrototypeOf(DataGridComponent.prototype), 'checkConditions', this).call(this, data);
      var rebuild = false;
      if (this.visibleColumns === true) {
        this.visibleColumns = {};
      }
      (0, _each3.default)(this.component.components, function (col) {
        var showColumn = false;
        (0, _each3.default)(_this4.rows, function (comps) {
          showColumn |= comps[col.key].checkConditions(data);
        });
        if (_this4.visibleColumns[col.key] && !showColumn || !_this4.visibleColumns[col.key] && showColumn) {
          rebuild = true;
        }

        _this4.visibleColumns[col.key] = showColumn;
        show |= showColumn;
      });

      // If a rebuild is needed, then rebuild the table.
      if (rebuild && show) {
        this.buildTable(data);
      }

      // Return if this table should show.
      return show;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      if (!value) {
        return;
      }
      if (!(0, _isArray3.default)(value)) {
        return;
      }

      this.value = value;

      // Add needed rows.
      for (var i = this.rows.length; i < value.length; i++) {
        this.addValue();
      }

      (0, _each3.default)(this.rows, function (row, index) {
        if (value.length <= index) {
          return;
        }
        (0, _each3.default)(row, function (col, key) {
          if (col.type === 'components') {
            col.setValue(value[index], flags);
          } else if (value[index].hasOwnProperty(key)) {
            col.setValue(value[index][key], flags);
          }
        });
      });
    }

    /**
     * Get the value of this component.
     *
     * @returns {*}
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      var values = [];
      (0, _each3.default)(this.rows, function (row) {
        var value = {};
        (0, _each3.default)(row, function (col) {
          if (col && col.component && col.component.key) {
            value[col.component.key] = col.getValue();
          }
        });
        values.push(value);
      });
      return values;
    }
  }, {
    key: 'defaultValue',
    get: function get() {
      return {};
    }
  }]);

  return DataGridComponent;
}(_Components.FormioComponents);