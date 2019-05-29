import _ from 'lodash';
import NestedComponent from '../nested/NestedComponent';
import BaseComponent from '../base/Base';

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
      icon: 'fa fa-th',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#datagrid',
      weight: 20,
      schema: DataGridComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'datagrid';
    this.numRows = 0;
    this.numColumns = 0;
    this.rows = [];

    if (this.hasRowGroups() && !this.options.builder) {
      const groups = _.get(this.component, 'rowGroups', []);
      const rowsNum = this.totalRowsNumber(groups);
      this.setStaticValue(rowsNum);
      this.dataValue = _.zipWith(this.dataValue, this.defaultValue, (a, b) => {
        return _.merge(a, b);
      });
    }
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

  setStaticValue(n) {
    this.dataValue = _.range(n).map(() => ({}));
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
    const rmPlacement = _.get(this, 'component.removePlacement', 'col');
    return (this.hasRemoveButtons() && rmPlacement === 'col') || this.options.builder;
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

  build() {
    this.createElement();
    this.createLabel(this.element);
    let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    this.tableElement = this.ce('table', {
      class: tableClass,
      style: this.component.layoutFixed ? 'table-layout: fixed;' : '',
    });
    this.element.appendChild(this.tableElement);
    if (!this.dataValue.length) {
      this.addNewValue();
    }
    this.visibleColumns = true;
    this.errorContainer = this.element;
    this.restoreValue();
    this.createDescription(this.element);
    this.attachLogic();
  }

  setVisibleComponents() {
    // Add new values based on minLength.
    for (let dIndex = this.dataValue.length; dIndex < _.get(this.component, 'validate.minLength', 0); dIndex++) {
      this.dataValue.push({});
    }

    this.numColumns = this.hasExtraColumn() ? 1 : 0;
    this.numColumns += this.allowReorder ? 1 : 0;
    this.numRows = this.dataValue.length;

    if (this.visibleColumns === true) {
      this.numColumns += this.component.components.length;
      this.visibleComponents = this.component.components;
      return this.visibleComponents;
    }

    this.visibleComponents = this.component.components.filter((comp) => this.visibleColumns[comp.key]);
    this.numColumns += this.visibleComponents.length;
  }

  buildRows() {
    this.setVisibleComponents();
    const state = this.destroy();
    this.empty(this.tableElement);

    // Build the rows.
    const tableRows = [];
    this.dataValue.forEach((row, rowIndex) => tableRows.push(this.buildRow(row, rowIndex, state.rows[rowIndex])));

    // Create the header (must happen after build rows to get correct column length)
    const header = this.createHeader();
    if (header) {
      this.tableElement.appendChild(header);
    }
    this.tableBody = this.ce('tbody', null, tableRows);
    this.tableElement.appendChild(this.tableBody);

    if (this.allowReorder) {
      this.addDraggable([this.tableBody]);
    }

    if (this.hasRowGroups() && !this.options.builder) {
      this.buildGroups();
    }

    // Create the add row button footer element.
    if (this.hasBottomSubmit()) {
      this.tableElement.appendChild(this.ce('tfoot', null,
        this.ce('tr', null,
          this.ce('td', { colspan: this.numColumns },
            this.addButton()
          )
        )
      ));
    }
  }

  get allowReorder() {
    return super.allowReorder && !this.options.builder;
  }

  onRowDrop(droppedElement, newParent, oldParent, nextSibling) {
    super.onRowDrop(droppedElement, newParent, oldParent, nextSibling);
    this.triggerChange();
  }

  // Build the header.
  createHeader() {
    const hasTopButton = this.hasTopSubmit();
    const hasEnd = this.hasExtraColumn() || hasTopButton;
    let needsHeader = false;
    const thead = this.ce('thead', null, this.ce('tr', null,
      [
        this.allowReorder ? this.ce('th', {
          class: 'formio-drag-column-header'
        }) : null,
        this.visibleComponents.map(comp => {
          const th = this.ce('th');
          if (comp.validate && comp.validate.required) {
            th.setAttribute('class', 'field-required');
          }
          const title = comp.label || comp.title;
          if (title && !comp.dataGridLabel) {
            needsHeader = true;
            th.appendChild(this.text(title));
            this.createTooltip(th, comp);
          }
          return th;
        }),
        hasEnd ? this.ce('th', null, (hasTopButton ? this.addButton(true) : null)) : null,
      ]
    ));
    return needsHeader ? thead : null;
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

  get defaultValue() {
    const value = super.defaultValue;
    if (Array.isArray(value)) {
      return value;
    }
    if (value && (typeof value === 'object')) {
      return [value];
    }
    return this.emptyValue;
  }

  buildRow(rowData, index, state) {
    state = state || {};
    const components = _.get(this, 'component.components', []);
    const colsNum = components.length;
    const lastColIndex = colsNum - 1;
    const hasRmButton = this.hasRemoveButtons();
    const hasTopButton = this.hasTopSubmit();
    const rmPlacement = _.get(this, 'component.removePlacement', 'col');
    let useCorner = false;
    let lastColumn = null;
    this.rows[index] = {};
    let firstColumn = null;

    if (this.allowReorder) {
      firstColumn = this.ce('td', {
        class: 'formio-drag-column'
      }, this.dragButton());
    }

    if (hasRmButton) {
      if (rmPlacement === 'col') {
        lastColumn = this.ce('td', {
          class: 'formio-remove-column'
        }, this.removeButton(index));
      }
      else {
        useCorner = true;
      }
    }
    else if (this.options.builder) {
      lastColumn = this.ce('td', {
        id: `${this.id}-drag-container`,
        class: 'drag-container'
      }, this.ce('div', {
        id: `${this.id}-placeholder`,
        class: 'alert alert-info',
        style: 'text-align:center; margin-bottom: 0px;',
        role: 'alert'
      }, this.text('Drag and Drop a form component')));
      this.root.addDragContainer(lastColumn, this);
    }

    const rowElement =  this.ce('tr', null,
      [
        firstColumn,
        components.map(
          (cmp, colIndex) => {
            const cell = this.buildComponent(
              cmp,
              colIndex,
              rowData,
              index,
              this.getComponentState(cmp, state)
            );

            if (hasRmButton && useCorner && lastColIndex === colIndex) {
              cell.style.position = 'relative';
              cell.style.width = '50px';
              cell.append(this.removeButton(index, 'small'));
              if (hasTopButton ) {
                cell.setAttribute('colspan', 2);
              }
            }

            return cell;
          }
        ),
        lastColumn
      ]
    );

    //add element info for drag'n'drop handlers
    if (this.allowReorder) {
      rowElement.dragInfo = {
        index: index
      };
    }

    return rowElement;
  }

  destroyRows() {
    const state = {};
    state.rows = state.rows || {};
    this.rows.forEach((row, rowIndex) => _.forIn(row, col => {
      state.rows[rowIndex] = state.rows[rowIndex] || {};
      const compState = this.removeComponent(col, row);
      if (col.key && compState) {
        state.rows[rowIndex][col.key] = compState;
      }
    }));
    this.rows = [];
    return state;
  }

  destroy() {
    const state = this.destroyRows();
    super.destroy();
    return state;
  }

  buildComponent(col, colIndex, row, rowIndex, state) {
    var container;
    const isVisible = this.visibleColumns &&
      (!this.visibleColumns.hasOwnProperty(col.key) || this.visibleColumns[col.key]);
    if (isVisible || this.options.builder) {
      container = this.ce('td');
      container.noDrop = true;
    }
    const column = _.clone(col);
    const options = _.clone(this.options);
    options.name += `[${rowIndex}]`;
    options.row = `${rowIndex}-${colIndex}`;
    options.inDataGrid = true;
    const comp = this.createComponent(_.assign({}, column, {
      row: options.row
    }), options, row, null, state);
    comp.rowIndex = rowIndex;
    this.hook('addComponent', container, comp, this);
    this.rows[rowIndex][column.key] = comp;
    if (isVisible || this.options.builder) {
      container.appendChild(comp.getElement());
      return container;
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
    this.component.components.forEach((col) => {
      let showColumn = false;
      this.rows.forEach((comps) => {
        if (comps && comps[col.key] && typeof comps[col.key].checkConditions === 'function') {
          showColumn |= comps[col.key].checkConditions(data);
        }
      });
      showColumn = showColumn && col.type !== 'hidden' && !col.hidden;
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
      this.restoreValue();
    }

    // Return if this table should show.
    return show;
  }

  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  /* eslint-disable max-statements */
  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      this.dataValue = this.defaultValue;
      this.buildRows();
      return;
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        value = [value];
      }
      else {
        this.buildRows();
        return;
      }
    }

    const changed = this.hasChanged(value, this.dataValue);

    //always should build if not built yet OR is trying to set empty value (in order to prevent deleting last row)
    let shouldBuildRows = !this.isBuilt || changed || _.isEqual(this.emptyValue, value);
    //check if visible columns changed
    let visibleColumnsAmount = 0;
    _.forEach(this.visibleColumns, (value) => {
      if (value) {
        visibleColumnsAmount++;
      }
    });
    const visibleComponentsAmount = this.visibleComponents ? this.visibleComponents.length : 0;
    //should build if visible columns changed
    shouldBuildRows = shouldBuildRows || visibleColumnsAmount !== visibleComponentsAmount;
    //loop through all rows and check if there is field in new value that differs from current value
    const keys = this.componentComponents.map((component) => {
      return component.key;
    });
    for (let i = 0; i < value.length; i++) {
      if (shouldBuildRows) {
        break;
      }
      const valueRow = value[i];
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        const newFieldValue = valueRow[key];
        const currentFieldValue = this.rows[i] && this.rows[i][key] ? this.rows[i][key].getValue() : undefined;
        const defaultFieldValue = this.rows[i] && this.rows[i][key] ? this.rows[i][key].defaultValue : undefined;
        const isMissingValue = newFieldValue === undefined && currentFieldValue === defaultFieldValue;
        if (!isMissingValue && !_.isEqual(newFieldValue, currentFieldValue)) {
          shouldBuildRows = true;
          break;
        }
      }
    }
    this.dataValue = value;
    if (shouldBuildRows) {
      this.buildRows();
    }
    this.rows.forEach((row, index) => {
      if (value.length <= index) {
        return;
      }
      _.forIn(row, component => this.setNestedValue(component, value[index], flags));
    });
    return changed;
  }
  /* eslint-enable max-statements */

  resetValue() {
    super.resetValue();
    this.buildRows();
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

  /** @override **/
  removeButton(index, mode = 'basic') {
    if (mode === 'small') {
      return this.removeButtonSmall(index);
    }

    return super.removeButton(index);
  }

  removeButtonSmall(index) {
    const cmpType = _.get(this, 'component.type', 'datagrid');
    const className = `btn btn-xxs btn-danger formio-${cmpType}-remove`;
    const button = this.ce(
      'button',
      {
        type: 'button',
        tabindex: '-1',
        class: className,
      },
      this.ce('i', { class: this.iconClass('remove') })
    );

    this.addEventListener(button, 'click', (event) => {
      event.preventDefault();
      this.removeValue(index);
    });

    return button;
  }

  /*** Row Groups ***/

  /**
   * @param {Numbers[]} groups
   * @param {Array<T>} coll - collection
   *
   * @return {Array<T[]>}
   */
  getRowChunks(groups, coll) {
    const [, chunks] = groups.reduce(
      ([startIndex, acc], size) => {
        const endIndex = startIndex +  size;
        return [endIndex, [...acc, [startIndex, endIndex]]];
      },
      [0, []]
    );

    return chunks.map(range => _.slice(coll, ...range));
  }

  hasRowGroups() {
    return _.get(this, 'component.enableRowGroups', false);
  }

  buildGroups() {
    const groups = _.get(this.component, 'rowGroups', []);
    const ranges = _.map(groups, 'numberOfRows');
    const rows = this.tableElement.querySelectorAll('tbody>tr');
    const tbody = this.tableElement.querySelector('tbody');
    const chunks = this.getRowChunks(ranges, rows);
    const firstElements = chunks.map(_.head);
    const groupElements = groups.map((g, index) => this.buildGroup(g, index, chunks[index]));

    groupElements.forEach((elt, index) => {
      const row = firstElements[index];

      if (row) {
        tbody.insertBefore(elt, row);
      }
    });
  }

  buildGroup({ label }, index, groupRows) {
    const hasToggle = _.get(this, 'component.groupToggle', false);
    const colsNumber = _.get(this, 'component.components', []).length;
    const cell = this.ce('td', {
      colspan: colsNumber,
      class: 'datagrid-group-label',
    }, [label]);
    const header = this.ce('tr', {
      class: `datagrid-group-header ${hasToggle ? 'clickable' : ''}`,
    }, cell);

    if (hasToggle) {
      this.addEventListener(header, 'click', () => {
        header.classList.toggle('collapsed');
        _.each(groupRows, row => {
          row.classList.toggle('hidden');
        });
      });
    }

    return header;
  }

  totalRowsNumber(groups) {
    return _.sum(_.map(groups, 'numberOfRows'));
  }
}
// const BaseGetSchema = Object.getOwnPropertyDescriptor(BaseComponent.prototype, 'schema');
// Object.defineProperty(DataGridComponent.prototype, 'schema', BaseGetSchema);
