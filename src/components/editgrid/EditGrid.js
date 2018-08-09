import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';
import Components from '../Components';
import { checkCondition } from '../../utils/utils';

export default class EditGridComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'editgrid',
      label: 'Edit Grid',
      key: 'editGrid',
      clearOnHide: true,
      input: true,
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
  <div class="col-sm-2">
    <div class="btn-group pull-right">
      <button class="btn btn-default editRow">Edit</button>
      <button class="btn btn-danger removeRow">Delete</button>
    </div>
  </div>
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
    this.editRows = this.dataValue.map((row) => ({
      isOpen: false,
      data: row,
    }));
    // In builder we need one row so the components will show up.
    if (this.options.attachMode === 'builder') {
      this.addRow();
    }
  }

  render() {
    return super.render(this.renderTemplate('editgrid', {
      editgridKey: this.editgridKey,
      header: this.renderString(_.get(this.component, 'templates.header'), {
        components: this.component.components,
        value: this.dataValue
      }),
      footer: this.renderString(_.get(this.component, 'templates.footer'), {
        components: this.component.components,
        value: this.dataValue
      }),
      rows: this.editRows.map(this.renderRow.bind(this)),
      openRows: this.editRows.map(row => row.isOpen),
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
    super.attach(element);
  }

  renderRow(row, rowIndex) {
    console.log('renderRow', row, rowIndex);
    if (row.isOpen) {
      return this.renderComponents(row.components);
    }
    else {
      return this.renderString(_.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate),
        {
          row: this.dataValue[rowIndex],
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
      comp.checkConditions(this.editRows[index].data);
      if (!flags.noValidate) {
        valid &= comp.checkValidity(this.editRows[index].data, !this.editRows[index].isOpen);
      }
    });

    valid &= this.validateRow(index, false);

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
      isOpen: true,
      data: {}
    });
    const rowIndex = this.editRows.length - 1;
    this.editRows[rowIndex].components = this.createRowComponents(this.editRows[rowIndex].data, rowIndex);
    this.redraw();
  }

  editRow(rowIndex) {
    this.editRows[rowIndex].isOpen = true;
    this.editRows[rowIndex].data = _.cloneDeep(this.dataValue[rowIndex]);
    this.editRows[rowIndex].components = this.createRowComponents(this.editRows[rowIndex].data, rowIndex);
    this.redraw();
  }

  cancelRow(rowIndex) {
    this.removeRowComponents(rowIndex);
    if (this.options.readOnly) {
      this.editRows[rowIndex].isOpen = false;
      this.redraw();
      return;
    }
    // Remove if new.
    if (!this.dataValue[rowIndex]) {
      this.editRows.splice(rowIndex, 1);
    }
    else {
      this.editRows[rowIndex].isOpen = false;
      this.editRows[rowIndex].data = this.dataValue[rowIndex];
    }
    this.redraw();
  }

  saveRow(rowIndex) {
    if (this.options.readOnly) {
      this.editRows[rowIndex].isOpen = false;
      this.removeRowComponents(rowIndex);
      this.redraw();
      return;
    }
    if (!this.validateRow(rowIndex, true)) {
      return;
    }
    this.dataValue[rowIndex] = this.editRows[rowIndex].data;
    this.removeRowComponents(rowIndex);
    this.editRows[rowIndex].isOpen = false;
    this.checkValidity(this.data, true);
    this.updateValue();
    this.triggerChange();
    this.redraw();
  }

  removeRow(rowIndex) {
    if (this.options.readOnly) {
      return;
    }
    this.removeRowComponents(rowIndex);
    this.splice(rowIndex);
    this.editRows.splice(rowIndex, 1);
    this.updateValue();
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
      // Don't bubble sub changes since they won't apply until pressing save.
      comp.triggerChange = () => {
        // Should we recalculate or something here?
      };
      components.push(comp);
    });
    return components;
  }

  removeRowComponents(rowIndex) {
    // Clean up components list.
    this.editRows[rowIndex].components.forEach(comp => {
      this.removeComponent(comp, this.components);
    });
    this.editRows[rowIndex].components = [];
  }

  validateRow(rowIndex, dirty) {
    let check = true;

    if (this.editRows[rowIndex].isOpen) {
      this.editRows[rowIndex].components.forEach(comp => {
        comp.setPristine(!dirty);
        check &= comp.checkValidity(this.editRows[rowIndex].data, dirty);
      });
    }

    if (this.component.validate && this.component.validate.row) {
      let valid = this.evaluate(this.component.validate.row, {
        valid: true,
        row: this.editRows[rowIndex].data
      }, 'valid', true);
      if (valid === null) {
        valid = `Invalid row validation for ${this.key}`;
      }

      // this.editRows[rowIndex].errorContainer.innerHTML = '';
      // if (valid !== true) {
      //   this.editRows[rowIndex].errorContainer.appendChild(
      //     this.ce('div', { class: 'editgrid-row-error help-block' }, valid)
      //   );
      //   return false;
      // }
    }

    return check;
  }

  checkValidity(data, dirty) {
    if (!checkCondition(this.component, data, this.data, this.root ? this.root._form : {}, this)) {
      this.setCustomValidity('');
      return true;
    }

    let rowsValid = true;
    let rowsClosed = true;
    this.editRows.forEach((editRow, rowIndex) => {
      // Trigger all errors on the row.
      const rowValid = this.validateRow(rowIndex, false);
      // Add has-error class to row.
      if (!rowValid) {
        // this.addClass(this.editRows[rowIndex].element, 'has-error');
      }
      else {
        // this.removeClass(this.editRows[rowIndex].element, 'has-error');
      }
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

  setCustomValidity(message, dirty) {
    // if (this.errorElement && this.errorContainer) {
    //   this.errorElement.innerHTML = '';
    //   this.removeChildFrom(this.errorElement, this.errorContainer);
    // }
    // this.removeClass(this.element, 'has-error');
    // if (this.options.highlightErrors) {
    //   this.removeClass(this.element, 'alert alert-danger');
    // }
    if (message) {
      this.emit('componentError', this.error);
      // this.createErrorElement();
      // const errorMessage = this.ce('p', {
      //   class: 'help-block'
      // });
      // errorMessage.appendChild(this.text(message));
      // this.appendTo(errorMessage, this.errorElement);
      // // Add error classes
      // this.addClass(this.element, 'has-error');
      // if (dirty && this.options.highlightErrors) {
      //   this.addClass(this.element, 'alert alert-danger');
      // }
    }
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
          isOpen: false,
          data: row
        };
      }
    });
    // Remove any extra edit rows.
    // if (this.dataValue.length < this.editRows.length) {
    //   for (let rowIndex = this.editRows.length - 1; rowIndex >= this.dataValue.length; rowIndex--) {
    //     this.removeRowComponents(rowIndex);
    //     this.removeChildFrom(this.editRows[rowIndex].element, this.tableElement);
    //     this.editRows.splice(rowIndex, 1);
    //   }
    // }
    // this.refreshDOM();
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    return this.dataValue;
  }
}
