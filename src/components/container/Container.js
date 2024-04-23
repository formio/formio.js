import _ from 'lodash';
import { componentValueTypes, getComponentSavedTypes, getFocusableElements } from '../../utils/utils';

import Component from '../_classes/component/Component';
import Field from '../_classes/field/Field';
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
      documentation: '/userguide/form-building/data-components#container',
      showPreview: false,
      weight: 10,
      schema: ContainerComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    this.type = 'container';
  }

  static savedValueTypes(schema) {
    return  getComponentSavedTypes(schema) || [componentValueTypes.object];
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

  checkData(data, flags, row, components) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    components = components && _.isArray(components) ? components : this.getComponents();

    Component.prototype.checkData.call(this, data, flags, row);
    components.forEach((comp) => comp.checkData(data, flags, this.dataValue));
  }

  focus() {
    const focusableElements = getFocusableElements(this.element);
      if (focusableElements && focusableElements[0]) {
        focusableElements[0].focus();
      }
  }

  checkConditions(data, flags, row) {
    // check conditions of parent component first, because it may influence on visibility of it's children
    const check = Field.prototype.checkConditions.call(this, data, flags, row);
    this.getComponents().forEach(comp => comp.checkConditions(data, flags, this.dataValue));
    return check;
  }
}
