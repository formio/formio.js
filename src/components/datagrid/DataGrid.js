import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';
import Component from '../_classes/component/Component';

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
    this.numColumns = 0;

    // Add new values based on minLength.
    this.rows = [];
    this.createRows();
    this.visibleColumns = {};
    this.checkColumns(this.dataValue);
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

  get datagridKey() {
    return `datagrid-${this.key}`;
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
    return _.get(this, 'component.enableRowGroups', false) && (this.options.attachMode !== 'builder');
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
      !this.shouldDisable &&
      this.options.attachMode === 'full' &&
      !this.options.preview &&
      (!maxLength || (this.dataValue.length < maxLength));
  }

  hasExtraColumn() {
    const rmPlacement = _.get(this, 'component.removePlacement', 'col');
    return (this.hasRemoveButtons() && rmPlacement === 'col') || this.options.attachMode === 'builder';
  }

  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.shouldDisable &&
      this.options.attachMode === 'full' &&
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
      removePlacement: _.get(this, 'component.removePlacement', 'col'),
      rows: this.getRows(),
      columns: this.getColumns(),
      groups: this.hasRowGroups() ? this.getGroups() : [],
      visibleColumns: this.visibleColumns,
      hasToggle: _.get(this, 'component.groupToggle', false),
      hasHeader: this.hasHeader(),
      hasExtraColumn: this.hasExtraColumn(),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons: this.hasRemoveButtons,
      hasTopSubmit: this.hasTopSubmit(),
      hasBottomSubmit: this.hasBottomSubmit(),
      hasGroups: this.hasRowGroups(),
      numColumns: _.filter(this.visibleColumns).length + (this.hasExtraColumn() ? 1 : 0),
      datagridKey: this.datagridKey,
      builder: this.options.attachMode === 'builder',
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
    return this.component.components;
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

    const rowLength = _.filter(this.visibleColumns).length;
    this.rows.forEach((row, rowIndex) => {
      let columnIndex = 0;
      this.getColumns().forEach((col) => {
        if (!this.visibleColumns.hasOwnProperty(col.key) || this.visibleColumns[col.key]) {
          this.attachComponents(
            this.refs[this.datagridKey][(rowIndex * rowLength) + columnIndex],
            [this.rows[rowIndex][col.key]],
            this.component.components
          );
          columnIndex++;
        }
      });
    });
    super.attach(element);
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

  checkColumns(data) {
    let show = false;

    if (!this.rows || !this.rows.length) {
      return { rebuld: false, show: false };
    }

    const visibility = {};

    this.rows.forEach((row) => {
      _.each(row, (col, key) => {
        if (col && (typeof col.checkConditions === 'function')) {
          visibility[key] = !!visibility[key] || col.checkConditions(data);
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

  checkConditions(data) {
    // If table isn't visible, don't bother calculating columns.
    if (!super.checkConditions(data)) {
      return false;
    }

    const { rebuild, show } = this.checkColumns(data);
    // If a rebuild is needed, then rebuild the table.
    if (rebuild) {
      this.redraw();
    }

    // Return if this table should show.
    return show;
  }

  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return Component.prototype.updateValue.call(this, flags, value);
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      this.dataValue = this.defaultValue;
      this.createRows();
      return;
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

    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    this.createRows();
    this.rows.forEach((row, rowIndex) => {
      if (value.length <= rowIndex) {
        return;
      }
      _.each(row, (col, key) => {
        if (col.type === 'components') {
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
    if (changed) {
      this.redraw();
    }
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
