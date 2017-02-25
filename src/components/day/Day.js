import BaseComponent from '../base/Base';
import _get from 'lodash/get';
import _each from 'lodash/each';
import moment from 'moment';
class DayComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('date');
  }

  elementInfo() {
    let info = super.elementInfo();
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
      { value: 0, label: _get(this.component, 'fields.month.placeholder', '') },
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

  createDayInput() {
    let dayColumn = this.ce('dayColumn', 'div', {
      class: 'form-group col col-xs-3'
    });
    let dayLabel = this.ce('dayLabel', 'label', {
      for: this.component.key + '-day',
      class: _get(this.component, 'fields.day.required', false) ? 'field-required' : ''
    });
    dayLabel.appendChild(this.text(this.t('day')));
    dayColumn.appendChild(dayLabel);
    this.dayInput = this.ce('dayInput', 'input', {
      class: 'form-control',
      type: 'number',
      step: '1',
      min: '1',
      max: '31',
      placeholder: _get(this.component, 'fields.day.placeholder', ''),
      id: this.component.key + '-day'
    });
    this.addEventListener(this.dayInput, 'change', () => this.updateValue());
    dayColumn.appendChild(this.dayInput);
    return dayColumn;
  }

  createMonthInput() {
    let monthColumn = this.ce('monthColumn', 'div', {
      class: 'form-group col col-xs-4'
    });
    let monthLabel = this.ce('monthLabel', 'label', {
      for: this.component.key + '-month',
      class: _get(this.component, 'fields.month.required', false) ? 'field-required' : ''
    });
    monthLabel.appendChild(this.text(this.t('month')));
    monthColumn.appendChild(monthLabel);
    this.monthInput = this.ce('monthInput', 'select', {
      class: 'form-control',
      id: this.component.key + '-month'
    });
    this.selectOptions(this.monthInput, 'monthOption', this.months);
    let self = this;

    // Ensure the day limits match up with the months selected.
    this.monthInput.onchange = function() {
      self.dayInput.max = new Date(self.yearInput.value, this.value, 0).getDate();
      if (self.dayInput.value > self.dayInput.max) {
        self.dayInput.value = self.dayInput.max;
      }
      self.updateValue();
    };
    monthColumn.appendChild(this.monthInput);
    return monthColumn;
  }

  createYearInput() {
    let yearColumn = this.ce('yearColumn', 'div', {
      class: 'form-group col col-xs-5'
    });
    let yearLabel = this.ce('yearLabel', 'label', {
      for: this.component.key + '-year',
      class: _get(this.component, 'fields.year.required', false) ? 'field-required' : ''
    });
    yearLabel.appendChild(this.text(this.t('year')));
    yearColumn.appendChild(yearLabel);
    this.yearInput = this.ce('yearInput', 'input', {
      class: 'form-control',
      type: 'number',
      step: '1',
      min: '1',
      placeholder: _get(this.component, 'fields.year.placeholder', ''),
      value: (new Date().getFullYear()),
      id: this.component.key + '-year'
    });
    this.addEventListener(this.yearInput, 'change', () => this.updateValue());
    yearColumn.appendChild(this.yearInput);
    return yearColumn;
  }

  createInput(container) {
    let inputGroup = this.ce('inputGroup', 'div', {
      class: 'input-group row'
    });

    let dayColumn = this.createDayInput();
    let monthColumn = this.createMonthInput();
    let yearColumn = this.createYearInput();

    // Add the columns to the day select in the right order.
    if (this.component.dayFirst && !_get(this.component, 'fields.day.hide', false)) {
      inputGroup.appendChild(dayColumn)
    }
    if (!_get(this.component, 'fields.month.hide', false)) {
      inputGroup.appendChild(monthColumn);
    }
    if (!this.component.dayFirst && !_get(this.component, 'fields.day.hide', false)) {
      inputGroup.appendChild(dayColumn);
    }
    if (!_get(this.component, 'fields.year.hide', false)) {
      inputGroup.appendChild(yearColumn);
    }

    let input = this.ce('input', this.info.type, this.info.attr);
    this.addInput(input, inputGroup);
    this.createErrorElement(container);
    container.appendChild(inputGroup);
  }

  /**
   * Set the value at a specific index.
   *
   * @param index
   * @param value
   */
  setValueAt(index, value) {
    let parts = value.split('/');
    if (this.component.dayFirst && !_get(this.component, 'fields.day.hide', false)) {
      this.dayInput.value = parseInt(parts.shift(), 10);
    }
    if (!_get(this.component, 'fields.month.hide', false)) {
      this.monthInput.value = parseInt(parts.shift(), 10);
    }
    if (!this.component.dayFirst && !_get(this.component, 'fields.day.hide', false)) {
      this.dayInput.value = parseInt(parts.shift(), 10);
    }
    if (!_get(this.component, 'fields.year.hide', false)) {
      this.yearInput.value = parseInt(parts.shift(), 10);
    }
  }

  /**
   * Get the format for the value string.
   * @returns {string}
   */
  get format() {
    let format = '';
    if (this.component.dayFirst && !_get(this.component, 'fields.day.hide', false)) {
      format += 'D/';
    }
    if (!_get(this.component, 'fields.month.hide', false)) {
      format += 'M/';
    }
    if (!this.component.dayFirst && !_get(this.component, 'fields.day.hide', false)) {
      format += 'D/';
    }
    if (!_get(this.component, 'fields.year.hide', false)) {
      format += 'YYYY';
    }
    return format;
  }

  /**
   * Return the date object for this component.
   * @returns {Date}
   */
  get date() {
    let day = this.dayInput.value;
    let month = this.monthInput.value;
    let year = this.yearInput.value;
    return moment([parseInt(year, 10), (parseInt(month, 10) - 1), parseInt(day, 10)]);
  }

  /**
   * Validate the date object.
   * @returns {Date}
   */
  getValidateValue() {
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
}
module.exports = DayComponent;
