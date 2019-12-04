import Component from '../_classes/component/Component';
import DataGridComponent from '../datagrid/DataGrid';
import _ from 'lodash';
import EventEmitter from 'eventemitter2';
import { uniqueKey } from '../../utils/utils';

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
      icon: 'th-list',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#datamap',
      weight: 20,
      schema: DataMapComponent.schema()
    };
  }

  get schema() {
    const schema = super.schema;
    if (this.components && (this.components.length > 0)) {
      schema.valueComponent = this.components[this.components.length - 1].schema;
    }
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
      [this.valueKey]: true
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
      label: this.component.keyLabel || 'Key',
      key: '__key',
    };
  }

  get valueKey() {
    return this.component.valueComponent.key;
  }

  getRowValues() {
    const dataValue = this.dataValue;
    if (this.builderMode) {
      return [dataValue];
    }
    if (_.isEmpty(dataValue)) {
      return [];
    }
    return Object.keys(dataValue).map(() => dataValue);
  }

  hasHeader() {
    return true;
  }

  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode;
  }

  getColumns() {
    const keySchema = Object.assign({}, this.keySchema);
    const valueSchema = Object.assign({}, this.component.valueComponent);
    keySchema.hideLabel = false;
    valueSchema.hideLabel = false;
    return this.component.keyBeforeValue ?
      [keySchema, valueSchema] :
      [valueSchema, keySchema];
  }

  getRowKey(rowIndex) {
    const keys = Object.keys(this.dataValue);
    if (!keys[rowIndex]) {
      keys[rowIndex] = uniqueKey(this.dataValue, 'key');
    }
    return keys[rowIndex];
  }

  createRowComponents(row, rowIndex) {
    let key = this.getRowKey(rowIndex);

    // Create a new event emitter since fields are isolated.
    const options = _.clone(this.options);
    options.events = new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
    options.name += `[${rowIndex}]`;
    options.row = `${rowIndex}`;

    const components = {};
    components['__key'] = this.createComponent(this.keySchema, options, { __key: key });
    components['__key'].on('componentChange', (event) => {
      const dataValue = this.dataValue;
      const newKey = uniqueKey(dataValue, event.value);
      dataValue[newKey] = dataValue[key];
      delete dataValue[key];
      components[this.valueKey].component.key = newKey;
      key = newKey;
    });

    const valueComponent = _.clone(this.component.valueComponent);
    valueComponent.key = key;
    components[this.valueKey] = this.createComponent(valueComponent, this.options, this.dataValue);
    return components;
  }

  get canAddColumn() {
    return false;
  }

  addChildComponent(component) {
    this.component.valueComponent = component;
  }

  saveChildComponent(component) {
    this.component.valueComponent = component;
  }

  removeChildComponent() {
    const defaultSchema = DataMapComponent.schema();
    this.component.valueComponent = defaultSchema.valueComponent;
  }

  addRow() {
    const index = this.rows.length;
    this.rows[index] = this.createRowComponents(this.dataValue, index);
    this.redraw();
    this.triggerChange();
  }

  removeRow(index) {
    const keys = Object.keys(this.dataValue);
    if (keys[index]) {
      delete this.dataValue[keys[index]];
    }
    this.rows.splice(index, 1);
    this.redraw();
    this.triggerChange();
  }

  setValue(value, flags) {
    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    this.createRows();
    this.updateOnChange(flags, changed);
    return changed;
  }

  checkColumns() {
    return { rebuild: false, show: true };
  }
}
