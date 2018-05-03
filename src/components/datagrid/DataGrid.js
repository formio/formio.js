import _ from 'lodash';
import {FormioComponents} from '../Components';

export class DataGridComponent extends FormioComponents {
  static schema(...extend) {
    return FormioComponents.schema({
      label: 'Data Grid',
      key: 'dataGrid',
      type: 'datagrid',
      clearOnHide: true,
      input: true,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Data Grid',
      icon: 'fa fa-th',
      group: 'advanced',
      documentation: 'http://help.form.io/userguide/#datagrid',
      weight: 150,
      schema: DataGridComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'datagrid';
    this.numRows = 0;
    this.numColumns = 0;
    this.rows = [];
  }

  get defaultSchema() {
    return DataGridComponent.schema();
  }

  get emptyValue() {
    return [{}];
  }

  get addAnotherPosition() {
    return _.get(this.component, 'addAnotherPosition', 'bottom');
  }

  hasAddButton() {
    const maxLength = _.get(this.component, 'validate.maxLength');
    return !this.shouldDisable &&
      !this.options.builder &&
      !this.options.preview &&
      (!maxLength || (this.dataValue.length < maxLength));
  }

  hasRemoveButtons() {
    return !this.shouldDisable && (this.dataValue.length > _.get(this.component, 'validate.minLength', 0));
  }

  hasTopSubmit() {
    return this.hasAddButton() && ['top', 'both'].includes(this.addAnotherPosition);
  }

  hasBottomSubmit() {
    return this.hasAddButton() && ['bottom', 'both'].includes(this.addAnotherPosition);
  }

  hasChanged(before, after) {
    return !_.isEqual(before, after);
  }

  build() {
    this.createElement();
    this.createLabel(this.element);
    if (!this.dataValue.length) {
      this.addNewValue();
    }
    this.visibleColumns = true;
    this.errorContainer = this.element;
    this.buildRows();
    this.createDescription(this.element);
  }

  setVisibleComponents() {
    // Add new values based on minLength.
    for (let dIndex = this.dataValue.length; dIndex < _.get(this.component, 'validate.minLength', 0); dIndex++) {
      this.dataValue.push({});
    }

    this.numColumns = this.hasRemoveButtons() ? 1 : 0;
    this.numRows = this.dataValue.length;

    if (this.visibleColumns === true) {
      this.numColumns += this.component.components.length;
      this.visibleComponents = this.component.components;
      return this.visibleComponents;
    }

    this.visibleComponents = _.filter(this.component.components, comp => this.visibleColumns[comp.key]);
    this.numColumns += this.visibleComponents.length;
  }

  needsRebuild() {
    const previousNumColumns = this.numColumns;
    const previousNumRows = this.numRows;
    this.setVisibleComponents();

    if (
      (!this.tableBuilt) ||
      (this.numRows !== previousNumRows) ||
      (this.numColumns !== previousNumColumns)
    ) {
      this.tableBuilt = true;
      return true;
    }

    // No need to rebuild since rows and columns are the same.
    return false;
  }

  buildRows() {
    if (!this.needsRebuild()) {
      return;
    }

    this.clear();
    this.createLabel(this.element);
    let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
    _.each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    this.tableElement = this.ce('table', {
      class: tableClass
    });

    // Build the rows.
    const tableRows = [];
    this.dataValue.forEach((row, rowIndex) => tableRows.push(this.buildRow(row, rowIndex)));

    // Create the header (must happen after build rows to get correct column length)
    this.tableElement.appendChild(this.createHeader());
    this.tableElement.appendChild(this.ce('tbody', null, tableRows));

    // Create the add row button footer element.
    if (this.hasBottomSubmit()) {
      this.tableElement.appendChild(this.ce('tfoot', null,
        this.ce('tr', null,
          this.ce('td', {colspan: this.numColumns},
            this.addButton()
          )
        )
      ));
    }

    // Add the table to the element.
    this.element.appendChild(this.tableElement);
  }

  // Build the header.
  createHeader() {
    const hasTopButton = this.hasTopSubmit();
    const hasEnd = this.hasRemoveButtons() || hasTopButton;
    return this.ce('thead', null, this.ce('tr', null,
      [
        this.visibleComponents.map(comp => {
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
        }),
        hasEnd ? this.ce('th', null, (hasTopButton ? this.addButton(true) : null)) : null,
      ]
    ));
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

  buildRow(row, index) {
    this.rows[index] = {};
    return this.ce('tr', null,
      [
        this.component.components.map((col, colIndex) => this.buildComponent(col, colIndex, row, index)),
        this.hasRemoveButtons() ? this.ce('td', null, this.removeButton(index)) : null
      ]
    );
  }

  destroy(all) {
    super.destroy(all);
    _.each(this.rows, row => _.each(row, col => this.removeComponent(col, row)));
    this.rows = [];
  }

  buildComponent(col, colIndex, row, rowIndex) {
    if (!this.visibleColumns || (this.visibleColumns.hasOwnProperty(col.key) && !this.visibleColumns[col.key])) {
      return;
    }

    let container = this.ce('td');
    container.noDrop = true;
    let column = _.clone(col);
    let options = _.clone(this.options);
    options.name += `[${colIndex}]`;
    const comp = this.createComponent(column, options, row);
    container.appendChild(comp.getElement());
    this.rows[rowIndex][column.key] = comp;
    return container;
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
      this.restoreValue();
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

    const changed = flags.changed || this.hasChanged(value, this.dataValue);
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
    return changed;
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
