import _ from 'lodash';

import Component from '../_classes/component/Component';
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
    let changed = false;
    const hasValue = this.hasValue();
    if (hasValue && _.isEmpty(this.dataValue)) {
      flags.noValidate = true;
    }
    if (!value || !_.isObject(value) || !hasValue) {
      changed = true;
      this.dataValue = this.defaultValue;
    }
    changed = super.setValue(value, flags) || changed;
    this.updateOnChange(flags, changed);
    return changed;
  }

  checkData(data, flags, row, components) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    components = components || this.getComponents();

    return components.reduce((valid, comp) => {
      return comp.checkData(data, flags, this.dataValue) && valid;
    }, Component.prototype.checkData.call(this, data, flags, row));
  }
}
