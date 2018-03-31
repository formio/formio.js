'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
      if (!this.dataValue.length) {
        this.addNewValue();
      }
      this.visibleColumns = true;
      this.buildTable();
      this.createDescription(this.element);
    }
  }, {
    key: 'buildTable',
    value: function buildTable() {
      var _this2 = this;

      if (this.tableElement) {
        this.removeChild(this.tableElement);
        this.tableElement.innerHTML = '';
      }

      var tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
      _lodash2.default.each(['striped', 'bordered', 'hover', 'condensed'], function (prop) {
        if (_this2.component[prop]) {
          tableClass += 'table-' + prop + ' ';
        }
      });
      this.tableElement = this.ce('table', {
        class: tableClass
      });

      this.tableElement.appendChild(this.createHeader());

      // Build rows the first time.
      this.rows = [];

      // Check if there is a Min Length Validation
      if (this.component.validate && this.component.validate.minLength > this.dataValue.length) {
        var toAdd = this.component.validate.minLength - this.dataValue.length;
        for (var i = 0; i < toAdd; i++) {
          this.dataValue.push({});
        }
      }

      this.tableRows = this.dataValue.map(function (row, rowIndex) {
        return _this2.buildRow(row, rowIndex);
      });
      this.tbody = this.ce('tbody', null, this.tableRows);
      // Add the body to the table and to the element.
      this.tableElement.appendChild(this.tbody);

      var addButton = this.createAddButton();
      if (addButton) {
        this.tableElement.appendChild(addButton);
      }

      this.element.appendChild(this.tableElement);
    }

    // Build the header.

  }, {
    key: 'createHeader',
    value: function createHeader() {
      var _this3 = this;

      var thead = this.ce('thead', null, this.ce('tr', null, [this.component.components.map(function (comp) {
        if (_this3.visibleColumns === true || _this3.visibleColumns[comp.key]) {
          var th = _this3.ce('th');
          if (comp.validate && comp.validate.required) {
            th.setAttribute('class', 'field-required');
          }
          var title = comp.label || comp.title;
          if (title) {
            th.appendChild(_this3.text(title));
            _this3.createTooltip(th, comp);
          }
          return th;
        }
      }), this.shouldDisable ? null : this.ce('th', null, ['top', 'both'].indexOf(this.component.addAnotherPosition) !== -1 ? this.addButton(true) : null)]));
      return thead;
    }
  }, {
    key: 'createAddButton',
    value: function createAddButton() {
      return !this.shouldDisable && (!this.component.addAnotherPosition || this.component.addAnotherPosition === 'bottom' || this.component.addAnotherPosition === 'both') ? this.ce('tfoot', null, this.ce('tr', null, this.ce('td', { colspan: this.component.components.length + 1 }, this.addButton()))) : null;
    }
  }, {
    key: 'checkAndRemoveAddButton',
    value: function checkAndRemoveAddButton() {
      //check validation and remove add button
      if (this.component.validate && this.tableElement.lastChild.firstChild && this.component.validate.maxLength <= this.dataValue.length) {
        this.tableElement.lastChild.firstChild.remove();
      } else if (this.component.validate && !this.tableElement.lastChild.firstChild && this.component.validate.maxLength > this.dataValue.length) {
        this.tableElement.lastChild.appendChild(this.ce('tr', null, this.ce('td', { colspan: this.component.components.length + 1 }, this.addButton())));
      }
    }
  }, {
    key: 'buildRows',
    value: function buildRows(data) {
      var _this4 = this;

      var addRemoveButton = this.addRemoveButton();

      this.dataValue.forEach(function (row, rowIndex) {
        // New Row.
        if (!_this4.tableRows[rowIndex]) {
          _this4.tableRows[rowIndex] = _this4.buildRow(row, rowIndex, data);
          _this4.tbody.insertBefore(_this4.tableRows[rowIndex], _this4.tbody.children[rowIndex + 1]);
        }
        // Update existing
        else if (!_lodash2.default.isEqual(row, _this4.tableRows[rowIndex].data) || !_lodash2.default.isEqual(_this4.visibleColumns, _this4.tableRows[rowIndex].visibleColumns)) {
            _this4.removeRowComponents(rowIndex);
            var newRow = _this4.buildRow(row, rowIndex, data);
            _this4.tbody.replaceChild(newRow, _this4.tableRows[rowIndex]);
            _this4.tableRows[rowIndex] = newRow;
          }

        if (addRemoveButton) {
          _this4.ensureRemoveButtonIsPresent(rowIndex);
        } else {
          _this4.ensureRemoveButtonIsAbsent(rowIndex);
        }
      });
      // Remove any extra rows.
      for (var rowIndex = this.tableRows.length; rowIndex > this.dataValue.length; rowIndex--) {
        this.removeChildFrom(this.tableRows[rowIndex - 1], this.tbody);
        this.tableRows.splice(rowIndex - 1, 1);
      }

      this.checkAndRemoveAddButton();
    }
  }, {
    key: 'ensureRemoveButtonIsPresent',
    value: function ensureRemoveButtonIsPresent(index) {
      var row = this.tableRows[index];

      if (row.children.length > this.component.components.length) {
        return;
      }

      row.appendChild(this.ce('td', null, this.removeButton(index)));
    }
  }, {
    key: 'ensureRemoveButtonIsAbsent',
    value: function ensureRemoveButtonIsAbsent(index) {
      var row = this.tableRows[index];

      if (row.children.length === this.component.components.length) {
        return;
      }

      row.removeChild(row.lastChild);
    }
  }, {
    key: 'buildRow',
    value: function buildRow(row, index) {
      var _this5 = this;

      this.rows[index] = {};
      var element = this.ce('tr', null, [this.component.components.map(function (col, colIndex) {
        return _this5.buildComponent(col, colIndex, row, index);
      }), this.addRemoveButton() ? this.ce('td', null, this.removeButton(index)) : null]);
      element.data = _lodash2.default.cloneDeep(row);
      element.visibleColumns = _lodash2.default.cloneDeep(this.visibleColumns);
      return element;
    }
  }, {
    key: 'addRemoveButton',
    value: function addRemoveButton() {
      return !this.shouldDisable && this.component.validate && this.dataValue.length > this.component.validate.minLength;
    }
  }, {
    key: 'removeRowComponents',
    value: function removeRowComponents(rowIndex) {
      var _this6 = this;

      // Clean up components list.
      Object.keys(this.rows[rowIndex]).forEach(function (key) {
        _this6.removeComponent(_this6.rows[rowIndex][key]);
      });
      delete this.rows[rowIndex];
    }
  }, {
    key: 'buildComponent',
    value: function buildComponent(col, colIndex, row, rowIndex) {
      var column = _lodash2.default.cloneDeep(col);
      column.label = false;
      column.row = rowIndex + '-' + colIndex;
      var options = _lodash2.default.clone(this.options);
      options.name += '[' + colIndex + ']';
      var comp = this.createComponent(column, options, row);
      if (row.hasOwnProperty(column.key)) {
        comp.setValue(row[column.key]);
      } else if (comp.type === 'components') {
        comp.setValue(row);
      }
      this.rows[rowIndex][column.key] = comp;
      if (this.visibleColumns === true || this.visibleColumns[column.key]) {
        return this.ce('td', null, comp.element);
      }
    }
  }, {
    key: 'checkConditions',
    value: function checkConditions(data) {
      var _this7 = this;

      var show = _get(DataGridComponent.prototype.__proto__ || Object.getPrototypeOf(DataGridComponent.prototype), 'checkConditions', this).call(this, data);
      // If table isn't visible, don't bother calculating columns.
      if (!show) {
        return false;
      }
      var rebuild = false;
      if (this.visibleColumns === true) {
        this.visibleColumns = {};
      }
      _lodash2.default.each(this.component.components, function (col) {
        var showColumn = false;
        _lodash2.default.each(_this7.rows, function (comps) {
          showColumn |= comps[col.key].checkConditions(data);
        });
        if (_this7.visibleColumns[col.key] && !showColumn || !_this7.visibleColumns[col.key] && showColumn) {
          rebuild = true;
        }

        _this7.visibleColumns[col.key] = showColumn;
        show |= showColumn;
      });

      // If a rebuild is needed, then rebuild the table.
      if (rebuild) {
        this.buildRows();
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
      if (!Array.isArray(value)) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value = [value];
        } else {
          return;
        }
      }

      this.dataValue = value;
      this.buildRows();
      _lodash2.default.each(this.rows, function (row, index) {
        if (value.length <= index) {
          return;
        }
        _lodash2.default.each(row, function (col, key) {
          if (col.type === 'components') {
            col.setValue(value[index], flags);
          } else if (value[index].hasOwnProperty(key)) {
            col.setValue(value[index][key], flags);
          } else {
            col.data = value[index];
            col.setValue(col.defaultValue, flags);
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
      if (this.viewOnly) {
        return this.dataValue;
      }
      var values = [];
      _lodash2.default.each(this.rows, function (row) {
        var value = {};
        _lodash2.default.each(row, function (col) {
          if (col && col.component && col.component.key) {
            _lodash2.default.set(value, col.component.key, col.getValue());
          }
        });
        values.push(value);
      });
      return values;
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return [{}];
    }
  }, {
    key: 'defaultValue',
    get: function get() {
      var value = _get(DataGridComponent.prototype.__proto__ || Object.getPrototypeOf(DataGridComponent.prototype), 'defaultValue', this);
      if (_lodash2.default.isArray(value)) {
        return value;
      }
      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return [value];
      }
      return this.emptyValue;
    }
  }]);

  return DataGridComponent;
}(_Components.FormioComponents);