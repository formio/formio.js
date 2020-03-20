import _ from 'lodash';
import NestedDataComponent from '../_classes/nesteddata/NestedDataComponent';

export default class ContainerComponent extends NestedDataComponent {
  static schema(...extend) {
    return NestedDataComponent.schema({
      label: 'Container',
      type: 'container',
      key: 'container',
      clearOnHide: true,
      input: true,
      tree: true,
      hideLabel: true,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Container',
      icon: 'folder-open',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#container',
      weight: 10,
      schema: ContainerComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    this.type = 'container';
  }

  addComponents(data, options) {
    return super.addComponents(this.dataValue, options);
  }

  get defaultSchema() {
    return ContainerComponent.schema();
  }

  get emptyValue() {
    return {};
  }

  get templateName() {
    return 'container';
  }

  componentContext() {
    return this.dataValue;
  }

  setValue(value, flags = {}) {
    const hasValue = this.hasValue();
    if (hasValue && _.isEmpty(this.dataValue)) {
      flags.noValidate = true;
    }
    if (!value || !_.isObject(value) || !hasValue) {
      flags.valueChanged = true;
      this.dataValue = this.defaultValue;
    }
    else {
      flags.valueChanged = flags.valueChanged || this.hasChanged(value, this.dataValue);
      this.dataValue = value;
    }
    super.setValue(value, flags);
    this.updateOnChange(flags);
    return flags.valueChanged;
  }
}
