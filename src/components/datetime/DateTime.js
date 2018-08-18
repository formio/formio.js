import Flatpickr from 'flatpickr';
import _ from 'lodash';
import moment from 'moment';
import BaseComponent from '../base/Base';

import {
  currentTimezone,
  getDateSetting,
  loadZones,
  formatDate,
  formatOffset,
  getLocaleDateFormatInfo,
  convertFormatToFlatpickr,
} from '../../utils/utils';

export default class DateTimeComponent extends BaseComponent {
  static get DEFAULT_FORMAT() {
    return 'yyyy-MM-dd hh:mm a';
  }

  static schema(...extend) {
    return BaseComponent.schema({
      type: 'datetime',
      label: 'Date / Time',
      key: 'dateTime',
      format: DateTimeComponent.DEFAULT_FORMAT,
      useLocaleSettings: false,
      allowInput: true,
      enableDate: true,
      enableTime: true,
      defaultDate: '',
      displayInTimezone: 'viewer',
      timezone: '',
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

  get defaultValue() {
    const defaultValue = super.defaultValue;
    if (defaultValue) {
      return defaultValue;
    }

    // Check the default date.
    const defaultDate = this.defaultDate;
    if (defaultDate) {
      return defaultDate.toISOString();
    }

    return '';
  }

  elementInfo() {
    // Default the placeholder to the format if none is present.
    if (!this.component.placeholder) {
      this.component.placeholder = _.get(this.component, 'format', DateTimeComponent.DEFAULT_FORMAT);
    }
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    this.component.suffix = true;
    return info;
  }

  get emptyValue() {
    return '';
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

  get localeFormat() {
    const dateFormatInfo = getLocaleDateFormatInfo(this.options.language);
    this.defaultFormat = this.defaultFormat || {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'h:i K'
    };
    let format = '';

    if (this.component.enableDate) {
      format += this.defaultFormat.date;
    }

    if (this.component.enableTime) {
      format += this.defaultFormat.time;
    }

    return format;
  }

  get dateTimeFormat() {
    return this.component.useLocaleSettings
      ? this.localeFormat
      : convertFormatToFlatpickr(_.get(this.component, 'format', DateTimeComponent.DEFAULT_FORMAT));
  }

  get timezone() {
    const timezone = this.component.timezone || this.options.timezone;
    if (timezone) {
      return timezone;
    }
    if (this.component.displayInTimezone === 'submission') {
      if (this.options.submissionTimezone) {
        return this.options.submissionTimezone;
      }
      if (this.root && this.root.options && this.root.options.submissionTimezone) {
        return this.root.options.submissionTimezone;
      }
    }
    if (this.component.displayInTimezone === 'utc') {
      return 'UTC';
    }

    // Return current timezone if none are provided.
    return currentTimezone();
  }

  get config() {
    const altFormat = this.dateTimeFormat;
    /* eslint-disable camelcase */
    return {
      altInput: true,
      allowInput: _.get(this.component, 'allowInput', true),
      clickOpens: true,
      enableDate: true,
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _.get(this.component, 'enableTime', true),
      noCalendar: !_.get(this.component, 'enableDate', true),
      altFormat: altFormat,
      dateFormat: 'U',
      defaultDate: this.defaultDate,
      hourIncrement: _.get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _.get(this.component, 'timePicker.minuteStep', 5),
      time_24hr: !_.get(this.component, 'timePicker.showMeridian', true),
      minDate: getDateSetting(_.get(this.component, 'datePicker.minDate')),
      maxDate: getDateSetting(_.get(this.component, 'datePicker.maxDate')),
      onChange: () => this.onChange({ noValidate: true }),
      onClose: () => this.closedOn = Date.now(),
      formatDate: (date, format) => {
        // Only format this if this is the altFormat and the form is readOnly.
        if (this.options.readOnly && (format === altFormat)) {
          if (!moment.zonesLoaded) {
            loadZones(this.timezone).then(() => this.redraw());
            return Flatpickr.formatDate(date, format);
          }

          return formatOffset(Flatpickr.formatDate.bind(Flatpickr), date, format, this.timezone, () => this.redraw());
        }

        return Flatpickr.formatDate(date, format);
      }
    };
    /* eslint-enable camelcase */
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
        calendar.close();
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
      this.addFocusBlurEvents(input.calendar.altInput);
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
    if (!value) {
      return '';
    }
    return formatDate(value, _.get(this.component, 'format', DateTimeComponent.DEFAULT_FORMAT), this.timezone);
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
        calendar.clear(false);
      }
    }
  }

  focus() {
    const input = this.inputs[0];
    if (input && !this.options.readOnly) {
      input.calendar.altInput.focus();
    }
  }
}
