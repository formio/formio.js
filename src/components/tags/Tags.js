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
      icon: 'fa fa-tags',
      group: 'advanced',
      documentation: 'http://help.form.io/userguide/#tags',
      weight: 50,
      schema: TagsComponent.schema()
    };
  }

  init() {
    super.init();
    this.component.delimeter = this.component.delimeter || ',';
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

  hydrateElement(element, index) {
    if (!this.refs.input[index]) {
      return;
    }
    this.choices = new Choices(this.refs.input[index], {
      delimiter: (this.component.delimeter || ','),
      editItems: true,
      maxItemCount: this.component.maxTags,
      removeItemButton: true,
    });
    this.choices.itemList.tabIndex = this.refs.input[index].tabIndex;
  }

  setValue(value) {
    if (this.choices) {
      if (this.component.storeas === 'string' && (typeof value === 'string')) {
        value = value.split(',');
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
