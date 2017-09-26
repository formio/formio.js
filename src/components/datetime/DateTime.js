import { BaseComponent } from '../base/Base';
import Flatpickr from 'flatpickr';
import _get from 'lodash/get';
import _each from 'lodash/each';
const momentModule = require('moment');
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
    if (!this.component.defaultDate) {
      return null;
    }

    let defaultDate = new Date(this.component.defaultDate);
    if (!defaultDate || isNaN(defaultDate.getDate())) {
      try {
        let moment = momentModule;
        defaultDate = new Date(eval(this.component.defaultDate));
      }
      catch (e) {
        defaultDate = null;
      }
    }

    // Ensure this is a date.
    if (defaultDate && isNaN(defaultDate.getDate())) {
      defaultDate = null;
    }

    return defaultDate;
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

  get config() {
    return {
      altInput: true,
      clickOpens: true,
      enableDate: true,
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _get(this.component, 'enableTime', true),
      noCalendar: !_get(this.component, 'enableDate', true),
      altFormat: this.convertFormat(_get(this.component, 'format', '')),
      dateFormat: 'U',
      defaultDate: this.defaultDate,
      hourIncrement: _get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _get(this.component, 'timePicker.minuteStep', 5),
      minDate: _get(this.component, 'datePicker.minDate'),
      maxDate: _get(this.component, 'datePicker.maxDate'),
      onChange: () => this.onChange(),
      onClose: () => (this.closedOn = Date.now())
    };
  }

  set disabled(disabled) {
    super.disabled = disabled;
    _each(this.inputs, (input) => {
      if (input.calendar) {
        input.calendar.redraw();
      }
    });
  }

  addSuffix(input, inputGroup) {
    let suffix = this.ce('span', {
      class: 'input-group-addon',
      style: 'cursor: pointer'
    });
    suffix.appendChild(this.getIcon(this.component.enableDate ? 'calendar' : 'time'));
    this.addEventListener(suffix, 'click', () => {
      // Make sure the calendar is not already open and that it did not just close (like from blur event).
      if (!input.calendar.isOpen && ((Date.now() - this.closedOn) > 200)) {
        input.calendar.open();
      }
    });
    inputGroup.appendChild(suffix);
    return suffix;
  }

  addInput(input, container, name) {
    super.addInput(input, container, name);
    input.calendar = new Flatpickr(input, this.config);
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
      if (!this.component.multiple) {
        return this.getDate(this.inputs[i].value);
      }
      values.push(this.getDate(this.inputs[i].value));
    }
    return values;
  }

  getValueAt(index) {
    if (!this.inputs[index] || !this.inputs[index].calendar) {
      return '';
    }

    let dates = this.inputs[index].calendar.selectedDates;
    if (!dates || !dates.length) {
      return '';
    }

    return dates[0].toISOString();
  }

  setValueAt(index, value) {
    if (value && this.inputs[index].calendar) {
      let date = value ? new Date(value) : new Date();
      this.inputs[index].calendar.setDate(date, false);
    }
  }
}
