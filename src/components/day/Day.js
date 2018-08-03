import _ from 'lodash';
import moment from 'moment';
import Field from '../_classes/field/Field';
import { boolValue, getLocaleDateFormatInfo } from '../../utils/utils';

export default class DayComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'day',
      label: 'Day',
      key: 'day',
      fields: {
        day: {
          type: 'number',
          placeholder: '',
          required: false
        },
        month: {
          type: 'select',
          placeholder: '',
          required: false
        },
        year: {
          type: 'number',
          placeholder: '',
          required: false
        }
      },
      dayFirst: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Day',
      group: 'advanced',
      icon: 'calendar',
      documentation: 'http://help.form.io/userguide/#day',
      weight: 50,
      schema: DayComponent.schema()
    };
  }

  get dayRequired() {
    return this.showDay && _.get(this.component, 'fields.day.required', false);
  }

  get showDay() {
    return !_.get(this.component, 'fields.day.hide', false);
  }

  get monthRequired() {
    return this.showMonth && _.get(this.component, 'fields.month.required', false);
  }

  get showMonth() {
    return !_.get(this.component, 'fields.month.hide', false);
  }

  get yearRequired() {
    return this.showYear && _.get(this.component, 'fields.year.required', false);
  }

  get showYear() {
    return !_.get(this.component, 'fields.year.hide', false);
  }

  get defaultSchema() {
    return DayComponent.schema();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  inputDefinition(name) {
    let min, max;
    if (name === 'day') {
      min = 1;
      max = 31;
    }
    if (name === 'month') {
      min = 1;
      max = 12;
    }
    if (name === 'year') {
      min = 1;
      max = undefined;
    }
    return {
      type: 'input',
      ref: name,
      attr: {
        id: `${this.component.key}-${name}`,
        class: 'form-control',
        type: this.component.fields[name].type === 'select' ? 'select' : 'number',
        placeholder: this.component.fields[name].placeholder,
        step: 1,
        min,
        max,
      }
    };
  }

  selectDefinition(name) {
    return {
      multiple: false,
      ref: name,
      widget: 'html5',
      attr: {
        class: 'form-control',
        name,
        lang: this.options.language
      }
    };
  }

  get days() {
    if (this._days) {
      return this._days;
    }
    this._days = [
      { value: 0, label: _.get(this.component, 'fields.day.placeholder', '') }
    ];
    for (let x = 1; x <= 31; x++) {
      this._days.push({
        value: x,
        label: x.toString()
      });
    }
    return this._days;
  }

  get months() {
    if (this._months) {
      return this._months;
    }
    this._months = [
      { value: 0, label: _.get(this.component, 'fields.month.placeholder') || (this.hideInputLabels ? this.t('Month') : '') },
      { value: 1, label: this.t('january') },
      { value: 2, label: this.t('february') },
      { value: 3, label: this.t('march') },
      { value: 4, label: this.t('april') },
      { value: 5, label: this.t('may') },
      { value: 6, label: this.t('june') },
      { value: 7, label: this.t('july') },
      { value: 8, label: this.t('august') },
      { value: 9, label: this.t('september') },
      { value: 10, label: this.t('october') },
      { value: 11, label: this.t('november') },
      { value: 12, label: this.t('december') }
    ];
    return this._months;
  }

  get years() {
    if (this._years) {
      return this._years;
    }
    this._years = [
      { value: 0, label: _.get(this.component, 'fields.year.placeholder', '') }
    ];
    for (let x = 1900; x <= 2030; x++) {
      this._years.push({
        value: x,
        label: x.toString()
      });
    }
    return this._years;
  }

  init() {
    super.init();
    this.validators.push('date');
    const dateFormatInfo = getLocaleDateFormatInfo(this.options.language);
    this.dayFirst = this.component.useLocaleSettings
      ? dateFormatInfo.dayFirst
      : this.component.dayFirst;
  }

  render() {
    return super.render(this.renderTemplate('day', {
      dayFirst: this.dayFirst,
      showDay: this.showDay,
      showMonth: this.showMonth,
      showYear: this.showYear,
      day: this.renderField('day'),
      month: this.renderField('month'),
      year: this.renderField('year'),
    }));
  }

  renderField(name) {
    if (this.component.fields[name].type === 'select') {
      return this.renderTemplate('select', {
        input: this.selectDefinition(name),
        options: this[`${name}s`].reduce((html, option) =>
          html + this.renderTemplate('selectOption', {
            option,
            selected: false, attrs: {}
          }), ''
        ),
      });
    }
    else {
      return this.renderTemplate('input', {
        input: this.inputDefinition(name)
      });
    }
  }

  attach(element) {
    this.loadRefs(element, { day: 'single', month: 'single', year: 'single', input: 'multiple' });
    super.attach(element);
    this.addEventListener(this.refs.day, 'change', () => this.updateValue());
    this.addEventListener(this.refs.month, 'change', () => this.updateValue());
    // Change day max input when month changes.
    this.addEventListener(this.refs.month, 'change', () => {
      this.refs.day.max = new Date(this.refs.year.value, this.refs.month.value, 0).getDate();
      if (this.refs.day.value > this.refs.day.max) {
        this.refs.day.value = this.refs.day.max;
      }
    });
    this.addEventListener(this.refs.year, 'change', () => this.updateValue());
    this.addEventListener(this.refs.input, this.info.changeEvent, () => this.updateValue());
    this.setValue(this.dataValue);
  }

  validateRequired(setting, value) {
    const { day, month, year } = this.parts;
    if (this.dayRequired && !day) {
      return false;
    }

    if (this.monthRequired && month < 0) {
      return false;
    }

    if (this.yearRequired && !year) {
      return false;
    }

    if (!boolValue(setting)) {
      return true;
    }
    return !this.isEmpty(value);
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (!this.refs.year || !this.refs.month || !this.refs.day) {
      return;
    }
    if (disabled) {
      this.refs.year.setAttribute('disabled', 'disabled');
      this.refs.month.setAttribute('disabled', 'disabled');
      this.refs.day.setAttribute('disabled', 'disabled');
    }
    else {
      this.refs.year.removeAttribute('disabled');
      this.refs.month.removeAttribute('disabled');
      this.refs.day.removeAttribute('disabled');
    }
  }

  /**
   * Set the value at a specific index.
   *
   * @param index
   * @param value
   */
  setValueAt(index, value) {
    if (!value) {
      return null;
    }
    const parts = value.split('/');
    if (this.refs.day && this.component.dayFirst && this.showDay) {
      this.refs.day.value = parseInt(parts.shift(), 10);
    }
    if (this.refs.month && this.showMonth) {
      this.refs.month.value = parseInt(parts.shift(), 10);
    }
    if (this.refs.day && !this.component.dayFirst && this.showDay) {
      this.refs.day.value = parseInt(parts.shift(), 10);
    }
    if (this.refs.year && this.showYear) {
      this.refs.year.value = parseInt(parts.shift(), 10);
    }
  }

  getFieldValue(name) {
    let val = 0;
    if (!this.refs[name]) {
      return val;
    }
    if (this.component.fields[name].type === 'number') {
      val = this.refs[name].value;
    }
    else if (this.component.fields[name].type === 'select') {
      val = this.refs[name].options[this.refs[name].selectedIndex].value;
    }
    return _.isNaN(val) ? 0 : parseInt(val, 10);
  }

  get parts() {
    return {
      day: this.getFieldValue('day'),
      month: this.getFieldValue('month'),
      year: this.getFieldValue('year'),
    };
  }

  /**
   * Get the format for the value string.
   * @returns {string}
   */
  get format() {
    let format = '';
    if (this.component.dayFirst && this.showDay) {
      format += 'D/';
    }
    if (this.showMonth) {
      format += 'M/';
    }
    if (!this.component.dayFirst && this.showDay) {
      format += 'D/';
    }
    if (this.showYear) {
      format += 'YYYY';
    }
    return format;
  }

  /**
   * Return the date object for this component.
   * @returns {Date}
   */
  get date() {
    const { day, month, year } = this.parts;
    if (this.showDay && !day) {
      // Invalid so return null
      return null;
    }
    if (this.showMonth && (month < 0)) {
      // Invalid so return null
      return null;
    }
    if (this.showYear && !year) {
      // Invalid so return null
      return null;
    }
    return moment([year, month, day]);
  }

  /**
   * Return the raw value.
   *
   * @returns {Date}
   */
  get validationValue() {
    const date = this.date;
    if (!date) {
      return null;
    }

    return date.format();
  }

  /**
   * Get the value at a specific index.
   *
   * @param index
   * @returns {*}
   */
  getValueAt(index) {
    const date = this.date;
    if (date) {
      this.refs.input[index].value = date.format(this.format);
      return this.refs.input[index].value;
    }
    else {
      this.refs.input[index].value = '';
      return null;
    }
  }

  getView() {
    const date = this.date;
    if (!date) {
      return null;
    }
    return date.isValid() ? date.format(this.format) : null;
  }

  focus() {
    if (this.dayFirst && this.showDay || !this.dayFirst && !this.showMonth && this.showDay) {
      this.refs.day.focus();
    }
    else if (this.dayFirst && !this.showDay && this.showMonth || !this.dayFirst && this.showMonth) {
      this.refs.month.focus();
    }
    else if (!this.showDay && !this.showDay && this.showYear) {
      this.refs.year.focus();
    }
  }
}
