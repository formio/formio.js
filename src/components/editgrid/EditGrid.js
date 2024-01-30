import _ from 'lodash';
import NativePromise from 'native-promise-only';
import NestedArrayComponent from '../_classes/nestedarray/NestedArrayComponent';
import Component from '../_classes/component/Component';
import Alert from '../alert/Alert';
import { fastCloneDeep, Evaluator, getArrayFromComponentPath, eachComponent } from '../../utils/utils';
import templates from './templates';

const EditRowState = {
  New: 'new',
  Editing: 'editing',
  Saved: 'saved',
  Viewing: 'viewing',
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
        tableHeader: EditGridComponent.defaultTableHeaderTemplate,
        tableRow: EditGridComponent.defaultTableRowTemplate,
        footer: '',
      },
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Edit Grid',
      icon: 'tasks',
      group: 'data',
      documentation: '/userguide/form-building/data-components#edit-grid',
      showPreview: false,
      weight: 30,
      schema: EditGridComponent.schema(),
    };
  }

  static get defaultHeaderTemplate() {
    return `<div class="row">
      {% util.eachComponent(components, function(component) { %}
        {% if (displayValue(component)) { %}
          <div class="col-sm-2">{{ t(component.label) }}</div>
        {% } %}
      {% }) %}
    </div>`;
  }

  static get defaultTableHeaderTemplate() {
    return `
      <tr>
        {% util.eachComponent(components, function(component) { %}
          {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}
            <td class="editgrid-table-column">{{ component.label }}</td>
          {% } %}
        {% }) %}
        {% if (!instance.options.readOnly && !instance.disabled) { %}
          <td class="editgrid-table-column">Actions</td>
        {% } %}
      </tr>
    `;
  }

  static get defaultRowTemplate() {
    return `<div class="row">
      {% util.eachComponent(components, function(component) { %}
        {% if (displayValue(component)) { %}
          <div class="col-sm-2">
            {{ isVisibleInRow(component) ? getView(component, row[component.key]) : ''}}
          </div>
        {% } %}
      {% }) %}
      {% if (!instance.options.readOnly && !instance.disabled) { %}
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

  static get defaultTableRowTemplate() {
    return `
      {% util.eachComponent(components, function(component) { %}
          {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}
            <td class="editgrid-table-column">
              {{ getView(component, row[component.key]) }}
            </td>
          {% } %}
        {% }) %}
        {% if (!instance.options.readOnly && !instance.disabled) { %}
          <td class="editgrid-table-column">
            <div class="btn-group">
              <button class="btn btn-default btn-light btn-sm editRow" aria-label="{{ t('Edit row') }}"><i class="{{ iconClass('edit') }}"></i></button>
              {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}
              <button class="btn btn-danger btn-sm removeRow" aria-label="{{ t('Remove row') }}"><i class="{{ iconClass('trash') }}"></i></button>
              {% } %}
            </div>
          </td>
        {% } %}
    `;
  }

  get defaultDialogTemplate() {
    return `
    <h3 ref="dialogHeader">${this.t('Do you want to clear data?')}</h3>
    <div style="display:flex; justify-content: flex-end;">
      <button ref="dialogCancelButton" class="btn btn-secondary" aria-label="${this.t('Cancel')}">${this.t('Cancel')}</button>
      <button ref="dialogYesButton" class="btn btn-danger" aria-label="${this.t('Yes, delete it')}">${this.t('Yes, delete it')}</button>
    </div>
  `;
  }

  get defaultRowTemplate() {
    return this.displayAsTable
      ? EditGridComponent.defaultTableRowTemplate
      : EditGridComponent.defaultRowTemplate;
  }

  get defaultHeaderTemplate() {
    return this.displayAsTable
      ? EditGridComponent.defaultTableHeaderTemplate
      : EditGridComponent.defaultHeaderTemplate;
  }

  get rowTemplate() {
    let rowTemplate;
    if (Evaluator.noeval) {
      rowTemplate = this.displayAsTable ?
        templates.tableRow
        : templates.row;
    }
    else {
      rowTemplate = this.displayAsTable ?
        _.get(this.component, 'templates.tableRow', this.defaultRowTemplate)
        : _.get(this.component, 'templates.row', this.defaultRowTemplate);
    }

    return rowTemplate;
  }

  get headerTemplate() {
    let headerTemplate;
    if (Evaluator.noeval) {
      headerTemplate = this.displayAsTable ?
        templates.tableHeader
        : templates.header;
    }
    else {
      headerTemplate = this.displayAsTable ?
        _.get(this.component, 'templates.tableHeader', this.defaultHeaderTemplate)
        : _.get(this.component, 'templates.header', this.defaultHeaderTemplate);
    }

    return headerTemplate;
  }

  /**
   * Returns true if the component has nested components which don't trigger changes on the root level
   */
  get hasScopedChildren() {
    return !this.inlineEditMode;
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

  get rowRefs() {
    return this.refs[`editgrid-${this.component.key}-row`];
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
    return this.builderMode ? 0 : _.get(this.component, 'validate.minLength', 0);
  }

  get data() {
    return this._data;
  }

  get dataValue() {
    return super.dataValue || [];
  }

  set dataValue(value) {
    super.dataValue = value;
  }

  get displayAsTable() {
    return this.component.displayAsTable;
  }

  set data(value) {
    this._data = value;

    const data = this.dataValue;

    (this.editRows || []).forEach((row, index) => {
      if (!data[index] && row.state !== EditRowState.New) {
        data[index] = {};
      }
      const rowData = data[index] || {};

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
    const value = super.defaultValue;
    const defaultValue = Array.isArray(value) ? value : [];

    _.times(this.minLength - defaultValue.length, () => defaultValue.push({}));

    return defaultValue;
  }

  constructor(...args) {
    super(...args);
    this.type = 'editgrid';
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
    const dataValue = this.dataValue;
    const openWhenEmpty = !dataValue.length && this.component.openWhenEmpty;
    if (openWhenEmpty) {
      const dataObj = {};
      this.editRows = [];
      this.createRow(dataObj, 0);
    }
    else {
      this.editRows = dataValue.map((row, rowIndex) => ({
        components: this.lazyLoad ? [] : this.createRowComponents(row, rowIndex),
        data: row,
        state: EditRowState.Saved,
        backup: null,
        error: null,
        rowIndex,
      }));
    }
    this.prevHasAddButton = this.hasAddButton();

    this.checkData();

    this.setVariableTypeComponents();

    if (this.variableTypeComponentsIndexes.length) {
      _.each(this.editRows || [], (editRow, rowIndex) => this.checkRowVariableTypeComponents(editRow, rowIndex));
    }
  }

  checkRowVariableTypeComponents(editRow, rowIndex) {
    const rowComponents = editRow.components;

    if (_.some(this.variableTypeComponentsIndexes, (compIndex) => {
      const variableTypeComp = rowComponents[compIndex];
      return variableTypeComp.type !== variableTypeComp.component.type;
    })) {
      editRow.components = this.createRowComponents(editRow.data, rowIndex, true);
    }
  }

  setVariableTypeComponents() {
    //set components which type is changing within a row (e.g.,by mergeComponentSchema action)
    this.variableTypeComponentsIndexes = [];

    _.each(this.component.components, (comp, index) => {
      if (comp.typeChangeEnabled) {
        this.variableTypeComponentsIndexes.push(index);
      }
    });
  }

  isOpen(editRow) {
    return [EditRowState.New, EditRowState.Editing, EditRowState.Viewing].includes(editRow.state);
  }

  isComponentVisibleInSomeRow(component) {
    const rows = this.editRows;
    const savedStates = [EditRowState.Saved, EditRowState.Editing, EditRowState.Draft];
    const savedRows = rows.filter(row => _.includes(savedStates, row.state));

    this.visibleInHeader = this.visibleInHeader || [];

    const changeVisibleInHeader = (component, isVisible) => {
      if (!isVisible) {
        _.remove(this.visibleInHeader, (key) => key === component.key);
      }

      if (isVisible && !_.includes(this.visibleInHeader, component.key)) {
        this.visibleInHeader.push(component.key);
      }
    };

    if (_.isEmpty(rows)) {
      const rowComponents = this.createRowComponents({}, 0);
      let checkComponent;

      eachComponent(rowComponents, (comp) => {
        if (comp.component.key === component.key) {
          checkComponent = comp;
        }
        comp.checkConditions();
      });

      const isVisible = checkComponent ? checkComponent.visible : true;
      [...this.components].forEach((comp) => this.removeComponent(comp, this.components));

      changeVisibleInHeader(component, isVisible);

      return isVisible;
    }

    const isOpenRowWhenEmpty = _.get(this.component, 'openWhenEmpty') && rows.length === 1 && rows[0].state === EditRowState.New;

    if (!_.isEmpty(rows) && _.isEmpty(savedRows) && !isOpenRowWhenEmpty) {
      return _.includes(this.visibleInHeader, component.key);
    }

    return _.some(isOpenRowWhenEmpty ? rows : savedRows, (row, index) => {
      const editingRow = row.state === EditRowState.Editing;
      let isVisible;

      if (!editingRow) {
        const flattenedComponents = this.flattenComponents(index);
        const instance = flattenedComponents[component.key];
        isVisible = instance ? instance.visible : true;

        changeVisibleInHeader(component, isVisible);
      }
      else {
        isVisible = _.includes(this.visibleInHeader, component.key);
      }

      return isVisible;
    });
  }

  render(children) {
    if (this.builderMode) {
      return super.render();
    }

    const dataValue = this.dataValue;
    const headerTemplate = this.headerTemplate;
    const t = this.t.bind(this);
    const templateName = this.displayAsTable ? 'editgridTable' : 'editgrid';

    return super.render(children || this.renderTemplate(templateName, {
      ref: {
        row: this.rowRef,
        addRow: this.addRowRef,
        saveRow: this.saveRowRef,
        cancelRow: this.cancelRowRef,
      },
      header: this.renderString(headerTemplate, {
        displayValue: (component) => this.displayComponentValue(component, true),
        components: this.component.components,
        value: dataValue,
        t
      }),
      footer: this.renderString(_.get(this.component, 'templates.footer'), {
        components: this.component.components,
        value: dataValue,
        t
      }),
      rows: this.editRows.map(this.renderRow.bind(this)),
      openRows: this.editRows.map((row) => this.isOpen(row)),
      errors: this.editRows.map((row) => row.error),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons: this.hasRemoveButtons(),
    }));
  }

  renderComponents(components) {
    components = components || this.getComponents();
    const children = components.map(component => component.render());
    const templateName = this.displayAsTable && this.prevHasAddButton ? 'tableComponents' : 'components';

    return this.renderTemplate(templateName, {
      children,
      components,
    });
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
      if (editRow?.isRowSelected) {
        row.classList.add('selected');
      }
      if (this.isOpen(editRow)) {
        this.attachComponents(row, editRow.components);
        this.addEventListener(this.saveRowElements[openRowCount], 'click', () => this.saveRow(rowIndex, true));
        this.addEventListener(this.cancelRowElements[openRowCount], 'click', () => this.cancelRow(rowIndex));
        openRowCount++;
      }
      else {
        // Attach edit and remove button events.
        [
          {
            className: 'removeRow',
            event: 'click',
            action: () => this.removeRow(rowIndex, true),
          },
          {
            className: 'editRow',
            event: 'click',
            action: () => {
              this.editRow(rowIndex).then(() => {
                if (this.component.rowDrafts) {
                  this.validateRow(editRow, false);

                  const hasErrors = editRow.errors && !!editRow.errors.length;
                  const shouldShowRowErrorsAlert = this.component.modal && hasErrors && this.root?.submitted;

                  if (shouldShowRowErrorsAlert) {
                    this.alert.showErrors(editRow.errors, false);
                    editRow.alerts = true;
                  }
                }
              });
            },
          },
          {
            className: 'row',
            event: 'click',
            action: () => {
              row.classList.toggle('selected');
              let eventName = 'editGridSelectRow';
              if (Array.from(row.classList).includes('selected')) {
                editRow.isRowSelected = true;
              }
              else {
                delete editRow.isRowSelected;
                eventName = 'editGridUnSelectRow';
              }

              this.emit(eventName, {
                component: this.component,
                data: this.dataValue[rowIndex]
              });
            },
          }
        ].forEach(({
          className,
          event,
          action,
        }) => {
          const elements = row.getElementsByClassName(className);
          Array.prototype.forEach.call(elements, (element) => {
            if (this.options.pdf && _.intersection(element.classList, ['editRow', 'removeRow']).length) {
              element.style.display = 'none';
            }
            else {
              this.addEventListener(element, event, action);
            }
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

    const superAttach = super.attach(element);
    this.loadRefs(element, {
      messageContainer: 'single-scope',
    });
    return superAttach;
  }

  flattenRowDataValue(dataValue) {
    const flattened = {};

    Object.keys(dataValue).forEach((key) => {
      if (_.isObject(dataValue[key]) && !_.isNil(dataValue[key])) {
        Object.assign(flattened, this.flattenRowDataValue(dataValue[key]));
      }
      else {
        flattened[key] = dataValue[key];
      }
    });

    return flattened;
  }

  isComponentVisibleInRow(component, flattenedComponents) {
    const instance = flattenedComponents[component.key];
    return instance ? instance.visible : true;
  }

  displayComponentValue(component, header) {
    return !!((!component.hasOwnProperty('tableView') || component.tableView)
      && header ? this.isComponentVisibleInSomeRow(component) : _.includes(this.visibleInHeader, component.key));
  }

  renderRow(row, rowIndex) {
    const dataValue = this.dataValue;
    if (this.isOpen(row)) {
      return this.renderComponents(row.components);
    }
    else {
      const flattenedComponents = this.flattenComponents(rowIndex);
      const rowTemplate = this.rowTemplate;

      return this.renderString(
        rowTemplate,
        {
          row: dataValue[rowIndex] || {},
          data: this.data,
          rowIndex,
          components: this.component.components,
          flattenedComponents,
          displayValue: (component) => this.displayComponentValue(component),
          isVisibleInRow: (component) => this.isComponentVisibleInRow(component, flattenedComponents),
          getView: (component, data) => {
            const instance = flattenedComponents[component.key];
            const view = instance ? instance.getView(data || instance.dataValue) : '';

            // If there is an html tag in view, don't allow it to be injected in template
            const htmlTagRegExp = new RegExp('<(.*?)>');
            return typeof view === 'string' && view.length && !instance.component?.template && htmlTagRegExp.test(view) && instance.component?.inputFormat !== 'html'
            ? `<input type="text" value="${view.replace(/"/g, '&quot;')}" readonly/>`
            : view;
          },
          state: this.editRows[rowIndex].state,
          t: this.t.bind(this)
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
    this.getComponents().forEach((component) => {
      const rowData = this.dataValue[component.rowIndex];
      const editRowData = this.editRows[component.rowIndex]?.data;
      component.data = rowData || editRowData;
    });
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
        ? (this.editRows[rowIndex]?.components || [])
        : this.editRows.reduce((result, row) => result.concat(row.components || []), []);
  }

  destroy(all = false) {
    this.calculatedValue = undefined;
    super.destroy(all);
  }

  destroyComponents(rowIndex = 0) {
    if (this.builderMode) {
      return super.destroyComponents();
    }

    const components = this.getComponents(rowIndex).slice();
    components.forEach((comp) => this.removeComponent(comp, this.components));
  }

  createRow(dataObj, rowIndex) {
    const editRow = {
      components: this.createRowComponents(dataObj, rowIndex),
      data: dataObj,
      state: EditRowState.New,
      backup: null,
      error: null,
      rowIndex,
    };

    this.editRows.push(editRow);
    if (this.inlineEditMode) {
      this.dataValue.push(dataObj);
    }

    return editRow;
  }

  addRow() {
    if (this.options.readOnly) {
      return;
    }

    const dataObj = {};
    const rowIndex = this.editRows.length;
    const editRow = this.createRow(dataObj, rowIndex);

    if (editRow.state === EditRowState.New) {
      this.emptyRow = fastCloneDeep(editRow.data);
    }

    if (this.inlineEditMode) {
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

  addRowModal(rowIndex) {
    const modalContent = this.ce('div');
    const editRow = this.editRows[rowIndex];
    editRow.willBeSaved = false;
    const { components } = editRow;
    modalContent.innerHTML = this.renderComponents(components);

    const dialog = this.component.modal ? this.createModal(modalContent, {}, () => this.showDialog(rowIndex)) : undefined;
    dialog.classList.add(`editgrid-row-modal-${this.id}`);

    editRow.dialog = dialog;

    if (this.alert) {
      this.alert.clear();
      this.alert = null;
    }
    this.alert = new Alert(dialog.refs.dialogContents, this);

    this.addEventListener(dialog, 'close', () => {
      if (!editRow.willBeSaved) {
        if (this.editRows[rowIndex] && this.editRows[rowIndex].state !== EditRowState.New) {
          this.editRows[rowIndex].components.forEach((comp) => {
            comp.setPristine(true);
          });
        }
        this.cancelRow(rowIndex);
      }
      if (this.alert) {
        this.alert.clear();
        this.alert = null;
      }

      // Remove references to dialog elements to prevent possible in some cases memory leaks
      delete editRow.confirmationDialog;
      delete editRow.dialog;
    });

    dialog.refs.dialogContents.appendChild(this.ce('button', {
      class: 'btn btn-primary',
      onClick: () => {
        // After an attempt to save, all the components inside the row should become not pristine
        if (!this.component.rowDrafts) {
          editRow.components.forEach((comp) => comp.setPristine(false));
        }
        if (this.validateRow(editRow, true) || this.component.rowDrafts) {
          editRow.willBeSaved = true;
          dialog.close();
          this.saveRow(rowIndex, true);
        }
        else {
          this.alert.showErrors(editRow.errors, false);
          editRow.alerts = true;
        }
      },
    }, this.component.saveRow || 'Save'));

    return this.attachComponents(modalContent, components);
  }

  showDialog(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (editRow.state === EditRowState.New ? _.isEqual(this.emptyRow, editRow.data) : _.isEqual(editRow.backup, editRow.data)) {
      return Promise.resolve();
    }

    const wrapper = this.ce('div', { ref: 'confirmationDialog' });
    const dialogContent = this.component.dialogTemplate || this.defaultDialogTemplate;

    wrapper.innerHTML = dialogContent;
    wrapper.refs = {};
    this.loadRefs.call(wrapper, wrapper, {
      dialogHeader: 'single',
      dialogCancelButton: 'single',
      dialogYesButton: 'single',
    });

    const dialog = this.createModal(wrapper);
    dialog.classList.add(`editgrid-row-modal-confirmation-${this.id}`);

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

    editRow.confirmationDialog = dialog;
    return promise;
  }

  editRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    const isAlreadyEditing = editRow.state === EditRowState.Editing || editRow.state === EditRowState.New;
    if (!editRow || isAlreadyEditing) {
      return NativePromise.resolve();
    }
    editRow.prevState = editRow.state;
    editRow.state = this.options.readOnly ? EditRowState.Viewing : EditRowState.Editing;

    if (this.lazyLoad && (editRow.components.length === 0)) {
      editRow.components = this.createRowComponents(editRow.data, rowIndex);
    }

    const dataSnapshot = fastCloneDeep(editRow.data);

    if (this.inlineEditMode) {
      editRow.backup = dataSnapshot;
    }
    else {
      editRow.backup = fastCloneDeep(editRow.data);
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
        this.openWhenEmpty();
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
        this.clearErrors(rowIndex);
        break;
      }
    }

    this.emit('editGridCancelRow', {
      instance: this,
      component: this.component,
      editRow,
    });

    this.checkValidity(null, true);
    this.redraw();

    if (this.component.rowDrafts) {
      this.checkValidity(this.data, false);
    }
  }

  saveRow(rowIndex, modified) {
    const editRow = this.editRows[rowIndex];

    if (this.options.readOnly) {
      return;
    }

    // After an attempt to save, all the components inside the row should become not pristine
    if (!this.component.rowDrafts) {
      editRow.components.forEach((comp) => comp.setPristine(false));
    }

    const isRowValid = this.validateRow(editRow, true);

    if (!this.component.rowDrafts) {
      if (!isRowValid) {
        return false;
      }
    }

    if (this.saveEditMode) {
      const dataValue = this.dataValue;
      if (this.root?.focusedComponent?.component.typeChangeEnabled) {
        this.root.focusedComponent = null;
      }
      switch (editRow.state) {
        case EditRowState.New: {
          const newIndex = dataValue.length;
          dataValue.push(editRow.data);
          editRow.components.forEach(component=>component.rowIndex = newIndex);
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
    this.emit('editGridSaveRow', {
      component: this.component,
      row: editRow.data,
      instance: this
    });
    this.triggerChange({ modified, noPristineChangeOnModified: modified && this.component.rowDrafts, isolateRow: true });
    if (this.component.rowDrafts) {
      editRow.components.forEach(comp => comp.setPristine(this.pristine));
    }
    this.checkValidity(null, true);
    this.redraw();

    if (editRow.alerts) {
      editRow.alerts = false;
    }

    return true;
  }

  beforeFocus(component) {
    if ('beforeFocus' in this.parent) {
      this.parent.beforeFocus(this);
    }
    const relativePath = this.getRelativePath(component.path);
    const arrayPath = getArrayFromComponentPath(relativePath);

    const rowIndex = arrayPath[0];
    let rowToEditIndex = arrayPath[0];

    this.editRows.forEach((row, indexInArray) => {
      if (row.rowIndex === rowIndex) {
        rowToEditIndex = indexInArray;
      }
    });

    if (_.isNumber(rowToEditIndex)) {
      this.editRow(rowToEditIndex);
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
      this.updateComponentsRowIndex(row.components, rowIndex + index);
    });
  }

  baseRemoveRow(rowIndex) {
    const editRow = this.editRows[rowIndex];

    editRow.state = EditRowState.Removed;
    this.destroyComponents(rowIndex);

    return editRow;
  }

  removeRow(rowIndex, modified) {
    if (this.options.readOnly) {
      return;
    }

    this.clearErrors(rowIndex);
    this.baseRemoveRow(rowIndex);
    this.splice(rowIndex);
    this.emit('editGridDeleteRow', {
      index: rowIndex
    });
    this.editRows.splice(rowIndex, 1);
    this.openWhenEmpty();
    this.updateRowsComponents(rowIndex);
    this.updateValue();
    this.triggerChange({ modified, noPristineChangeOnModified: modified && this.component.rowDrafts, isolateRow: true });
    this.checkValidity(null, true);
    this.checkData();
    this.redraw();
  }

  createRowComponents(row, rowIndex, recreatePartially) {
    // Iterate through existing components and destroy the ones with the same rowIndex.
    if (this.components) {
      for (let i = 0; i < this.components.length; i++) {
        if (this.components[i].rowIndex === rowIndex) {
          this.components[i].destroy();
          this.components.splice(i, 1);
        }
      }
    }
    const currentRowComponents = _.get(this.editRows, `[${rowIndex}].components`, null);
    return this.component.components.map((col, colIndex) => {
      if (recreatePartially && currentRowComponents && this.variableTypeComponentsIndexes.length) {
        const currentComp = currentRowComponents[colIndex];
        const shouldRecreate = _.includes(this.variableTypeComponentsIndexes, colIndex) && currentComp?.type !== currentComp?.component?.type;

        if (!shouldRecreate) {
          return currentComp;
        }

        col = currentComp.component;
      }

      const column = _.clone(col);
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;
      options.onChange = (flags = {}, changed, modified) => {
        if (changed.instance.root?.id && (this.root?.id !== changed.instance.root.id)) {
          changed.instance.root.triggerChange(flags, changed, modified);
        }
        else if (!this.component.modal) {
          this.triggerRootChange(flags, changed, modified);
        }

        if (this.inlineEditMode) {
          return;
        }

        const editRow = this.editRows[rowIndex];

        if (editRow?.alerts) {
          this.checkData(null, {
            ...flags,
            changed,
            rowIndex,
          }, this.data);
        }
        else if (editRow) {
          // If drafts allowed, perform validation silently if there was no attempt to submit a form
          const silentCheck = this.component.rowDrafts && !this.shouldValidateDraft(editRow);

          this.checkRow('checkData', null, {
            ...flags,
            changed,
            silentCheck
          }, editRow.data, editRow.components, silentCheck);
        }

        if (this.variableTypeComponentsIndexes.length) {
          this.checkRowVariableTypeComponents(editRow, rowIndex);
          this.redraw();
        }
      };

      const comp = this.createComponent(
        _.assign({}, column, { row: options.row }),
        options,
        row,
        null,
        recreatePartially && currentRowComponents ? currentRowComponents[colIndex] : null
      );
      comp.rowIndex = rowIndex;
      comp.inEditGrid = true;
      return comp;
    });
  }

  hasOpenRows() {
    return this.editRows.some(row => this.isOpen(row));
  }

  shouldValidateDraft(editRow) {
    // Draft rows should be validated only when there was an attempt to submit a form
    return (editRow.state === EditRowState.Draft &&
      !this.pristine &&
      !this.root?.pristine &&
      !this.hasOpenRows()) ||
      this.root?.submitted;
  }

  shouldValidateRow(editRow, dirty) {
    return this.shouldValidateDraft(editRow) ||
      editRow.state === EditRowState.Editing ||
      editRow.alerts ||
      dirty;
  }

  validateRow(editRow, dirty, forceSilentCheck) {
    let valid = true;
    const errorsSnapshot = [...this.errors];

    if (this.shouldValidateRow(editRow, dirty)) {
      editRow.components.forEach(comp => {
        const silentCheck = (this.component.rowDrafts && !this.shouldValidateDraft(editRow)) || forceSilentCheck;

        valid &= comp.checkValidity(null, dirty, null, silentCheck);
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

    if (!this.component.rowDrafts || this.root?.submitted) {
      this.showRowErrorAlerts(editRow, !!valid);
    }

    return !!valid;
  }

  showRowErrorAlerts(editRow, valid) {
    if (editRow.alerts) {
      if (this.alert) {
        if (editRow.errors?.length && !valid) {
          this.alert.showErrors(editRow.errors, false);
          editRow.alerts = true;
        }
        else {
          this.alert.clear();
        }
      }
    }
  }

  checkValidity(data, dirty, row, silentCheck) {
    data = data || this.rootValue;
    row = row || this.data;

    if (!this.checkCondition(row, data)) {
      this.setCustomValidity('');
      return true;
    }

    return this.checkComponentValidity(data, dirty, row, { silentCheck });
  }

  checkComponentValidity(data, dirty, row, options = {}) {
    const { silentCheck } = options;
    const errorsLength = this.errors.length;
    const superValid = super.checkComponentValidity(data, dirty, row, options);

    // If super tells us that component invalid and there is no need to update alerts, just return false
    if (!superValid && (!this.alert && !this.hasOpenRows())) {
      return false;
    }

    if (this.shouldSkipValidation(data, dirty, row)) {
      return true;
    }

    let rowsValid = true;
    let rowsEditing = false;

    this.editRows.forEach((editRow, index) => {
      // Trigger all errors on the row.
      const rowValid = this.validateRow(editRow, dirty, silentCheck);

      rowsValid &= rowValid;

      if (this.rowRefs) {
        const rowContainer = this.rowRefs[index];

        if (rowContainer) {
          const errorContainer = rowContainer.querySelector('.editgrid-row-error');

          if (!rowValid && errorContainer && (!this.component.rowDrafts || this.shouldValidateDraft(editRow))) {
            this.addClass(errorContainer,  'help-block' );
            errorContainer.textContent = this.t(this.errorMessage('invalidRowError'));
          }
          else if (errorContainer) {
            errorContainer.textContent = '';
          }
        }
      }
      // If this is a dirty check, and any rows are still editing, we need to throw validation error.
      rowsEditing |= (dirty && this.isOpen(editRow));
    });

    if (!rowsValid) {
      if (!silentCheck && (!this.component.rowDrafts || this.root?.submitted)) {
        this.setCustomValidity(this.t(this.errorMessage('invalidRowsError')), dirty);
        // Delete this class, because otherwise all the components inside EditGrid will has red border even if they are valid
        this.removeClass(this.element, 'has-error');
      }
      return false;
    }
    else if (rowsEditing && this.saveEditMode) {
      this.setCustomValidity(this.t(this.errorMessage('unsavedRowsError')), dirty);
      return false;
    }

    const message = this.invalid || this.invalidMessage(data, dirty);
    if (this.errors?.length !== errorsLength && this.root?.submitted && !message) {
      this.setCustomValidity(message, dirty);
      this.root.showErrors();
    }
    else {
      this.setCustomValidity(message, dirty);
    }
    return superValid;
  }

  changeState(changed, flags) {
    if (changed || (flags.resetValue && this.component.modalEdit)) {
      this.rebuild();
    }
    else {
      this.redraw();
    }
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
    flags.noValidate = !changed;
    if (this.parent) {
      this.parent.checkComponentConditions();
    }
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

    this.openWhenEmpty();
    this.updateOnChange(flags, changed);
    this.checkData();

    this.changeState(changed, flags);

    return changed;
  }

  openWhenEmpty() {
    const shouldBeOpened = !this.dataValue.length && this.component.openWhenEmpty;
    const hasNoRows = !this.editRows.length;

    if (hasNoRows && shouldBeOpened && !this.builderMode) {
      const dataObj = {};
      this.createRow(dataObj, 0);
    }
  }

  restoreRowContext(editRow, flags = {}) {
    editRow.components.forEach((component) => {
      component.data = editRow.data;
      this.setNestedValue(component, editRow.data, flags);
    });
  }

  emptyRows() {
    this.editRows.forEach((editRow, index) => this.destroyComponents(index));
    this.editRows = [];
  }

  resetValue() {
    super.resetValue();
    this.emptyRows();
  }
}

EditGridComponent.prototype.hasChanged = Component.prototype.hasChanged;
