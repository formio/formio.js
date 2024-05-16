import _ from 'lodash';
import NestedArrayComponent from '../_classes/nestedarray/NestedArrayComponent';
import { fastCloneDeep, getFocusableElements } from '../../utils/utils';

let dragula;
if (typeof window !== 'undefined') {
  // Import from "dist" because it would require and "global" would not be defined in Angular apps.
  dragula = require('dragula/dist/dragula');
}

export default class DataGridComponent extends NestedArrayComponent {
  static schema(...extend) {
    return NestedArrayComponent.schema({
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
      documentation: '/userguide/form-building/data-components#data-grid',
      showPreview: false,
      weight: 30,
      schema: DataGridComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    this.type = 'datagrid';
    this.tabIndex = 0;
  }

  init() {
    this.components = this.components || [];

    // Add new values based on minLength.
    this.rows = [];
    this.columns = [...this.component.components];

    if (this.initRows || !_.isEqual(this.dataValue, this.emptyValue)) {
      this.createRows(true);
    }

    this.visibleColumns = {};
    this.prevHasAddButton = this.hasAddButton();
    this.checkColumns();
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

  get initEmpty() {
    return this.component.initEmpty || this.component.noFirstRow;
  }

  get initRows() {
    return this.builderMode || this.path === 'defaultValue' || !this.initEmpty;
  }

  get emptyValue() {
    return this.initEmpty ? [] : [{}];
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
    const isBuilderMode = this.builderMode;
    const isEmptyInit = this.initEmpty;
    // Ensure we have one and only one row in builder mode.
    if (isBuilderMode || (isEmptyInit && !this.dataValue.length)) {
      return isEmptyInit && !isBuilderMode ? [] : [{}];
    }

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

  get iteratableRows() {
    return this.rows.map((row, index) => ({
      components: row,
      data: this.dataValue[index],
    }));
  }

  isEmpty(value = this.dataValue) {
    const isEmpty = super.isEmpty(value);

    if (this.components?.length) {
      return this.components.reduce((isEmpty, component) => {
        return isEmpty && component.isEmpty();
      }, true);
    }

    return isEmpty;
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
        const endIndex = startIndex + size;
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

  hasExtraColumn() {
    return (this.hasRemoveButtons() || this.canAddColumn);
  }

  hasRemoveButtons() {
    return !this.builderMode && !this.component.disableAddingRemovingRows &&
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

  get canAddColumn() {
    return this.builderMode;
  }

  render() {
    const columns = this.getColumns();
    let columnExtra = 0;
    const hasRemoveButtons = this.hasRemoveButtons();
    if (this.component.reorder) {
      columnExtra++;
    }
    if (hasRemoveButtons) {
      columnExtra++;
    }
    if (this.canAddColumn) {
      columnExtra++;
    }
    const colWidth = Math.floor(12 / (columns.length + columnExtra));
    return super.render(this.renderTemplate('datagrid', {
      rows: this.getRows(),
      columns: columns,
      groups: this.hasRowGroups() ? this.getGroups() : [],
      visibleColumns: this.visibleColumns,
      hasToggle: _.get(this, 'component.groupToggle', false),
      hasHeader: this.hasHeader(),
      hasExtraColumn: this.hasExtraColumn(),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons,
      hasTopSubmit: this.hasTopSubmit(),
      hasBottomSubmit: this.hasBottomSubmit(),
      hasGroups: this.hasRowGroups(),
      numColumns: columns.length + (this.hasExtraColumn() ? 1 : 0),
      datagridKey: this.datagridKey,
      allowReorder: this.allowReorder,
      builder: this.builderMode,
      canAddColumn: this.canAddColumn,
      tabIndex: this.tabIndex,
      placeholder: this.renderTemplate('builderPlaceholder', {
        position: this.componentComponents.length,
      }),
      colWidth: colWidth.toString()
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
    return this.columns.filter((comp) => {
      return (!this.visibleColumns.hasOwnProperty(comp.key) || this.visibleColumns[comp.key]);
    });
  }

  hasHeader() {
    return this.component.components.reduce((hasHeader, col) => {
      // If any of the components has a title and it isn't hidden, display the header.
      return hasHeader || ((col.label || col.title) && !col.hideLabel);
    }, false);
  }

  loadRefs(element, refs) {
    super.loadRefs(element, refs);

    if (refs['messageContainer'] === 'single') {
      const container = _.last(element.querySelectorAll('[ref=messageContainer]'));
      this.refs['messageContainer'] = container || this.refs['messageContainer'];
    }
  }

  attach(element) {
    this.loadRefs(element, {
      [`${this.datagridKey}-row`]: 'multiple',
      [`${this.datagridKey}-tbody`]: 'single',
      [`${this.datagridKey}-addRow`]: 'multiple',
      [`${this.datagridKey}-removeRow`]: 'multiple',
      [`${this.datagridKey}-group-header`]: 'multiple',
      [this.datagridKey]: 'multiple',
      'messageContainer': 'single'
    });

    if (this.allowReorder) {
      this.refs[`${this.datagridKey}-row`].forEach((row, index) => {
        row.dragInfo = { index };
      });

      if (dragula) {
        this.dragula = dragula([this.refs[`${this.datagridKey}-tbody`]], {
          moves: (_draggedElement, _oldParent, clickedElement) => {
            const clickedElementKey = clickedElement.getAttribute('data-key');
            const oldParentKey = _oldParent.getAttribute('data-key');

            //Check if the clicked button belongs to that container, if false, it belongs to the nested container
            if (oldParentKey === clickedElementKey) {
              return clickedElement.classList.contains('formio-drag-button');
            }
          }
        }).on('drop', this.onReorder.bind(this));

        this.dragula.on('cloned', (el, original) => {
          if (el && el.children && original && original.children) {
            _.each(original.children, (child, index) => {
              const styles = getComputedStyle(child, null);

              if (styles.cssText !== '') {
                el.children[index].style.cssText = styles.cssText;
              }
              else {
                const cssText = Object.values(styles).reduce(
                  (css, propertyName) => {
                    return `${css}${propertyName}:${styles.getPropertyValue(
                      propertyName
                    )};`;
                  },
                  ''
                );

                el.children[index].style.cssText = cssText;
              }
            });
          }
        });
      }
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
          this.getComponentsContainer(),
        );
        columnIndex++;
      });
    });
    return super.attach(element);
  }

  getComponentsContainer() {
    return this.component.components;
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
    this.setValue(dataValue, { isReordered: true });
    this.rebuild();
  }

  focusOnNewRowElement(row) {
    Object.keys(row).find((key) => {
      const element = row[key].element;
      if (element) {
        const focusableElements = getFocusableElements(element);
        if (focusableElements && focusableElements[0]) {
          focusableElements[0].focus();
          return true;
        }
      }
      return false;
    });
  }

  addRow() {
    const index = this.rows.length;

    // Handle length mismatch between rows and dataValue
    if (this.dataValue.length === index) {
      this.dataValue.push({});
    }

    let row;
    const dataValue = this.dataValue;
    const defaultValue = this.defaultValue;

    if (this.initEmpty && defaultValue[index]) {
      row = defaultValue[index];
      dataValue[index] = row;
    }
    else {
      row = dataValue[index];
    }

    this.rows[index] = this.createRowComponents(row, index);
    this.emit('dataGridAddRow', {
      component: this.component,
      row
    });
    this.checkConditions();
    this.triggerChange();
    this.redraw().then(() => {
      this.focusOnNewRowElement(this.rows[index]);
    });
  }

  updateComponentsRowIndex(components, rowIndex) {
    components.forEach((component, colIndex) => {
      if (component.options?.name) {
        const newName = `[${this.key}][${rowIndex}]`;
        component.options.name = component.options.name.replace(`[${this.key}][${component.rowIndex}]`, newName);
      }
      component.rowIndex = rowIndex;
      component.row = `${rowIndex}-${colIndex}`;
      component.path = this.calculateComponentPath(component);
    });
  }

  updateRowsComponents(rowIndex) {
    this.rows.slice(rowIndex).forEach((row, index) => {
      this.updateComponentsRowIndex(Object.values(row), rowIndex + index);
    });
  }

  removeRow(index) {
    const makeEmpty = index === 0 && this.rows.length === 1;
    const flags = { isReordered: !makeEmpty, resetValue: makeEmpty };
    this.splice(index, flags);
    this.emit('dataGridDeleteRow', { index });
    const [row] = this.rows.splice(index, 1);
    this.removeRowComponents(row);
    this.updateRowsComponents(index);
    this.setValue(this.dataValue, flags);
    this.redraw();
  }

  removeRowComponents(row) {
    _.each(row, (component) => this.removeComponent(component));
  }

  getRowValues() {
    return this.dataValue;
  }

  setRowComponentsData(rowIndex, rowData) {
    _.each(this.rows[rowIndex], (component) => {
     component.data = rowData;
    });
  }

  createRows(init, rebuild) {
    let added = false;
    const rowValues = this.getRowValues();
    // Create any missing rows.
    rowValues.forEach((row, index) => {
      if (!rebuild && this.rows[index]) {
        this.setRowComponentsData(index, row);
      }
      else {
        if (this.rows[index]) {
          this.removeRowComponents(this.rows[index]);
        }
        this.rows[index] = this.createRowComponents(row, index);
        added = true;
      }
    });
    // Delete any extra rows.
    const removedRows = this.rows.splice(rowValues.length);
    const removed = !!removedRows.length;
    // Delete components of extra rows (to make sure that this.components contain only components of exisiting rows)
    if (removed) {
      removedRows.forEach(row => this.removeRowComponents(row));
    }

    if (!init && (added || removed)) {
      this.redraw();
    }
    return added;
  }

  createRowComponents(row, rowIndex) {
    const components = {};
    this.tabIndex = 0;
    this.component.components.map((col, colIndex) => {
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;

      let columnComponent;

      if (this.builderMode) {
        col.id = col.id + rowIndex;
        columnComponent = col;
      }
      else {
        columnComponent = { ...col, id: (col.id + rowIndex) };
      }

      const component = this.createComponent(columnComponent, options, row);
      component.parentDisabled = !!this.disabled;
      component.rowIndex = rowIndex;
      component.inDataGrid = true;
      if (
        columnComponent.tabindex &&
        parseInt(columnComponent.tabindex) > this.tabIndex
      ) {
        this.tabIndex = parseInt(columnComponent.tabindex);
      }
      components[col.key] = component;
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
  checkValidity(data, dirty, row, silentCheck) {
    data = data || this.rootValue;
    row = row || this.data;

    if (!this.checkCondition(row, data)) {
      this.setCustomValidity('');
      return true;
    }

    if (!this.checkComponentValidity(data, dirty, row, { silentCheck })) {
      return false;
    }

    const isValid = this.checkRows('checkValidity', data, dirty, true, silentCheck);

    this.checkModal(isValid, dirty);

    return isValid;
  }

  checkColumns(data, flags = {}) {
    data = data || this.rootValue;
    let show = false;

    if (!this.rows || !this.rows.length) {
      return { rebuild: false, show: false };
    }

    if (this.builderMode) {
      return { rebuild: false, show: true };
    }

    const visibility = {};

    let logicRebuild = false;

    const dataValue = this.dataValue;
    this.rows.forEach((row, rowIndex) => {
      _.each(row, (col, key) => {
        if (col && (typeof col.checkConditions === 'function')) {
          const firstRowCheck = visibility[key] === undefined;
          visibility[key] = !!visibility[key] ||
            (col.checkConditions(data, flags, dataValue[rowIndex]) && col.type !== 'hidden');

          if (col.component.logic && firstRowCheck) {
            const compIndex = _.findIndex(this.columns, ['key', key]);
            if (!_.isEqual(this.columns[compIndex], col.component)) {
              logicRebuild = true;
              this.columns[compIndex] = col.component;
            }
          }
        }
      });
    });
    const rebuild = !_.isEqual(visibility, this.visibleColumns) || logicRebuild;
    _.each(visibility, (col) => {
      show |= col;
    });

    this.visibleColumns = visibility;
    return { rebuild, show };
  }

  checkComponentConditions(data, flags, row) {
    const isVisible = this.visible;
    // If table isn't visible, don't bother calculating columns.
    if (!super.checkComponentConditions(data, flags, row)) {
      return false;
    }

    const { rebuild, show } = this.checkColumns(data, flags);
    // Check if a rebuild is needed or the visibility changes.
    if (rebuild || !isVisible) {
      this.createRows(false, rebuild);
    }

    // Return if this table should show.
    return show;
  }

  setValue(value, flags = {}) {
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
    if (value && !value.length && !this.initEmpty) {
      value.push({});
    }
    const isSettingSubmission = flags.fromSubmission && !_.isEqual(value, this.emptyValue);
    const changed = this.hasChanged(value, this.dataValue);

    this.dataValue = value;

    if (this.initRows || isSettingSubmission ||
        (Array.isArray(this.dataValue) && this.dataValue.length !== this.rows.length)) {
      if (!this.createRows() && changed) {
        this.redraw();
      }
    }

    if (this.componentModal && isSettingSubmission) {
      this.componentModal.setValue(value);
    }

    this.rows.forEach((row, rowIndex) => {
      if (value.length <= rowIndex) {
        return;
      }
      _.each(row, (col) => {
        col.rowIndex = rowIndex;
        this.setNestedValue(col, value[rowIndex], flags);
      });
    });

    this.updateOnChange(flags, changed);
    return changed;
  }

  restoreComponentsContext() {
    this.rows.forEach((row, index) => _.forIn(row, (component) => component.data = this.dataValue[index]));
  }

  getComponent(path, fn) {
    path = Array.isArray(path) ? path : [path];
    const [key, ...remainingPath] = path;
    let result = [];
    if (_.isNumber(key) && remainingPath.length) {
      const compKey = remainingPath.pop();
      result = this.rows[key][compKey];
      // If the component is inside a Layout Component, try to find it among all the row's components
      if (!result) {
        Object.entries(this.rows[key]).forEach(([, comp]) => {
          if ('getComponent' in comp) {
            const possibleResult = comp.getComponent([compKey], fn);
            if (possibleResult) {
              result = possibleResult;
            }
          }
        });
      }
      if (result && _.isFunction(fn)) {
        fn(result, this.getComponents());
      }
      if (remainingPath.length && 'getComponent' in result) {
        return result.getComponent(remainingPath, fn);
      }
      return result;
    }
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
