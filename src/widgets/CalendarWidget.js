import Formio from '../Formio';
import InputWidget from './InputWidget';
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
} from '../utils/utils';
import moment from 'moment';
import _ from 'lodash';
const DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm a';
const ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
const CDN_URL = 'https://cdn.form.io/';

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
      hourIncrement: 1,
      minuteIncrement: 5,
      time_24hr: false,
      saveAs: 'date',
      displayInTimezone: '',
      timezone: '',
      disable: [],
      minDate: '',
      maxDate: ''
    };
  }
  /* eslint-enable camelcase */

  constructor(settings, component) {
    super(settings, component);
    // Change the format to map to the settings.
    if (this.settings.noCalendar) {
      this.settings.format = this.settings.format.replace(/yyyy-MM-dd /g, '');
    }
    if (!this.settings.enableTime) {
      this.settings.format = this.settings.format.replace(/ hh:mm a$/g, '');
    }
    else if (this.settings.time_24hr) {
      this.settings.format = this.settings.format.replace(/hh:mm a$/g, 'HH:mm');
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

  attach(input) {
    const superAttach = super.attach(input);
    this.setPlaceholder(input);

    const dateFormatInfo = getLocaleDateFormatInfo(this.settings.language);
    this.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'G:i K'
    };

    this.closedOn = 0;
    this.valueFormat = this.settings.dateFormat || ISO_8601_FORMAT;

    this.valueMomentFormat = convertFormatToMoment(this.valueFormat);
    this.settings.minDate = getDateSetting(this.settings.minDate);
    this.settings.disable = this.disabledDates;
    this.settings.disableWeekends ? this.settings.disable.push(this.disableWeekends) : '';
    this.settings.disableWeekdays ? this.settings.disable.push(this.disableWeekdays) : '';
    this.settings.disableFunction ? this.settings.disable.push(this.disableFunction) : '';
    this.settings.maxDate = getDateSetting(this.settings.maxDate);
    this.settings.wasDefaultValueChanged = false;
    this.settings.defaultValue = '';
    this.settings.manualInputValue = '';
    this.settings.isManuallyOverriddenValue = false;
    this.settings.altFormat = convertFormatToFlatpickr(this.settings.format);
    this.settings.dateFormat = convertFormatToFlatpickr(this.settings.dateFormat);
    this.settings.onChange = () => {
      if (this.settings.allowInput) {
        if (this.settings.isManuallyOverriddenValue && this.settings.enableTime) {
          this.calendar._input.value = this.settings.manualInputValue;
        }
        else {
          this.settings.manualInputValue = '';
        }

        this.settings.isManuallyOverriddenValue = false;
      }

      this.emit('update');
    };
    this.settings.onOpen = () => this.hook('onCalendarOpen');
    this.settings.onClose = () => {
      this.hook('onCalendarClose');
      this.closedOn = Date.now();

      if (this.settings.allowInput && this.settings.enableTime) {
        this.calendar._input.value = this.settings.manualInputValue || this.calendar._input.value;
        this.settings.isManuallyOverriddenValue = false;
      }

      if (this.settings.wasDefaultValueChanged) {
        this.calendar._input.value = this.settings.defaultValue;
        this.settings.wasDefaultValueChanged = false;
      }
      if (this.calendar) {
        this.emit('blur');
      }
    };

    Formio.requireLibrary('flatpickr-css', 'flatpickr-css', [
      { type: 'styles', src: `${CDN_URL}${this.flatpickrType}/flatpickr.min.css` }
    ], true);

    return superAttach
      .then(() => {
        return Formio.requireLibrary('flatpickr', 'flatpickr', `${CDN_URL}${this.flatpickrType}/flatpickr.min.js`, true)
          .then((Flatpickr) => {
            this.settings.formatDate = (date, format) => {
              // Only format this if this is the altFormat and the form is readOnly.
              if (this.settings.readOnly && (format === this.settings.altFormat)) {
                if (this.settings.saveAs === 'text' || !this.settings.enableTime || this.loadZones()) {
                  return Flatpickr.formatDate(date, format);
                }

                return formatOffset(Flatpickr.formatDate.bind(Flatpickr), date, format, this.timezone);
              }

              return Flatpickr.formatDate(date, format);
            };

            if (this._input) {
              // Create a new flatpickr.
              this.calendar = new Flatpickr(this._input, this.settings);
              this.calendar.altInput.addEventListener('input', (event) => {
                if (this.settings.allowInput) {
                  this.settings.manualInputValue = event.target.value;
                  this.settings.isManuallyOverriddenValue = true;
                }

                if (event.target.value === '' && this.calendar.selectedDates.length > 0) {
                  this.settings.wasDefaultValueChanged = true;
                  this.settings.defaultValue = event.target.value;
                  this.calendar.clear();
                }
                else {
                  this.settings.wasDefaultValueChanged = false;
                }
              });

              if (!this.settings.readOnly) {
                // Enforce the input mask of the format.
                this.setInputMask(this.calendar._input, convertFormatToMask(this.settings.format));
              }

              // Make sure we commit the value after a blur event occurs.
              this.addEventListener(this.calendar._input, 'blur', (event) => {
                if (!event.relatedTarget?.className.split(/\s+/).includes('flatpickr-day')) {
                  this.calendar.setDate(this.calendar.input.value, true, this.settings.altFormat);
                }
              });
            }
          });
      });
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
    return (date) => this.evaluate(`return ${this.settings.disableFunction}`, {
      date
    });
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

  addSuffix(suffix) {
    this.addEventListener(suffix, 'click', (event) => {
      event.stopPropagation();

      if (this.calendar) {
        if (!this.calendar.isOpen && ((Date.now() - this.closedOn) > 200)) {
          this.calendar.open();
        }
        else if (this.calendar.isOpen) {
          this.calendar.close();
        }
      }
    });

    return suffix;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (this.calendar) {
      if (disabled) {
        this.calendar._input.setAttribute('disabled', 'disabled');
      }
      else {
        this.calendar._input.removeAttribute('disabled');
      }
      this.calendar.close();
      this.calendar.redraw();
    }
  }

  get input() {
    return this.calendar ? this.calendar.altInput : null;
  }

  get disabledDates() {
    if (this.settings.disabledDates) {
      const disabledDates = this.settings.disabledDates.split(',');
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
   * Return the date value.
   *
   * @param date
   * @param format
   * @return {string}
   */
  getDateValue(date, format) {
    return moment(date).format(convertFormatToMoment(format));
  }

  get flatpickrType() {
    return 'flatpickr';
  }

  /**
   * Return the value of the selected date.
   *
   * @return {*}
   */
  getValue() {
    // Standard output format.
    if (!this.calendar) {
      return super.getValue();
    }

    // Get the selected dates from the calendar widget.
    const dates = this.calendar.selectedDates;
    if (!dates || !dates.length) {
      return super.getValue();
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
  setValue(value) {
    if (!this.calendar) {
      return super.setValue(value);
    }
    if (value) {
      if ((this.settings.saveAs !== 'text') && this.settings.readOnly && !this.loadZones()) {
        this.calendar.setDate(momentDate(value, this.valueFormat, this.timezone).toDate(), false);
      }
      else {
        this.calendar.setDate(moment(value, this.valueMomentFormat).toDate(), false);
      }
    }
    else {
      this.calendar.clear(false);
    }
  }

  getValueAsString(value, format) {
    format = format || this.dateFormat;
    if (this.settings.saveAs === 'text') {
      return this.getDateValue(value, format);
    }

    return formatDate(value, format, this.timezone);
  }

  setPlaceholder(input) {
    if (input && !input.getAttribute('placeholder')) {
      input.setAttribute('placeholder', this.settings.format);
    }
  }

  validationValue(value) {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value.map(val => new Date(val));
  }

  destroy() {
    super.destroy();
    if (this.calendar) {
      this.calendar.destroy();
    }
  }
}
