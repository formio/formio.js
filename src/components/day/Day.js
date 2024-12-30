import _ from 'lodash';
import moment from 'moment';
import Field from '../_classes/field/Field';
import { boolValue, componentValueTypes, getComponentSavedTypes, getLocaleDateFormatInfo } from '../../utils/utils';

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
      dayFirst: false,
      defaultValue: ''
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Day',
      group: 'advanced',
      icon: 'calendar',
      documentation: '/userguide/form-building/advanced-components#day',
      weight: 50,
      schema: DayComponent.schema()
    };
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      operators: ['isDateEqual', 'isNotDateEqual', 'isEmpty', 'isNotEmpty','dateLessThan', 'dateGreaterThan', 'dateLessThanOrEqual','dateGreaterThanOrEqual'],
    };
  }

  static savedValueTypes(schema) {
    schema = schema || {};
    return getComponentSavedTypes(schema) || [componentValueTypes.string];
  }

  // Empty value used before 9.3.x
  static oldEmptyValue = '00/00/0000';

  constructor(component, options, data) {
    if (component.maxDate && component.maxDate.indexOf('moment(') === -1) {
      component.maxDate = moment(component.maxDate, 'YYYY-MM-DD').toISOString();
    }
    if (component.minDate && component.minDate.indexOf('moment(') === -1) {
      component.minDate = moment(component.minDate, 'YYYY-MM-DD').toISOString();
    }
    super(component, options, data);
  }

  static get serverConditionSettings() {
    return DayComponent.conditionOperatorsSettings;
  }

  /**
   * The empty value for day component.
   * @returns {''} - The empty value of the day component.
   */
  get emptyValue() {
    return '';
  }

  get valueMask() {
    return /^\d{2}\/\d{2}\/\d{4}$/;
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

  get shouldDisabled() {
    return super.shouldDisabled || this.parentDisabled;
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'input';
    return info;
  }

  isEmpty(value = this.dataValue) {
    if (value === DayComponent.oldEmptyValue) {
      return true
    }
    return super.isEmpty(value);
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
      min = _.get(this.component, 'fields.year.minYear', 1900) || 1900;
      max = _.get(this.component, 'fields.year.maxYear', 2030) || 1900;
    }
    return {
      type: 'input',
      ref: name,
      attr: {
        id: `${this.component.key}-${name}`,
        class: `form-control ${this.transform('class', `formio-day-component-${name}`)}`,
        type: this.component.fields[name].type === 'select' ? 'select' : 'number',
        placeholder: this.t(this.component.fields[name].placeholder),
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
        id: `${this.component.key}-${name}`,
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
      { value: '', label: _.get(this.component, 'fields.day.placeholder', '') }
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
      {
        value: '',
        label: _.get(this.component, 'fields.month.placeholder') || (this.hideInputLabels ? this.t('month') : '')
      },
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' }
    ];
    return this._months;
  }

  get years() {
    if (this._years) {
      return this._years;
    }
    this._years = [
      { value: '', label: _.get(this.component, 'fields.year.placeholder', '') }
    ];
    const minYears = _.get(this.component, 'fields.year.minYear', 1900) || 1900;
    const maxYears = _.get(this.component, 'fields.year.maxYear', 2030) || 2030;
    for (let x = minYears; x <= maxYears; x++) {
      this._years.push({
        value: x,
        label: x.toString()
      });
    }
    return this._years;
  }

  setErrorClasses(elements, dirty, hasError) {
    super.setErrorClasses(elements, dirty, hasError);
    super.setErrorClasses([this.refs.day, this.refs.month, this.refs.year], dirty, hasError);
  }

  removeInputError(elements) {
    super.removeInputError([this.refs.day, this.refs.month, this.refs.year]);
    super.removeInputError(elements);
  }

  init() {
    super.init();

    const minYear = this.component.fields.year.minYear;
    const maxYear = this.component.fields.year.maxYear;
    this.component.maxYear = maxYear;
    this.component.minYear = minYear;

    const dateFormatInfo = getLocaleDateFormatInfo(this.options.language);
    this.dayFirst = this.component.useLocaleSettings
      ? dateFormatInfo.dayFirst
      : this.component.dayFirst;
  }

  render() {
    if (this.isHtmlRenderMode()) {
      return super.render(this.renderTemplate('input'));
    }

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
        selectOptions: this[`${name}s`].reduce((html, option) =>
          html + this.renderTemplate('selectOption', {
            option,
            selected: false,
            attrs: {}
          }), ''
        ),
      });
    }
    else {
      return this.renderTemplate('input', {
        prefix: this.prefix,
        suffix: this.suffix,
        input: this.inputDefinition(name)
      });
    }
  }

  attach(element) {
    this.loadRefs(element, { day: 'single', month: 'single', year: 'single', input: 'multiple' });
    const superAttach = super.attach(element);

    const updateValueAndSaveFocus = (element, name) => () => {
      try {
        this.saveCaretPosition(element, name);
      }
      catch (err) {
        console.warn(this.t('caretPositionSavingError'), err);
      }
      this.updateValue(null, {
        modified: true,
      });
    };

    if (this.shouldDisabled) {
      this.setDisabled(this.refs.day, true);
      this.setDisabled(this.refs.month, true);
      this.setDisabled(this.refs.year, true);
      if (this.refs.input) {
        this.refs.input.forEach((input) => this.setDisabled(input, true));
      }
    }
    else {
      this.addEventListener(this.refs.day, 'input', updateValueAndSaveFocus(this.refs.day, 'day'));
      // TODO: Need to rework this to work with day select as well.
      // Change day max input when month changes.
      this.addEventListener(this.refs.month, 'input', () => {
        const maxDay = this.refs.year ? parseInt(
            new Date(this.refs.year.value, this.refs.month.value, 0).getDate(),
            10
          )
          : '';
        const day = this.getFieldValue('day');
        if (!this.component.fields.day.hide && maxDay) {
          this.refs.day.max = maxDay;
        }
        if (maxDay && day > maxDay && this.refs.day) {
          this.refs.day.value = this.refs.day.max;
        }
        updateValueAndSaveFocus(this.refs.month, 'month')();
      });
      this.addEventListener(this.refs.year, 'input', updateValueAndSaveFocus(this.refs.year, 'year'));
      this.addEventListener(this.refs.input, this.info.changeEvent, () => this.updateValue(null, {
        modified: true
      }));
      [this.refs.day, this.refs.month, this.refs.year].filter((element) => !!element).forEach((element) => {
        super.addFocusBlurEvents(element);
      });
    }
    this.setValue(this.dataValue);
    // Force the disabled state with getters and setters.
    this.disabled = this.shouldDisabled;
    return superAttach;
  }

  validateRequired(setting, value) {
    const { day, month, year } = this.parts;
    if (this.dayRequired && !day) {
      return false;
    }

    if (this.monthRequired && !month) {
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

  normalizeValue(value) {
    // Adjust the value from old to new format
    if (value === DayComponent.oldEmptyValue) {
      value = '';
    }

    if (!value || this.valueMask.test(value)) {
      return value;
    }
    const dateParts = [];
    const valueParts = value.split('/');
    const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
    const defaultValue = this.component.defaultValue ? this.component.defaultValue.split('/') : '';

    let defaultDay = '';
    let defaultMonth = '';
    let defaultYear = '';
    if(defaultValue) {
      const hasHiddenFields = defaultValue.length !==3;
      defaultDay = hasHiddenFields ? this.getDayWithHiddenFields(defaultValue).day : defaultValue[DAY];
      defaultMonth = hasHiddenFields ? this.getDayWithHiddenFields(defaultValue).month : defaultValue[MONTH];
      defaultYear = hasHiddenFields ? this.getDayWithHiddenFields(defaultValue).year : defaultValue[YEAR];
    }

    if(this.options.building && defaultValue.length ===3) {
      return this.component.defaultValue;
    }

    const getNextPart = (shouldTake, defaultValue) => {
       // Only push the part if it's not an empty string
      const part = shouldTake ? valueParts.shift() : defaultValue;
      if (part !== '') {
        dateParts.push(part);
      }
    }

    if (this.dayFirst) {
      getNextPart(this.showDay, defaultDay);
    }

    getNextPart(this.showMonth, defaultMonth);

    if (!this.dayFirst) {
      getNextPart(this.showDay, defaultDay);
    }

    getNextPart(this.showYear, defaultYear);
    return dateParts.join('/');
  }

  /**
   * Set the value at a specific index and updates the component's refs.
   * @param {number} index - The index to set.
   * @param {any} value - The value to set.
   * @returns {null|void} - Returns null if the value is invalid, otherwise void.
   */
  setValueAt(index, value) {
    // temporary solution to avoid input reset
    // on invalid date.
    if (value === 'Invalid date') {
      return null;
    }
    let day, month, year;
    const parts = value.split('/');

    if (parts.length !== 3) {
      day = this.getDayWithHiddenFields(parts).day;
      month = this.getDayWithHiddenFields(parts).month;
      year = this.getDayWithHiddenFields(parts).year;
    }
    else {
      if (this.component.dayFirst) {
        day = parts.shift();
      }
      month = parts.shift();
      if (!this.component.dayFirst) {
        day = parts.shift();
      }
      year = parts.shift();
    }
    if (this.refs.day && this.showDay) {
      this.refs.day.value = day === '00' ? '' : parseInt(day, 10);
    }
    if (this.refs.month && this.showMonth) {
      this.refs.month.value = month === '00' ? '' : parseInt(month, 10);
    }
    if (this.refs.year && this.showYear) {
      this.refs.year.value = year === '0000' ? '' : parseInt(year, 10);
    }
  }

  getDayWithHiddenFields(parts) {
    let [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
    if (!this.showDay) {
      MONTH = MONTH === 0 ? 0 : MONTH - 1;
      YEAR = YEAR - 1;
      DAY = null;
    }
    if (!this.showMonth) {
      if (!_.isNull(DAY)) {
        DAY = DAY === 0 ? 0 : DAY - 1;
      }
      YEAR = YEAR - 1;
      MONTH = null;
    }
    if (!this.showYear) {
      YEAR = null;
    }
    return {
      month: _.isNull(MONTH) ? '' : parts[MONTH],
      day: _.isNull(DAY) ? '' : parts[DAY],
      year: _.isNull(YEAR) ? '' : parts[YEAR],
    }
  }

  getFieldValue(name) {
    const parts = this.dataValue ? this.dataValue.split('/') : [];
    let val = 0;

    switch (name) {
      case 'month':
        val = parts[this.dayFirst ? 1 : 0];
        break;
      case 'day':
        val = parts[this.dayFirst ? 0 : 1];
        break;
      case 'year':
        val = parts[2];
        break;
    }

    val = parseInt(val, 10);
    return (!_.isNaN(val) && _.isNumber(val)) ? val : 0;
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
   * @returns {string} - the format for the value string.
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
   * @param {any} value - The value to convert to a date.
   * @returns {null|string} - The date string.
   */
  getDate(value) {
    let defaults = [], day, month, year;
    // Map positions to identifiers to get default values for each part of day
    const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
    const defaultValue = value || this.component.defaultValue;
    if (defaultValue) {
      defaults = defaultValue.split('/').map(x => parseInt(x, 10));
    }

    const isModalEditClosed = this.component.modalEdit && !this.componentModal.isOpened;
    if (this.showDay && this.refs.day) {
      day = (this.refs.day.value === '' && !isModalEditClosed) ? '' : parseInt(this.refs.day.value, 10);
    }
    if (day === undefined || _.isNaN(day) || value) {
      day = (defaults.length !== 3)
        ? this.getDayWithHiddenFields(defaults).day
        : (defaults[DAY] && !_.isNaN(defaults[DAY]) ? defaults[DAY] : 0);
    }

    if (this.showMonth && this.refs.month) {
      // Months are 0 indexed.
      month = (this.refs.month.value === '' && !isModalEditClosed) ? '' : parseInt(this.refs.month.value, 10);
    }
    if (month === undefined || _.isNaN(month) || value) {
      month = (defaults.length !== 3)
        ? this.getDayWithHiddenFields(defaults).month
        : (defaults[MONTH] && !_.isNaN(defaults[MONTH]) ? defaults[MONTH] : 0);
    }

    if (this.showYear && this.refs.year) {
      year = (this.refs.year.value === '' && !isModalEditClosed) ? '' : parseInt(this.refs.year.value);
    }
    if (year === undefined || _.isNaN(year) || value) {
      year = (defaults.length !== 3)
        ? this.getDayWithHiddenFields(defaults).year
        : (defaults[YEAR] && !_.isNaN(defaults[YEAR]) ? defaults[YEAR] : 0);
    }

    let result;
    if (!day && !month && !year) {
      if (!isModalEditClosed) {
        this.dataValue = this.emptyValue;
        if (this.options.building) {
          this.triggerChange();
        }
      }
      return null;
    }

    // add trailing zeros if the data is showed
    day = this.showDay ? day.toString().padStart(2, 0) : '';
    month = this.showMonth ? month.toString().padStart(2, 0) : '';
    year = this.showYear ? year.toString().padStart(4, 0) : '';

    if (this.component.dayFirst) {
      result = `${day}${this.showDay && this.showMonth || this.showDay && this.showYear ? '/' : ''}${month}${this.showMonth && this.showYear ? '/' : ''}${year}`;
    }
    else {
      result = `${month}${this.showDay && this.showMonth || this.showMonth && this.showYear ? '/' : ''}${day}${this.showDay && this.showYear ? '/' : ''}${year}`;
    }

    return result;
  }

  /**
   * Return the date string for this component.
   * @returns {string|null} - The date string for this component.
   */
  get date() {
    return this.getDate();
  }

  /**
   * Return the raw value.
   * @returns {string} - The raw value of the component.
   */
  get validationValue() {
    return this.dataValue;
  }

  getValue() {
    const result = super.getValue();
    return (!result) ? this.dataValue : result;
  }

  /**
   * Get the value at a specific index.
   * @param {number} index - The index to get the value from.
   * @returns {*} - The value at index.
   */
  getValueAt(index) {
    const date = this.date || this.emptyValue;
    if (date) {
      this.refs.input[index].value = date;
      return this.refs.input[index].value;
    }
    else {
      this.refs.input[index].value = '';
      return null;
    }
  }

  /**
   * Get the input value of the date.
   * @param {any} value - The value to convert to a string.
   * @returns {string|null} - The string value of the date.
   */
  getValueAsString(value) {
    if (!value) {
      return '';
    }
    return this.getDate(value) || '';
  }

  focus(field) {
    if (field && typeof field === 'string' && this.refs[field]) {
      this.refs[field].focus();
    }
    else if (this.dayFirst && this.showDay || !this.dayFirst && !this.showMonth && this.showDay) {
      this.refs.day?.focus();
    }
    else if (this.dayFirst && !this.showDay && this.showMonth || !this.dayFirst && this.showMonth) {
      this.refs.month?.focus();
    }
    else if (!this.showDay && !this.showDay && this.showYear) {
      this.refs.year?.focus();
    }
  }

  restoreCaretPosition() {
    if (this.root?.currentSelection) {
      const { selection, index } = this.root.currentSelection;
      if (this.refs[index]) {
        const input = this.refs[index];
        const isInputRangeSelectable = (i) => /text|search|password|tel|url/i.test(i?.type || '');
        if (isInputRangeSelectable(input)) {
          input.setSelectionRange(...selection);
        }
      }
    }
  }

  isPartialDay(value) {
    if (!value) {
      return true;
    }
    const [DAY, MONTH, YEAR] = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2];
    const values = value.split('/');
    if(values.length < 3){
      return true;
    }
    return (values[DAY] === '00' || values[MONTH] === '00' || values[YEAR] === '0000');
  }

  getValidationFormat() {
    let validationFormat = this.dayFirst ? 'DD-MM-YYYY' : 'MM-DD-YYYY';
    if (this.fields?.day?.hide) {
      validationFormat = validationFormat.replace('DD-', '');
    }
    if (this.fields?.month?.hide) {
      validationFormat = validationFormat.replace('MM-', '');
    }
    if ( this.fields?.year?.hide ) {
      validationFormat = validationFormat.replace('-YYYY', '');
    }
    return validationFormat;
  }
}
