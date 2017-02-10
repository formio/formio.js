import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import _isArray from 'lodash/isArray';
import BaseComponent from '../base/Base';
class DataGridComponent extends BaseComponent {
  build() {
    this.element = this.ce('table');
    this.element.setAttribute('class', 'form-group formio-data-grid');
    let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
    _each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += 'table-' + prop + ' ';
      }
    });
    this.element.setAttribute('class', tableClass);
    let thead = this.ce('thead');

    // Build the header.
    let tr = this.ce('tr');
    _each(this.component.components, (comp) => {
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
    this.element.appendChild(thead);

    // Create the table body.
    this.tbody = this.ce('tbody');

    // Add a blank row.
    this.addValue();

    // Add the body to the table and to the element.
    this.element.appendChild(this.tbody);
  }

  defaultValue() {
    return {};
  }

  buildRows() {
    let components = require('../index');
    this.tbody.innerHTML = '';
    this.rows = [];
    _each(this.data[this.component.key], (row, index) => {
      let tr = this.ce('tr');
      let cols = {};
      _each(this.component.components, (col) => {
        let column = _cloneDeep(col);
        column.label = false;
        let td = this.ce('td');
        let comp = components.create(column, this.options, row);
        td.appendChild(comp.element);
        if (row.hasOwnProperty(column.key)) {
          comp.setValue(row[column.key]);
        }
        cols[column.key] = comp;
        tr.appendChild(td);
      });
      this.rows.push(cols);
      let td = this.ce('td');
      td.appendChild(this.removeButton(index));
      tr.appendChild(td);
      this.tbody.appendChild(tr);
    });

    // Add the add button.
    let tr = this.ce('tr');
    let td = this.ce('td');
    td.setAttribute('colspan', (this.component.components.length + 1));
    td.appendChild(this.addButton());
    tr.appendChild(td);
    this.tbody.appendChild(tr);
  }

  setValue(value) {
    if (!value) {
      return;
    }
    if (!_isArray(value)) {
      return;
    }

    // Add needed rows.
    for (let i=this.rows.length; i < value.length; i++) {
      this.addValue();
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
    this.updateValue();
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    let values = [];
    _each(this.rows, (row) => {
      let value = {};
      _each(row, (col) => {
        if (
          col &&
          col.component &&
          col.component.key
        ) {
          value[col.component.key] = col.value;
        }
      });
      values.push(value);
    });
    return values;
  }
}

module.exports = DataGridComponent;
