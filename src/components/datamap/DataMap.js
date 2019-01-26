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
      label: 'Key',
      key: 'key',
    };
  }

  get valueKey() {
    return this.component.valueComponent.key;
  }

  createRows() {
    const keys = Object.keys(this.dataValue);

    keys.forEach((key, index) => {
      if (!this.rows[index]) {
        const row = {
          key,
          [this.valueKey]: this.dataValue[key]
        };
        this.rows[index] = this.createRowComponents(row, index);
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
    return this.component.keyBeforeValue ?
      [keySchema, valueSchema] :
      [valueSchema, keySchema];
  }

  createRowComponents(row, rowIndex) {
    // Store existing key name so we know what it is if it changes.
    let key = row['key'];
    this.rowKeys[rowIndex] = key;

    // Create a new event emitter since fields are isolated.
    const options = _.clone(this.options);
    options.events = new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
    options.name += `[${rowIndex}]`;
    options.row = `${rowIndex}`;

    const components = {};

    components['key'] = this.createComponent(this.keySchema, options, row);
    components[this.valueKey] = this.createComponent(this.component.valueComponent, options, row);

    // Handle change event
    options.events.on('formio.componentChange', (event) => {
      if (event.component.key === 'key') {
        const newKey = uniqueKey(this.dataValue, event.value);
        this.dataValue[newKey] = this.dataValue[key];
        delete this.dataValue[key];
        key = newKey;
        this.rowKeys[rowIndex] = newKey;
        this.triggerChange();
      }
      else if (event.component.key === this.valueKey) {
        this.dataValue[key] = event.value;
        this.triggerChange();
      }
    });

    return components;
  }

  addRow() {
    const newKey = uniqueKey(this.dataValue, 'key');
    this.dataValue[newKey] = 'Value';
    const index = this.rows.length;
    this.rows[index] = this.createRowComponents({ key: newKey, [this.valueKey]: this.dataValue[newKey] }, index);
    this.rowKeys[index] = newKey;
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
