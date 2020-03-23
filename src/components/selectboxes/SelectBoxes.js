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
      documentation: 'http://help.form.io/userguide/#selectboxes',
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
      prev[value.value] = false;
      return prev;
    }, {});
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

  checkComponentValidity(data, dirty, rowData) {
    const minCount = this.component.validate.minSelectedCount;
    const maxCount = this.component.validate.maxSelectedCount;

    if ((maxCount || minCount) && !this.isValid(data, dirty)) {
      const count = Object.keys(this.validationValue).reduce((total, key) => {
        if (this.validationValue[key]) {
          total++;
        }
        return total;
      }, 0);

      if (maxCount && count >= maxCount) {
        if (this.refs.input) {
          this.refs.input.forEach(item => {
            if (!item.checked) {
              item.disabled = true;
            }
          });
        }
        if (maxCount && count > maxCount) {
          const message = this.component.maxSelectedCountMessage
            ? this.component.maxSelectedCountMessage
            : `You can only select up to ${maxCount} items.`;
          this.setCustomValidity(message, dirty);
          return false;
        }
      }
      else if (minCount && count < minCount) {
        if (this.refs.input) {
          this.refs.input.forEach(item => {
            item.disabled = false;
          });
        }
        const message = this.component.minSelectedCountMessage
          ? this.component.minSelectedCountMessage
          : `You must select at least ${minCount} items.`;
        this.setCustomValidity(message, dirty);
        return false;
      }
      else {
        if (this.refs.input) {
          this.refs.input.forEach(item => {
            item.disabled = false;
          });
        }
      }
    }

    return super.checkComponentValidity(data, dirty, rowData);
  }
}
