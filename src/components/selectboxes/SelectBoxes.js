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
  isEmpty(value) {
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
    if (this.viewOnly) {
      return this.dataValue;
    }
    if (!this.refs.input) {
      return this.dataValue;
    }
    const value = {};
    _.each(this.refs.input, (input) => {
      value[input.value] = !!input.checked;
    });
    return value;
  }

  /**
   * Set the value of this component.
   *
   * @param value
   * @param flags
   */
  setValue(value, flags) {
    value = value || {};
    flags = this.getFlags.apply(this, arguments);
    if (Array.isArray(value)) {
      _.each(value, (val) => {
        value[val] = true;
      });
    }

    _.each(this.refs.input, (input) => {
      if (_.isUndefined(value[input.value])) {
        value[input.value] = false;
      }
      input.checked = !!value[input.value];
    });

    this.updateValue(flags);
  }

  getView(value) {
    if (!value) {
      return '';
    }
    return _(this.component.values || [])
      .filter((v) => value[v.value])
      .map('label')
      .join(', ');
  }
}
