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
    this.rowKeys = [];
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
      key: 'key',
    };
  }

  get valueKey() {
    return this.component.valueComponent.key;
  }

  getRowValues() {
    let dataValue = this.dataValue;
    let keys = Object.keys(dataValue);
    if (this.builderMode && !keys.length) {
      dataValue = { key: '' };
      keys = Object.keys(dataValue);
    }
    return keys.map((key) => {
      return {
        key,
        [this.valueKey]: dataValue[key]
      };
    });
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

  createRowComponents(row, rowIndex) {
    // Store existing key name so we know what it is if it changes.
    this.rowKeys[rowIndex] = row.key;

    // Create a new event emitter since fields are isolated.
    const options = _.clone(this.options);
    options.events = new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
    options.name += `[${rowIndex}]`;
    options.row = `${rowIndex}`;

    const components = {};
    components.key = this.createComponent(this.keySchema, options, { key: row.key });
    components.key.on('componentChange', (event) => {
      const newKey = uniqueKey(this.dataValue, event.value);
      this.dataValue[newKey] = this.dataValue[row.key];
      delete this.dataValue[row.key];
      row.key = newKey;
      this.rowKeys[rowIndex] = newKey;
      this.triggerChange();
    });

    const valueComponent = _.clone(this.component.valueComponent);
    valueComponent.key = row.key;
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
    const newKey = uniqueKey(this.dataValue, 'key');
    const index = this.rows.length;
    this.rows[index] = this.createRowComponents({ key: newKey }, index);
    this.redraw();
    this.triggerChange();
  }

  removeRow(index) {
    delete this.dataValue[this.rowKeys[index]];
    this.rowKeys.splice(index, 1);
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
