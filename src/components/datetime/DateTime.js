import { BaseComponent } from '../base/Base';
import Flatpickr from 'flatpickr';
import _get from 'lodash/get';
import _each from 'lodash/each';
import { getDateSetting } from '../../utils';
import moment from 'moment';
export class DateTimeComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('date');
    this.closedOn = 0;
  }

  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    this.component.suffix = true;
    return info;
  }

  /**
   * Get the default date for the calendar.
   * @return {*}
   */
  get defaultDate() {
    return getDateSetting(this.component.defaultDate);
  }

  // This select component can handle multiple items on its own.
  createWrapper() {
    return false;
  }

  /**
   * Convert the format from the angular-datepicker module to flatpickr format.
   * @param format
   * @return {string|XML|*}
   */
  convertFormatToFlatpickr(format) {
    return format
      // Year conversion.
      .replace(/y/g, 'Y')
      .replace('YYYY', 'Y')
      .replace('YY', 'y')

      // Month conversion.
      .replace('MMMM', 'F')
      .replace(/M/g, 'n')
      .replace('nnn', 'M')
      .replace('nn', 'm')

      // Day in month.
      .replace(/d/g, 'j')
      .replace('jj', 'd')

      // Day in week.
      .replace('EEEE', 'l')
      .replace('EEE', 'D')

      // Hours, minutes, seconds
      .replace('HH', 'H')
      .replace('hh', 'h')
      .replace('mm', 'i')
      .replace('ss', 'S')
      .replace(/a/g, 'K');
  }

  /**
   * Convert the format from the angular-datepicker module to moment format.
   * @param format
   * @return {string}
   */
  convertFormatToMoment(format) {
    return format
    // Year conversion.
    .replace(/y/g, 'Y')
    // Day in month.
    .replace(/d/g, 'D')
    // Day in week.
    .replace(/E/g, 'd')
    // AM/PM marker
    .replace(/a/g, 'A');
  }

  get config() {
    return {
      altInput: true,
      clickOpens: true,
      enableDate: true,
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _get(this.component, 'enableTime', true),
      noCalendar: !_get(this.component, 'enableDate', true),
      altFormat: this.convertFormatToFlatpickr(_get(this.component, 'format', '')),
      dateFormat: 'U',
      defaultDate: this.defaultDate,
      hourIncrement: _get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _get(this.component, 'timePicker.minuteStep', 5),
      minDate: getDateSetting(_get(this.component, 'datePicker.minDate')),
      maxDate: getDateSetting(_get(this.component, 'datePicker.maxDate')),
      onChange: () => this.onChange(),
      onClose: () => (this.closedOn = Date.now())
    };
  }

  set disabled(disabled) {
    super.disabled = disabled;
    _each(this.inputs, (input) => {
      let calendar = this.getCalendar(input);
      if (calendar) {
        if (disabled) {
          calendar._input.setAttribute('disabled', 'disabled');
        }
        else {
          calendar._input.removeAttribute('disabled');
        }
        calendar.redraw();
      }
    });
  }

  addSuffix(input, inputGroup) {
    let suffix = this.ce('span', {
      class: 'input-group-addon',
      style: 'cursor: pointer'
    });
    suffix.appendChild(this.getIcon(this.component.enableDate ? 'calendar' : 'time'));
    let calendar = this.getCalendar(input);
    if (calendar) {
      this.addEventListener(suffix, 'click', () => {
        // Make sure the calendar is not already open and that it did not just close (like from blur event).
        if (!calendar.isOpen && ((Date.now() - this.closedOn) > 200)) {
          calendar.open();
        }
      });
    }
    inputGroup.appendChild(suffix);
    return suffix;
  }

  /**
   * Get the calendar or create an instance of one.
   * @param input
   * @return {Flatpickr|flatpickr}
   */
  getCalendar(input) {
    if (!input.calendar && !this.options.noCalendar) {
      input.calendar = new Flatpickr(input, this.config);
    }
    return input.calendar;
  }

  getDate(value) {
    let timestamp = parseInt(value, 10);
    if (!timestamp) {
      return null;
    }
    return (new Date(timestamp * 1000));
  }

  getRawValue() {
    let values = [];
    for (let i in this.inputs) {
      if (this.inputs.hasOwnProperty(i)) {
        if (!this.component.multiple) {
          return this.getDate(this.inputs[i].value);
        }
        values.push(this.getDate(this.inputs[i].value));
      }
    }
    return values;
  }

  getValueAt(index) {
    if (!this.inputs[index]) {
      return '';
    }

    let calendar = this.getCalendar(this.inputs[index]);
    if (!calendar) {
      return super.getValueAt(index);
    }

    let dates = calendar.selectedDates;
    if (!dates || !dates.length) {
      return '';
    }

    return dates[0].toISOString();
  }

  get view() {
    const value = this.getValue();
    return value ? moment(value).format(this.convertFormatToMoment(_get(this.component, 'format', ''))) : null;
  }

  setValueAt(index, value) {
    if (value) {
      let calendar = this.getCalendar(this.inputs[index]);
      if (!calendar) {
        return super.setValueAt(index, value);
      }

      calendar.setDate(value ? new Date(value) : new Date(), false);
    }
  }
}
