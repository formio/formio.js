import { componentValueTypes, getComponentSavedTypes } from '../../utils/utils';
import Input from '../_classes/input/Input';

let Choices;
if (typeof window !== 'undefined') {
  Choices = require('@formio/choices.js');
}

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
      documentation: '/userguide/form-building/advanced-components#tags',
      weight: 30,
      schema: TagsComponent.schema()
    };
  }

  static get serverConditionSettings() {
    return TagsComponent.conditionOperatorsSettings;
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      operators: [...super.conditionOperatorsSettings.operators, 'includes', 'notIncludes'],
    };
  }

  static savedValueTypes(schema) {
    schema = schema || {};

    return  getComponentSavedTypes(schema) ||[componentValueTypes[schema.storeas] || componentValueTypes.string];
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
    if (this.choices) {
      this.choices.destroy();
    }

    if (!Choices) {
      return;
    }

    const hasPlaceholder = !!this.component.placeholder;

    this.choices = new Choices(element, {
      delimiter: this.delimiter,
      editItems: true,
      allowHTML: true,
      maxItemCount: this.component.maxTags,
      removeItemButton: true,
      duplicateItemsAllowed: false,
      shadowRoot: this.root ? this.root.shadowRoot : null,
      placeholder: hasPlaceholder,
      placeholderValue: hasPlaceholder ? this.t(this.component.placeholder, { _userInput: true }) : null,
    });
    this.choices.itemList.element.tabIndex = element.tabIndex;
    this.addEventListener(this.choices.input.element, 'blur', () => {
      const value = this.choices.input.value;
      const maxTagsNumber = this.component.maxTags;
      const valuesCount = this.choices.getValue(true).length;
      const isRepeatedValue = this.choices.getValue(true).some(existingValue => existingValue.trim() === value.trim());

      if (value) {
        if (maxTagsNumber && valuesCount === maxTagsNumber) {
          this.choices.addItems = false;
          this.choices.clearInput();
        }
        else if (isRepeatedValue) {
          this.choices.clearInput();
        }
        else {
          this.choices.setValue([value]);
          this.choices.clearInput();
          this.choices.hideDropdown(true);
          this.updateValue(null, {
            modified: true
          });
        }
      }
    });
  }

  detach() {
    super.detach();
    if (this.choices) {
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

  setValue(value, flags = {}) {
    const changed = super.setValue(value, flags);
    if (this.choices) {
      let dataValue = this.dataValue;
      this.choices.removeActiveItems();
      if (dataValue) {
        if (typeof dataValue === 'string') {
          dataValue = dataValue.split(this.delimiter).filter(result => result);
        }
        const value = Array.isArray(dataValue) ? dataValue : [dataValue];
        this.choices.setValue(value.map((val) => this.sanitize(val, this.shouldSanitizeValue)));
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

  getValueAsString(value) {
    if (!value) {
      return '';
    }

    if (Array.isArray(value)) {
      return value.join(`${this.delimiter || ','} `);
    }

    const stringValue = value.toString();
    return this.sanitize(stringValue, this.shouldSanitizeValue);
  }
}
