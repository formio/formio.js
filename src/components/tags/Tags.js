import Input from '../_classes/input/Input';
import Choices from 'choices.js';
import _ from 'lodash';

export default class TagsComponent extends Input {
  static schema(...extend) {
    return Input.schema({
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
      icon: 'tags',
      group: 'advanced',
      documentation: 'http://help.form.io/userguide/#tags',
      weight: 50,
      schema: TagsComponent.schema()
    };
  }

  init() {
    super.init();
  }

  get emptyValue() {
    return '';
  }

  get defaultSchema() {
    return TagsComponent.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'change';
    return info;
  }

  get delimiter() {
    return this.component.delimeter || ',';
  }

  attachElement(element, index) {
    super.attachElement(element, index);
    if (!element) {
      return;
    }
    this.choices = new Choices(element, {
      delimiter: this.delimiter,
      editItems: true,
      maxItemCount: this.component.maxTags,
      removeItemButton: true,
      duplicateItems: false,
    });
    this.choices.itemList.tabIndex = element.tabIndex;
  }

  detach() {
    super.detach();
    if (this.choices) {
      this.choices.destroyed = true;
      this.choices.destroy();
      this.choices = null;
    }
  }

  setValue(value) {
    if (this.choices) {
      if (this.component.storeas === 'string' && (typeof value === 'string')) {
        value = value.split(this.delimiter);
      }
      if (value && !_.isArray(value)) {
        value = [value];
      }
      this.choices.removeActiveItems();
      this.choices.setValue(value);
    }
  }

  getValue() {
    if (this.choices) {
      const value = this.choices.getValue(true);
      return (this.component.storeas === 'string') ? value.join(this.delimiter) : value;
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
}
