import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import _isArray from 'lodash/isArray';
import { BaseComponent } from '../base/Base';
export class DataGridComponent extends BaseComponent {
  build() {
    let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
    _each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += 'table-' + prop + ' ';
      }
    });
    this.element = this.ce('element', 'table', {
      class: tableClass
    });

    let thead = this.ce('header', 'thead');

    // Build the header.
    let tr = this.ce('headerRow', 'tr');
    _each(this.component.components, (comp) => {
      let th = this.ce('headerColumn', 'th');
      if (comp.validate && comp.validate.required) {
        th.setAttribute('class', 'field-required');
      }
      th.appendChild(this.text(comp.label));
      tr.appendChild(th);
    });
    let th = this.ce('headerExtra', 'th');
    tr.appendChild(th);
    thead.appendChild(tr);
    this.element.appendChild(thead);

    // Create the table body.
    this.tbody = this.ce('table', 'tbody');

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
      let tr = this.ce('tableRow', 'tr');
      let cols = {};
      _each(this.component.components, (col) => {
        let column = _cloneDeep(col);
        column.label = false;
        let td = this.ce('tableColumn', 'td');
        let comp = components.create(column, this.options, row);
        td.appendChild(comp.element);
        if (row.hasOwnProperty(column.key)) {
          comp.setValue(row[column.key]);
        }
        cols[column.key] = comp;
        tr.appendChild(td);
      });
      this.rows.push(cols);
      let td = this.ce('tableRemoveRow', 'td');
      td.appendChild(this.removeButton(index));
      tr.appendChild(td);
      this.tbody.appendChild(tr);
    });

    // Add the add button.
    let tr = this.ce('tableAddRow', 'tr');
    let td = this.ce('tableAddColumn', 'td', {
      colspan: (this.component.components.length + 1)
    });
    td.appendChild(this.addButton());
    tr.appendChild(td);
    this.tbody.appendChild(tr);
  }

  setValue(value, noUpdate, noValidate) {
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
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
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
