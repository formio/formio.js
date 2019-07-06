import BaseComponent from '../base/Base';
import NestedComponent from '../nested/NestedComponent';
import _ from 'lodash';
import { uniqueKey } from '../../utils/utils';

export default class DataMapComponent extends NestedComponent {
  static schema(...extend) {
    return BaseComponent.schema({
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
    this.rows = {};
  }

  get defaultSchema() {
    return DataMapComponent.schema();
  }

  get emptyValue() {
    return {};
  }

  hasAddButton() {
    const maxLength = _.get(this.component, 'validate.maxLength');
    return !this.component.disableAddingRemovingRows &&
    !this.shouldDisable &&
      !this.options.builder &&
      !this.options.preview &&
      (!maxLength || (Object.keys(this.dataValue).length < maxLength));
  }

  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.shouldDisable &&
      !this.options.builder &&
      (Object.keys(this.dataValue).length > _.get(this.component, 'validate.minLength', 0));
  }

  hasChanged(before, after) {
    return !_.isEqual(before, after);
  }

  get componentComponents() {
    return [this.component.valueComponent];
  }

  build(state) {
    if (this.options.builder) {
      return super.build(state, true);
    }
    this.createElement();
    this.createLabel(this.element);
    let tableClass = 'table datagrid-table table-bordered form-group formio-data-map ';
    _.each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    this.tableElement = this.ce('table', {
      class: tableClass
    });
    this.buildRows(state);
    this.element.appendChild(this.tableElement);
    this.createDescription(this.element);
    this.attachLogic();
  }

  addKeyButton() {
    if (!this.hasAddButton()) {
      return null;
    }
    const addButton = this.ce('button', {
      class: 'btn btn-primary formio-button-add-row'
    });
    this.addEventListener(addButton, 'click', (event) => {
      event.preventDefault();
      this.addRow();
    });

    addButton.appendChild(this.ce('i', {
      class: this.iconClass('plus')
    }));
    addButton.appendChild(this.text(' '));
    addButton.appendChild(this.text(this.component.addAnother || 'Add Another'));
    return addButton;
  }

  removeKeyButton(key) {
    const removeButton = this.ce('button', {
      type: 'button',
      class: 'btn btn-default btn-secondary formio-button-remove-row'
    });

    this.addEventListener(removeButton, 'click', (event) => {
      event.preventDefault();
      this.removeRow(key);
    });
    removeButton.appendChild(this.ce('i', {
      class: this.iconClass('remove-circle')
    }));
    return removeButton;
  }

  // Build the header.
  createHeader() {
    const valueHeader = this.ce('th', {
      'class': 'col-9 col-sm-8'
    }, this.text(this.component.valueComponent.label));
    if (this.component.valueComponent.tooltip) {
      this.createTooltip(valueHeader, {
        tooltip: this.t(this.component.valueComponent.tooltip)
      });
    }
    const keyHeader = this.ce('th', {
      'class': 'col-2 col-sm-3'
    }, this.text(this.component.keyLabel || 'Key'));
    this.createTooltip(keyHeader, {
      tooltip: this.t('Enter the map "key" for this value.')
    });
    return this.ce('thead', null, this.ce('tr', {
        class: 'd-flex'
      },
      [
        this.component.keyBeforeValue ? keyHeader : valueHeader,
        this.component.keyBeforeValue ? valueHeader : keyHeader,
        this.hasRemoveButtons() ? this.ce('th', { 'class': 'col-1 col-sm-1' }, null) : null,
      ]
    ));
  }

  buildRows(state) {
    // Do not builder rows when in builder mode.
    if (this.options.builder) {
      return;
    }

    // Destroy all value components before they are recreated.
    this.destroyComponents();
    _.each(this.rows, row => row.value.destroy());
    this.rows = {};
    this.empty(this.tableElement);
    const tableRows = [];
    _.each(this.dataValue, (value, key) => tableRows.push(this.buildRow(value, key, state)));
    this.tableElement.appendChild(this.createHeader());
    this.tableElement.appendChild(this.ce('tbody', null, tableRows));
    this.tableElement.appendChild(this.ce('tfoot', null,
      this.ce('tr', null,
        this.ce('td', { colspan: this.hasRemoveButtons() ? 3 : 2 },
          this.addKeyButton()
        )
      )
    ));
  }

  createValueComponent(state) {
    const container = this.ce('td', {
      class: 'col-9 col-sm-8'
    });
    const schema = this.component.valueComponent;
    schema.hideLabel = true;
    const value = this.addComponent(schema, container, {}, null, null, state);
    value.on('change', () => this.updateValue(), true);
    return { value, container };
  }

  buildRow(value, key, state) {
    if (!this.rows[key]) {
      this.rows[key] = this.createValueComponent(state);
    }
    const row = this.rows[key];

    let lastColumn = null;
    if (this.hasRemoveButtons()) {
      row.remove = this.removeKeyButton(key);
      lastColumn = this.ce('td', { class: 'col-1 col-sm-1' }, row.remove);
    }
    row.element = this.ce('tr', {
      class: 'd-flex',
      id: `${this.component.id}-row-${key}`
    });

    // Create our key input.
    row.keyInput = this.ce('input', {
      type: 'text',
      class: 'form-control',
      id: `${this.component.id}-value-${key}`,
      value: key
    });
    this.addInput(row.keyInput);
    if (this.component.keyBeforeValue) {
      row.element.appendChild(this.ce('td', { class: 'col-2 col-sm-3' }, row.keyInput));
      row.element.appendChild(row.container);
    }
    else {
      row.element.appendChild(row.container);
      row.element.appendChild(this.ce('td', null, row.keyInput));
    }
    row.element.appendChild(lastColumn);

    // Set the value on the value component.
    row.value.setValue(value);
    return row.element;
  }

  addRow() {
    const component = this.createValueComponent();
    const key = uniqueKey(this.dataValue, _.camelCase(component.value.defaultValue) || 'key');
    this.rows[key] = component;
    this.dataValue[key] = component.value.defaultValue;
    this.buildRows();
    this.triggerChange();
  }

  removeRow(key) {
    const value = this.dataValue;
    delete value[key];
    this.dataValue = value;
    this.buildRows();
    this.triggerChange();
  }

  updateValue(flags, value) {
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  setValue(value) {
    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    if (changed) {
      this.buildRows();
    }
    return changed;
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    const value = {};
    _.each(this.rows, row => {
      value[row.keyInput.value] = row.value.getValue();
    });
    return value;
  }
}
