import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import _clone from 'lodash/clone';
import _isEqual from 'lodash/isEqual';
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

    this.tableElement.appendChild(this.createHeader());

    // Build rows the first time.
    this.rows = [];
    this.tableRows = this.data[this.component.key].map((row, rowIndex) => this.buildRow(row, rowIndex, data));
    this.tbody = this.ce('tbody', null, this.tableRows);

    // Add the body to the table and to the element.
    this.tableElement.appendChild(this.tbody);

    const addButton = this.createAddButton();
    if (addButton) {
      this.tableElement.appendChild(addButton);
    }

    this.element.appendChild(this.tableElement);
  }

  // Build the header.
  createHeader() {
    let thead = this.ce('thead', null,
      this.ce('tr', null,
        [
          this.component.components.map(comp => {
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
              return th;
            }
          }),
          this.shouldDisable ? null :
            this.ce('th', null,
              (this.component.addAnotherPosition === "top" || this.component.addAnotherPosition === "both") ? this.addButton(true) : null
            ),
        ]
      )
    );
    return thead;
  }

  createAddButton() {
    return (!this.shouldDisable && (
      !this.component.addAnotherPosition ||
      this.component.addAnotherPosition === "bottom" ||
      this.component.addAnotherPosition === "both"
    ))  ?
      this.ce('tr', null,
        this.ce('td', {colspan: (this.component.components.length + 1)},
          this.addButton()
        )
      )
      : null;
  }

  get defaultValue() {
    return {};
  }

  buildRows(data) {
    this.data[this.component.key].forEach((row, rowIndex) => {
      // New Row.
      if (!this.tableRows[rowIndex]) {
        this.tableRows[rowIndex] = this.buildRow(row, rowIndex, data);
        this.tbody.insertBefore(this.tableRows[rowIndex], this.tbody.children[rowIndex + 1]);
      }
      // Update existing
      else if (!_isEqual(row, this.tableRows[rowIndex].data)) {
        this.removeRowComponents(rowIndex);
        const newRow = this.buildRow(row, rowIndex, data);
        this.tbody.replaceChild(newRow, this.tableRows[rowIndex]);
        this.tableRows[rowIndex] = newRow;
      }
    });
    // Remove any extra rows.
    for(let rowIndex = this.tableRows.length; rowIndex > this.data[this.component.key].length; rowIndex--) {
      this.tbody.removeChild(this.tableRows[rowIndex - 1]);
      this.tableRows.splice(rowIndex - 1, 1);
    }
  }

  buildRow(row, index, data) {
    this.rows[index] = {};
    const element = this.ce('tr', null,
      [
        this.component.components.map((col, colIndex) => this.buildComponent(col, colIndex, row, index, data)),
        !this.shouldDisable ? this.ce('td', null, this.removeButton(index)) : null
      ]
    )
    element.data = _cloneDeep(row);
    return element;
  }

  removeRowComponents(rowIndex) {
    // Clean up components list.
    (Object.keys(this.rows[rowIndex])).forEach(key => {
      this.removeComponent(this.rows[rowIndex][key], this.components);
    });
    this.rows[rowIndex] = [];
  }

  buildComponent(col, colIndex, row, rowIndex, data) {
    let column = _cloneDeep(col);
    column.label = false;
    column.row = rowIndex + '-' + colIndex;
    let options = _clone(this.options);
    options.name += '[' + colIndex + ']';
    let comp = this.createComponent(column, options, row);
    if (row.hasOwnProperty(column.key)) {
      comp.setValue(row[column.key]);
    }
    else if (comp.type === 'components') {
      comp.setValue(row);
    }
    this.rows[rowIndex][column.key] = comp;
    if ((this.visibleColumns === true) || this.visibleColumns[column.key]) {
      return this.ce('td', null, comp.element);
      comp.checkConditions(data);
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

    this.data[this.component.key] = value;
    this.buildRows();
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
    if (this.viewOnly) {
      return this.value;
    }
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
