import { BaseComponent } from '../base/Base';
import Flatpickr from 'flatpickr';
import _get from 'lodash/get';
import _each from 'lodash/each';
import {
  getDateSetting,
  getLocalDateFormatInfo,
} from '../../utils';
export class DateTimeComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('date');
    this.closedOn = 0;
  }

  elementInfo() {
    const dateFormatInfo = getLocalDateFormatInfo();

    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    this.component.suffix = true;
    info.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'h:i K'
    };

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
   * Convert the format from the angular-datepicker module.
   * @param format
   * @return {string|XML|*}
   */
  convertFormat(format) {
    // Year conversion.
    format = format.replace(/y/g, 'Y');
    format = format.replace('YYYY', 'Y');
    format = format.replace('YY', 'y');

    // Month conversion.
    format = format.replace('MMMM', 'F');
    format = format.replace(/M/g, 'n');
    format = format.replace('nnn', 'M');
    format = format.replace('nn', 'm');

    // Day in month.
    format = format.replace(/d/g, 'j');
    format = format.replace('jj', 'd');

    // Day in week.
    format = format.replace('EEEE', 'l');
    format = format.replace('EEE', 'D');

    // Hours, minutes, seconds
    format = format.replace('HH', 'H');
    format = format.replace('hh', 'h');
    format = format.replace('mm', 'i');
    format = format.replace('ss', 'S');
    format = format.replace(/a/g, 'K');
    return format;
  }

  getLocaleFormat() {
    let format = '';

    if (this.component.enableDate) {
      format += this.info.defaultFormat.date;
    }

    if (this.component.enableTime) {
      format += this.info.defaultFormat.time;
    }

    return format;
  }

  get config() {
    return {
      altInput: true,
      clickOpens: true,
      enableDate: true,
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _get(this.component, 'enableTime', true),
      noCalendar: !_get(this.component, 'enableDate', true),
      altFormat: this.component.useLocaleSettings
        ? this.getLocaleFormat()
        : this.convertFormat(_get(this.component, 'format', '')),
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
      const calendar = this.getCalendar(input);
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
    const suffix = this.ce('span', {
      class: 'input-group-addon',
      style: 'cursor: pointer'
    });
    suffix.appendChild(this.getIcon(this.component.enableDate ? 'calendar' : 'time'));
    const calendar = this.getCalendar(input);
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
    const timestamp = parseInt(value, 10);
    if (!timestamp) {
      return null;
    }
    return (new Date(timestamp * 1000));
  }

  getRawValue() {
    const values = [];
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

    const calendar = this.getCalendar(this.inputs[index]);
    if (!calendar) {
      return super.getValueAt(index);
    }

    const dates = calendar.selectedDates;
    if (!dates || !dates.length) {
      return '';
    }

    return dates[0].toISOString();
  }

  setValueAt(index, value) {
    if (value) {
      const calendar = this.getCalendar(this.inputs[index]);
      if (!calendar) {
        return super.setValueAt(index, value);
      }

      calendar.setDate(value ? new Date(value) : new Date(), false);
    }
  }
}
