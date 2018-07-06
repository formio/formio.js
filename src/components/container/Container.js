import _ from 'lodash';

import {FormioComponents} from '../Components';

export class ContainerComponent extends FormioComponents {
  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'container';
  }

  build() {
    this.element = this.ce('div', {
      class: `formio-container-component ${this.component.customClass}`
    });
    if (!this.hasValue) {
      this.dataValue = {};
    }
    this.addComponents(this.element, this.dataValue);
  }

  get emptyValue() {
    return {};
  }

  getValue() {
    if (this.viewOnly) {
      return this.dataValue;
    }
    const value = {};
    _.each(this.components, (component) => _.set(value, component.component.key, component.getValue()));
    return value;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value || !_.isObject(value)) {
      return;
    }
    if (this.hasValue && _.isEmpty(this.dataValue)) {
      flags.noValidate = true;
    }
    this.dataValue = value;
    _.each(this.components, (component) => {
      if (component.type === 'components') {
        component.setValue(value, flags);
      }
      else if (_.has(value, component.component.key)) {
        component.setValue(_.get(value, component.component.key), flags);
      }
      else {
        component.data = value;
        component.setValue(component.defaultValue, flags);
      }
    });
    this.updateValue(flags);
  }
}
