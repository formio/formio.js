'use strict';

import _ from 'lodash';
import { componentValueTypes, getStringFromComponentPath } from '../../../utils/utils';

import Component from '../component/Component';
import NestedDataComponent from '../nesteddata/NestedDataComponent';

export default class NestedArrayComponent extends NestedDataComponent {
  static schema(...extend) {
    return NestedDataComponent.schema({
      disableAddingRemovingRows: false
    }, ...extend);
  }

  static savedValueTypes() {
    return [componentValueTypes.array];
  }

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

  init() {
    super.init();
    this.prevHasAddButton = this.hasAddButton();
  }

  checkAddButtonChanged() {
    const isAddButton = this.hasAddButton();
    if (isAddButton !== this.prevHasAddButton) {
      this.prevHasAddButton = isAddButton;
      this.redraw();
    }
  }

  checkData(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    this.checkAddButtonChanged();

    return this.processRows('checkData', data, flags, Component.prototype.checkData.call(this, data, flags, row));
  }

  processRows(method, data, opts, defaultValue, silentCheck) {
    return this.iteratableRows.reduce(
      (valid, row, rowIndex) => {
        if (!opts?.rowIndex || opts?.rowIndex === rowIndex) {
          return this.processRow(method, data, opts, row.data, row.components, silentCheck) && valid;
        }
        else {
          return valid;
        }
      },
      defaultValue,
    );
  }

  validate(data, flags = {}) {
    data = data || this.data;
    return this.validateComponents([this.component], data, flags);
  }

  checkRow(...args) {
    console.log('Deprecation Warning: checkRow method has been replaced with processRow');
    return this.processRow.call(this, ...args);
  }

  processRow(method, data, opts, row, components, silentCheck) {
    if (opts?.isolateRow) {
      silentCheck = true;
      opts.noRefresh = true;
    }

    const valid = _.reduce(
      components,
      (valid, component) => component[method](data, opts, row, silentCheck) && valid,
      true,
    );
    if (opts?.noRefresh) {
      delete opts.noRefresh;
    }
    return valid;
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

  getComponent(path, fn, originalPath) {
    originalPath = originalPath || getStringFromComponentPath(path);
    if (this.componentsMap.hasOwnProperty(originalPath)) {
      if (fn) {
        return fn(this.componentsMap[originalPath]);
      }
      else {
        return this.componentsMap[originalPath];
      }
    }
    path = Array.isArray(path) ? path : [path];
    let key = path.shift();
    const remainingPath = path;
    let result = [];
    let possibleComp = null;
    let comp = null;
    let rowIndex = null;

    if (_.isNumber(key)) {
      rowIndex = key;
      key = remainingPath.shift();
    }
    if (!_.isString(key)) {
      return result;
    }

    this.everyComponent((component, components) => {
      if (component.component.key === key) {
        possibleComp = component;
        if (remainingPath.length > 0 && 'getComponent' in component) {
          comp = component.getComponent(remainingPath, fn, originalPath);
        }
        else if (fn) {
          fn(component, components);
        }
        result = rowIndex !== null ? comp : result.concat(comp || possibleComp);
      }
    }, rowIndex);
    if ((!result || result.length === 0) && possibleComp) {
      result = rowIndex !== null ? possibleComp : [possibleComp];
    }
    return result;
  }

  everyComponent(fn, rowIndex, options) {
    if (_.isObject(rowIndex)) {
      options = rowIndex;
      rowIndex = null;
    }

    if (options?.email) {
      return;
    }

    const components = this.getComponents(rowIndex);
    _.each(components, (component, index) => {
      if (fn(component, components, index) === false) {
        return false;
      }

      if (typeof component.everyComponent === 'function') {
        if (component.everyComponent(fn, options) === false) {
          return false;
        }
      }
    });
  }

  getValueAsString(value, options) {
    if (options?.email) {
      let result = (`
        <table border="1" style="width:100%">
          <thead>
            <tr>
      `);

      this.component.components?.forEach((component) => {
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

    if (!value || !value.length) {
      return '';
    }

    return super.getValueAsString(value, options);
  }

  getComponents(rowIndex) {
    if (rowIndex !== undefined && rowIndex !== null) {
      if (!this.iteratableRows[rowIndex]) {
        return [];
      }
      return this.iteratableRows[rowIndex].components;
    }
    return super.getComponents();
  }
}
