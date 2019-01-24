import Component from '../_classes/component/Component';
import DataGridComponent from '../datagrid/DataGrid';
import _ from 'lodash';

export default class DataMapComponent extends DataGridComponent {
  static schema(...extend) {
    return Component.schema({
      label: 'Data Map',
      key: 'dataMap',
      type: 'datamap',
      clearOnHide: true,
      addAnother: 'Add Another',
      disableAddingRemovingRows: false,
      keyBeforeValue: true,
      valueComponent: {
        type: 'textfield',
        key: 'value',
        label: 'Value',
        defaultValue: 'Value',
        input: true
      },
      input: true,
      validate: {
        maxLength: 0,
        minLength: 0
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Data Map',
      icon: 'fa fa-th-list',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#datamap',
      weight: 25,
      schema: DataMapComponent.schema()
    };
  }

  get schema() {
    const schema = super.schema;
    schema.valueComponent = this.components[this.components.length - 1].schema;
    return _.omit(schema, 'components');
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'datamap';
  }

  init() {
    this.components = [];
    this.rows = [];
    this.createRows();
    this.visibleColumns = {
      key: true,
      [this.component.valueComponent.key]: true
    };
    this.component.valueComponent.hideLabel = true;
  }

  get defaultSchema() {
    return DataMapComponent.schema();
  }

  get emptyValue() {
    return {};
  }

  get dataValue() {
    if (
      !this.key ||
      (!this.visible && this.component.clearOnHide)
    ) {
      return this.emptyValue;
    }
    if (!this.hasValue()) {
      this.dataValue = this.emptyValue;
    }
    return _.get(this.data, this.key);
  }

  set dataValue(value) {
    super.dataValue = value;
  }

  get defaultValue() {
    const value = super.defaultValue;
    if (Array.isArray(value)) {
      return value[0];
    }
    return this.emptyValue;
  }

  get keySchema() {
    return {
      type: 'textfield',
      input: true,
      hideLabel: true,
      label: 'Key',
      key: 'key',
    };
  }

  createRows() {
    const keys = Object.keys(this.dataValue);

    keys.forEach((key, index) => {
      if (!this.rows[index]) {
        this.rows[index] = this.createRowComponents(key, this.dataValue[key], index);
      }
    });

    // Delete any extra rows.
    this.rows.splice(keys.length);
  }

  hasHeader() {
    return true;
  }

  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.shouldDisable &&
      this.options.attachMode === 'full';
  }

  getColumns() {
    const keySchema = Object.assign({}, this.keySchema);
    const valueSchema = Object.assign({}, this.component.valueComponent);
    keySchema.hideLabel = false;
    valueSchema.hideLabel = false;
    return [
      keySchema,
      valueSchema
    ];
  }

  createRowComponents(keyValue, value, rowIndex) {
    const components = {};

    components['key'] = this.createComponent(this.keySchema, this.options, { key: keyValue });
    components[this.component.valueComponent.key] = this.createComponent(this.component.valueComponent, this.options, { [this.component.valueComponent.key]: value });

    return components;
  }

  addRow() {
    this.dataValue['value'] = 'Value';
    const index = this.rows.length;
    this.rows[index] = this.createRowComponents('value', this.dataValue['value'], index);
    this.redraw();
  }

  removeRow(index) {
    console.log('remove', index);
    // this.splice(index);
    // this.rows.splice(index, 1);
    // this.redraw();
  }

  setValue(value) {
    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    this.createRows();

    if (changed) {
      this.redraw();
    }
    return changed;
  }

  checkColumns(data) {
    return { rebuild: false, show: true };
  }
}
