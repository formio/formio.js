import _ from 'lodash';
import NestedComponent from '../NestedComponent';

export default class ContainerComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
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
      group: 'data',
      documentation: 'http://help.form.io/userguide/#container',
      weight: 10,
      schema: ContainerComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'container';
  }

  get defaultSchema() {
    return ContainerComponent.schema();
  }

  build() {
    this.createElement();
    if (!this.hasValue) {
      this.dataValue = {};
    }
    this.addComponents(this.getContainer(), this.dataValue);
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
