import _ from 'lodash';
import moment from 'moment';

import {BaseComponent} from '../base/Base';
import {getLocaleDateFormatInfo} from '../../utils';

export class DayComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('date');
    const dateFormatInfo = getLocaleDateFormatInfo(this.options.language);
    this.dayFirst = this.component.useLocaleSettings
      ? dateFormatInfo.dayFirst
      : this.component.dayFirst;
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
      {value: 0, label: _.get(this.component, 'fields.month.placeholder', '')},
      {value: 1, label: this.t('january')},
      {value: 2, label: this.t('february')},
      {value: 3, label: this.t('march')},
      {value: 4, label: this.t('april')},
      {value: 5, label: this.t('may')},
      {value: 6, label: this.t('june')},
      {value: 7, label: this.t('july')},
      {value: 8, label: this.t('august')},
      {value: 9, label: this.t('september')},
      {value: 10, label: this.t('october')},
      {value: 11, label: this.t('november')},
      {value: 12, label: this.t('december')}
    ];
    return this._months;
  }

  get emptyValue() {
    return '';
  }

  createDayInput(subinputAtTheBottom) {
    const dayColumn = this.ce('div', {
      class: 'form-group col col-xs-3'
    });

    const id = `${this.component.key}-day`;

    const dayLabel = this.ce('label', {
      for: id,
      class: _.get(this.component, 'fields.day.required', false) ? 'field-required' : ''
    });
    dayLabel.appendChild(this.text(this.t('day')));
    this.setSubinputLabelStyle(dayLabel);
    if (!subinputAtTheBottom) {
      dayColumn.appendChild(dayLabel);
    }

    const dayInputWrapper = this.ce('div');
    this.dayInput = this.ce('input', {
      class: 'form-control',
      type: 'number',
      step: '1',
      min: '1',
      max: '31',
      placeholder: _.get(this.component, 'fields.day.placeholder', ''),
      id
    });
    this.hook('input', this.dayInput, dayInputWrapper);
    this.addEventListener(this.dayInput, 'change', () => this.updateValue());
    dayInputWrapper.appendChild(this.dayInput);
    this.setSubinputStyle(dayInputWrapper);
    dayColumn.appendChild(dayInputWrapper);

    if (subinputAtTheBottom) {
      dayColumn.appendChild(dayLabel);
    }

    return dayColumn;
  }

  createMonthInput(subinputAtTheBottom) {
    const monthColumn = this.ce('div', {
      class: 'form-group col col-xs-4'
    });

    const id = `${this.component.key}-month`;

    const monthLabel = this.ce('label', {
      for: id,
      class: _.get(this.component, 'fields.month.required', false) ? 'field-required' : ''
    });
    monthLabel.appendChild(this.text(this.t('month')));
    this.setSubinputLabelStyle(monthLabel);
    if (!subinputAtTheBottom) {
      monthColumn.appendChild(monthLabel);
    }

    const monthInputWrapper = this.ce('div');
    this.monthInput = this.ce('select', {
      class: 'form-control',
      id
    });
    this.hook('input', this.monthInput, monthInputWrapper);
    this.selectOptions(this.monthInput, 'monthOption', this.months);
    const self = this;

    // Ensure the day limits match up with the months selected.
    this.monthInput.onchange = function() {
      self.dayInput.max = new Date(self.yearInput.value, this.value, 0).getDate();
      if (self.dayInput.value > self.dayInput.max) {
        self.dayInput.value = self.dayInput.max;
      }
      self.updateValue();
    };
    monthInputWrapper.appendChild(this.monthInput);
    this.setSubinputStyle(monthInputWrapper);
    monthColumn.appendChild(monthInputWrapper);

    if (subinputAtTheBottom) {
      monthColumn.appendChild(monthLabel);
    }

    return monthColumn;
  }

  createYearInput(subinputAtTheBottom) {
    const yearColumn = this.ce('div', {
      class: 'form-group col col-xs-5'
    });

    const id = `${this.component.key}-year`;

    const yearLabel = this.ce('label', {
      for: id,
      class: _.get(this.component, 'fields.year.required', false) ? 'field-required' : ''
    });
    yearLabel.appendChild(this.text(this.t('year')));
    this.setSubinputLabelStyle(yearLabel);
    if (!subinputAtTheBottom) {
      yearColumn.appendChild(yearLabel);
    }

    const yearInputWrapper = this.ce('div');
    this.yearInput = this.ce('input', {
      class: 'form-control',
      type: 'number',
      step: '1',
      min: '1',
      placeholder: _.get(this.component, 'fields.year.placeholder', ''),
      value: (new Date().getFullYear()),
      id
    });

    this.hook('input', this.yearInput, yearInputWrapper);
    this.addEventListener(this.yearInput, 'change', () => this.updateValue());
    yearInputWrapper.appendChild(this.yearInput);
    this.setSubinputStyle(yearInputWrapper);
    yearColumn.appendChild(yearInputWrapper);

    if (subinputAtTheBottom) {
      yearColumn.appendChild(yearLabel);
    }

    return yearColumn;
  }

  set disabled(disabled) {
    super.disabled = disabled;
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
    if (this.dayFirst && !_.get(this.component, 'fields.day.hide', false)) {
      inputGroup.appendChild(dayColumn);
    }
    if (!_.get(this.component, 'fields.month.hide', false)) {
      inputGroup.appendChild(monthColumn);
    }
    if (!this.dayFirst && !_.get(this.component, 'fields.day.hide', false)) {
      inputGroup.appendChild(dayColumn);
    }
    if (!_.get(this.component, 'fields.year.hide', false)) {
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
    const {inputsLabelPosition} = this.component;

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
    const {inputsLabelPosition} = this.component;

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
    if (!value) {
      return;
    }
    const parts = value.split('/');
    if (this.component.dayFirst && !_.get(this.component, 'fields.day.hide', false)) {
      this.dayInput.value = parseInt(parts.shift(), 10);
    }
    if (!_.get(this.component, 'fields.month.hide', false)) {
      this.monthInput.value = parseInt(parts.shift(), 10);
    }
    if (!this.component.dayFirst && !_.get(this.component, 'fields.day.hide', false)) {
      this.dayInput.value = parseInt(parts.shift(), 10);
    }
    if (!_.get(this.component, 'fields.year.hide', false)) {
      this.yearInput.value = parseInt(parts.shift(), 10);
    }
  }

  /**
   * Get the format for the value string.
   * @returns {string}
   */
  get format() {
    let format = '';
    if (this.component.dayFirst && !_.get(this.component, 'fields.day.hide', false)) {
      format += 'D/';
    }
    if (!_.get(this.component, 'fields.month.hide', false)) {
      format += 'M/';
    }
    if (!this.component.dayFirst && !_.get(this.component, 'fields.day.hide', false)) {
      format += 'D/';
    }
    if (!_.get(this.component, 'fields.year.hide', false)) {
      format += 'YYYY';
    }
    return format;
  }

  /**
   * Return the date object for this component.
   * @returns {Date}
   */
  get date() {
    const day = this.dayInput.value;
    const month = this.monthInput.value;
    const year = this.yearInput.value;
    return moment([parseInt(year, 10), (parseInt(month, 10) - 1), parseInt(day, 10)]);
  }

  /**
   * Return the raw value.
   *
   * @returns {Date}
   */
  get validationValue() {
    return this.date.format();
  }

  /**
   * Get the value at a specific index.
   *
   * @param index
   * @returns {*}
   */
  getValueAt(index) {
    this.inputs[index].value = this.date.format(this.format);
    return this.inputs[index].value;
  }

  getView() {
    const date = this.date;
    return date.isValid() ? date.format(this.format) : null;
  }
}
