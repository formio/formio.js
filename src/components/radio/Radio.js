import _ from 'lodash';
import Field from '../_classes/field/Field';
import { boolValue } from '../../utils/utils';

export default class RadioComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'radio',
      inputType: 'radio',
      label: 'Radio',
      key: 'radio',
      values: [{ label: '', value: '' }],
      fieldSet: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Radio',
      group: 'basic',
      icon: 'dot-circle-o',
      weight: 80,
      documentation: '/userguide/#radio',
      schema: RadioComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.previousValue = this.dataValue || null;
  }

  get defaultSchema() {
    return RadioComponent.schema();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.class = 'form-check-input';
    info.attr.name = info.attr.name += `[${this.id}]`;
    return info;
  }

  get emptyValue() {
    return '';
  }

  get isRadio() {
    return this.component.inputType === 'radio';
  }

  init() {
    super.init();
    this.validators = this.validators.concat(['select', 'onlyAvailableItems']);
  }

  updateSelected() {
    switch (this.inputInfo.attr.type) {
      case 'checkbox' :
        this.component.values.forEach(item => {
          item.selected = this.dataValue[item.value];
        });
        break;
      case 'radio' :
        this.component.values.forEach(item => {
          item.selected = item.value === this.dataValue;
        });
        break;
    }

    if (this.refs.wrapper) {
      const value = this.dataValue;
      const optionSelectedClass = 'radio-selected';

      this.refs.wrapper.forEach((wrapper, index) => {
        const input = this.refs.input[index];
        switch (input.type) {
          case 'radio' :
            if (input && input.value.toString() === value.toString()) {
              //add class to container when selected
              this.addClass(wrapper, optionSelectedClass);
            }
            else {
              this.removeClass(wrapper, optionSelectedClass);
            }
            break;
          case 'checkbox' :
            // eslint-disable-next-line no-case-declarations
            const checked = value[input.value];
            if (checked) {
              this.addClass(wrapper, optionSelectedClass);
            }
            else {
              this.removeClass(wrapper, optionSelectedClass);
            }
            break;
        }
      });
    }
  }

  onChange(flags, fromRoot) {
    this.updateSelected();
    return super.onChange(flags, fromRoot);
  }

  render() {
    const data = {
      input: this.inputInfo,
      inline: this.component.inline,
      values: this.component.values,
      value: this.dataValue,
      row: this.row,
    };
    this.updateSelected();
    return super.render(this.renderTemplate('radio', data));
  }

  attach(element) {
    this.loadRefs(element, { input: 'multiple', wrapper: 'multiple' });
    this.refs.input.forEach((input, index) => {
      this.addEventListener(input, this.inputInfo.changeEvent, () => this.updateValue(null, {
        modified: true,
      }));
      this.addShortcut(input, this.component.values[index].shortcut);

      if (this.isRadio) {
        let dataValue = this.dataValue;

        if (!_.isString(this.dataValue)) {
          dataValue = _.toString(this.dataValue);
        }

        input.checked = (dataValue === input.value);
        this.addEventListener(input, 'keyup', (event) => {
          if (event.key === ' ' && dataValue === input.value) {
            event.preventDefault();

            this.updateValue(null, {
              modified: true,
            });
          }
        });
      }
    });
    this.updateSelected();
    return super.attach(element);
  }

  detach(element) {
    if (element && this.refs.input) {
      this.refs.input.forEach((input, index) => {
        this.removeShortcut(input, this.component.values[index].shortcut);
      });
    }
    super.detach();
  }

  getValue() {
    if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
      return this.dataValue;
    }
    let value = this.dataValue;
    this.refs.input.forEach((input) => {
      if (input.checked) {
        value = input.value;
      }
    });
    return value;
  }

  validateValueAvailability(setting, value) {
    if (!boolValue(setting) || !value) {
      return true;
    }
    const values = this.component.values;
    if (values) {
      return values.findIndex(({ value: optionValue }) => this.normalizeValue(optionValue) === value) !== -1;
    }
    return false;
  }

  getValueAsString(value) {
    if (!value) {
      return '';
    }
    if (!_.isString(value)) {
      value = _.toString(value);
    }

    const option = _.find(this.component.values, (v) => v.value === value);

    return _.get(option, 'label', '');
  }

  setValueAt(index, value) {
    if (this.refs.input && this.refs.input[index] && value !== null && value !== undefined) {
      const inputValue = this.refs.input[index].value;
      this.refs.input[index].checked = (inputValue === value.toString());
    }
  }

  updateValue(value, flags) {
    const changed = super.updateValue(value, flags);
    if (!flags || !flags.modified || !this.isRadio) {
      return changed;
    }
   // If they clicked on the radio that is currently selected, it needs to reset the value.
    this.currentValue = this.dataValue;
    const shouldResetValue = !(flags && flags.noUpdateEvent)
      && this.previousValue === this.currentValue;
    if (shouldResetValue) {
      this.resetValue();
      this.triggerChange(flags);
    }
    this.previousValue = this.dataValue;
    this.updateSelected();
    return changed;
  }

  /**
   * Normalize values coming into updateValue.
   *
   * @param value
   * @return {*}
   */
  normalizeValue(value) {
    const dataType = this.component.dataType || 'auto';

    if (value === this.emptyValue) {
      return value;
    }

    switch (dataType) {
      case 'auto':
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          value = +value;
        }
        if (value === 'true') {
          value = true;
        }
        if (value === 'false') {
          value = false;
        }
        break;
      case 'number':
        value = +value;
        break;
      case 'string':
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        else {
          value = value.toString();
        }
        break;
      case 'boolean':
        value = !(!value || value.toString() === 'false');
        break;
    }
    return super.normalizeValue(value);
  }
}
