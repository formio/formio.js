import Flatpickr from 'flatpickr';
import _ from 'lodash';
import moment from 'moment';
import Input from '../_classes/input/Input';
import { Utils as FormioUtils } from '../../utils';
import {
  convertFormatToFlatpickr,
  convertFormatToMask,
  convertFormatToMoment,
  currentTimezone,
  formatDate,
  formatOffset,
  getDateSetting,
  getLocaleDateFormatInfo,
  momentDate,
  zonesLoaded,
  shouldLoadZones,
  loadZones
} from '../../utils/utils';

const DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm a';
const ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';

export default class DateTimeComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      type: 'datetime',
      label: 'Date / Time',
      key: 'dateTime',
      format: 'yyyy-MM-dd hh:mm a',
      useLocaleSettings: false,
      allowInput: true,
      enableDate: true,
      enableTime: true,
      defaultValue: '',
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
      },
      customOptions: {},
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Date / Time',
      group: 'advanced',
      icon: 'calendar',
      documentation: 'http://help.form.io/userguide/#datetime',
      weight: 40,
      schema: DateTimeComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    const timezone = (this.component.timezone || this.options.timezone);
    const time24hr = !_.get(this.component, 'timePicker.showMeridian', true);

    this.calendars = [];

    // Change the format to map to the settings.
    if (!this.component.enableDate) {
      this.component.format = this.component.format.replace(/yyyy-MM-dd /g, '');
    }
    if (!this.component.enableTime) {
      this.component.format = this.component.format.replace(/ hh:mm a$/g, '');
    }
    else if (time24hr) {
      this.component.format = this.component.format.replace(/hh:mm a$/g, 'HH:mm');
    }
    else {
      this.component.format = this.component.format.replace(/HH:mm$/g, 'hh:mm a');
    }

    let customOptions = this.component.customOptions || {};

    if (typeof customOptions === 'string') {
      try {
        customOptions = JSON.parse(customOptions);
      }
      catch (err) {
        console.warn(err.message);
        customOptions = {};
      }
    }

    /* eslint-disable camelcase */
    this.calOptions = {
      type: 'calendar',
      altInput: true,
      timezone,
      displayInTimezone: _.get(this.component, 'displayInTimezone', 'viewer'),
      submissionTimezone: this.submissionTimezone,
      language: this.options.language,
      useLocaleSettings: _.get(this.component, 'useLocaleSettings', false),
      allowInput: _.get(this.component, 'allowInput', true),
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _.get(this.component, 'enableTime', true),
      noCalendar: !_.get(this.component, 'enableDate', true),
      format: this.component.format || DEFAULT_FORMAT,
      dateFormat: this.component.dataFormat || ISO_8601_FORMAT,
      hourIncrement: _.get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _.get(this.component, 'timePicker.minuteStep', 5),
      time_24hr: time24hr,
      readOnly: this.options.readOnly,
      minDate: _.get(this.component, 'datePicker.minDate'),
      disabledDates: _.get(this.component, 'datePicker.disable'),
      disableWeekends: _.get(this.component, 'datePicker.disableWeekends'),
      disableWeekdays: _.get(this.component, 'datePicker.disableWeekdays'),
      disableFunction: _.get(this.component, 'datePicker.disableFunction'),
      maxDate: _.get(this.component, 'datePicker.maxDate'),
      ...customOptions,
    };
    /* eslint-enable camelcase */

    // Add the validators date.
    this.validators.push('date');
  }

  get defaultSchema() {
    return DateTimeComponent.schema();
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (!defaultValue && this.component.defaultDate) {
      defaultValue = FormioUtils.getDateSetting(this.component.defaultDate);
      defaultValue = defaultValue ? defaultValue.toISOString() : '';
    }
    return defaultValue;
  }

  get emptyValue() {
    return '';
  }

  get timezone() {
    if (this.calOptions.timezone) {
      return this.calOptions.timezone;
    }
    if (this.calOptions.displayInTimezone === 'submission' && this.calOptions.submissionTimezone) {
      return this.calOptions.submissionTimezone;
    }
    if (this.calOptions.displayInTimezone === 'utc') {
      return 'UTC';
    }

    // Return current timezone if none are provided.
    return currentTimezone();
  }

  get disabledDates() {
    if (this.calOptions.disabledDates) {
      const disabledDates = this.calOptions.disabledDates.split(',');
      return disabledDates.map((item) => {
        const dateMask = /\d{4}-\d{2}-\d{2}/g;
        const dates = item.match(dateMask);
        if (dates.length) {
          return dates.length === 1 ?  item.match(dateMask)[0] : {
            from: item.match(dateMask)[0],
            to: item.match(dateMask)[1],
          };
        }
      });
    }
    return [];
  }

  get localeFormat() {
    let format = '';

    if (this.calOptions.enableDate) {
      format += this.defaultFormat.date;
    }

    if (this.calOptions.enableTime) {
      format += this.defaultFormat.time;
    }

    return format;
  }

  get dateTimeFormat() {
    return this.calOptions.useLocaleSettings ? this.localeFormat : convertFormatToFlatpickr(this.dateFormat);
  }

  get dateFormat() {
    return _.get(this.calOptions, 'format', DEFAULT_FORMAT);
  }


  get disableWeekends() {
    return function(date) {
      return (date.getDay() === 0 || date.getDay() === 6);
    };
  }

  get disableWeekdays() {
    return (date) => !this.disableWeekends(date);
  }

  get disableFunction() {
    return (date) => this.evaluate(`return ${this.calOptions.disableFunction}`, {
      date
    });
  }

  get disabled() {
    return super.disabled;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (this.calendars) {
      this.calendars.forEach((calendar) => {
        if (disabled) {
          calendar._input.setAttribute('disabled', 'disabled');
        }
        else {
          calendar._input.removeAttribute('disabled');
        }
        calendar.close();
        calendar.redraw();
      });
    }
  }

  /**
   * Load the timezones.
   *
   * @return {boolean} TRUE if the zones are loading, FALSE otherwise.
   */
  loadZones() {
    const timezone = this.timezone;
    if (!zonesLoaded() && shouldLoadZones(timezone)) {
      loadZones(timezone).then(() => this.emit('redraw'));

      // Return zones are loading.
      return true;
    }

    // Zones are already loaded.
    return false;
  }

  isEmpty(value = this.dataValue) {
    if (value && (value.toString() === 'Invalid Date')) {
      return true;
    }
    return super.isEmpty(value);
  }

  formatValue(input) {
    const result = moment.utc(input).toISOString();
    return result === 'Invalid date' ? input : result;
  }

  isEqual(valueA, valueB = this.dataValue) {
    const format = FormioUtils.convertFormatToMoment(this.component.format);
    return (this.isEmpty(valueA) && this.isEmpty(valueB))
      || moment.utc(valueA).format(format) === moment.utc(valueB).format(format);
  }

  createWrapper() {
    return false;
  }

  attach(element) {
    const result = super.attach(element);
    this.refs.suffix.forEach((suffix, index) => {
      this.addEventListener(suffix, 'click', () => {
        if (this.calendars[index] && !this.calendars[index].isOpen && ((Date.now() - this.closedOn) > 200)) {
          this.calendars[index].open();
        }
      });
    });
    return result;
  }

  attachElement(input, index) {
    if (input && !input.getAttribute('placeholder')) {
      input.setAttribute('placeholder', this.calOptions.format);
    }

    const dateFormatInfo = getLocaleDateFormatInfo(this.calOptions.language);
    this.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'G:i K'
    };

    this.closedOn = 0;
    this.valueFormat = this.calOptions.dateFormat || ISO_8601_FORMAT;

    this.valueMomentFormat = convertFormatToMoment(this.valueFormat);
    this.calOptions.minDate = getDateSetting(this.calOptions.minDate);
    this.calOptions.disable = this.disabledDates;
    this.calOptions.disableWeekends ? this.calOptions.disable.push(this.disableWeekends) : '';
    this.calOptions.disableWeekdays ? this.calOptions.disable.push(this.disableWeekdays) : '';
    this.calOptions.disableFunction ? this.calOptions.disable.push(this.disableFunction) : '';
    this.calOptions.maxDate = getDateSetting(this.calOptions.maxDate);
    this.calOptions.wasDefaultValueChanged = false;
    this.calOptions.defaultValue = '';
    this.calOptions.altFormat = convertFormatToFlatpickr(this.calOptions.format);
    this.calOptions.dateFormat = convertFormatToFlatpickr(this.calOptions.dateFormat);
    this.calOptions.onChange = () => this.updateValue();
    this.calOptions.onClose = () => {
      this.closedOn = Date.now();
      if (this.calOptions.wasDefaultValueChanged) {
        this.calendars[index]._input.value = this.calOptions.defaultValue;
        this.calOptions.wasDefaultValueChanged = false;
      }
      if (this.calendars[index]) {
        this.emit('blur');
      }
    };
    this.calOptions.formatDate = (date, format) => {
      // Only format this if this is the altFormat and the form is readOnly.
      if (this.calOptions.readOnly && (format === this.calOptions.altFormat)) {
        if (this.dataType === 'string' || !this.calOptions.enableTime || this.loadZones()) {
          return Flatpickr.formatDate(date, format);
        }

        return formatOffset(Flatpickr.formatDate.bind(Flatpickr), date, format, this.timezone);
      }

      return Flatpickr.formatDate(date, format);
    };

    if (this.refs.input[index]) {
      // Create a new flatpickr.
      this.calendars[index] = new Flatpickr(this.refs.input[index], this.calOptions);
      this.calendars[index].altInput.addEventListener('input', (event) => {
        if (event.target.value === '' && this.calendars[index].selectedDates.length > 0) {
          this.calOptions.wasDefaultValueChanged = true;
          this.calOptions.defaultValue = event.target.value;
          this.calendars[index].clear();
        }
        else {
          this.calOptions.wasDefaultValueChanged = false;
        }
      });

      if (!this.options.readOnly) {
        // Enforce the input mask of the format.
        this.setInputMask(this.calendars[index]._input, convertFormatToMask(this.calOptions.format));
      }

      // Make sure we commit the value after a blur event occurs.
      this.addEventListener(this.calendars[index]._input, 'blur', () =>
        this.calendars[index].setDate(this.calendars[index]._input.value, true, this.calOptions.altFormat)
      );
    }
  }

  /**
   * Return the date value.
   *
   * @param date
   * @param format
   * @return {string}
   */
  getDateValue(date, format) {
    return moment(date, this.valueMomentFormat).format(convertFormatToMoment(format));
  }

  /**
   * Return the value of the selected date.
   *
   * @return {*}
   */
  getValueAt(index) {
    // Standard output format.
    if (!this.calendar) {
      return super.getValueAt(index);
    }

    // Get the selected dates from the calendar widget.
    const dates = this.calendars[index].selectedDates;
    if (!dates || !dates.length) {
      return super.getValueAt(index);
    }

    if (!(dates[0] instanceof Date)) {
      return 'Invalid Date';
    }

    return this.getDateValue(dates[0], this.valueFormat);
  }

  /**
   * Set the selected date value.
   *
   * @param value
   */
  setValueAt(index, value) {
    if (!this.calendars[index]) {
      return super.setValueAt(value, index);
    }
    if (value) {
      if ((this.dataType !== 'string') && this.options.readOnly && !this.loadZones()) {
        this.calendars[index].setDate(momentDate(value, this.valueFormat, this.timezone).toDate(), false);
      }
      else {
        this.calendars[index].setDate(moment(value, this.valueMomentFormat).toDate(), false);
      }
    }
    else {
      this.calendars[index].clear(false);
    }
  }

  detach() {
    this.calendars.forEach((calendar) => calendar.destroy());
    this.calendars = [];
    super.detach();
  }

  normalizeValue(value) {
    if (!value) {
      return '';
    }
    switch(this.component.dataType) {
      case 'string':
        return this.getDateValue(value, this.dateFormat);
      case 'date':
      default:
        return momentDate(value, this.valueFormat, this.timezone).toISOString();
    }
  }

  checkValidity(data, dirty, rowData) {
    this.calendars.forEach((calendar) => {
      if (calendar.enteredDate) {
        dirty = true;
      }
    });
    return super.checkValidity(data, dirty, rowData);
  }

  getValueAsString(value, format) {
    if (!value) {
      return '';
    }
    format = format || this.dateFormat;
    if (this.dataType === 'string') {
      return this.getDateValue(value, format);
    }

    return formatDate(value, format, this.timezone);
  }

  validationValue(value) {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value.map(val => new Date(val));
  }

  focus() {
    if (this.refs.input && this.refs.input[0]) {
      const sibling = this.refs.input[0].nextSibling;
      if (sibling) {
        sibling.focus();
      }
    }
  }
}
