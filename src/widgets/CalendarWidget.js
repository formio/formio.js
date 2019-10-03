import Flatpickr from 'flatpickr';
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
import {
  monthFormatCorrector,
  dynamicMonthLength,
  timeFormatLocaleCorrector,
} from '../utils/calendarUtils';
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
      defaultValue: null,
      hourIncrement: 1,
      minuteIncrement: 5,
      time_24hr: false,
      saveAs: 'date',
      displayInTimezone: '',
      timezone: '',
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

    this.component.suffix = '';

    const { time_24hr: is24hours } = this.widgetLocale.currentLocale;
    this.settings.format = timeFormatLocaleCorrector(is24hours, this.settings.format);

    /*eslint-disable camelcase*/
    this.settings.time_24hr = is24hours;
    /*eslint-enable camelcase*/
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
    if (input && !input.getAttribute('placeholder')) {
      input.setAttribute('placeholder', this.settings.format);
    }

    const dateFormatInfo = getLocaleDateFormatInfo(this.settings.language);
    this.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'G:i K'
    };

    const { currentLocale } = this.widgetLocale;

    this.closedOn = 0;
    this.settings.locale = currentLocale;
    this.valueFormat = this.settings.dateFormat || ISO_8601_FORMAT;
    this.valueMomentFormat = convertFormatToMoment(this.valueFormat);
    this.settings.minDate = getDateSetting(this.settings.minDate);
    this.settings.maxDate = getDateSetting(this.settings.maxDate);
    this.settings.defaultValue = getDateSetting(this.settings.defaultValue);
    this.settings.altFormat = convertFormatToFlatpickr(this.settings.format);
    this.settings.dateFormat = convertFormatToFlatpickr(this.settings.dateFormat);
    this.settings.onChange = () => this.emit('update');
    this.settings.onClose = () => {
      this.closedOn = Date.now();
      if (this.calendar) {
        this.emit('blur');
      }
    };

    // Removes console errors from Flatpickr.
    this.settings.errorHandler = () => null;

    this.settings.formatDate = (date, format) => {
      // Only format this if this is the altFormat and the form is readOnly.
      if (this.settings.readOnly && (format === this.settings.altFormat)) {
        if (this.settings.saveAs === 'text' || this.loadZones()) {
          return Flatpickr.formatDate(date, format, currentLocale);
        }

        return formatOffset(Flatpickr.formatDate.bind(Flatpickr), date, format, this.timezone, currentLocale);
      }

      return Flatpickr.formatDate(date, format, currentLocale);
    };

    // Extension of the parseDate method for validating input data.
    this.settings.parseDate = (inputDate, format) => {
      this.enteredDate = inputDate;

      if (this.calendar) {
        this.calendar.clear();
      }

      // Check for validation errors.
      if (this.component.checkDataValidity()) {
        this.enteredDate = '';
        // Solving the problem with parsing dates with MMM or MMMM format.
        if (!inputDate.match(/[a-zа-яё\u00C0-\u017F]{3,}/gi)) {
          if (format.indexOf('M') !== -1) {
            format = format.replace('M', 'm');
          }
          else if (format.indexOf('F') !== -1) {
            format = format.replace('F', 'm');
          }
        }

        // Creates a date to prevent incorrect parsing of locations such as ru.
        const correctDate = moment(inputDate, monthFormatCorrector(this.settings.format)).toDate();
        return Flatpickr.parseDate(correctDate, format, currentLocale);
      }

      if (this.calendar) {
        this.calendar.close();
      }

      return undefined;
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

      // Makes it possible to enter the month as text.
      if (this.settings.format.match(/\bM{3}\b/gi)) {
        this.addEventListener(this.calendar._input, 'keyup', (e) => {
          let format = this.settings.format;
          const value = e.target.value;
          const monthIndex = format.indexOf('M');

          if (value && value[monthIndex].match(/\d/)) {
            format = format.replace('MMM', 'MM');
          }
          else if (value && value[monthIndex].match(/[a-zа-яё\u00C0-\u017F]/i)) {
            const month = value .match(/([a-zа-яё\u00C0-\u017F]{2,})/gi);

            if (month) {
              const { monthsShort } = this.widgetLocale;
              const monthLength = dynamicMonthLength(month[0], monthsShort);

              if (monthLength) {
                // Sets the dynamic length of the mask for the month.
                format = format.replace(/M{3,}/g, _.fill(Array(monthLength), 'M').join(''));
              }
            }
            format = format.replace(/M/g, 'e');
          }
          if (this.inputMasks[0]) {
            this.inputMasks[0].destroy();
            this.inputMasks = [];
          }

          this.setInputMask(this.calendar._input, convertFormatToMask(format));
        });
      }
    }
    return superAttach;
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
    this.addEventListener(suffix, 'click', () => {
      if (this.calendar && !this.calendar.isOpen && ((Date.now() - this.closedOn) > 200)) {
        this.calendar.open();
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

  get defaultValue() {
    const defaultDate = getDateSetting(this.settings.defaultValue);
    return defaultDate ? defaultDate.toISOString() : '';
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

  get widgetLocale() {
    let currentLocale = Flatpickr.l10ns.default;
    let loc = this.i18next.language ? this.i18next.language.slice(-2) : null;

    if (this.settings.useLocaleSettings) {
      if (!Flatpickr.l10ns[loc]) {
        console.warn(`Flatpickr localization ${loc} not found.`);
      }
      else {
        currentLocale = Flatpickr.l10ns[loc];
      }
      if (!moment.locales().some(locale => locale === loc)) {
        console.warn(`Moment localization ${loc} not found.`);
      }
    }
    else {
      loc !== 'en' && (loc = 'en');
    }

    const monthsShort = currentLocale.months.shorthand;
    const monthsShortStrictRegex = new RegExp(`^(${monthsShort.join('|')})`, 'i');

    return {
      locale: loc,
      monthsShort,
      monthsShortStrictRegex,
      currentLocale,
    };
  }

  toggleInvalidClassForWidget(message) {
    if (this.calendar && this.calendar._input) {
      const inputClasses = this._input.classList;
      const calendarInputClasses = this.calendar._input.classList;
      const invalidClass = 'is-invalid';

      if (message && !calendarInputClasses.contains(invalidClass)) {
        this.calendar._input.classList.add(invalidClass);
      }
      else {
        if (inputClasses.contains(invalidClass) && !calendarInputClasses.contains(invalidClass)) {
          this.calendar._input.classList.add(invalidClass);
        }
        else if (!inputClasses.contains(invalidClass) && calendarInputClasses.contains(invalidClass)) {
          this.calendar._input.classList.remove(invalidClass);
        }
      }
    }
  }

  get widgetData() {
    const { format, minDate, maxDate } = this.settings;
    return {
      enteredDate: this.enteredDate,
      format,
      minDate,
      maxDate,
    };
  }
}
