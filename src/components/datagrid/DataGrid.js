import _ from 'lodash';
// Import from "dist" because it would require and "global" would not be defined in Angular apps.
import dragula from 'dragula/dist/dragula';
import NestedComponent from '../_classes/nested/NestedComponent';
import Component from '../_classes/component/Component';
import { fastCloneDeep } from '../../utils/utils';

export default class DataGridComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Data Grid',
      key: 'dataGrid',
      type: 'datagrid',
      clearOnHide: true,
      input: true,
      tree: true,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Data Grid',
      icon: 'th',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#datagrid',
      weight: 30,
      schema: DataGridComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    this.type = 'datagrid';
  }

  init() {
    this.components = this.components || [];

    // Add new values based on minLength.
    this.rows = [];
    this.createRows(true);
    this.visibleColumns = {};
    this.checkColumns();
  }

  get allowData() {
    return true;
  }

  get dataValue() {
    const dataValue = super.dataValue;
    if (!dataValue || !Array.isArray(dataValue)) {
      return this.emptyValue;
    }
    return dataValue;
  }

  set dataValue(value) {
    super.dataValue = value;
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

  get minLength() {
    if (this.hasRowGroups()) {
      return _.sum(this.getGroupSizes());
    }
    else {
      return _.get(this.component, 'validate.minLength', 0);
    }
  }

  get defaultValue() {
    const value = super.defaultValue;
    let defaultValue;

    if (Array.isArray(value)) {
      defaultValue = value;
    }
    else if (value && (typeof value === 'object')) {
      defaultValue = [value];
    }
    else {
      defaultValue = this.emptyValue;
    }

    for (let dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
      defaultValue.push({});
    }

    return defaultValue;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    _.each(this.refs[`${this.datagridKey}-addRow`], (button) => {
      button.disabled = disabled;
    });
    _.each(this.refs[`${this.datagridKey}-removeRow`], (button) => {
      button.disabled = disabled;
    });
  }

  get disabled() {
    return super.disabled;
  }

  get datagridKey() {
    return `datagrid-${this.key}`;
  }

  get allowReorder() {
    return !this.options.readOnly && _.get(this.component, 'reorder', false);
  }

  getValueAsString() {
    return '[Complex Data]';
  }

  /**
   * Split rows into chunks.
   * @param {Number[]} groups - array of numbers where each item is size of group
   * @param {Array<T>} rows - rows collection
   * @return {Array<T[]>}
   */
  getRowChunks(groups, rows) {
    const [, chunks] = groups.reduce(
      ([startIndex, acc], size) => {
        const endIndex = startIndex +  size;
        return [endIndex, [...acc, [startIndex, endIndex]]];
      }, [0, []]
    );
    return chunks.map(range => _.slice(rows, ...range));
  }

  /**
   * Create groups object.
   * Each key in object represents index of first row in group.
   * @return {Object}
   */
  getGroups() {
    const groups = _.get(this.component, 'rowGroups', []);
    const sizes = _.map(groups, 'numberOfRows').slice(0, -1);
    const indexes = sizes.reduce((groupIndexes, size) => {
      const last = groupIndexes[groupIndexes.length - 1];
      return groupIndexes.concat(last + size);
    }, [0]);

    return groups.reduce(
      (gidxs, group, idx) => {
        return {
          ...gidxs,
          [indexes[idx]]: group
        };
      },
      {}
    );
  }

  /**
   * Retrun group sizes.
   * @return {Number[]}
   */
  getGroupSizes() {
    return _.map(_.get(this.component, 'rowGroups', []), 'numberOfRows');
  }

  hasRowGroups() {
    return _.get(this, 'component.enableRowGroups', false) && !this.builderMode;
  }

  totalRowsNumber(groups) {
    return _.sum(_.map(groups, 'numberOfRows'));
  }

  setStaticValue(n) {
    this.dataValue = _.range(n).map(() => ({}));
  }

  hasAddButton() {
    const maxLength = _.get(this.component, 'validate.maxLength');
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      !this.options.preview &&
      (!maxLength || (this.dataValue.length < maxLength));
  }

  hasExtraColumn() {
    return (this.hasRemoveButtons() || this.canAddColumn);
  }

  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      (this.dataValue.length > _.get(this.component, 'validate.minLength', 0));
  }

  hasTopSubmit() {
    return this.hasAddButton() && ['top', 'both'].includes(this.addAnotherPosition);
  }

  hasBottomSubmit() {
    return this.hasAddButton() && ['bottom', 'both'].includes(this.addAnotherPosition);
  }

  hasChanged(newValue, oldValue) {
    return !_.isEqual(newValue, oldValue);
  }

  get canAddColumn() {
    return this.builderMode;
  }

  render() {
    const columns = this.getColumns();
    return super.render(this.renderTemplate('datagrid', {
      rows: this.getRows(),
      columns: columns,
      groups: this.hasRowGroups() ? this.getGroups() : [],
      visibleColumns: this.visibleColumns,
      hasToggle: _.get(this, 'component.groupToggle', false),
      hasHeader: this.hasHeader(),
      hasExtraColumn: this.hasExtraColumn(),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons: this.hasRemoveButtons(),
      hasTopSubmit: this.hasTopSubmit(),
      hasBottomSubmit: this.hasBottomSubmit(),
      hasGroups: this.hasRowGroups(),
      numColumns: columns.length + (this.hasExtraColumn() ? 1 : 0),
      datagridKey: this.datagridKey,
      allowReorder: this.allowReorder,
      builder: this.builderMode,
      canAddColumn: this.canAddColumn,
      placeholder: this.renderTemplate('builderPlaceholder', {
        position: this.componentComponents.length,
      }),
    }));
  }

  getRows() {
    return this.rows.map(row => {
      const components = {};
      _.each(row, (col, key) => {
        components[key] = col.render();
      });
      return components;
    });
  }

  getColumns() {
    return this.component.components.filter((comp) => {
      return (!this.visibleColumns.hasOwnProperty(comp.key) || this.visibleColumns[comp.key]);
    });
  }

  hasHeader() {
    return this.component.components.reduce((hasHeader, col) => {
      // If any of the components has a title and it isn't hidden, display the header.
      return hasHeader || ((col.label || col.title) && !col.hideLabel);
    }, false);
  }

  attach(element) {
    this.loadRefs(element, {
      [`${this.datagridKey}-row`]: 'multiple',
      [`${this.datagridKey}-tbody`]: 'single',
      [`${this.datagridKey}-addRow`]: 'multiple',
      [`${this.datagridKey}-removeRow`]: 'multiple',
      [`${this.datagridKey}-group-header`]: 'multiple',
      [this.datagridKey]: 'multiple',
    });

    if (this.allowReorder) {
      this.refs[`${this.datagridKey}-row`].forEach((row, index) => {
        row.dragInfo = { index };
      });

      this.dragula = dragula([this.refs[`${this.datagridKey}-tbody`]], {
        moves: (_draggedElement, _oldParent, clickedElement) => clickedElement.classList.contains('formio-drag-button')
      }).on('drop', this.onReorder.bind(this));
    }

    this.refs[`${this.datagridKey}-addRow`].forEach((addButton) => {
      this.addEventListener(addButton, 'click', this.addRow.bind(this));
    });

    this.refs[`${this.datagridKey}-removeRow`].forEach((removeButton, index) => {
      this.addEventListener(removeButton, 'click', this.removeRow.bind(this, index));
    });

    if (this.hasRowGroups()) {
      this.refs.chunks = this.getRowChunks(this.getGroupSizes(), this.refs[`${this.datagridKey}-row`]);
      this.refs[`${this.datagridKey}-group-header`].forEach((header, index) => {
        this.addEventListener(header, 'click', () => this.toggleGroup(header, index));
      });
     }

    const columns = this.getColumns();
    const rowLength = columns.length;
    this.rows.forEach((row, rowIndex) => {
      let columnIndex = 0;
      columns.forEach((col) => {
        this.attachComponents(
          this.refs[this.datagridKey][(rowIndex * rowLength) + columnIndex],
          [this.rows[rowIndex][col.key]],
          this.component.components
        );
        columnIndex++;
      });
    });
    return super.attach(element);
  }

  onReorder(element, _target, _source, sibling) {
    if (!element.dragInfo || (sibling && !sibling.dragInfo)) {
      console.warn('There is no Drag Info available for either dragged or sibling element');
      return;
    }

    const oldPosition = element.dragInfo.index;
    //should drop at next sibling position; no next sibling means drop to last position
    const newPosition = sibling ? sibling.dragInfo.index : this.dataValue.length;
    const movedBelow = newPosition > oldPosition;
    const dataValue = fastCloneDeep(this.dataValue);
    const draggedRowData = dataValue[oldPosition];

    //insert element at new position
    dataValue.splice(newPosition, 0, draggedRowData);
    //remove element from old position (if was moved above, after insertion it's at +1 index)
    dataValue.splice(movedBelow ? oldPosition : oldPosition + 1, 1);

    //need to re-build rows to re-calculate indexes and other indexed fields for component instance (like rows for ex.)
    this.setValue(dataValue);
    this.redraw();
  }

  addRow() {
    const index = this.rows.length;

    // Handle length mismatch between rows and dataValue
    if (this.dataValue.length === index) {
      this.dataValue.push({});
    }

    this.rows[index] = this.createRowComponents(this.dataValue[index], index);
    this.redraw();
  }

  removeRow(index) {
    this.splice(index);
    this.rows.splice(index, 1);
    this.redraw();
  }

  getRowValues() {
    return this.dataValue;
  }

  createRows(init) {
    let added = false;
    const rowValues = this.getRowValues();
    // Create any missing rows.
    rowValues.forEach((row, index) => {
      if (!this.rows[index]) {
        this.rows[index] = this.createRowComponents(row, index);
        added = true;
      }
    });
    // Delete any extra rows.
    this.rows.splice(rowValues.length);
    if (!init && added) {
      this.redraw();
    }
    return added;
  }

  createRowComponents(row, rowIndex) {
    const components = {};
    this.component.components.map((col, colIndex) => {
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;
      components[col.key] = this.createComponent(col, options, row);
      components[col.key].rowIndex = rowIndex;
      components[col.key].inDataGrid = true;
    });
    return components;
  }

  /**
   * Checks the validity of this datagrid.
   *
   * @param data
   * @param dirty
   * @return {*}
   */
  checkValidity(data, dirty, row) {
    data = data || this.rootValue;
    row = row || this.data;

    if (!this.checkCondition(row, data)) {
      this.setCustomValidity('');
      return true;
    }

    if (!this.checkComponentValidity(data, dirty, row)) {
      return false;
    }

    return this.checkRows('checkValidity', data, dirty, this.dataValue);
  }

  /**
   * Checks the data within each cell of the datagrid.
   *
   * @param data
   * @param flags
   * @return {*}
   */
  checkData(data, flags, row) {
    data = data || this.rootValue;
    row = row || this.data;
    Component.prototype.checkData.call(this, data, flags, row);
    return this.checkRows('checkData', data, flags, this.dataValue);
  }

  /**
   * Checks all rows within the datagrid.
   *
   * @param method
   * @param data
   * @param opts
   * @return {*|boolean}
   */
  checkRows(method, data, opts, rowData) {
    return this.rows.reduce((valid, row, index) =>
      this.checkRow(method, data, rowData[index], row, opts) && valid,
      true
    );
  }

  /**
   * Checks validity of each row according to a specific method.
   *
   * @param method
   * @param rowData
   * @param row
   * @param opts
   * @return {boolean}
   */
  checkRow(method, data, rowData, row, opts) {
    let valid = true;
    _.each(row, (col) => {
      valid = col[method](data, opts, rowData) && valid;
    });
    return valid;
  }

  checkColumns(data, flags) {
    data = data || this.rootValue;
    flags = flags || {};
    let show = false;

    if (!this.rows || !this.rows.length) {
      return { rebuld: false, show: false };
    }

    if (this.builderMode) {
      return { rebuild: false, show: true };
    }

    const visibility = {};

    const dataValue = this.dataValue;
    this.rows.forEach((row, rowIndex) => {
      _.each(row, (col, key) => {
        if (col && (typeof col.checkConditions === 'function')) {
          visibility[key] = !!visibility[key] ||
            (col.checkConditions(data, flags, dataValue[rowIndex]) && col.type !== 'hidden');
        }
      });
    });
    const rebuild = !_.isEqual(visibility, this.visibleColumns);
    _.each(visibility, (col) => {
      show |= col;
    });

    this.visibleColumns = visibility;
    return { rebuild, show };
  }

  checkComponentConditions(data, flags, row) {
    // If table isn't visible, don't bother calculating columns.
    if (!super.checkComponentConditions(data, flags, row)) {
      return false;
    }

    const { rebuild, show } = this.checkColumns(data, flags);
    // If a rebuild is needed, then rebuild the table.
    if (rebuild) {
      this.redraw();
    }

    // Return if this table should show.
    return show;
  }

  updateValue(value, flags) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return Component.prototype.updateValue.call(this, value, flags);
  }

  setValue(value, flags) {
    flags = flags || {};
    if (!value) {
      this.dataValue = this.defaultValue;
      this.createRows();
      return false;
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        value = [value];
      }
      else {
        this.createRows();
        value = [{}];
      }
    }

    // Make sure we always have at least one row.
    // NOTE: Removing this will break "Public Configurations" in portal. ;)
    if (value && !value.length) {
      value.push({});
    }

    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    this.createRows();
    this.rows.forEach((row, rowIndex) => {
      if (value.length <= rowIndex) {
        return;
      }
      _.each(row, (col, key) => {
        if (col.type === 'components') {
          col.data = value[rowIndex];
          col.setValue(value[rowIndex], flags);
        }
        else if (value[rowIndex].hasOwnProperty(key)) {
          col.data = value[rowIndex];
          col.setValue(value[rowIndex][key], flags);
        }
        else {
          col.data = value[rowIndex];
          col.setValue(col.defaultValue, flags);
        }
      });
    });

    this.updateOnChange(flags, changed);
    return changed;
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    return this.dataValue;
  }

  restoreComponentsContext() {
    this.rows.forEach((row, index) => _.forIn(row, (component) => component.data = this.dataValue[index]));
  }

  getComponent(path, fn) {
    path = Array.isArray(path) ? path : [path];
    const [key, ...remainingPath] = path;
    let result = [];

    if (!_.isString(key)) {
      return result;
    }

    this.everyComponent((component, components) => {
      if (component.component.key === key) {
        let comp = component;
        if (remainingPath.length > 0 && 'getComponent' in component) {
          comp = component.getComponent(remainingPath, fn);
        }
        else if (fn) {
          fn(component, components);
        }

        result = result.concat(comp);
      }
    });
    return result.length > 0 ? result : null;
  }

  toggleGroup(element, index) {
    element.classList.toggle('collapsed');
    _.each(this.refs.chunks[index], row => {
      row.classList.toggle('hidden');
    });
  }
}
