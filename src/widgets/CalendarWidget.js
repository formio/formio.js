import Flatpickr from 'flatpickr';
import InputWidget from './InputWidget';
import {
  convertFormatToFlatpickr,
  convertFormatToMask, convertFormatToMoment,
  currentTimezone,
  formatDate,
  formatOffset,
  getDateSetting,
  getLocaleDateFormatInfo,
  loadZones
} from '../utils/utils';
import moment from 'moment';
import _ from 'lodash';
const DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm a';
const ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';

export default class CalendarWidget extends InputWidget {
  /* eslint-disable camelcase */
  static get defaultSettings() {
    return {
      type: 'calendar',
      altInput: true,
      allowInput: true,
      clickOpens: true,
      enableDate: true,
      enableTime: true,
      mode: 'single',
      noCalendar: false,
      format: DEFAULT_FORMAT,
      dateFormat: ISO_8601_FORMAT,
      useLocaleSettings: false,
      language: 'us-en',
      defaultDate: null,
      hourIncrement: 1,
      minuteIncrement: 5,
      time_24hr: false,
      displayInTimezone: '',
      timezone: '',
      minDate: '',
      maxDate: ''
    };
  }
  /* eslint-enable camelcase */

  constructor(settings, component) {
    super(settings, component);
    this.component.suffix = true;
  }

  attach(input) {
    super.attach(input);
    if (input && !input.getAttribute('placeholder')) {
      input.setAttribute('placeholder', this.settings.format);
    }

    const dateFormatInfo = getLocaleDateFormatInfo(this.settings.language);
    this.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'h:i K'
    };

    this.closedOn = 0;
    this.valueFormat = this.settings.dateFormat || ISO_8601_FORMAT;
    this.valueMomentFormat = convertFormatToMoment(this.valueFormat);
    this.settings.minDate = getDateSetting(this.settings.minDate);
    this.settings.maxDate = getDateSetting(this.settings.maxDate);
    this.settings.defaultDate = getDateSetting(this.settings.defaultDate);
    this.settings.altFormat = convertFormatToFlatpickr(this.settings.format);
    this.settings.dateFormat = convertFormatToFlatpickr(this.settings.dateFormat);
    this.settings.onChange = () => this.emit('update');
    this.settings.onClose = () => (this.closedOn = Date.now());
    this.settings.formatDate = (date, format) => {
      // Only format this if this is the altFormat and the form is readOnly.
      if (this.settings.readOnly && (format === this.settings.altFormat)) {
        if (!moment.zonesLoaded) {
          loadZones(this.timezone).then(() => this.redraw());
          return Flatpickr.formatDate(date, format);
        }

        return formatOffset(Flatpickr.formatDate.bind(Flatpickr), date, format, this.timezone, () => this.emit('redraw'));
      }

      return Flatpickr.formatDate(date, format);
    };

    if (this._input) {
      // Create a new flatpickr.
      this.calendar = new Flatpickr(this._input, this.settings);

      // Enforce the input mask of the format.
      this.setInputMask(this.calendar._input, convertFormatToMask(this.settings.format));

      // Make sure we commit the value after a blur event occurs.
      this.addEventListener(this.calendar._input, 'blur', () =>
        this.calendar.setDate(this.calendar._input.value, true, this.settings.altFormat)
      );
    }
  }

  get timezone() {
    if (this.settings.timezone) {
      return this.settings.timezone;
    }
    if (this.settings.displayInTimezone === 'submission' && this.settings.submissionTimezone) {
      return this.settings.submissionTimezone;
    }
    if (this.settings.displayInTimezone === 'utc') {
      return 'UTC';
    }

    // Return current timezone if none are provided.
    return currentTimezone();
  }

  get defaultSettings() {
    return CalendarWidget.defaultSettings;
  }

  addSuffix(container) {
    const suffix = this.ce('span', {
      class: 'input-group-addon',
      style: 'cursor: pointer'
    });
    suffix.appendChild(this.getIcon(this.settings.enableDate ? 'calendar' : 'time'));
    this.addEventListener(suffix, 'click', () => {
      if (this.calendar && !this.calendar.isOpen && ((Date.now() - this.closedOn) > 200)) {
        this.calendar.open();
      }
    });
    container.appendChild(suffix);
    return suffix;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (this.calendar) {
      this.calendar.close();
      this.calendar.redraw();
    }
  }

  get input() {
    return this.calendar ? this.calendar.altInput : null;
  }

  get localeFormat() {
    let format = '';

    if (this.settings.enableDate) {
      format += this.defaultFormat.date;
    }

    if (this.settings.enableTime) {
      format += this.defaultFormat.time;
    }

    return format;
  }

  get dateTimeFormat() {
    return this.settings.useLocaleSettings ? this.localeFormat : convertFormatToFlatpickr(this.dateFormat);
  }

  get dateFormat() {
    return _.get(this.settings, 'format', DEFAULT_FORMAT);
  }

  /**
   * Get the default date for the calendar.
   * @return {*}
   */
  get defaultDate() {
    return getDateSetting(this.settings.defaultDate);
  }

  get defaultValue() {
    const defaultDate = this.defaultDate;
    return defaultDate ? defaultDate.toISOString() : '';
  }

  getValue() {
    // Standard output format.
    if (!this.calendar || (this.valueFormat === ISO_8601_FORMAT)) {
      return super.getValue();
    }

    // Get the selected dates from the calendar widget.
    const dates = this.calendar.selectedDates;
    if (!dates || !dates.length) {
      return super.getValue();
    }

    // Return a formatted version of the date to store in string format.
    return (dates[0] instanceof Date) ?
      this.getView(dates[0], this.valueFormat) :
      'Invalid Date';
  }

  setValue(value) {
    if (!this.calendar) {
      return super.setValue(value);
    }
    if (value) {
      this.calendar.setDate(moment(value, this.valueMomentFormat).toDate(), false);
    }
    else {
      this.calendar.clear(false);
    }
  }

  getView(value, format) {
    format = format || this.dateFormat;
    return formatDate(value, format, this.timezone);
  }

  validationValue(value) {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value.map(val => new Date(val));
  }
}
