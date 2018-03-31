import _ from 'lodash';

import {FormioComponents} from '../Components';

export class DataGridComponent extends FormioComponents {
  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'datagrid';
  }

  get emptyValue() {
    return [{}];
  }

  build() {
    this.createElement();
    this.createLabel(this.element);
    if (!this.dataValue.length) {
      this.addNewValue();
    }
    this.visibleColumns = true;
    this.buildTable();
    this.createDescription(this.element);
  }

  buildTable() {
    if (this.tableElement) {
      this.removeChild(this.tableElement);
      this.tableElement.innerHTML = '';
    }

    let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
    _.each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    this.tableElement = this.ce('table', {
      class: tableClass
    });

    this.tableElement.appendChild(this.createHeader());

    // Build rows the first time.
    this.rows = [];

    // Check if there is a Min Length Validation
    if (
      this.component.validate &&
      this.component.validate.minLength > this.dataValue.length
    ) {
      const toAdd = this.component.validate.minLength - this.dataValue.length;
      for (let i = 0; i < toAdd; i++) {
        this.dataValue.push({});
      }
    }

    this.tableRows = this.dataValue.map((row, rowIndex) => this.buildRow(row, rowIndex));
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
    const thead = this.ce('thead', null,
      this.ce('tr', null,
        [
          this.component.components.map(comp => {
            if ((this.visibleColumns === true) || (this.visibleColumns[comp.key])) {
              const th = this.ce('th');
              if (comp.validate && comp.validate.required) {
                th.setAttribute('class', 'field-required');
              }
              const title = comp.label || comp.title;
              if (title) {
                th.appendChild(this.text(title));
                this.createTooltip(th, comp);
              }
              return th;
            }
          }),
          this.shouldDisable ? null :
            this.ce('th', null,
              ['top', 'both'].includes(this.component.addAnotherPosition) ? this.addButton(true) : null
            ),
        ]
      )
    );
    return thead;
  }

  createAddButton() {
    return (!this.shouldDisable && (
      !this.component.addAnotherPosition ||
      this.component.addAnotherPosition === 'bottom' ||
      this.component.addAnotherPosition === 'both'
    ))  ?
      this.ce('tfoot', null,
        this.ce('tr', null,
          this.ce('td', {colspan: (this.component.components.length + 1)},
            this.addButton()
          )
        )
      )
      : null;
  }

  checkAndRemoveAddButton() {
    //check validation and remove add button
    if (
      (this.component.validate && this.tableElement.lastChild.firstChild) &&
      this.component.validate.maxLength <= this.dataValue.length
    ) {
      this.tableElement.lastChild.firstChild.remove();
    }
    else if ((this.component.validate && !this.tableElement.lastChild.firstChild) &&
      this.component.validate.maxLength > this.dataValue.length) {
      this.tableElement.lastChild.appendChild(
        this.ce('tr', null,
          this.ce('td', {colspan: (this.component.components.length + 1)},
            this.addButton()
          )
        )
      );
    }
  }

  get defaultValue() {
    const value = super.defaultValue;
    if (_.isArray(value)) {
      return value;
    }
    if (value && (typeof value === 'object')) {
      return [value];
    }
    return this.emptyValue;
  }

  buildRows(data) {
    const addRemoveButton = this.addRemoveButton();

    this.dataValue.forEach((row, rowIndex) => {
      // New Row.
      if (!this.tableRows[rowIndex]) {
        this.tableRows[rowIndex] = this.buildRow(row, rowIndex, data);
        this.tbody.insertBefore(this.tableRows[rowIndex], this.tbody.children[rowIndex + 1]);
      }
      // Update existing
      else if (
        !_.isEqual(row, this.tableRows[rowIndex].data) ||
        !_.isEqual(this.visibleColumns, this.tableRows[rowIndex].visibleColumns)
      ) {
        this.removeRowComponents(rowIndex);
        const newRow = this.buildRow(row, rowIndex, data);
        this.tbody.replaceChild(newRow, this.tableRows[rowIndex]);
        this.tableRows[rowIndex] = newRow;
      }

      if (addRemoveButton) {
        this.ensureRemoveButtonIsPresent(rowIndex);
      }
      else {
        this.ensureRemoveButtonIsAbsent(rowIndex);
      }
    });
    // Remove any extra rows.
    for (let rowIndex = this.tableRows.length; rowIndex > this.dataValue.length; rowIndex--) {
      this.removeChildFrom(this.tableRows[rowIndex - 1], this.tbody);
      this.tableRows.splice(rowIndex - 1, 1);
    }

    this.checkAndRemoveAddButton();
  }

  ensureRemoveButtonIsPresent(index) {
    const row = this.tableRows[index];

    if (row.children.length > this.component.components.length) {
      return;
    }

    row.appendChild(this.ce('td', null, this.removeButton(index)));
  }

  ensureRemoveButtonIsAbsent(index) {
    const row = this.tableRows[index];

    if (row.children.length === this.component.components.length) {
      return;
    }

    row.removeChild(row.lastChild);
  }

  buildRow(row, index) {
    this.rows[index] = {};
    const element = this.ce('tr', null,
      [
        this.component.components.map((col, colIndex) => this.buildComponent(col, colIndex, row, index)),
        this.addRemoveButton() ? this.ce('td', null, this.removeButton(index)) : null
      ]
    );
    element.data = _.cloneDeep(row);
    element.visibleColumns = _.cloneDeep(this.visibleColumns);
    return element;
  }

  addRemoveButton() {
    return !this.shouldDisable
      && this.component.validate && this.dataValue.length > this.component.validate.minLength;
  }

  removeRowComponents(rowIndex) {
    // Clean up components list.
    (Object.keys(this.rows[rowIndex])).forEach(key => {
      this.removeComponent(this.rows[rowIndex][key]);
    });
    delete this.rows[rowIndex];
  }

  buildComponent(col, colIndex, row, rowIndex) {
    const column = _.cloneDeep(col);
    column.label = false;
    column.row = `${rowIndex}-${colIndex}`;
    const options = _.clone(this.options);
    options.name += `[${colIndex}]`;
    const comp = this.createComponent(column, options, row);
    if (row.hasOwnProperty(column.key)) {
      comp.setValue(row[column.key]);
    }
    else if (comp.type === 'components') {
      comp.setValue(row);
    }
    this.rows[rowIndex][column.key] = comp;
    if ((this.visibleColumns === true) || this.visibleColumns[column.key]) {
      return this.ce('td', null, comp.element);
    }
  }

  checkConditions(data) {
    let show = super.checkConditions(data);
    // If table isn't visible, don't bother calculating columns.
    if (!show) {
      return false;
    }
    let rebuild = false;
    if (this.visibleColumns === true) {
      this.visibleColumns = {};
    }
    _.each(this.component.components, (col) => {
      let showColumn = false;
      _.each(this.rows, (comps) => {
        showColumn |= comps[col.key].checkConditions(data);
      });
      if (
        (this.visibleColumns[col.key] && !showColumn) ||
        (!this.visibleColumns[col.key] && showColumn)
      ) {
        rebuild = true;
      }

      this.visibleColumns[col.key] = showColumn;
      show |= showColumn;
    });

    // If a rebuild is needed, then rebuild the table.
    if (rebuild) {
      this.buildRows();
    }

    // Return if this table should show.
    return show;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      return;
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        value = [value];
      }
      else {
        return;
      }
    }

    this.dataValue = value;
    this.buildRows();
    _.each(this.rows, (row, index) => {
      if (value.length <= index) {
        return;
      }
      _.each(row, (col, key) => {
        if (col.type === 'components') {
          col.setValue(value[index], flags);
        }
        else if (value[index].hasOwnProperty(key)) {
          col.setValue(value[index][key], flags);
        }
        else {
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
  getValue() {
    if (this.viewOnly) {
      return this.dataValue;
    }
    const values = [];
    _.each(this.rows, (row) => {
      const value = {};
      _.each(row, (col) => {
        if (
          col &&
          col.component &&
          col.component.key
        ) {
          _.set(value, col.component.key, col.getValue());
        }
      });
      values.push(value);
    });
    return values;
  }
}
