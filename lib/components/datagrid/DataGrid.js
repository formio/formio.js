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
    _this.numRows = 0;
    _this.numColumns = 0;
    _this.rows = [];
    return _this;
  }

  _createClass(DataGridComponent, [{
    key: 'hasAddButton',
    value: function hasAddButton() {
      var maxLength = _lodash2.default.get(this.component, 'validate.maxLength');
      return !this.shouldDisable && (!maxLength || this.dataValue.length < maxLength);
    }
  }, {
    key: 'hasRemoveButtons',
    value: function hasRemoveButtons() {
      return !this.shouldDisable && this.dataValue.length > _lodash2.default.get(this.component, 'validate.minLength', 0);
    }
  }, {
    key: 'hasTopSubmit',
    value: function hasTopSubmit() {
      return this.hasAddButton() && ['top', 'both'].indexOf(this.addAnotherPosition) !== -1;
    }
  }, {
    key: 'hasBottomSubmit',
    value: function hasBottomSubmit() {
      return this.hasAddButton() && ['bottom', 'both'].indexOf(this.addAnotherPosition) !== -1;
    }
  }, {
    key: 'hasChanged',
    value: function hasChanged(before, after) {
      return !_lodash2.default.isEqual(before, after);
    }
  }, {
    key: 'build',
    value: function build() {
      this.createElement();
      this.createLabel(this.element);
      if (!this.dataValue.length) {
        this.addNewValue();
      }
      this.visibleColumns = true;
      this.errorContainer = this.element;
      this.restoreValue();
      this.createDescription(this.element);
    }
  }, {
    key: 'setVisibleComponents',
    value: function setVisibleComponents() {
      var _this2 = this;

      // Add new values based on minLength.
      for (var dIndex = this.dataValue.length; dIndex < _lodash2.default.get(this.component, 'validate.minLength', 0); dIndex++) {
        this.dataValue.push({});
      }

      this.numColumns = this.hasRemoveButtons() ? 1 : 0;
      this.numRows = this.dataValue.length;

      if (this.visibleColumns === true) {
        this.numColumns += this.component.components.length;
        this.visibleComponents = this.component.components;
        return this.visibleComponents;
      }

      this.visibleComponents = _lodash2.default.filter(this.component.components, function (comp) {
        return _this2.visibleColumns[comp.key];
      });
      this.numColumns += this.visibleComponents.length;
    }
  }, {
    key: 'buildRows',
    value: function buildRows() {
      var _this3 = this;

      this.setVisibleComponents();
      this.clear();
      this.createLabel(this.element);
      var tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
      _lodash2.default.each(['striped', 'bordered', 'hover', 'condensed'], function (prop) {
        if (_this3.component[prop]) {
          tableClass += 'table-' + prop + ' ';
        }
      });
      this.tableElement = this.ce('table', {
        class: tableClass
      });

      // Build the rows.
      var tableRows = [];
      this.dataValue.forEach(function (row, rowIndex) {
        return tableRows.push(_this3.buildRow(row, rowIndex));
      });

      // Create the header (must happen after build rows to get correct column length)
      this.tableElement.appendChild(this.createHeader());
      this.tableElement.appendChild(this.ce('tbody', null, tableRows));

      // Create the add row button footer element.
      if (this.hasBottomSubmit()) {
        this.tableElement.appendChild(this.ce('tfoot', null, this.ce('tr', null, this.ce('td', { colspan: this.numColumns }, this.addButton()))));
      }

      // Add the table to the element.
      this.element.appendChild(this.tableElement);
    }

    // Build the header.

  }, {
    key: 'createHeader',
    value: function createHeader() {
      var _this4 = this;

      var hasTopButton = this.hasTopSubmit();
      var hasEnd = this.hasRemoveButtons() || hasTopButton;
      return this.ce('thead', null, this.ce('tr', null, [this.visibleComponents.map(function (comp) {
        var th = _this4.ce('th');
        if (comp.validate && comp.validate.required) {
          th.setAttribute('class', 'field-required');
        }
        var title = comp.label || comp.title;
        if (title) {
          th.appendChild(_this4.text(title));
          _this4.createTooltip(th, comp);
        }
        return th;
      }), hasEnd ? this.ce('th', null, hasTopButton ? this.addButton(true) : null) : null]));
    }
  }, {
    key: 'buildRow',
    value: function buildRow(row, index) {
      var _this5 = this;

      this.rows[index] = {};
      return this.ce('tr', null, [this.component.components.map(function (col, colIndex) {
        return _this5.buildComponent(col, colIndex, row, index);
      }), this.hasRemoveButtons() ? this.ce('td', null, this.removeButton(index)) : null]);
    }
  }, {
    key: 'destroy',
    value: function destroy(all) {
      var _this6 = this;

      _get(DataGridComponent.prototype.__proto__ || Object.getPrototypeOf(DataGridComponent.prototype), 'destroy', this).call(this, all);
      _lodash2.default.each(this.rows, function (row) {
        return _lodash2.default.each(row, function (col) {
          return _this6.removeComponent(col, row);
        });
      });
      this.rows = [];
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
        this.restoreValue();
      }

      // Return if this table should show.
      return show;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      if (!value) {
        this.buildRows();
        return;
      }
      if (!Array.isArray(value)) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value = [value];
        } else {
          this.buildRows();
          return;
        }
      }

      var changed = flags.changed || this.hasChanged(value, this.dataValue);
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
      return changed;
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
    key: 'addAnotherPosition',
    get: function get() {
      return _lodash2.default.get(this.component, 'addAnotherPosition', 'bottom');
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