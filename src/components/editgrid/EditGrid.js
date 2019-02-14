import _ from 'lodash';
import NestedComponent from '../nested/NestedComponent';
import BaseComponent from '../base/Base';
import Components from '../Components';

export default class EditGridComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'editgrid',
      label: 'Edit Grid',
      key: 'editGrid',
      clearOnHide: true,
      input: true,
      tree: true,
      defaultOpen: false,
      removeRow: '',
      components: [],
      inlineEdit: false,
      templates: {
        header: this.defaultHeaderTemplate,
        row: this.defaultRowTemplate,
        footer: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Edit Grid',
      icon: 'fa fa-tasks',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#editgrid',
      weight: 40,
      schema: EditGridComponent.schema()
    };
  }

  static get defaultHeaderTemplate() {
    return  `<div class="row">
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
  {% if (!instance.options.readOnly) { %}
    <div class="col-sm-2">
      <div class="btn-group pull-right">
        <button class="btn btn-default btn-sm editRow">Edit</button>
        <button class="btn btn-danger btn-sm removeRow">Delete</button>
      </div>
    </div>
  {% } %}
</div>`;
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'datagrid';
    this.editRows = [];
  }

  get defaultSchema() {
    return EditGridComponent.schema();
  }

  get emptyValue() {
    return [];
  }

  build(state) {
    if (this.options.builder) {
      return super.build(state, true);
    }
    this.createElement();
    this.createLabel(this.element);
    const dataValue = this.dataValue;
    if (Array.isArray(dataValue)) {
      // Ensure we always have rows for each dataValue available.
      dataValue.forEach((row, rowIndex) => {
        if (this.editRows[rowIndex]) {
          this.editRows[rowIndex].data = row;
        }
        else {
          this.editRows[rowIndex] = {
            components: [],
            isOpen: !!this.options.defaultOpen,
            data: row
          };
        }
      });
    }

    this.buildTable();
    this.createAddButton();
    this.createDescription(this.element);
    this.element.appendChild(this.errorContainer = this.ce('div', { class: 'has-error' }));
    this.attachLogic();
  }

  buildTable(fromBuild) {
    // Do not show the table when in builder mode.
    if (this.options.builder) {
      return;
    }
    if (!fromBuild && !this.editRows.length && this.component.defaultOpen) {
      return this.addRow(true);
    }
    let tableClass = 'editgrid-listgroup list-group ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    const tableElement = this.ce('ul', { class: tableClass }, [
      this.headerElement = this.createHeader(),
      this.rowElements = this.editRows.map(this.createRow.bind(this)),
      this.footerElement = this.createFooter(),
    ]);

    if (this.tableElement && this.element.contains(this.tableElement)) {
      this.element.replaceChild(tableElement, this.tableElement);
    }
    else {
      this.element.appendChild(tableElement);
    }
    //add open class to the element if any edit grid row is open
    const isAnyRowOpen = this.editRows.some((row) => row.isOpen);
    if (isAnyRowOpen) {
      this.addClass(this.element, `formio-component-${this.component.type}-row-open`);
    }
    else {
      this.removeClass(this.element, `formio-component-${this.component.type}-row-open`);
    }
    this.tableElement = tableElement;
    if (this.hasDraggableRows) {
      this.addDraggable([this.tableElement]);
    }
  }

  getRowDragulaOptions() {
    const superOptions = super.getRowDragulaOptions();
    superOptions.accepts = function(draggedElement, newParent, oldParent, nextSibling) {
      //disallow dragging above Edit Grid header
      return !nextSibling || !nextSibling.classList.contains('formio-edit-grid-header');
    };
    return superOptions;
  }

  onRowDrop(droppedElement, newParent, oldParent, nextSibling) {
    super.onRowDrop(droppedElement, newParent, oldParent, nextSibling);
    this.triggerChange();
  }

  createHeader() {
    const templateHeader = _.get(this.component, 'templates.header');
    if (!templateHeader) {
      return this.text('');
    }
    const headerMarkup = this.renderTemplate(templateHeader, {
      components: this.component.components,
      value: this.dataValue
    });
    let headerElement;
    if (this.hasDraggableRows) {
      headerElement = this.ce('div', {
        class: 'row'
      }, [
        this.ce('div', {
          class: 'col-xs-1'
        }),
        this.ce('div', {
          class: 'col-xs-11'
        }, headerMarkup)
      ]);
    }
    else {
      headerElement = headerMarkup;
    }
    return this.ce('li', {
      class: 'list-group-item list-group-header formio-edit-grid-header'
    }, headerElement);
  }

  createRow(row, rowIndex) {
    const wrapper = this.ce('li', { class: 'list-group-item' });
    const rowTemplate = _.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate);

    // Store info so we can detect changes later.
    wrapper.rowData = row.data;
    wrapper.rowIndex = rowIndex;
    wrapper.rowOpen = row.isOpen;
    row.components = [];

    if (wrapper.rowOpen) {
      const editForm = this.component.components.map(comp => {
        const component = _.cloneDeep(comp);
        const options = _.clone(this.options);
        options.row = `${this.row}-${rowIndex}`;
        options.name += `[${rowIndex}]`;
        const instance = this.createComponent(component, options, row.data);
        instance.rowIndex = rowIndex;
        row.components.push(instance);
        return instance.element;
      });
      if (!this.options.readOnly) {
        editForm.push(this.ce('div', { class: 'editgrid-actions' },
          [
            this.ce('button', {
              class: 'btn btn-primary',
              onClick: this.saveRow.bind(this, rowIndex)
            }, this.component.saveRow || 'Save'),
            ' ',
            this.component.removeRow ?
              this.ce('button', {
                class: 'btn btn-danger',
                onClick: this.cancelRow.bind(this, rowIndex)
              }, this.component.removeRow || 'Cancel')
              : null
          ]
        ));
      }
      wrapper.appendChild(
        this.ce('div', { class: 'editgrid-edit' },
          this.ce('div', { class: 'editgrid-body' }, editForm)
        )
      );
    }
    else {
      const rowMarkup = this.renderTemplate(rowTemplate,
        {
          row: row.data,
          data: this.data,
          rowIndex,
          components: this.component.components,
          getView: (component, data) => Components.create(component, this.options, data, true).getView(data)
        },
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
          }
        ]
      );
      let rowElement;
      if (this.hasDraggableRows) {
        rowElement = this.ce('div', {
          class: 'row'
        }, [
          this.ce('div', {
            class: 'col-xs-1 formio-drag-column'
          }, this.dragButton()),
          this.ce('div', {
            class: 'col-xs-11'
          }, rowMarkup)
        ]);
      }
      else {
        rowElement = rowMarkup;
      }
      wrapper.appendChild(rowElement);
    }
    wrapper.appendChild(row.errorContainer = this.ce('div', { class: 'has-error' }));
    this.checkData(this.data, { noValidate: true }, rowIndex);
    if (this.hasDraggableRows) {
      wrapper.dragInfo = {
        index: rowIndex
      };
    }
    return wrapper;
  }

  createFooter() {
    const footerTemplate = _.get(this.component, 'templates.footer');
    if (!footerTemplate) {
      return this.text('');
    }
    return this.ce('li', {
      class: 'list-group-item list-group-footer'
    }, this.renderTemplate(footerTemplate, {
      components: this.component.components,
      value: this.dataValue
    }));
  }

  checkData(data, flags = {}, index) {
    let valid = true;
    if (flags.noCheck) {
      return;
    }

    // Update the value.
    let changed = this.updateValue({
      noUpdateEvent: true
    });
    const editRow = this.editRows[index];

    // Iterate through all components and check conditions, and calculate values.
    editRow.components.forEach(comp => {
      changed |= comp.calculateValue(data, {
        noUpdateEvent: true
      });
      comp.checkConditions(data);
      if (!flags.noValidate) {
        valid &= comp.checkValidity(data, !editRow.isOpen);
      }
    });

    valid &= this.validateRow(index);

    // Trigger the change if the values changed.
    if (changed) {
      this.triggerChange(flags);
    }

    // Return if the value is valid.
    return valid;
  }

  createAddButton() {
    if (this.options.readOnly) {
      return;
    }
    this.element.appendChild(this.ce('div', { class: 'editgrid-add' },
      this.ce('button', {
        class: 'btn btn-primary',
        role: 'button',
        onClick: this.addRow.bind(this)
      },
      [
        this.ce('span', { class: this.iconClass('plus'), 'aria-hidden': true }),
        ' ',
        this.t(this.component.addAnother ? this.component.addAnother : 'Add Another', {})
      ])
    ));
  }

  addRow(fromBuild) {
    if (this.options.readOnly) {
      return;
    }
    const dataObj = {};
    this.editRows.push({
      components: [],
      isOpen: true,
      data: dataObj,
    });
    if (this.component.inlineEdit) {
      this.dataValue.push(dataObj);
    }
    this.emit('editGridAddRow', {
      component: this.component,
      row: this.editRows[this.editRows.length - 1]
    });
    if (this.component.inlineEdit) {
      this.updateGrid();
    }
    else {
      this.buildTable(fromBuild);
    }
  }

  editRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    editRow.dirty = false;
    editRow.isOpen = true;
    editRow.editing = true;
    const dataSnapshot = _.cloneDeep(this.dataValue[rowIndex]);
    if (this.component.inlineEdit) {
      editRow.backup = dataSnapshot;
      this.updateGrid();
    }
    else {
      editRow.data = dataSnapshot;
      this.buildTable();
    }
  }

  updateGrid() {
    this.updateValue();
    this.triggerChange();
    this.buildTable();
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
      this.buildTable();
      return;
    }
    if (editRow.editing) {
      editRow.dirty = false;
      editRow.isOpen = false;
      if (this.component.inlineEdit) {
        this.dataValue[rowIndex] = editRow.backup;
      }
      editRow.data = this.dataValue[rowIndex];
      this.clearErrors(rowIndex);
    }
    else {
      this.clearErrors(rowIndex);
      if (this.component.inlineEdit) {
        this.splice(rowIndex);
      }
      this.removeChildFrom(editRow.element, this.tableElement);
      this.editRows.splice(rowIndex, 1);
    }
    this.updateGrid();
  }

  saveRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (this.options.readOnly) {
      editRow.dirty = false;
      editRow.isOpen = false;
      this.buildTable();
      return;
    }
    editRow.dirty = true;
    if (!this.validateRow(rowIndex)) {
      return;
    }
    editRow.dirty = false;
    editRow.isOpen = false;

    if (!this.component.inlineEdit) {
      if (editRow.editing) {
        this.dataValue[rowIndex] = editRow.data;
      }
      else {
        // Insert this row into its proper place.
        const newIndex = this.dataValue.length;
        this.dataValue.push(editRow.data);
        this.editRows.splice(rowIndex, 1);
        this.editRows.splice(newIndex, 0, editRow);
      }
    }

    this.updateGrid();
  }

  removeRow(rowIndex) {
    if (this.options.readOnly) {
      return;
    }
    this.splice(rowIndex);
    this.removeChildFrom(this.editRows[rowIndex].element, this.tableElement);
    this.editRows.splice(rowIndex, 1);
    this.updateGrid();
  }

  validateRow(rowIndex, dirty) {
    let check = true;
    const editRow = this.editRows[rowIndex];
    const isDirty = dirty || !!editRow.dirty;
    editRow.components.forEach(comp => {
      comp.setPristine(!isDirty);
      check &= comp.checkValidity(null, isDirty, editRow.data);
    });

    if (this.component.validate && this.component.validate.row) {
      let valid = this.evaluate(this.component.validate.row, {
        valid: true,
        row: editRow.data
      }, 'valid', true);
      if (valid === null) {
        valid = `Invalid row validation for ${this.key}`;
      }

      editRow.errorContainer.innerHTML = '';
      if (valid !== true) {
        editRow.errorContainer.appendChild(
          this.ce('div', { class: 'editgrid-row-error help-block' }, valid)
        );
        return false;
      }
    }

    return check;
  }

  checkValidity(data, dirty) {
    if (!this.checkCondition(null, data)) {
      this.setCustomValidity('');
      return true;
    }

    let rowsValid = true;
    let rowsClosed = true;
    this.editRows.forEach((editRow, rowIndex) => {
      // Trigger all errors on the row.
      const rowValid = this.validateRow(rowIndex, dirty);
      // Add has-error class to row.
      if (!rowValid) {
        this.addClass(editRow.element, 'has-error');
      }
      else {
        this.removeClass(editRow.element, 'has-error');
      }
      rowsValid &= rowValid;

      // Any open rows causes validation to fail.
      if (dirty) {
        rowsClosed &= !editRow.isOpen;
      }
    });

    if (!rowsValid) {
      this.setCustomValidity('Please correct rows before proceeding.', dirty);
      return false;
    }
    else if (!rowsClosed) {
      this.setCustomValidity('Please save all rows before proceeding.', dirty);
      return false;
    }

    const message = this.invalid || this.invalidMessage(data, dirty);
    this.setCustomValidity(message, dirty);
    return true;
  }

  setCustomValidity(message, dirty) {
    if (this.errorElement && this.errorContainer) {
      this.errorElement.innerHTML = '';
      this.removeChildFrom(this.errorElement, this.errorContainer);
    }
    this.removeClass(this.element, 'has-error');
    if (this.options.highlightErrors) {
      this.removeClass(this.element, 'alert alert-danger');
    }
    if (message) {
      this.emit('componentError', this.error);
      this.createErrorElement();
      const errorMessage = this.ce('p', {
        class: 'help-block'
      });
      errorMessage.appendChild(this.text(message));
      this.appendTo(errorMessage, this.errorElement);
      // Add error classes
      this.addClass(this.element, 'has-error');
      if (dirty && this.options.highlightErrors) {
        this.addClass(this.element, 'alert alert-danger');
      }
    }
  }

  get defaultValue() {
    const value = super.defaultValue;
    return Array.isArray(value) ? value : [];
  }

  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  setValue(value) {
    if (!value) {
      this.editRows = this.defaultValue;
      this.buildTable();
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

    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    const dataValue = this.dataValue;
    if (Array.isArray(dataValue)) {
      // Refresh editRow data when data changes.
      dataValue.forEach((row, rowIndex) => {
        if (this.editRows[rowIndex]) {
          this.editRows[rowIndex].data = row;
        }
        else {
          this.editRows[rowIndex] = {
            components: [],
            isOpen: !!this.options.defaultOpen,
            data: row
          };
        }
      });

      // Remove any extra edit rows.
      if (dataValue.length < this.editRows.length) {
        for (let rowIndex = this.editRows.length - 1; rowIndex >= dataValue.length; rowIndex--) {
          this.removeChildFrom(this.editRows[rowIndex].element, this.tableElement);
          this.editRows.splice(rowIndex, 1);
        }
      }
    }

    this.buildTable();
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

  clearOnHide(show) {
    super.clearOnHide(show);
    if (!this.component.clearOnHide) {
      // If some components set to clearOnHide we need to clear them.
      this.buildTable();
    }
  }

  restoreComponentsContext() {
    return;
  }
}
