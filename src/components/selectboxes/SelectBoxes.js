import _ from 'lodash';
import RadioComponent from '../radio/Radio';

export default class SelectBoxesComponent extends RadioComponent {
  static schema(...extend) {
    return RadioComponent.schema({
      type: 'selectboxes',
      label: 'Select Boxes',
      key: 'selectBoxes',
      inline: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Select Boxes',
      group: 'basic',
      icon: 'plus-square',
      weight: 60,
      documentation: '/userguide/#selectboxes',
      schema: SelectBoxesComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    this.validators = this.validators.concat('minSelectedCount', 'maxSelectedCount');
  }

  init() {
    super.init();
    this.component.inputType = 'checkbox';
  }

  get defaultSchema() {
    return SelectBoxesComponent.schema();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.attr.name += '[]';
    info.attr.type = 'checkbox';
    info.attr.class = 'form-check-input';
    return info;
  }

  get emptyValue() {
    return this.component.values.reduce((prev, value) => {
      if (value.value) {
        prev[value.value] = false;
      }
      return prev;
    }, {});
  }

  get defaultValue() {
    let defaultValue = this.emptyValue;

    if (!_.isEmpty(this.component.defaultValue)) {
      defaultValue = this.component.defaultValue;
    }
    if (this.component.customDefaultValue && !this.options.preview) {
      defaultValue = this.evaluate(
        this.component.customDefaultValue,
        { value: '' },
        'value'
      );
    }

    return defaultValue;
  }

  /**
   * Only empty if the values are all false.
   *
   * @param value
   * @return {boolean}
   */
  isEmpty(value = this.dataValue) {
    let empty = true;
    for (const key in value) {
      if (value.hasOwnProperty(key) && value[key]) {
        empty = false;
        break;
      }
    }

    return empty;
  }

  getValue() {
    if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
      return this.dataValue;
    }
    const value = {};
    _.each(this.refs.input, (input) => {
      value[input.value] = !!input.checked;
    });
    return value;
  }

  /**
   * Normalize values coming into updateValue.
   *
   * @param value
   * @return {*}
   */
  normalizeValue(value) {
    value = value || {};
    if (typeof value !== 'object') {
      if (typeof value === 'string') {
        value = {
          [value]: true
        };
      }
      else {
        value = {};
      }
    }
    if (Array.isArray(value)) {
      _.each(value, (val) => {
        value[val] = true;
      });
    }

    return value;
  }

  /**
   * Set the value of this component.
   *
   * @param value
   * @param flags
   */
  setValue(value, flags = {}) {
    const changed = this.updateValue(value, flags);
    value = this.dataValue;
    _.each(this.refs.input, (input) => {
      if (_.isUndefined(value[input.value])) {
        value[input.value] = false;
      }
      input.checked = !!value[input.value];
    });
    return changed;
  }

  getValueAsString(value) {
    if (!value) {
      return '';
    }
    return _(this.component.values || [])
      .filter((v) => value[v.value])
      .map('label')
      .join(', ');
  }

  setSelectedClasses() {
    if (this.refs.wrapper) {
      //add/remove selected option class
      const value = this.dataValue;
      const valuesKeys = Object.keys(value);

      this.refs.wrapper.forEach((wrapper, index) => {
        let key = valuesKeys[index];
        const input = this.refs.input[index];
        if (input?.value.toString() !== key) {
          key = valuesKeys.find((k) => input?.value.toString() === k);
        }
        const isChecked = value[key];
        if (isChecked && key) {
          //add class to container when selected
          this.addClass(wrapper, this.optionSelectedClass);
          //change "checked" attribute
          input.setAttribute('checked', 'true');
        }
        else if (!isChecked && key) {
          this.removeClass(wrapper, this.optionSelectedClass);
          input.removeAttribute('checked');
        }
      });
    }
  }

  setInputsDisabled(value, onlyUnchecked) {
    if (this.refs.input) {
      this.refs.input.forEach(item => {
        if (onlyUnchecked && !item.checked || !onlyUnchecked) {
          item.disabled = value;
        }
      });
    }
  }

  checkComponentValidity(data, dirty, rowData, options) {
    // check if we need to skip validation before calling isValid
    if (this.shouldSkipValidation(data, dirty, rowData)) {
      this.setCustomValidity('');
      return true;
    }

    const minCount = this.component.validate.minSelectedCount;
    const maxCount = this.component.validate.maxSelectedCount;
    const isValid = this.isValid(data, dirty);

    if (maxCount || minCount) {
      const count = Object.keys(this.validationValue).reduce((total, key) => {
        if (this.validationValue[key]) {
          total++;
        }
        return total;
      }, 0);

      // Disable the rest of inputs if the max amount is already checked
      if (maxCount && count >= maxCount) {
        this.setInputsDisabled(true, true);
      }
      else if (maxCount && !this.shouldDisabled) {
        this.setInputsDisabled(false);
      }

      if (!isValid && maxCount && count > maxCount) {
        const message = this.t(
          this.component.maxSelectedCountMessage || 'You can only select up to {{maxCount}} items.',
          { maxCount }
        );
        this.setCustomValidity(message, dirty);
        return false;
      }
      else if (!isValid && minCount && count < minCount) {
        this.setInputsDisabled(false);
        const message = this.t(
          this.component.minSelectedCountMessage || 'You must select at least {{minCount}} items.',
          { minCount }
        );
        this.setCustomValidity(message, dirty);
        return false;
      }
    }

    return super.checkComponentValidity(data, dirty, rowData, options);
  }
}
