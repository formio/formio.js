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

  getValueAsString() {
    return '[Complex Data]';
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
