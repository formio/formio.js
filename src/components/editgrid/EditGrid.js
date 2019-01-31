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
    this.components = this.components || [];
    const dataValue = this.dataValue || [];
    this.editRows = dataValue.map((row) => ({
      isOpen: false,
      data: row,
    }));
    // In builder we need one row so the components will show up.
    if (this.options.attachMode === 'builder') {
      this.addRow();
    }
  }

  render() {
    const dataValue = this.dataValue || [];
    return super.render(this.renderTemplate('editgrid', {
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
          getView: (component, data) => Components.create(component, this.options, data, true).getView(data)
        });
    }
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

    // Iterate through all components and check conditions, and calculate values.
    this.editRows[index].components.forEach(comp => {
      changed |= comp.calculateValue(data, {
        noUpdateEvent: true
      });
      comp.checkConditions(data);
      if (!flags.noValidate) {
        valid &= comp.checkValidity(data, !this.editRows[index].isOpen);
      }
    });

    valid &= (this.validateRow(index) === true);

    // Trigger the change if the values changed.
    if (changed) {
      this.triggerChange(flags);
    }

    // Return if the value is valid.
    return valid;
  }

  addRow() {
    if (this.options.readOnly) {
      return;
    }
    this.editRows.push({
      components: [],
      isOpen: true,
      data: {}
    });
    this.emit('editGridAddRow', {
      component: this.component,
      row: this.editRows[this.editRows.length - 1]
    });
    const rowIndex = this.editRows.length - 1;
    this.editRows[rowIndex].components = this.createRowComponents(this.editRows[rowIndex].data, rowIndex);
    this.redraw();
  }

  editRow(rowIndex) {
    const dataValue = this.dataValue || [];
    this.editRows[rowIndex].dirty = false;
    this.editRows[rowIndex].isOpen = true;
    this.editRows[rowIndex].editing = true;
    this.editRows[rowIndex].data = dataValue[rowIndex] ? _.cloneDeep(dataValue[rowIndex]) : {};
    this.editRows[rowIndex].components = this.createRowComponents(this.editRows[rowIndex].data, rowIndex);
    this.redraw();
  }

  clearErrors(rowIndex) {
    if (this.editRows[rowIndex] && Array.isArray(this.editRows[rowIndex].components)) {
      this.editRows[rowIndex].components.forEach(comp => {
        comp.setPristine(true);
        comp.setCustomValidity('');
      });
    }
  }

  cancelRow(rowIndex) {
    if (this.options.readOnly) {
      this.editRows[rowIndex].dirty = false;
      this.editRows[rowIndex].isOpen = false;
      this.redraw();
      return;
    }
    if (this.editRows[rowIndex].editing) {
      const dataValue = this.dataValue || [];
      this.editRows[rowIndex].dirty = false;
      this.editRows[rowIndex].isOpen = false;
      this.editRows[rowIndex].data = dataValue[rowIndex] || {};
      this.clearErrors(rowIndex);
    }
    else {
      this.clearErrors(rowIndex);
      this.editRows.splice(rowIndex, 1);
    }

    this.checkValidity(this.data, true);
    this.redraw();
  }

  saveRow(rowIndex) {
    if (this.options.readOnly) {
      this.editRows[rowIndex].dirty = false;
      this.editRows[rowIndex].isOpen = false;
      this.redraw();
      return;
    }
    this.editRows[rowIndex].dirty = true;
    if (this.validateRow(rowIndex) !== true) {
      return;
    }

    const dataValue = this.dataValue || [];
    if (this.editRows[rowIndex].editing) {
      dataValue[rowIndex] = this.editRows[rowIndex].data;
    }
    else {
      // Insert this row into its proper place.
      const newIndex = dataValue.length;
      const row = this.editRows[rowIndex];
      dataValue.push(row.data);
      this.editRows.splice(rowIndex, 1);
      this.editRows.splice(newIndex, 0, row);
      rowIndex = newIndex;
    }
    this.editRows[rowIndex].dirty = false;
    this.editRows[rowIndex].isOpen = false;
    this.updateValue();
    this.triggerChange();
    this.checkValidity(this.data, true);
    this.redraw();
  }

  removeRow(rowIndex) {
    if (this.options.readOnly) {
      return;
    }
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
      };
      components.push(comp);
    });
    return components;
  }

  validateRow(rowIndex, dirty) {
    let valid = true;

    if (this.editRows[rowIndex].isOpen) {
      const isDirty = dirty || !!this.editRows[rowIndex].dirty;
      this.editRows[rowIndex].components.forEach(comp => {
        comp.setPristine(!isDirty);
        valid &= comp.checkValidity(null, isDirty, this.editRows[rowIndex].data);
      });
    }

    if (this.component.validate && this.component.validate.row) {
      valid = this.evaluate(this.component.validate.row, {
        valid,
        row: this.editRows[rowIndex].data
      }, 'valid', true);
      if (valid.toString() !== 'true') {
        this.editRows[rowIndex].error = valid;
      }
      else {
        delete this.editRows[rowIndex].error;
      }
      if (valid === null) {
        valid = `Invalid row validation for ${this.key}`;
      }
    }

    return valid;
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

      rowsValid &= rowValid;

      // Any open rows causes validation to fail.
      rowsClosed &= !editRow.isOpen;
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

  get defaultValue() {
    const value = super.defaultValue;
    return Array.isArray(value) ? value : [];
  }

  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return Component.prototype.updateValue.call(this, flags, value);
  }

  hasChanged(before, after) {
    if (
      ((before === undefined) || (before === null)) &&
      ((after === undefined) || (after === null))
    ) {
      return false;
    }
    return !_.isEqual(before, after);
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
      if (this.editRows[rowIndex]) {
        this.editRows[rowIndex].data = row;
        if (this.editRows[rowIndex].isOpen) {
          this.editRows[rowIndex].components.forEach(col => {
            col.data = row;
            col.setValue(row[col.key], flags);
          });
        }
      }
      else {
        this.editRows[rowIndex] = {
          components: [],
          isOpen: false,
          data: row
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
}
