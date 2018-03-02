import _ from 'lodash';
import {FormioComponents} from '../Components';

export class ContainerComponent extends FormioComponents {
  static schema(...extend) {
    return FormioComponents.schema({
      type: 'container',
      key: 'container',
      clearOnHide: true,
      input: true,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Container',
      icon: 'fa fa-folder-open',
      group: 'advanced',
      documentation: 'http://help.form.io/userguide/#container',
      weight: 140,
      schema: ContainerComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'container';
  }

  build() {
    this.createElement();
    if (!_.has(this.data, this.component.key)) {
      _.set(this.data, this.component.key, {});
    }
    this.addComponents(this.getContainer(), _.get(this.data, this.component.key));
  }

  get defaultValue() {
    const value = super.defaultValue;
    return typeof value === 'object' ? value : {};
  }

  getValue() {
    if (this.viewOnly) {
      return this.value;
    }
    const value = {};
    _.each(this.components, (component) => {
      value[component.component.key] = component.getValue();
    });
    return value;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value || !_.isObject(value)) {
      return;
    }
    if(this.data && this.data.hasOwnProperty(this.component.key) && _.isEmpty(this.data[this.component.key])) {
      flags.noValidate = true;
    }
    this.data[this.component.key] = value;
    _.each(this.components, (component) => {
      if (component.type === 'components') {
        component.setValue(value, flags);
      }
      else if (value.hasOwnProperty(component.component.key)) {
        component.setValue(value[component.component.key], flags);
      }
      else {
        component.data = value;
        component.setValue(component.defaultValue, flags);
      }
    });
    this.updateValue(flags);
  }
}
