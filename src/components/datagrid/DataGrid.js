import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import _isArray from 'lodash/isArray';
import { FormioComponents } from '../Components';
export class DataGridComponent extends FormioComponents {
  build() {
    this.createElement();
    this.createLabel(this.element);
    this.addNewValue();
    this.visibleColumns = true;
    this.buildTable();
    this.visibleColumns = {};
  }

  buildTable(data) {
    data = data || {};
    if (this.tableElement) {
      this.element.removeChild(this.tableElement);
      this.tableElement.innerHTML = '';
    }

    let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
    _each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += 'table-' + prop + ' ';
      }
    });
    this.tableElement = this.ce('element', 'table', {
      class: tableClass
    });

    let thead = this.ce('header', 'thead');

    // Build the header.
    let tr = this.ce('headerRow', 'tr');
    _each(this.component.components, (comp) => {
      if ((this.visibleColumns === true) || (this.visibleColumns[comp.key])) {
        let th = this.ce('headerColumn', 'th');
        if (comp.validate && comp.validate.required) {
          th.setAttribute('class', 'field-required');
        }
        let title = comp.label || comp.title;
        if (title) {
          th.appendChild(this.text(title));
        }
        tr.appendChild(th);
      }
    });
    let th = this.ce('headerExtra', 'th');
    tr.appendChild(th);
    thead.appendChild(tr);
    this.tableElement.appendChild(thead);

    // Create the table body.
    this.tbody = this.ce('table', 'tbody');

    // Build the rows.
    this.buildRows(data);

    // Add the body to the table and to the element.
    this.tableElement.appendChild(this.tbody);
    this.element.appendChild(this.tableElement);
  }

  get defaultValue() {
    return {};
  }

  buildRows(data) {
    let components = require('../index');
    this.tbody.innerHTML = '';
    this.rows = [];
    _each(this.data[this.component.key], (row, index) => {
      let tr = this.ce('tableRow', 'tr');
      let cols = {};
      _each(this.component.components, (col) => {
        let column = _cloneDeep(col);
        column.label = false;
        let comp = components.create(column, this.options, row);
        if (row.hasOwnProperty(column.key)) {
          comp.setValue(row[column.key]);
        }
        else if (comp.type === 'components') {
          comp.setValue(row);
        }
        cols[column.key] = comp;
        if ((this.visibleColumns === true) || this.visibleColumns[col.key]) {
          let td = this.ce('tableColumn', 'td');
          td.appendChild(comp.element);
          tr.appendChild(td);
          comp.checkConditions(data);
        }
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

  checkConditions(data) {
    let show = super.checkConditions(data);
    let rebuild = false;
    _each(this.component.components, (col) => {
      let showColumn = false;
      _each(this.rows, (comps) => {
        showColumn |= comps[col.key].checkConditions(data);
      });
      if (
        (this.visibleColumns[col.key] && !showColumn) ||
        (!this.visibleColumns[col.key] && showColumn)
      ) {
        rebuild = true
      }

      this.visibleColumns[col.key] = showColumn;
      show |= showColumn;
    });

    // If a rebuild is needed, then rebuild the table.
    if (rebuild && show) {
      this.buildTable(data);
    }

    // Return if this table should show.
    return show;
  }

  setValue(value, noUpdate, noValidate) {
    if (!value) {
      return;
    }
    if (!_isArray(value)) {
      return;
    }

    this.value = value;

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
        col.setValue(value[index][key], noUpdate, noValidate);
      });
    });
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
          value[col.component.key] = col.getValue();
        }
      });
      values.push(value);
    });
    return values;
  }
}
