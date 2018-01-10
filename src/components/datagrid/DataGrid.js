import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import _clone from 'lodash/clone';
import _isArray from 'lodash/isArray';
import { FormioComponents } from '../Components';
export class DataGridComponent extends FormioComponents {
  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'datagrid';
  }

  build() {
    this.createElement();
    this.createLabel(this.element);
    if (!this.data.hasOwnProperty(this.component.key)) {
      this.addNewValue();
    }
    this.visibleColumns = true;
    this.buildTable();
    this.createDescription(this.element);
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
    this.tableElement = this.ce('table', {
      class: tableClass
    });

    let thead = this.ce('thead');

    // Build the header.
    let tr = this.ce('tr');
    _each(this.component.components, (comp) => {
      if ((this.visibleColumns === true) || (this.visibleColumns[comp.key])) {
        let th = this.ce('th');
        if (comp.validate && comp.validate.required) {
          th.setAttribute('class', 'field-required');
        }
        let title = comp.label || comp.title;
        if (title) {
          th.appendChild(this.text(title));
          this.createTooltip(th, comp);
        }
        tr.appendChild(th);
      }
    });

    // Add the remove column if it is not disabled.
    if (!this.shouldDisable) {
      let th = this.ce('th');
      tr.appendChild(th);

      // add the "+" - "add another" button
      if (this.component.addAnotherPosition === "top" || this.component.addAnotherPosition === "both") {
        th.appendChild(this.addButton(true));
        tr.appendChild(th);
      }
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

  get defaultValue() {
    return {};
  }

  buildRows(data) {
    this.tbody.innerHTML = '';
    this.rows = [];
    this.components = [];
    _each(this.data[this.component.key], (row, index) => {
      let tr = this.ce('tr');
      let cols = {};
      _each(this.component.components, (col) => {
        let column = _cloneDeep(col);
        column.label = false;
        column.row = this.row + '-' + index;
        let options = _clone(this.options);
        options.name += '[' + index + ']';
        let comp = this.createComponent(column, options, row);
        if (row.hasOwnProperty(column.key)) {
          comp.setValue(row[column.key]);
        }
        else if (comp.type === 'components') {
          comp.setValue(row);
        }
        cols[column.key] = comp;
        if ((this.visibleColumns === true) || this.visibleColumns[col.key]) {
          let td = this.ce('td');
          td.appendChild(comp.element);
          tr.appendChild(td);
          comp.checkConditions(data);
        }
      });
      this.rows.push(cols);

      // Add the remove column if not disabled.
      if (!this.shouldDisable) {
        let td = this.ce('td');
        td.appendChild(this.removeButton(index));
        tr.appendChild(td);
      }

      this.tbody.appendChild(tr);
    });

    // Add the add button if not disabled.
    if (!this.shouldDisable && (
      !this.component.addAnotherPosition ||
      this.component.addAnotherPosition === "bottom" ||
      this.component.addAnotherPosition === "both"
      )) {
        let tr = this.ce('tr');
        let td = this.ce('td', {
          colspan: (this.component.components.length + 1)
        });
        td.appendChild(this.addButton());
        tr.appendChild(td);
        this.tbody.appendChild(tr);
    }
  }

  checkConditions(data) {
    let show = super.checkConditions(data);
    let rebuild = false;
    if (this.visibleColumns === true) {
      this.visibleColumns = {};
    }
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

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
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
        if (col.type === 'components') {
          col.setValue(value[index], flags);
        }
        else if (value[index].hasOwnProperty(key)) {
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
