import _ from 'lodash';
import BaseComponent from '../base/Base';
import { boolValue, getLocaleDateFormatInfo } from '../../utils/utils';

export default class DayComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
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
      icon: 'fa fa-calendar',
      documentation: 'http://help.form.io/userguide/#day',
      weight: 50,
      schema: DayComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.validators = this.validators.concat(['day', 'maxDate', 'minDate']);
    const dateFormatInfo = getLocaleDateFormatInfo(this.options.language);
    this.dayFirst = this.component.useLocaleSettings
      ? dateFormatInfo.dayFirst
      : this.component.dayFirst;
    this.hideInputLabels = this.component.hideInputLabels;
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

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  get months() {
    if (this._months) {
      return this._months;
    }
    this._months = [
      { value: undefined, label: _.get(this.component, 'fields.month.placeholder') || (this.hideInputLabels ? this.t('Month') : '') },
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

  getInputValue(input, defaultValue) {
    if (_.isObject(input)) {
      const value = parseInt(input.value, 10);

      if (!_.isNaN(value) && _.isNumber(value)) {
        return value;
      }
    }

    return defaultValue;
  }

  validateRequired(setting, value) {
    const day = this.getInputValue(this.dayInput, 0);
    const month = this.getInputValue(this.monthInput, 0) - 1;
    const year = this.getInputValue(this.yearInput, 0);

    if (this.dayRequired && day === 0) {
      return false;
    }

    if (this.monthRequired && month < 0) {
      return false;
    }

    if (this.yearRequired && year === 0) {
      return false;
    }

    if (!boolValue(setting)) {
      return true;
    }
    return !this.isEmpty(value);
  }

  createDayInput(subinputAtTheBottom) {
    const dayColumn = this.ce('div', {
      class: 'form-group col col-xs-3'
    });

    const id = `${this.component.key}-day`;

    const dayLabel = !this.hideInputLabels
      ? this.ce('label', {
        for: id,
        class: _.get(this.component, 'fields.day.required', false) ? 'field-required' : ''
      })
      : null;

    if (dayLabel) {
      dayLabel.appendChild(this.text(this.t('day')));
      this.setSubinputLabelStyle(dayLabel);
    }

    if (dayLabel && !subinputAtTheBottom) {
      dayColumn.appendChild(dayLabel);
    }

    const dayInputWrapper = this.ce('div');
    this.dayInput = this.ce('input', {
      class: 'form-control',
      type: 'number',
      step: '1',
      min: '1',
      max: '31',
      placeholder: _.get(this.component, 'fields.day.placeholder') || (this.hideInputLabels ? this.t('Day') : ''),
      id
    });
    this.hook('input', this.dayInput, dayInputWrapper);
    this.addFocusBlurEvents(this.dayInput);
    this.addEventListener(this.dayInput, 'change', () => this.updateValue());
    dayInputWrapper.appendChild(this.dayInput);
    this.setSubinputStyle(dayInputWrapper);
    dayColumn.appendChild(dayInputWrapper);

    if (dayLabel && subinputAtTheBottom) {
      dayColumn.appendChild(dayLabel);
    }

    return dayColumn;
  }

  createMonthInput(subinputAtTheBottom) {
    const monthColumn = this.ce('div', {
      class: 'form-group col col-xs-4'
    });

    const id = `${this.component.key}-month`;

    const monthLabel = !this.hideInputLabels
      ? this.ce('label', {
        for: id,
        class: _.get(this.component, 'fields.month.required', false) ? 'field-required' : ''
      })
      : null;

    if (monthLabel) {
      monthLabel.appendChild(this.text(this.t('month')));
      this.setSubinputLabelStyle(monthLabel);
    }

    if (monthLabel && !subinputAtTheBottom) {
      monthColumn.appendChild(monthLabel);
    }

    const monthInputWrapper = this.ce('div');
    this.monthInput = this.ce('select', {
      class: 'form-control',
      id
    });
    this.hook('input', this.monthInput, monthInputWrapper);
    this.addFocusBlurEvents(this.monthInput);
    this.selectOptions(this.monthInput, 'monthOption', this.months);
    const self = this;

    // Ensure the day limits match up with the months selected.
    this.monthInput.onchange = function() {
      const maxDay = parseInt(new Date(self.yearInput.value, this.value, 0).getDate(), 0);
      const day = self.getInputValue(self.dayInput, 0);
      self.dayInput.max = maxDay;
      if (day > maxDay) {
        self.dayInput.value = self.dayInput.max;
      }
      self.updateValue();
    };
    monthInputWrapper.appendChild(this.monthInput);
    this.setSubinputStyle(monthInputWrapper);
    monthColumn.appendChild(monthInputWrapper);

    if (monthLabel && subinputAtTheBottom) {
      monthColumn.appendChild(monthLabel);
    }

    return monthColumn;
  }

  createYearInput(subinputAtTheBottom) {
    const yearColumn = this.ce('div', {
      class: 'form-group col col-xs-5'
    });

    const id = `${this.component.key}-year`;

    const yearLabel = !this.hideInputLabels
      ? this.ce('label', {
        for: id,
        class: _.get(this.component, 'fields.year.required', false) ? 'field-required' : ''
      })
      : null;

    if (yearLabel) {
      yearLabel.appendChild(this.text(this.t('year')));
      this.setSubinputLabelStyle(yearLabel);
    }

    if (yearLabel && !subinputAtTheBottom) {
      yearColumn.appendChild(yearLabel);
    }

    const yearInputWrapper = this.ce('div');
    this.yearInput = this.ce('input', {
      class: 'form-control',
      type: 'number',
      step: '1',
      min: '1',
      placeholder: _.get(this.component, 'fields.year.placeholder') || (this.hideInputLabels ? this.t('Year') : ''),
      id
    });

    this.hook('input', this.yearInput, yearInputWrapper);
    this.addFocusBlurEvents(this.yearInput);
    this.addEventListener(this.yearInput, 'change', () => this.updateValue());
    yearInputWrapper.appendChild(this.yearInput);
    this.setSubinputStyle(yearInputWrapper);
    yearColumn.appendChild(yearInputWrapper);

    if (yearLabel && subinputAtTheBottom) {
      yearColumn.appendChild(yearLabel);
    }

    return yearColumn;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (!this.yearInput || !this.monthInput || !this.dayInput) {
      return;
    }
    if (disabled) {
      this.yearInput.setAttribute('disabled', 'disabled');
      this.monthInput.setAttribute('disabled', 'disabled');
      this.dayInput.setAttribute('disabled', 'disabled');
    }
    else {
      this.yearInput.removeAttribute('disabled');
      this.monthInput.removeAttribute('disabled');
      this.dayInput.removeAttribute('disabled');
    }
  }

  createInput(container) {
    const inputGroup = this.ce('div', {
      class: 'input-group row',
      style: 'width: 100%'
    });
    const subinputAtTheBottom = this.component.inputsLabelPosition === 'bottom';
    const [dayColumn, monthColumn, yearColumn] = this.createInputs(subinputAtTheBottom);

    // Add the columns to the day select in the right order.
    if (this.dayFirst && this.showDay) {
      inputGroup.appendChild(dayColumn);
    }
    if (this.showMonth) {
      inputGroup.appendChild(monthColumn);
    }
    if (!this.dayFirst && this.showDay) {
      inputGroup.appendChild(dayColumn);
    }
    if (this.showYear) {
      inputGroup.appendChild(yearColumn);
    }

    const input = this.ce(this.info.type, this.info.attr);
    this.addInput(input, inputGroup);
    this.errorContainer = container;
    this.setInputStyles(inputGroup);
    container.appendChild(inputGroup);
  }

  createInputs(subinputAtTheBottom) {
    return [
      this.createDayInput(subinputAtTheBottom),
      this.createMonthInput(subinputAtTheBottom),
      this.createYearInput(subinputAtTheBottom),
    ];
  }

  setSubinputLabelStyle(label) {
    const { inputsLabelPosition } = this.component;

    if (inputsLabelPosition === 'left') {
      _.assign(label.style, {
        float: 'left',
        width: '30%',
        marginRight: '3%',
        textAlign: 'left',
      });
    }

    if (inputsLabelPosition === 'right') {
      _.assign(label.style, {
        float: 'right',
        width: '30%',
        marginLeft: '3%',
        textAlign: 'right',
      });
    }
  }

  setSubinputStyle(input) {
    const { inputsLabelPosition } = this.component;

    if (['left', 'right'].includes(inputsLabelPosition)) {
      input.style.width = '67%';

      if (inputsLabelPosition === 'left') {
        input.style.marginLeft = '33%';
      }
      else {
        input.style.marginRight = '33%';
      }
    }
  }

  /**
   * Set the value at a specific index.
   *
   * @param index
   * @param value
   */
  setValueAt(index, value) {
    // temporary solution to avoid input reset
    // on invalid date.
    if (!value || value === 'Invalid date') {
      return null;
    }
    const parts = value.split('/');
    let day, month, year;
    if (this.component.dayFirst && this.showDay) {
      day = parts.shift();
      this.dayInput.value = day === '00' ? undefined : parseInt(day, 10);
    }
    if (this.showMonth) {
      month = parts.shift();
      this.monthInput.value = month === '00' ? undefined : parseInt(month, 10);
    }
    if (!this.component.dayFirst && this.showDay) {
      day = parts.shift();
      this.dayInput.value = day === '00' ? undefined : parseInt(day, 10);
    }
    if (this.showYear) {
      year = parts.shift();
      this.yearInput.value = year === '0000' ? undefined : parseInt(year, 10);
    }
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
      return format;
    }
    else {
      // Trim off the "/" from the end of the format string.
      return format.length ? format.substring(0, format.length - 1) : format;
    }
  }

  /**
   * Return the date for this component.
   *
   * @param value
   * @return {*}
   */
  getDate(value) {
    let defaults = [], day, month, year;
    // Map positions to identifiers to get default values for each part of day
    const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
    const defaultValue = value || this.component.defaultValue;
    if (defaultValue) {
      defaults = defaultValue.split('/').map(x => parseInt(x, 10));
    }
    if (this.showDay && this.dayInput) {
      day = parseInt(this.dayInput.value, 10);
    }
    if (day === undefined || _.isNaN(day)) {
      day = defaults[DAY] && !_.isNaN(defaults[DAY]) ? defaults[DAY] : 0;
    }
    if (this.showMonth && this.monthInput) {
      month = parseInt(this.monthInput.value, 10);
    }
    if (month === undefined || _.isNaN(month)) {
      month = defaults[MONTH] && !_.isNaN(defaults[MONTH]) ? defaults[MONTH] : 0;
    }
    if (this.showYear && this.yearInput) {
      year = parseInt(this.yearInput.value);
    }
    if (year === undefined || _.isNaN(year)) {
      year = defaults[YEAR] && !_.isNaN(defaults[YEAR]) ? defaults[YEAR] : 0;
    }
    let result;
    if (!day && !month && !year) {
      return undefined;
    }
    //add trailing zeros
    day = day.toString().padStart(2, 0);
    month = month.toString().padStart(2, 0);
    year = year.toString().padStart(4, 0);
    if (this.component.dayFirst) {
      result = `${day}/${month}/${year}`;
    }
    else {
      result = `${month}/${day}/${year}`;
    }
    return result;
  }

  /**
   * Return the date object for this component.
   * @returns {Date}
   */
  get date() {
    return this.getDate();
  }

  /**
   * Return the raw value.
   *
   * @returns {Date}
   */
  get validationValue() {
    return this.date;
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
      this.inputs[index].value = date;
      return this.inputs[index].value;
    }
    else {
      this.inputs[index].value = '';
      return null;
    }
  }

  /**
   * Get the view of the date.
   *
   * @param value
   * @return {null}
   */
  getView(value) {
    return this.getDate(value);
  }

  focus() {
    if (this.dayFirst && this.showDay || !this.dayFirst && !this.showMonth && this.showDay) {
      this.dayInput.focus();
    }
    else if (this.dayFirst && !this.showDay && this.showMonth || !this.dayFirst && this.showMonth) {
      this.monthInput.focus();
    }
    else if (!this.showDay && !this.showDay && this.showYear) {
      this.yearInput.focus();
    }
  }

  isPartialDay(value) {
    if (!value) {
      return false;
    }
    const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
    const values = value.split('/');
    return (values[DAY] === '00' || values[MONTH] === '00' || values[YEAR] === '0000');
  }
}
