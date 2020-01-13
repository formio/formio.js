import Input from '../_classes/input/Input';
import Choices from 'choices.js/public/assets/scripts/choices.js';

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
      weight: 30,
      schema: TagsComponent.schema()
    };
  }

  init() {
    super.init();
  }

  get emptyValue() {
    return (this.component.storeas === 'string') ? '' : [];
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
    element.setAttribute('dir', this.i18next.dir());
    this.choices = new Choices(element, {
      delimiter: this.delimiter,
      editItems: true,
      maxItemCount: this.component.maxTags,
      removeItemButton: true,
      duplicateItemsAllowed: false,
    });
    this.choices.itemList.element.tabIndex = element.tabIndex;
    this.addEventListener(this.choices.input.element, 'blur', () => {
      const value = this.choices.input.value;
      if (value) {
        this.choices.setValue([value]);
        this.choices.clearInput();
        this.choices.hideDropdown(true);
      }
    });
  }

  detach() {
    super.detach();
    if (this.choices) {
      this.choices.destroyed = true;
      this.choices.destroy();
      this.choices = null;
    }
  }

  normalizeValue(value) {
    if (this.component.storeas === 'string' && Array.isArray(value)) {
      return value.join(this.delimiter);
    }
    else if (this.component.storeas === 'array' && typeof value === 'string') {
      return value.split(this.delimiter).filter(result => result);
    }
    return value;
  }

  setValue(value) {
    const changed = super.setValue(value);
    if (this.choices) {
      let dataValue = this.dataValue;
      this.choices.removeActiveItems();
      if (dataValue) {
        if (typeof dataValue === 'string') {
          dataValue = dataValue.split(this.delimiter).filter(result => result);
        }
        this.choices.setValue(Array.isArray(dataValue) ? dataValue : [dataValue]);
      }
    }
    return changed;
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

  get disabled() {
    return super.disabled;
  }

  focus() {
    if (this.refs.input && this.refs.input.length) {
      this.refs.input[0].parentNode.lastChild.focus();
    }
  }
}
