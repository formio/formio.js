import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';
import Component from '../_classes/component/Component';
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
      icon: 'tasks',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#editgrid',
      weight: 30,
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

  get defaultSchema() {
    return EditGridComponent.schema();
  }

  get emptyValue() {
    return [];
  }

  get editgridKey() {
    return `editgrid-${this.key}`;
  }

  constructor(...args) {
    super(...args);
    this.type = 'editgrid';
  }

  init() {
    if (this.builderMode) {
      this.editRows = [];
      return super.init();
    }

    this.components = this.components || [];
    const dataValue = this.dataValue || [];
    this.editRows = dataValue.map((row, rowIndex) => ({
      isOpen: false,
      data: row,
      components: this.createRowComponents(row, rowIndex),
    }));
    // In builder we need one row so the components will show up.
    if (this.builderMode) {
      this.addRow();
    }
  }

  render(children) {
    if (this.builderMode) {
      return super.render();
    }

    const dataValue = this.dataValue || [];
    return super.render(children || this.renderTemplate('editgrid', {
      editgridKey: this.editgridKey,
      header: this.renderString(_.get(this.component, 'templates.header'), {
        components: this.component.components,
        value: dataValue
      }),
      footer: this.renderString(_.get(this.component, 'templates.footer'), {
        components: this.component.components,
        value: dataValue
      }),
      rows: this.editRows.map(this.renderRow.bind(this)),
      openRows: this.editRows.map(row => row.isOpen),
      errors: this.editRows.map(row => row.error)
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
        this.addEventListener(this.refs[`${this.editgridKey}-saveRow`][openRowCount], 'click', this.saveRow.bind(this, rowIndex));
        this.addEventListener(this.refs[`${this.editgridKey}-cancelRow`][openRowCount], 'click', this.cancelRow.bind(this, rowIndex));
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
            element.addEventListener(action.event, action.action);
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

    super.attach(element);
  }

  renderRow(row, rowIndex) {
    const dataValue = this.dataValue || [];
    if (row.isOpen) {
      return this.renderComponents(row.components);
    }
    else {
      return this.renderString(_.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate),
        {
          row: dataValue[rowIndex],
          rowIndex,
          components: this.component.components,
          flattenedComponents: this.flattenComponents(rowIndex),
          getView: (component, data) => {
            console.log('getView() method is depricated, consider usage of flattenedComponents[componentKey].getView(data)');
            const builtComponent = Components.create(component, this.options, data, true);
            const result = builtComponent.getView(data);

            builtComponent.destroy();

            return result;
          },
        });
    }
  }

  checkData(data, flags = {}) {
    return this.editRows.reduce((valid, editRow) => this.checkRow(data, editRow, flags) && valid, true);
  }

  checkRow(data, editRow, flags = {}) {
    let valid = true;
    if (flags.noCheck) {
      return;
    }

    // Update the value.
    let changed = this.updateValue({
      noUpdateEvent: true
    });

    // Iterate through all components and check conditions, and calculate values.
    editRow.components.forEach(comp => {
      if (comp.checkData) {
        valid &= comp.checkData(data, flags);
      }
      changed |= comp.calculateValue(data, {
        noUpdateEvent: true
      });
      comp.checkConditions(data);
      if (!flags.noValidate) {
        valid &= comp.checkValidity(data, this.component.inlineEdit || !editRow.isOpen);
      }
    });

    if (!flags.noValidate) {
      valid &= (this.validateRow(editRow) === true);
    }

    // Trigger the change if the values changed.
    if (changed) {
      this.triggerChange(flags);
    }

    // Return if the value is valid.
    return valid;
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
    this.redraw();
  }

  editRow(rowIndex) {
    const dataValue = this.dataValue || [];
    const editRow = this.editRows[rowIndex];
    editRow.dirty = false;
    editRow.isOpen = true;
    editRow.editing = true;
    const dataSnapshot = dataValue[rowIndex] ? _.cloneDeep(dataValue[rowIndex]) : {};
    if (this.component.inlineEdit) {
      editRow.backup = dataSnapshot;
    }
    else {
      editRow.data = dataSnapshot;
      this.restoreRowContext(editRow);
    }
    this.redraw();
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
      this.redraw();
      return;
    }
    if (editRow.editing) {
      const dataValue = this.dataValue || [];
      editRow.dirty = false;
      editRow.isOpen = false;
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

    this.checkValidity(this.data, true);
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
    if (!!this.validateRow(editRow) !== true) {
      return;
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
    this.updateValue();
    this.triggerChange();
    this.checkValidity(this.data, true);
    this.redraw();
  }

  removeRow(rowIndex) {
    if (this.options.readOnly) {
      return;
    }
    this.destroyComponents(rowIndex);
    this.splice(rowIndex);
    this.editRows.splice(rowIndex, 1);
    this.updateValue();
    this.triggerChange();
    this.checkValidity(this.data, true);
    this.redraw();
  }

  createRowComponents(row, rowIndex) {
    const components = [];
    this.component.components.map((col, colIndex) => {
      const column = _.clone(col);
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;
      const comp = this.createComponent(_.assign({}, column, {
        row: options.row
      }), options, row);
      comp.rowIndex = rowIndex;
      // Don't bubble sub changes since they won't apply until pressing save.
      comp.triggerChange = () => {
        // Should we recalculate or something here?
        // TODO: Cause refreshOn to trigger.
        if (this.component.inlineEdit) {
          this.triggerChange();
        }
        // else {
        //   this.checkRow(this.data, rowIndex);
        // }
      };
      components.push(comp);
    });
    return components;
  }

  validateRow(editRow, dirty) {
    let valid = true;
    if (editRow.isOpen) {
      const isDirty = dirty || !!editRow.dirty;
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

  checkValidity(data, dirty) {
    if (!this.checkCondition(null, data)) {
      this.setCustomValidity('');
      return true;
    }

    let rowsValid = true;
    let rowsClosed = true;
    this.editRows.forEach((editRow) => {
      // Trigger all errors on the row.
      const rowValid = this.validateRow(editRow, dirty);

      rowsValid &= rowValid;

      // Any open rows causes validation to fail.
      rowsClosed &= !editRow.isOpen;
    });

    if (!rowsValid) {
      this.setCustomValidity('Please correct rows before proceeding.', dirty);
      return false;
    }
    else if (!rowsClosed && !this.component.inlineEdit) {
      this.setCustomValidity('Please save all rows before proceeding.', dirty);
      return false;
    }

    const message = this.invalid || this.invalidMessage(data, dirty);
    this.setCustomValidity(message, dirty);
    return true;
  }

  get defaultValue() {
    const value = super.defaultValue;
    return Array.isArray(value) ? value : [];
  }

  setValue(value, flags) {
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

    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    // Refresh editRow data when data changes.
    this.dataValue.forEach((row, rowIndex) => {
      const editRow = this.editRows[rowIndex];
      if (editRow) {
        editRow.data = row;
        if (editRow.isOpen) {
          editRow.components.forEach(col => {
            col.data = row;
            col.setValue(row[col.key], flags);
          });
        }
      }
      else {
        this.editRows[rowIndex] = {
          components: this.createRowComponents(row, rowIndex),
          isOpen: false,
          data: row,
        };
      }
    });
    if (changed) {
      this.checkValidity(this.data);
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
    editRow.components.forEach((component) => component.data = editRow.data);
  }
}

EditGridComponent.prototype.hasChanged = Component.prototype.hasChanged;
EditGridComponent.prototype.updateValue = Component.prototype.updateValue;
