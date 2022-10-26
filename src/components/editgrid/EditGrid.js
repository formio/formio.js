import _ from 'lodash';
import NativePromise from 'native-promise-only';

import {
  Evaluator,
  fastCloneDeep,
  getArrayFromComponentPath,
  superGet,
} from '../../utils/utils';

import Alert from '../alert/Alert';
import Component from '../_classes/component/Component';
import NestedArrayComponent from '../_classes/nestedarray/NestedArrayComponent';

import templates from './templates';

const EditRowState = {
  New: 'new',
  Editing: 'editing',
  Saved: 'saved',
  Removed: 'removed',
  Draft: 'draft',
};

export default class EditGridComponent extends NestedArrayComponent {
  static schema(...extend) {
    return NestedArrayComponent.schema({
      type: 'editgrid',
      label: 'Edit Grid',
      key: 'editGrid',
      clearOnHide: true,
      input: true,
      tree: true,
      removeRow: 'Cancel',
      defaultOpen: false,
      openWhenEmpty: false,
      modal: false,
      components: [],
      inlineEdit: false,
      templates: {
        header: EditGridComponent.defaultHeaderTemplate,
        row: EditGridComponent.defaultRowTemplate,
        footer: '',
      },
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Edit Grid',
      icon: 'tasks',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#editgrid',
      weight: 30,
      schema: EditGridComponent.schema(),
    };
  }

  static get defaultHeaderTemplate() {
    return `<div class="row">
  {% (component.components || []).forEach(function(component) { %}
    <div class="col-sm-2">{{ component.label }}</div>
  {% }) %}
</div>`;
  }

  static get defaultRowTemplate() {
    return `<div class="row">
  {% instance.eachComponent(function(component) { %}
    <div class="col-sm-2">
      {{ component.getView(component.dataValue) }}
    </div>
  {% }, rowIndex) %}
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

  get defaultDialogTemplate() {
    return  `
    <h3 ref="dialogHeader">${this.t('Do you want to clear data?')}</h3>
    <div style="display:flex; justify-content: flex-end;">
      <button ref="dialogCancelButton" class="btn btn-secondary">${this.t('Cancel')}</button>
      <button ref="dialogYesButton" class="btn btn-primary">${this.t('Yes, delete it')}</button>
    </div>
  `;
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

  get rowRef() {
    return `${this.editgridKey}-row`;
  }

  get rowElements() {
    return this.refs[this.rowRef];
  }

  get addRowRef() {
    return `${this.editgridKey}-addRow`;
  }

  get addRowElements() {
    return this.refs[this.addRowRef];
  }

  get saveRowRef() {
    return `${this.editgridKey}-saveRow`;
  }

  get saveRowElements() {
    return this.refs[this.saveRowRef];
  }

  get cancelRowRef() {
    return `${this.editgridKey}-cancelRow`;
  }

  get cancelRowElements() {
    return this.refs[this.cancelRowRef];
  }

  get inlineEditMode() {
    return this.component.inlineEdit;
  }

  get saveEditMode() {
    return !this.inlineEditMode;
  }

  get minLength() {
    return _.get(this.component, 'validate.minLength', 0);
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

  get iteratableRows() {
    return this.editRows;
  }

  get defaultValue() {
    const value = superGet(NestedArrayComponent, 'defaultValue', this);
    const defaultValue = Array.isArray(value) ? value : [];

    _.times(this.minLength - defaultValue.length, () => defaultValue.push({}));

    return defaultValue;
  }

  constructor(...args) {
    super(...args);
    this.type = 'editgrid';
  }

  loadRefs(element, refs) {
    super.loadRefs(element, refs);

    const massageContainerRef = 'messageContainer';

    if (refs[`${ massageContainerRef }`] === 'single') {
      this.refs[`${ massageContainerRef }`] = element.querySelector(`:scope > [ref="${ massageContainerRef }"]`);
    }
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
      this.editRows = [
        {
          components: this.createRowComponents(dataObj, 0),
          data: dataObj,
          state: EditRowState.New,
          backup: null,
          error: null,
        },
      ];
      if (this.inlineEditMode) {
        this.dataValue.push(dataObj);
      }
    }
    else {
      this.editRows = dataValue.map((row, rowIndex) => ({
        components: this.lazyLoad ? [] : this.createRowComponents(row, rowIndex),
        data: row,
        state: EditRowState.Saved,
        backup: null,
        error: null,
      }));
    }

    this.checkData();
  }

  isOpen(editRow) {
    return [EditRowState.New, EditRowState.Editing].includes(editRow.state);
  }

  render(children) {
    if (this.builderMode) {
      return super.render();
    }

    const dataValue = this.dataValue || [];
    const headerTemplate = Evaluator.noeval ? templates.header : _.get(this.component, 'templates.header');
    return super.render(children || this.renderTemplate('editgrid', {
      ref: {
        row: this.rowRef,
        addRow: this.addRowRef,
        saveRow: this.saveRowRef,
        cancelRow: this.cancelRowRef,
      },
      header: this.renderString(headerTemplate, {
        components: this.component.components,
        value: dataValue,
      }),
      footer: this.renderString(_.get(this.component, 'templates.footer'), {
        components: this.component.components,
        value: dataValue,
      }),
      rows: this.editRows.map(this.renderRow.bind(this)),
      openRows: this.editRows.map((row) => this.isOpen(row)),
      errors: this.editRows.map((row) => row.error),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons: this.hasRemoveButtons(),
    }));
  }

  attach(element) {
    if (this.builderMode) {
      return super.attach(element);
    }

    this.loadRefs(element, {
      [this.addRowRef]: 'multiple',
      [this.saveRowRef]: 'multiple',
      [this.cancelRowRef]: 'multiple',
      [this.rowRef]: 'multiple',
    });

    this.addRowElements.forEach((addButton) => {
      this.addEventListener(addButton, 'click', () => this.addRow());
    });

    let openRowCount = 0;
    this.rowElements.forEach((row, rowIndex) => {
      const editRow = this.editRows[rowIndex];
      if (this.isOpen(editRow)) {
        this.attachComponents(row, editRow.components);
        this.addEventListener(this.saveRowElements[openRowCount], 'click', () => this.saveRow(rowIndex));
        this.addEventListener(this.cancelRowElements[openRowCount], 'click', () => this.cancelRow(rowIndex));
        openRowCount++;
      }
      else {
        // Attach edit and remove button events.
        [
          {
            className: 'cloneRow',
            event: 'click',
            action: () => this.cloneRow(rowIndex),
          },
          {
            className: 'removeRow',
            event: 'click',
            action: () => this.removeRow(rowIndex),
          },
          {
            className: 'editRow',
            event: 'click',
            action: () => {
              this.editRow(rowIndex).then(()=> {
                if (this.component.rowDrafts) {
                  this.validateRow(editRow, false);

                  if (this.component.modal && editRow.errors && !!editRow.errors.length ) {
                    this.alert.showErrors(editRow.errors, false);
                  }
                }
              });
            },
          },
        ].forEach(({
          className,
          event,
          action,
        }) => {
          const elements = row.getElementsByClassName(className);
          Array.prototype.forEach.call(elements, (element) => {
            this.addEventListener(element, event, action);
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
    if (this.isOpen(row)) {
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
            let view = instance ? instance.getView(data || instance.dataValue) : '';

            if (instance && instance.widget && (view !== '--- PROTECTED ---' )) {
              if (_.isArray(view)) {
                view = view.map((value) => instance.widget.getValueAsString(value));
              }
              else {
                view = instance.widget.getValueAsString(view);
              }
            }

            return view;
          },
          state: this.editRows[rowIndex].state,
        },
      );
    }
  }

  eachComponent(fn, rowIndex) {
    _.each(this.getComponents(rowIndex), (component, index) => {
      if (fn(component, index) === false) {
        return false;
      }
    });
  }

  restoreComponentsContext() {
    this.getComponents().forEach((component) => component.data = this.dataValue[component.rowIndex]);
  }

  flattenComponents(rowIndex) {
    const result = {};

    this.everyComponent((component) => {
      result[component.component.flattenAs || component.key] = component;
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

  addRow(data = {}) {
    if (this.options.readOnly) {
      return;
    }

    const rowIndex = this.editRows.length;
    const editRow = {
      components: this.createRowComponents(data, rowIndex),
      data,
      state: EditRowState.New,
      backup: null,
      error: null,
    };
    this.editRows.push(editRow);

    if (this.inlineEditMode) {
      this.dataValue.push(data);
      this.triggerChange();
    }
    this.emit('editGridAddRow', {
      component: this.component,
      row: editRow,
    });
    this.checkRow('checkData', null, {}, editRow.data, editRow.components);
    if (this.component.modal) {
      this.addRowModal(rowIndex);
    }
    else {
      this.redraw();
    }
    return editRow;
  }

  cloneRow(rowIndex) {
    const clonedRow = this.editRows[rowIndex];
    const data = _.cloneDeep(clonedRow.data);
    return this.addRow(data);
  }

  addRowModal(rowIndex) {
    const modalContent =  this.ce('div');
    const editRow = this.editRows[rowIndex];
    editRow.willBeSaved = false;
    const { components } = editRow;
    modalContent.innerHTML = this.renderComponents(components);
    const dialog = this.component.modal ? this.createModal(modalContent, {}, () => this.showDialog(rowIndex)) : undefined;
    if (this.alert) {
      this.alert.clear();
      this.alert = null;
    }
    this.alert = new Alert(dialog.refs.dialogContents, this);

    this.addEventListener(dialog, 'close', () => {
      if (!editRow.willBeSaved) {
        this.cancelRow(rowIndex);
      }
      if (this.alert) {
        this.alert.clear();
        this.alert = null;
      }
    });

    dialog.refs.dialogContents.appendChild(this.ce('button', {
      class: 'btn btn-primary',
      onClick: () => {
        if (this.validateRow(editRow, true) || this.component.rowDrafts) {
          editRow.willBeSaved = true;
          dialog.close();
          this.saveRow(rowIndex);
        }
        else {
          this.alert.showErrors(editRow.errors, false);
        }
      },
    }, this.component.saveRow || 'Save'));

    return this.attachComponents(modalContent, components);
  }

  showDialog(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (_.isEqual(editRow.backup, editRow.data)) {
      return NativePromise.resolve();
    }

    const wrapper = this.ce('div', { ref: 'confirmationDialog' });
    const dialogContent =this.component.dialogTemplate || this.defaultDialogTemplate;

    wrapper.innerHTML = dialogContent;
    wrapper.refs = {};
    this.loadRefs.call(wrapper, wrapper, {
      dialogHeader: 'single',
      dialogCancelButton: 'single',
      dialogYesButton: 'single',
    });

    const dialog = this.createModal(wrapper);
    const close = (event) => {
      event.preventDefault();
      dialog.close();
    };
    let dialogResult;

    const promise = new NativePromise((resolve, reject) => {
      dialogResult = { resolve, reject };
    });

    this.addEventListener(wrapper.refs.dialogYesButton, 'click', (event) => {
      close(event);
      dialogResult.resolve();
    });
    this.addEventListener(wrapper.refs.dialogCancelButton, 'click', (event) => {
      close(event);
      dialogResult.reject();
    });
    return promise;
  }

  editRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    const isAlreadyEditing = (editRow.state === EditRowState.Editing) || (editRow.state === EditRowState.New);
    if (!editRow || isAlreadyEditing) {
      return;
    }
    editRow.prevState = editRow.state;

    if (!this.options.readOnly) {
      editRow.state = EditRowState.Editing;
    }

    if (this.lazyLoad && (editRow.components.length === 0)) {
      editRow.components = this.createRowComponents(editRow.data, rowIndex);
    }

    const dataSnapshot = fastCloneDeep(editRow.data);

    if (this.inlineEditMode) {
      editRow.backup = dataSnapshot;
    }
    else {
      editRow.backup = editRow.data;
      editRow.data = dataSnapshot;
      this.restoreRowContext(editRow);
    }

    if (this.component.modal) {
      return this.addRowModal(rowIndex);
    }

    return this.redraw();
  }

  clearErrors(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (editRow && Array.isArray(editRow.components)) {
      editRow.components.forEach((comp) => {
        comp.setPristine(true);
        comp.setCustomValidity('');
      });
    }
  }

  cancelRow(rowIndex) {
    if (this.options.readOnly) {
      return;
    }

    const editRow = this.editRows[rowIndex];
    switch (editRow.state) {
      case EditRowState.New: {
        editRow.state = EditRowState.Removed;

        this.clearErrors(rowIndex);
        this.destroyComponents(rowIndex);
        if (this.inlineEditMode) {
          this.splice(rowIndex);
        }
        this.editRows.splice(rowIndex, 1);
        break;
      }
      case EditRowState.Editing: {
        editRow.state = editRow.prevState;

        if (this.inlineEditMode) {
          this.dataValue[rowIndex] = editRow.backup;
        }
        editRow.data = editRow.backup;
        editRow.backup = null;
        this.restoreRowContext(editRow);
        if (!this.component.rowDrafts) {
          this.clearErrors(rowIndex);
        }
        break;
      }
    }

    this.checkValidity(null, true);
    this.redraw();

    if (this.component.rowDrafts) {
      this.checkValidity(this.data, false);
    }
  }

  saveRow(rowIndex) {
    const editRow = this.editRows[rowIndex];

    if (this.options.readOnly) {
      return;
    }

    const isRowValid = this.validateRow(editRow, true);

    if (!this.component.rowDrafts) {
      if (!isRowValid) {
        return false;
      }
    }

    if (this.saveEditMode) {
      const dataValue = this.dataValue || [];
      switch (editRow.state) {
        case EditRowState.New: {
          const newIndex = dataValue.length;
          dataValue.push(editRow.data);
          if (rowIndex !== newIndex) {
            this.editRows.splice(rowIndex, 1);
            this.editRows.splice(newIndex, 0, editRow);
          }
          break;
        }
        case EditRowState.Editing: {
          dataValue[rowIndex] = editRow.data;
          break;
        }
      }
    }

    editRow.state = this.component.rowDrafts && !isRowValid ? EditRowState.Draft : EditRowState.Saved;
    editRow.backup = null;

    this.updateValue();
    this.triggerChange();
    if (this.component.rowDrafts) {
      editRow.components.forEach(comp => comp.setPristine(this.pristine));
    }
    this.checkValidity(null, true);
    this.redraw();

    return true;
  }

  beforeFocus(component) {
    if ('beforeFocus' in this.parent) {
      this.parent.beforeFocus(this);
    }
    const relativePath = this.getRelativePath(component.path);
    const arrayPath = getArrayFromComponentPath(relativePath);
    if (_.isNumber(arrayPath[0])) {
      this.editRow(arrayPath[0]);
    }
  }

  updateComponentsRowIndex(components, rowIndex) {
    components.forEach((component, colIndex) => {
      component.rowIndex = rowIndex;
      component.row = `${rowIndex}-${colIndex}`;
    });
  }

  updateRowsComponents(rowIndex) {
    this.editRows.slice(rowIndex).forEach((row, index) => {
      this.updateComponentsRowIndex(row.components, index);
    });
  }

  baseRemoveRow(rowIndex) {
    const editRow = this.editRows[rowIndex];

    editRow.state = EditRowState.Removed;
    this.destroyComponents(rowIndex);

    return editRow;
  }

  removeRow(rowIndex) {
    if (this.options.readOnly) {
      return;
    }

    this.baseRemoveRow(rowIndex);
    this.splice(rowIndex);
    this.editRows.splice(rowIndex, 1);
    this.updateRowsComponents(rowIndex);
    this.updateValue();
    this.triggerChange();
    this.checkValidity(null, true);
    this.checkData();
    this.redraw();
  }

  createRowComponents(row, rowIndex) {
    // Iterate through existing components and destroy the ones with the same rowIndex.
    if (this.components) {
      for (let i = 0; i < this.components.length; i++) {
        if (this.components[i].rowIndex === rowIndex) {
          this.components[i].destroy();
          this.components.splice(i, 1);
        }
      }
    }

    return this.component.components.map((col, colIndex) => {
      const column = _.clone(col);
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;
      options.onChange = (flags, changed, modified) => {
        const editRow = this.editRows[rowIndex];
        if (this.inlineEditMode) {
          this.triggerRootChange(flags, changed, modified);
        }
        else if (editRow) {
          this.checkRow('checkData', null, {
            ...flags,
            changed,
          }, editRow.data, editRow.components);
        }
      };

      const comp = this.createComponent(_.assign({}, column, {
        row: options.row,
      }), options, row);
      comp.rowIndex = rowIndex;
      return comp;
    });
  }

  hasOpenRows() {
    return this.editRows.some(row => this.isOpen(row));
  }

  validateRow(editRow, dirty) {
    let valid = true;
    const errorsSnapshot = [...this.errors];

    if (editRow.state === EditRowState.Editing || dirty || (editRow.state === EditRowState.Draft && !this.pristine && !this.root.pristine && !this.hasOpenRows())) {
      editRow.components.forEach(comp => {
        if (!this.component.rowDrafts) {
          comp.setPristine(!dirty);
        }

        valid &= comp.checkValidity(null, dirty, editRow.data);
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
        editRow.error = null;
      }
      if (valid === null) {
        valid = `Invalid row validation for ${this.key}`;
      }
    }

    editRow.errors = !valid ? this.errors.filter((err) => !errorsSnapshot.includes(err)) : null;

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

    if (this.shouldSkipValidation(data, dirty, row)) {
      return true;
    }

    let rowsValid = true;
    let rowsEditing = false;

    this.editRows.forEach((editRow, index) => {
      // Trigger all errors on the row.
      const rowValid = this.validateRow(editRow, dirty);

      rowsValid &= rowValid;

      const rowRefs = this.refs[`editgrid-${this.component.key}-row`];

      if (rowRefs) {
        const rowContainer = rowRefs[index];

        if (rowContainer) {
          const errorContainer = rowContainer.querySelector('.editgrid-row-error');

          if (!rowValid ) {
            errorContainer.textContent = 'Invalid row. Please correct it or delete.';
          }
        }
      }
      // If this is a dirty check, and any rows are still editing, we need to throw validation error.
      rowsEditing |= (dirty && this.isOpen(editRow));
    });

    if (!rowsValid) {
      this.setCustomValidity('Please correct invalid rows before proceeding.', dirty);
      return false;
    }
    else if (rowsEditing && this.saveEditMode) {
      this.setCustomValidity('Please save all rows before proceeding.', dirty);
      return false;
    }

    const message = this.invalid || this.invalidMessage(data, dirty);
    this.setCustomValidity(message, dirty);
    return true;
  }

  setValue(value, flags = {}) {
    if (!value) {
      value = this.defaultValue;
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
        this.restoreRowContext(editRow, flags);
        editRow.state = EditRowState.Saved;
        editRow.backup = null;
        editRow.error = null;
      }
      else {
        this.editRows[rowIndex] = {
          components: this.lazyLoad ? [] : this.createRowComponents(row, rowIndex),
          data: row,
          state: EditRowState.Saved,
          backup: null,
          error: null,
        };
      }
    });

    let { length: dataLength } = this.dataValue;

    // If the last row is a new row, then do not remove it.
    if (this.editRows[dataLength] && (this.editRows[dataLength].state === EditRowState.New)) {
      dataLength = (dataLength + 1);
    }
    this.editRows.slice(dataLength).forEach((editRow, index) => this.baseRemoveRow(dataLength + index));
    this.editRows = this.editRows.slice(0, dataLength);
    this.updateOnChange(flags, changed);
    this.checkData();

    if (changed || flags.resetValue) {
      this.rebuild();
    }
    return changed;
  }

  restoreRowContext(editRow, flags = {}) {
    editRow.components.forEach((component) => {
      component.data = editRow.data;
      this.setNestedValue(component, editRow.data, flags);
    });
  }
}

EditGridComponent.prototype.hasChanged = Component.prototype.hasChanged;
