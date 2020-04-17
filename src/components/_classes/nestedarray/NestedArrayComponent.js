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

  getComponent(path, fn) {
    path = Array.isArray(path) ? path : [path];
    const [key, ...remainingPath] = path;
    let result = [];

    if (!_.isString(key)) {
      return result;
    }

    this.everyComponent((component, components) => {
      if (component.component.key === key) {
        let comp = component;
        if (remainingPath.length > 0 && 'getComponent' in component) {
          comp = component.getComponent(remainingPath, fn);
        }
        else if (fn) {
          fn(component, components);
        }

        result = result.concat(comp);
      }
    });

    return result.length > 0 ? result : null;
  }

  getValueAsString(value, options) {
    if (options?.email) {
      let result = (`
        <table border="1" style="width:100%">
          <thead>
            <tr>
      `);

      this.component.components.forEach((component) => {
        const label = component.label || component.key;
        result += `<th style="padding: 5px 10px;">${label}</th>`;
      });

      result += (`
          </tr>
        </thead>
        <tbody>
      `);

      this.iteratableRows.forEach(({ components }) => {
        result += '<tr>';
        _.each(components, (component) => {
          result += '<td style="padding:5px 10px;">';
          if (component.isInputComponent && component.visible && !component.skipInEmail) {
            result += component.getView(component.dataValue, options);
          }
          result += '</td>';
        });
        result += '</tr>';
      });

      result += (`
          </tbody>
        </table>
      `);

      return result;
    }

    return super.getValueAsString(value, options);
  }
}
