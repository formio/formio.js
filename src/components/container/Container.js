import _ from 'lodash';
import NestedComponent from '../nested/NestedComponent';
import BaseComponent from '../base/Base';

export default class ContainerComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'container',
      key: 'container',
      clearOnHide: true,
      input: true,
      tree: true,
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

  build(state) {
    this.createElement();
    const labelAtTheBottom = this.component.labelPosition === 'bottom';
    if (!labelAtTheBottom) {
      this.createLabel(this.element);
    }
    if (!this.hasValue()) {
      this.dataValue = {};
    }
    this.addComponents(this.getContainer(), this.dataValue, null, state);
    if (labelAtTheBottom) {
      this.createLabel(this.element);
    }
    this.attachLogic();
  }

  get emptyValue() {
    return {};
  }

  hasChanged(before, after) {
    return !_.isEqual(before, after);
  }

  getValue() {
    return this.dataValue;
  }

  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value || !_.isObject(value)) {
      return;
    }
    const hasValue = this.hasValue();
    if (hasValue && _.isEmpty(this.dataValue)) {
      flags.noValidate = true;
    }
    if (!hasValue) {
      // Set the data value and then reset each component to use the new data object.
      this.dataValue = {};
      this.getComponents().forEach(component => (component.data = this.dataValue));
    }
    return super.setValue(value, flags);
  }
}
