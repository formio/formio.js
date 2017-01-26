let _each = require('lodash/each');
let _cloneDeep = require('lodash/cloneDeep');
let _isArray = require('lodash/isArray');
let BaseComponent = require('./Base');
class DataGridComponent extends BaseComponent {
  build() {
    this._element = this.ce('table');
    this._element.setAttribute('class', 'form-group formio-data-grid');
    let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
    _each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this._component[prop]) {
        tableClass += 'table-' + prop + ' ';
      }
    });
    this._element.setAttribute('class', tableClass);
    let thead = this.ce('thead');

    // Build the header.
    let tr = this.ce('tr');
    _each(this._component.components, (comp) => {
      let th = this.ce('th');
      if (comp.validate && comp.validate.required) {
        th.setAttribute('class', 'field-required');
      }
      th.appendChild(this.text(comp.label));
      tr.appendChild(th);
    });
    let th = this.ce('th');
    tr.appendChild(th);
    thead.appendChild(tr);
    this._element.appendChild(thead);

    // Create the table body.
    this._tbody = this.ce('tbody');

    // Add a blank row.
    this.addValue();

    // Add the body to the table and to the element.
    this._element.appendChild(this._tbody);
  }

  defaultValue() {
    return {};
  }

  buildRows() {
    let components = require('./index');
    this._tbody.innerHTML = '';
    this.rows = [];
    _each(this._data[this._component.key], (row, index) => {
      let tr = this.ce('tr');
      let cols = [];
      _each(this._component.components, (col) => {
        let column = _cloneDeep(col);
        column.label = false;
        let td = this.ce('td');
        let comp = components.create(column, this._events, row);
        td.appendChild(comp._element);
        if (row.hasOwnProperty(column.key)) {
          comp.value = row[column.key];
        }
        cols.push(comp);
        tr.appendChild(td);
      });
      this.rows.push(cols);
      let td = this.ce('td');
      td.appendChild(this.removeButton(index));
      tr.appendChild(td);
      this._tbody.appendChild(tr);
    });

    // Add the add button.
    let tr = this.ce('tr');
    let td = this.ce('td');
    td.setAttribute('colspan', (this._component.components.length + 1));
    td.appendChild(this.addButton());
    tr.appendChild(td);
    this._tbody.appendChild(tr);
  }

  set value(value) {
    if (!value) {
      return;
    }
    if (!_isArray(value)) {
      return;
    }
    _each(this.rows, (row, index) => {
      if (value.length <= index) {
        return;
      }
      _each(row, (col, key) => {
        if (!value[index].hasOwnProperty(key)) {
          return;
        }
        col.value = value[index][key];
      });
    });
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  get value() {
    let values = [];
    _each(this.rows, (row) => {
      let value = {};
      _each(row, (col) => {
        if (
          col &&
          col._component &&
          col._component.key
        ) {
          value[col._component.key] = col.value;
        }
      });
      values.push(value);
    });
    return values;
  }
}

module.exports = DataGridComponent;
