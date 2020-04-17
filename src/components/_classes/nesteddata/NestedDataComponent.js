'use strict';
import Component from '../component/Component';
import NestedComponent from '../nested/NestedComponent';
import _ from 'lodash';

export default class NestedDataComponent extends NestedComponent {
  hasChanged(newValue, oldValue) {
    // If we do not have a value and are getting set to anything other than undefined or null, then we changed.
    if (
      newValue !== undefined &&
      newValue !== null &&
      !this.hasValue()
    ) {
      return true;
    }
    return !_.isEqual(newValue, oldValue);
  }

  get allowData() {
    return true;
  }

  getValueAsString(value, options) {
    if (options?.email) {
      let result = (`
        <table border="1" style="width:100%">
          <tbody>
      `);

      this.everyComponent((component) => {
        if (component.isInputComponent && component.visible && !component.skipInEmail) {
          result += (`
            <tr>
              <th style="padding: 5px 10px;">${component.label}</th>
              <td style="width:100%;padding:5px 10px;">${component.getView(component.dataValue, options)}</td>
            </tr>
          `);
        }
      }, options);

      result += (`
          </tbody>
        </table>
      `);

      return result;
    }

    return '[Complex Data]';
  }

  everyComponent(fn, options) {
    if (options?.email) {
      return;
    }

    return super.everyComponent(fn);
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    return this.dataValue;
  }

  updateValue(value, flags = {}) {
    // Intentionally skip over nested component updateValue method to keep
    // recursive update from occurring with sub components.
    return Component.prototype.updateValue.call(this, value, flags);
  }
}
