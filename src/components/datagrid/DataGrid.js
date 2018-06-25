import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class DataGridComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
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
      group: 'data',
      documentation: 'http://help.form.io/userguide/#datagrid',
      weight: 20,
      schema: DataGridComponent.schema()
    };
  }

  init() {
    super.init();
    this.type = 'datagrid';
    this.numColumns = 0;

    // Add new values based on minLength.
    for (let dIndex = this.dataValue.length; dIndex < _.get(this.component, 'validate.minLength', 0); dIndex++) {
      this.dataValue.push({});
    }

    this.visibleColumns = true;
    this.checkColumns(this.dataValue);
    this.setVisibleComponents();

    this.rows = [];
    this.createRows();
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

  get datagridKey() {
    return `datagrid-${this.component.key}`;
  }

  hasAddButton() {
    const maxLength = _.get(this.component, 'validate.maxLength');
    return !this.component.disableAddingRemovingRows &&
    !this.shouldDisable &&
      !this.options.builder &&
      !this.options.preview &&
      (!maxLength || (this.dataValue.length < maxLength));
  }

  hasExtraColumn() {
    return this.hasRemoveButtons() || this.options.builder;
  }

  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.shouldDisable &&
      !this.options.builder &&
      (this.dataValue.length > _.get(this.component, 'validate.minLength', 0));
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

  render() {
    return super.render(this.renderTemplate('datagrid', {
      rows: this.rows.map(row =>
        row.map(col =>
          col.render()
        )
      ),
      visibleColumns: this.visibleColumns,
      hasHeader: this.component.components.reduce((hasHeader, col) => {
        // If any of the components has a title and it isn't hidden, display the header.
        return hasHeader || ((col.label || col.title) && !col.hideLabel);
      }, false),
      hasExtraColumn: this.hasExtraColumn(),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons: this.hasRemoveButtons,
      hasTopSubmit: this.hasTopSubmit(),
      hasBottomSubmit: this.hasBottomSubmit(),
      numColumns: Object.keys(this.visibleColumns).length + (this.hasExtraColumn() ? 1 : 0),
      datagridKey: this.datagridKey,
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {
      addRow: 'multiple',
      removeRow: 'multiple',
      [this.datagridKey]: 'multiple',
    });
    super.hydrate(element);

    this.refs.addRow.forEach((addButton) => {
      this.addEventListener(addButton, 'click', this.addRow.bind(this));
    });

    this.refs.removeRow.forEach((removeButton, index) => {
      this.addEventListener(removeButton, 'click', this.removeRow.bind(this, index));
    });

    const rowLength = this.rows.length ? this.rows[0].length : 1;
    this.refs[this.datagridKey].forEach((container, index) => {
      const rowIndex = Math.floor(index / rowLength);
      const columnIndex = index % rowLength;
      this.hydrateComponents(container, [this.rows[rowIndex][columnIndex]]);
    });
  }

  addRow() {
    this.dataValue.push({});
    const index = this.rows.length;
    this.rows[index] = this.createRowComponents(this.dataValue[index], index);
    this.redraw();
  }

  removeRow(index) {
    this.splice(index);
    this.rows.splice(index, 1);
    this.redraw();
  }

  createRows() {
    // Create any missing rows.
    this.dataValue.forEach((row, index) => {
      if (!this.rows[index]) {
        this.rows[index] = this.createRowComponents(row, index);
      }
    });
    // Delete any extra rows.
    this.rows.splice(this.dataValue.length);
  }

  createRowComponents(row, rowIndex) {
    const components = [];
    this.component.components.map((col, colIndex) => {
      const column = _.clone(col);
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;
      const comp = this.createComponent(_.assign({}, column, {
        hideLabel: !column.dataGridLabel,
        row: options.row
      }), options, row);
      components.push(comp);
    });
    // if (this.options.builder) {
    //   lastColumn = this.ce('td', {
    //     id: `${this.id}-drag-container`,
    //     class: 'drag-container'
    //   }, this.ce('div', {
    //     id: `${this.id}-placeholder`,
    //     class: 'alert alert-info',
    //     style: 'text-align:center; margin-bottom: 0px;',
    //     role: 'alert'
    //   }, this.text('Drag and Drop a form component')));
    //   this.root.addDragContainer(lastColumn, this);
    // }
    return components;
  }

  setVisibleComponents() {
    this.numColumns = this.hasExtraColumn() ? 1 : 0;
    this.numRows = this.dataValue.length;

    if (this.visibleColumns === true) {
      this.numColumns += this.component.components.length;
      this.visibleComponents = this.component.components;
      return this.visibleComponents;
    }

    this.visibleComponents = _.filter(this.component.components, comp => this.visibleColumns[comp.key]);
    this.numColumns += this.visibleComponents.length;
  }

  checkColumns(data) {
    let rebuild = false;
    if (this.visibleColumns === true) {
      this.visibleColumns = {};
    }
    if (!this.rows || !this.rows.length) {
      return;
    }
    this.rows.forEach((row) => {
      let showColumn = false;
      row.forEach(col => {
        showColumn |= col.checkConditions(data);
        if (
          (this.visibleColumns[col.key] && !showColumn) ||
          (!this.visibleColumns[col.key] && showColumn)
        ) {
          rebuild = true;
        }
        this.visibleColumns[col.key] = showColumn;
      });
    });

    return rebuild;
  }

  checkConditions(data) {
    const show = super.checkConditions(data);
    // If table isn't visible, don't bother calculating columns.
    if (!show) {
      return false;
    }

    const rebuild = this.checkColumns(data);
    // If a rebuild is needed, then rebuild the table.
    if (rebuild) {
      this.redraw();
    }

    // Return if this table should show.
    return show;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      // this.buildRows();
      return;
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        value = [value];
      }
      else {
        // this.buildRows();
        return;
      }
    }

    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    this.createRows();
    this.rows.forEach((row, rowIndex) => {
      if (value.length <= rowIndex) {
        return;
      }
      row.forEach((col, colIndex) => {
        if (col.type === 'components') {
          col.setValue(value[rowIndex], flags);
        }
        else if (value[rowIndex].hasOwnProperty(col.key)) {
          col.setValue(value[rowIndex][col.key], flags);
        }
        else {
          col.data = value[rowIndex];
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
        _.set(value, col.key, col.getValue());
      });
      values.push(value);
    });
    return values;
  }
}
