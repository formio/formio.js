'use strict';

import _ from 'lodash';

import Component from '../component/Component';
import NestedDataComponent from '../nesteddata/NestedDataComponent';

export default class NestedArrayComponent extends NestedDataComponent {
  componentContext(component) {
    let dataValue = this.dataValue;
    if (!dataValue[component.rowIndex]) {
      this.dataValue[component.rowIndex] = dataValue = this.emptyValue;
    }
    return dataValue[component.rowIndex];
  }

  get iteratableRows() {
    throw new Error('Getter #iteratableRows() is not implemented');
  }

  checkData(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;

    return this.checkRows('checkData', data, flags, Component.prototype.checkData.call(this, data, flags, row));
  }

  checkRows(method, data, opts, defaultValue) {
    return this.iteratableRows.reduce(
      (valid, row) => this.checkRow(method, data, opts, row.data, row.components) && valid,
      defaultValue,
    );
  }

  checkRow(method, data, opts, row, components) {
    return _.reduce(
      components,
      (valid, component) => component[method](data, opts, row) && valid,
      true,
    );
  }
}
