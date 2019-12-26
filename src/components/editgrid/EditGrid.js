import _ from 'lodash';
import equal from 'fast-deep-equal';

import NestedComponent from '../_classes/nested/NestedComponent';
import Component from '../_classes/component/Component';
import { fastCloneDeep, Evaluator } from '../../utils/utils';
import templates from './templates';

export default class EditGridComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'editgrid',
      label: 'Edit Grid',
      key: 'editGrid',
      clearOnHide: true,
      input: true,
      tree: true,
      removeRow: 'Cancel',
      defaultOpen: false,
      openWhenEmpty: false,
      components: [],
      inlineEdit: false,
      templates: {
        header: EditGridComponent.defaultHeaderTemplate,
        row: EditGridComponent.defaultRowTemplate,
        footer: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Edit Grid',
      icon: 'tasks',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#editgrid',
      weight: 30,
      schema: EditGridComponent.schema()
    };
  }

  static get defaultHeaderTemplate() {
    return `<div class="row">
  {% util.eachComponent(components, function(component) { %}
    <div class="col-sm-2">{{ component.label }}</div>
  {% }) %}
</div>`;
  }

  static get defaultRowTemplate() {
    return `<div class="row">
  {% util.eachComponent(components, function(component) { %}
    <div class="col-sm-2">
      {{ getView(component, row[component.key]) }}
    </div>
  {% }) %}
  {% if (!instance.options.readOnly && !instance.originalComponent.disabled) { %}
    <div class="col-sm-2">
      <div class="btn-group pull-right">
        <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass('edit') }}"></i></button>
        {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}
          <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass('trash') }}"></i></button>
        {% } %}
      </div>
    </div>
  {% } %}
</div>`;
  }

  get defaultSchema() {
    return EditGridComponent.schema();
  }

  get emptyValue() {
    return [];
  }

  get editgridKey() {
    return `editgrid-${this.key}`;
  }

  get minLength() {
    return _.get(this.component, 'validate.minLength', 0);
  }

  get allowData() {
    return true;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;

    const data = this.dataValue;

    (this.editRows || []).forEach((row, index) => {
      const rowData = data[index];

      row.data = rowData;
      row.components.forEach((component) => {
        component.data = rowData;
      });
    });
  }

  constructor(...args) {
    super(...args);
    this.type = 'editgrid';
    // this.editRows = [];
  }

  getValueAsString() {
    return '[Complex Data]';
  }

  hasAddButton() {
    const maxLength = _.get(this.component, 'validate.maxLength');
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      !this.options.preview &&
      (!maxLength || (this.editRows.length < maxLength));
  }

  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      (this.dataValue.length > _.get(this.component, 'validate.minLength', 0));
  }

  init() {
    if (this.builderMode) {
      this.editRows = [];
      return super.init();
    }

    this.components = this.components || [];
    const dataValue = this.dataValue || [];
    const openWhenEmpty = !dataValue.length && this.component.openWhenEmpty;
    if (openWhenEmpty) {
      const dataObj = {};
      this.editRows = [{
        isOpen: true,
        data: dataObj,
        emptyOpen: true,
        components: this.createRowComponents(dataObj, 0),
      }];
    }
    else {
      this.editRows = dataValue.map((row, rowIndex) => ({
        isOpen: false,
        data: row,
        components: this.createRowComponents(row, rowIndex),
      }));
    }
    this.checkData();
  }

  render(children) {
    if (this.builderMode) {
      return super.render();
    }

    const dataValue = this.dataValue || [];
    const headerTemplate = Evaluator.noeval ? templates.header : _.get(this.component, 'templates.header');
    return super.render(children || this.renderTemplate('editgrid', {
      editgridKey: this.editgridKey,
      header: this.renderString(headerTemplate, {
        components: this.component.components,
        value: dataValue
      }),
      footer: this.renderString(_.get(this.component, 'templates.footer'), {
        components: this.component.components,
        value: dataValue
      }),
      rows: this.editRows.map(this.renderRow.bind(this)),
      openRows: this.editRows.map(row => row.isOpen),
      errors: this.editRows.map(row => row.error),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons: this.hasRemoveButtons()
    }));
  }

  attach(element) {
    if (this.builderMode) {
      return super.attach(element);
    }

    this.loadRefs(element, {
      [`${this.editgridKey}-addRow`]: 'multiple',
      [`${this.editgridKey}-removeRow`]: 'multiple',
      [`${this.editgridKey}-saveRow`]: 'multiple',
      [`${this.editgridKey}-cancelRow`]: 'multiple',
      [this.editgridKey]: 'multiple',
    });

    this.refs[`${this.editgridKey}-addRow`].forEach((addButton) => {
      this.addEventListener(addButton, 'click', this.addRow.bind(this));
    });

    let openRowCount = 0;
    this.refs[this.editgridKey].forEach((row, rowIndex) => {
      if (this.editRows[rowIndex].isOpen) {
        this.attachComponents(row, this.editRows[rowIndex].components);
        this.addEventListener(this.refs[`${this.editgridKey}-saveRow`][openRowCount], 'click', () =>
          this.saveRow(rowIndex)
        );
        this.addEventListener(this.refs[`${this.editgridKey}-cancelRow`][openRowCount], 'click', () =>
          this.cancelRow(rowIndex)
        );
        openRowCount++;
      }
      else {
        // Attach edit and remove button events.
        [
          {
            class: 'removeRow',
            event: 'click',
            action: this.removeRow.bind(this, rowIndex)
          },
          {
            class: 'editRow',
            event: 'click',
            action: this.editRow.bind(this, rowIndex)
          },
        ].forEach(action => {
          const elements = row.getElementsByClassName(action.class);
          Array.prototype.forEach.call(elements, element => {
            this.addEventListener(element, action.event, action.action);
          });
        });
      }
    });

    // Add open class to the element if any edit grid row is open
    if (openRowCount) {
      this.addClass(this.refs.component, `formio-component-${this.component.type}-row-open`);
    }
    else {
      this.removeClass(this.refs.component, `formio-component-${this.component.type}-row-open`);
    }

    return super.attach(element);
  }

  renderRow(row, rowIndex) {
    const dataValue = this.dataValue || [];
    if (row.isOpen) {
      return this.renderComponents(row.components);
    }
    else {
      const flattenedComponents = this.flattenComponents(rowIndex);
      const rowTemplate = Evaluator.noeval ? templates.row : _.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate);
      return this.renderString(
        rowTemplate,
        {
          row: dataValue[rowIndex] || {},
          data: this.data,
          rowIndex,
          components: this.component.components,
          flattenedComponents,
          getView: (component, data) => {
            const instance = flattenedComponents[component.key];
            return instance ? instance.getView(data) : '';
          },
        },
      );
    }
  }

  checkData(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    Component.prototype.checkData.call(this, data, flags, row);
    return this.editRows.reduce(
      (valid, editRow) => this.checkRow(data, editRow, flags, editRow.data) && valid,
      true
    );
  }

  checkRow(data, editRow, flags, row) {
    return super.checkData(data, flags, row, editRow.components);
  }

  everyComponent(fn, rowIndex) {
    const components = this.getComponents(rowIndex);
    _.each(components, (component, index) => {
      if (fn(component, components, index) === false) {
        return false;
      }

      if (typeof component.everyComponent === 'function') {
        if (component.everyComponent(fn) === false) {
          return false;
        }
      }
    });
  }

  flattenComponents(rowIndex) {
    const result = {};

    this.everyComponent((component) => {
      result[component.key] = component;
    }, rowIndex);

    return result;
  }

  getComponents(rowIndex) {
    // Ensure editrows is set.
    this.editRows = this.editRows || [];
    return this.builderMode
      ? super.getComponents()
      : _.isNumber(rowIndex)
        ? (this.editRows[rowIndex].components || [])
        : this.editRows.reduce((result, row) => result.concat(row.components || []), []);
  }

  destroyComponents(rowIndex) {
    if (this.builderMode) {
      return super.destroyComponents();
    }

    const components = this.getComponents(rowIndex).slice();
    components.forEach((comp) => comp.destroy());
  }

  addRow() {
    if (this.options.readOnly) {
      return;
    }
    const dataObj = {};
    this.editRows.push({
      components: [],
      isOpen: true,
      data: dataObj
    });
    if (this.component.inlineEdit) {
      this.dataValue.push(dataObj);
    }
    const rowIndex = this.editRows.length - 1;
    const editRow = this.editRows[rowIndex];
    this.emit('editGridAddRow', {
      component: this.component,
      row: editRow
    });
    editRow.components = this.createRowComponents(editRow.data, rowIndex);
    this.checkRow(null, editRow, {}, editRow.data);
    if (this.component.modal) {
      this.addRowModal(rowIndex);
    }
    else {
      this.redraw();
    }
    return editRow;
  }

  addRowModal(rowIndex) {
    const formComponents =  this.ce('div');
    formComponents.innerHTML = this.renderComponents(this.editRows[rowIndex].components);
    const dialog = this.component.modal ? this.createModal(formComponents) : undefined;
    dialog.refs.dialogContents.appendChild( this.ce('button', {
      class: 'btn btn-primary',
      onClick: () => {
        if (this.validateRow(this.editRows[rowIndex], true)) {
          dialog.close();
          this.saveRow(rowIndex);
        }
      }
    }, this.component.saveRow || 'Save'));
    this.attachComponents(formComponents, this.editRows[rowIndex].components);
  }

  setEditRowSettings(editRow) {
    editRow.dirty = false;
    editRow.isOpen = true;
    editRow.editing = true;
  }

  editRow(rowIndex) {
    const dataValue = this.dataValue || [];
    const editRow = this.editRows[rowIndex];
    this.setEditRowSettings(editRow);
    const dataSnapshot = dataValue[rowIndex] ? fastCloneDeep(dataValue[rowIndex]) : {};
    if (this.component.inlineEdit) {
      editRow.backup = dataSnapshot;
    }
    else {
      editRow.data = dataSnapshot;
      this.restoreRowContext(editRow);
    }
    if (this.component.modal) {
      this.addRowModal(rowIndex);
    }
    else {
      this.redraw();
    }
  }

  clearErrors(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (editRow && Array.isArray(editRow.components)) {
      editRow.components.forEach(comp => {
        comp.setPristine(true);
        comp.setCustomValidity('');
      });
    }
  }

  cancelRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (this.options.readOnly) {
      editRow.dirty = false;
      editRow.isOpen = false;
      editRow.editing = false;
      this.redraw();
      return;
    }
    if (editRow.editing) {
      const dataValue = this.dataValue || [];
      editRow.dirty = false;
      editRow.isOpen = false;
      editRow.editing = false;
      if (this.component.inlineEdit) {
        this.dataValue[rowIndex] = editRow.backup;
        editRow.data = editRow.backup;
        this.restoreRowContext(editRow);
      }
      editRow.data = dataValue[rowIndex] || {};
      this.clearErrors(rowIndex);
    }
    else {
      this.clearErrors(rowIndex);
      this.destroyComponents(rowIndex);
      if (this.component.inlineEdit) {
        this.splice(rowIndex);
      }
      this.editRows.splice(rowIndex, 1);
    }

    this.checkValidity(null, true);
    this.redraw();
  }

  saveRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (this.options.readOnly) {
      editRow.dirty = false;
      editRow.isOpen = false;
      this.redraw();
      return;
    }
    editRow.dirty = true;
    if (!!this.validateRow(editRow, true) !== true) {
      return false;
    }

    if (!this.component.inlineEdit) {
      const dataValue = this.dataValue || [];
      if (editRow.editing) {
        dataValue[rowIndex] = editRow.data;
      }
      else {
        // Insert this row into its proper place.
        const newIndex = dataValue.length;
        dataValue.push(editRow.data);
        this.editRows.splice(rowIndex, 1);
        this.editRows.splice(newIndex, 0, editRow);
        rowIndex = newIndex;
      }
    }
    editRow.dirty = false;
    editRow.isOpen = false;
    editRow.editing = false;
    this.updateValue();
    this.triggerChange();
    this.checkValidity(null, true);
    this.redraw();

    return true;
  }

  updateRowsComponents(rowIndex) {
    for (let i = rowIndex; i < this.editRows.length; i++) {
      this.updateComponentsRowIndex(this.editRows[i].components, i);
    }
  }

  removeRow(rowIndex) {
    if (this.options.readOnly) {
      return;
    }
    this.destroyComponents(rowIndex);
    this.splice(rowIndex);
    this.editRows.splice(rowIndex, 1);
    this.updateRowsComponents(rowIndex);
    this.updateValue();
    this.triggerChange();
    this.checkValidity(null, true);
    this.checkData();
    this.redraw();
  }

  updateComponentsRowIndex(components, rowIndex) {
    components.forEach((component, colIndex) => {
      component.rowIndex = rowIndex;
      component.row = `${rowIndex}-${colIndex}`;
    });
  }

  createRowComponents(row, rowIndex) {
    const components = [];
    this.component.components.map((col, colIndex) => {
      const column = _.clone(col);
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;
      options.onChange = (flags, changed, modified) => {
        if (this.component.inlineEdit && this.options.onChange) {
          this.options.onChange(flags, changed, modified);
        }
        else if (this.editRows[rowIndex]) {
          this.checkRow(null, this.editRows[rowIndex], {
            changed
          }, this.editRows[rowIndex].data);
        }
      };
      const comp = this.createComponent(_.assign({}, column, {
        row: options.row
      }), options, row);
      comp.rowIndex = rowIndex;
      components.push(comp);
    });
    return components;
  }

  validateRow(editRow, dirty) {
    let valid = true;
    const isDirty = dirty || !!editRow.dirty;
    if (editRow.editing || isDirty) {
      editRow.components.forEach(comp => {
        comp.setPristine(!isDirty);
        valid &= comp.checkValidity(null, isDirty, editRow.data);
      });
    }

    if (this.component.validate && this.component.validate.row) {
      valid = this.evaluate(this.component.validate.row, {
        valid,
        row: editRow.data
      }, 'valid', true);
      if (valid.toString() !== 'true') {
        editRow.error = valid;
        valid = false;
      }
      else {
        delete editRow.error;
      }
      if (valid === null) {
        valid = `Invalid row validation for ${this.key}`;
      }
    }

    return !!valid;
  }

  checkValidity(data, dirty, row) {
    data = data || this.rootValue;
    row = row || this.data;

    if (!this.checkCondition(row, data)) {
      this.setCustomValidity('');
      return true;
    }

    return this.checkComponentValidity(data, dirty, row);
  }

  checkComponentValidity(data, dirty, row) {
    if (!super.checkComponentValidity(data, dirty, row)) {
      return false;
    }

    let rowsValid = true;
    let rowsEditing = false;
    this.editRows.forEach((editRow) => {
      // Trigger all errors on the row.
      const rowValid = this.validateRow(editRow, dirty);

      rowsValid &= rowValid;

      // If this is a dirty check, and any rows are still editing, we need to throw validation error.
      rowsEditing |= (dirty && (editRow.editing || editRow.isOpen));
    });

    if (!rowsValid) {
      this.setCustomValidity('Please correct rows before proceeding.', dirty);
      return false;
    }
    else if (rowsEditing && !this.component.inlineEdit) {
      this.setCustomValidity('Please save all rows before proceeding.', dirty);
      return false;
    }

    const message = this.invalid || this.invalidMessage(data, dirty);
    this.setCustomValidity(message, dirty);
    return true;
  }

  get defaultValue() {
    const value = super.defaultValue;
    const defaultValue = Array.isArray(value) ? value : [];

    for (let dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
      defaultValue.push({});
    }

    return defaultValue;
  }

  setValue(value, flags) {
    if (equal(this.defaultValue, value)) {
      return false;
    }

    if (!value) {
      this.dataValue = this.defaultValue;
      return false;
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        value = [value];
      }
      else {
        return false;
      }
    }

    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    // Refresh editRow data when data changes.
    this.dataValue.forEach((row, rowIndex) => {
      const editRow = this.editRows[rowIndex];
      if (editRow) {
        editRow.data = row;
        if (editRow.isOpen) {
          if (editRow.emptyOpen) {
            editRow.isOpen = false;
          }
          else {
            editRow.components.forEach(col => {
              col.data = row;
              col.setValue(row[col.key], flags);
            });
          }
        }
      }
      else {
        this.editRows[rowIndex] = {
          components: this.createRowComponents(row, rowIndex),
          isOpen: false,
          data: row,
        };
        this.checkRow(null, this.editRows[rowIndex], {}, this.editRows[rowIndex].data);
      }
    });
    this.updateOnChange(flags, changed);
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
    return;
  }

  restoreRowContext(editRow) {
    editRow.components.forEach((component) => {
      component.data = editRow.data;
      if (_.has(editRow.data, component.key)) {
        component.setValue(editRow.data[component.key]);
      }
    });
  }
}

EditGridComponent.prototype.hasChanged = Component.prototype.hasChanged;
EditGridComponent.prototype.updateValue = Component.prototype.updateValue;
