import Flatpickr from 'flatpickr';
import _ from 'lodash';

import BaseComponent from '../base/Base';

import {
  getDateSetting,
  getLocaleDateFormatInfo,
  convertFormatToFlatpickr,
  convertFormatToMoment,
} from '../../utils/utils';
import moment from 'moment';

export default class DateTimeComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'datetime',
      label: 'Date / Time',
      key: 'dateTime',
      format: 'yyyy-MM-dd HH:mm a',
      enableDate: true,
      enableTime: true,
      defaultDate: '',
      datepickerMode: 'day',
      datePicker: {
        showWeeks: true,
        startingDay: 0,
        initDate: '',
        minMode: 'day',
        maxMode: 'year',
        yearRows: 4,
        yearColumns: 5,
        minDate: null,
        maxDate: null
      },
      timePicker: {
        hourStep: 1,
        minuteStep: 1,
        showMeridian: true,
        readonlyInput: false,
        mousewheel: true,
        arrowkeys: true
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Date / Time',
      group: 'advanced',
      icon: 'fa fa-calendar-plus-o',
      documentation: 'http://help.form.io/userguide/#datetime',
      weight: 40,
      schema: DateTimeComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('date');
    this.closedOn = 0;

    const dateFormatInfo = getLocaleDateFormatInfo(this.options.language);
    this.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'h:i K'
    };
  }

  get defaultSchema() {
    return DateTimeComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    this.component.suffix = true;
    return info;
  }

  get emptyValue() {
    return 0;
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

  getLocaleFormat() {
    let format = '';

    if (this.component.enableDate) {
      format += this.defaultFormat.date;
    }

    if (this.component.enableTime) {
      format += this.defaultFormat.time;
    }

    return format;
  }

  get config() {
    return {
      altInput: true,
      clickOpens: true,
      enableDate: true,
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _.get(this.component, 'enableTime', true),
      noCalendar: !_.get(this.component, 'enableDate', true),
      altFormat: this.component.useLocaleSettings
        ? this.getLocaleFormat()
        : convertFormatToFlatpickr(_.get(this.component, 'format', '')),
      dateFormat: 'U',
      defaultDate: this.defaultDate,
      hourIncrement: _.get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _.get(this.component, 'timePicker.minuteStep', 5),
      minDate: getDateSetting(_.get(this.component, 'datePicker.minDate')),
      maxDate: getDateSetting(_.get(this.component, 'datePicker.maxDate')),
      onChange: () => this.onChange(),
      onClose: () => (this.closedOn = Date.now())
    };
  }

  set disabled(disabled) {
    super.disabled = disabled;
    _.each(this.inputs, (input) => {
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

  get validationValue() {
    const values = [];
    for (const i in this.inputs) {
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

    return (typeof dates[0].toISOString === 'function') ? dates[0].toISOString() : 'Invalid Date';
  }

  getView(value) {
    return value ? moment(value).format(convertFormatToMoment(_.get(this.component, 'format', ''))) : '';
  }

  setValueAt(index, value) {
    // Convert to a standard ISO-8601 format. Needed for proper IE function.
    if (value) {
      value = moment(value).toISOString();
    }

    super.setValueAt(index, value);
    const calendar = this.getCalendar(this.inputs[index]);
    if (calendar) {
      if (value) {
        calendar.setDate(new Date(value), false);
      }
      else {
        calendar.clear();
      }
    }
  }

  focus() {
    const input = this.inputs[0];
    if (input) {
      input.calendar.altInput.focus();
    }
  }
}
