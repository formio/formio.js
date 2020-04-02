'use strict';

import _ from 'lodash';

import Component from '../component/Component';
import NestedDataComponent from '../nesteddata/NestedDataComponent';

export default class NestedArrayComponent extends NestedDataComponent {
  componentContext(component) {
    return this.iteratableRows[component.rowIndex].data;
  }

  get iteratableRows() {
    throw new Error('Getter #iteratableRows() is not implemented');
  }

  get rowIndex() {
    return super.rowIndex;
  }

  set rowIndex(value) {
    this._rowIndex = value;
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

  hasAddButton() {
    const maxLength = _.get(this.component, 'validate.maxLength');
    const conditionalAddButton = _.get(this.component, 'conditionalAddButton');

    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      !this.options.preview &&
      (!maxLength || (this.iteratableRows.length < maxLength)) &&
      (!conditionalAddButton || this.evaluate(conditionalAddButton, {
        value: this.dataValue,
      }, 'show'));
  }
}
