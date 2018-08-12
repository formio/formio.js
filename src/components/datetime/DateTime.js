import Flatpickr from 'flatpickr';
import _ from 'lodash';

import Input from '../_classes/input/Input';

import {
  getDateSetting,
  getLocaleDateFormatInfo,
  convertFormatToFlatpickr,
  convertFormatToMoment,
} from '../../utils/utils';
import moment from 'moment';

export default class DateTimeComponent extends Input {
  static schema(...extend) {
    return Input.schema({
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
      icon: 'calendar-plus-o',
      documentation: 'http://help.form.io/userguide/#datetime',
      weight: 40,
      schema: DateTimeComponent.schema()
    };
  }

  init() {
    super.init();
    this.validators.push('date');
    this.closedOn = 0;
    const dateFormatInfo = getLocaleDateFormatInfo(this.options.language);
    this.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'h:i K'
    };
  }

  get offset() {
    return parseInt(_.get(this, 'root.submission.metadata.timezone', moment().utcOffset()), 10);
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

  get inputInfo() {
    const info = super.inputInfo;
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    this.component.suffix = this.getIcon(this.component.enableDate ? 'calendar' : 'time', null, 'cursor: pointer', 'dateTimeToggle');
    return info;
  }

  get emptyValue() {
    return '';
  }

  attach(element) {
    this.loadRefs(element, { dateTimeToggle: 'multiple' });
    super.attach(element);
    this.disabled = this.shouldDisable;
  }

  detach() {
    if (!this.attached) {
      return;
    }

    // Clean up clalendars.
    this.refs.input.forEach(input => {
      if (input.calendar) {
        input.calendar.destroy();
      }
    });
    super.detach();
  }

  attachElement(input, index) {
    if (!input.calendar && !this.options.noCalendar) {
      input.calendar = new Flatpickr(input, this.config);
      this.addEventListener(this.refs.dateTimeToggle[index], 'click', () => {
        // Make sure the calendar is not already open and that it did not just close (like from blur event).
        if (!input.calendar.isOpen && ((Date.now() - this.closedOn) > 200)) {
          input.calendar.open();
        }
      });
    }
  }

  /**
   * Get the default date for the calendar.
   * @return {*}
   */
  get defaultDate() {
    return getDateSetting(this.component.defaultDate);
  }

  useWrapper() {
    return false;
  }

  get localeFormat() {
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
      ? this.localeFormat()
      : convertFormatToFlatpickr(_.get(this.component, 'format', 'yyyy-MM-dd HH:mm a'));
  }

  timeZone(date) {
    // Modern browsers have Intl to get the timezone name of this offset.
    if (Intl && Intl.DateTimeFormat && navigator && navigator.languages && navigator.languages.length) {
      const matches = (new Intl.DateTimeFormat(navigator.languages[0], {
        timeZoneName: 'short'
      })).format(date).match(/, (.+)$/);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }
    return moment(date).format('Z');
  }

  get config() {
    const altFormat = this.dateTimeFormat;
    /* eslint-disable camelcase */
    return {
      altInput: true,
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
          const newDate = moment(date).utcOffset(this.offset).toDate();
          return `${Flatpickr.formatDate(newDate, format)} (${this.timeZone(newDate)})`;
        }

        return Flatpickr.formatDate(date, format);
      }
    };
    /* eslint-enable camelcase */
  }

  set disabled(disabled) {
    super.disabled = disabled;
    _.each(this.refs.input, (input) => {
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

  /**
   * Get the calendar or create an instance of one.
   * @param input
   * @return {Flatpickr|flatpickr}
   */
  getCalendar(input) {
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
    for (const i in this.refs.input) {
      if (this.refs.input.hasOwnProperty(i)) {
        if (!this.component.multiple) {
          return this.getDate(this.refs.input[i].value);
        }
        values.push(this.getDate(this.refs.input[i].value));
      }
    }
    return values;
  }

  getValueAt(index) {
    if (!this.refs.input[index]) {
      return '';
    }

    const calendar = this.getCalendar(this.refs.input[index]);
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
    const date = moment(value).utcOffset(this.offset);
    const dateFormat = convertFormatToMoment(_.get(this.component, 'format', 'yyyy-MM-dd HH:mm a'));
    return `${date.format(dateFormat)} (${this.timeZone(date.toDate())})`;
  }

  setValueAt(index, value) {
    // Convert to a standard ISO-8601 format. Needed for proper IE function.
    if (value) {
      value = moment(value).toISOString();
    }

    super.setValueAt(index, value);
    const calendar = this.getCalendar(this.refs.input[index]);
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
    const input = this.refs.input[0];
    if (input && !this.options.readOnly) {
      input.calendar.altInput.focus();
    }
  }
}
