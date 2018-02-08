import { BaseComponent } from '../base/Base';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import Choices from 'choices.js';

export class TagsComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'tags',
      label: 'Tags',
      key: 'tags',
      delimeter: ',',
      storeas: 'string',
      maxTags: 0
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Tags',
      icon: 'fa fa-tags',
      group: 'advanced',
      documentation: 'http://help.form.io/userguide/#tags',
      weight: 50,
      schema: TagsComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.component.delimeter = this.component.delimeter || ',';
  }

  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'change';
    return info;
  }

  addInput(input, container) {
    super.addInput(input, container);
    if (!input) {
      return;
    }
    this.choices = new Choices(input, {
      delimiter: (this.component.delimeter || ','),
      editItems: true,
      maxItemCount: this.component.maxTags,
      removeItemButton: true,
    });
    this.choices.itemList.tabIndex = input.tabIndex;
  }

  setValue(value) {
    if (this.choices) {
      this.choices.removeActiveItems();
      this.choices.setValue(value);
    }
  }

  getValue() {
    if (this.choices) {
      let value = this.choices.getValue(true);
      return (this.component.storeas === 'string') ? value.join(this.component.delimeter) : value;
    }
    return null;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (!this.choices) {
      return;
    }
    if (disabled) {
      this.choices.disable();
    }
    else {
      this.choices.enable();
    }
  }

  destroy() {
    super.destroy();
    if (this.choices) {
      this.choices.destroyed = true;
      this.choices.destroy();
      this.choices = null;
    }
  }
}
