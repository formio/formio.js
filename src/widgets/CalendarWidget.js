import { GlobalFormio as Formio } from '../Formio';
import InputWidget from './InputWidget';
import {
  convertFormatToFlatpickr,
  convertFormatToMask,
  convertFormatToMoment,
  currentTimezone,
  formatDate,
  formatOffset,
  getBrowserInfo,
  getDateSetting,
  getLocaleDateFormatInfo,
  momentDate,
  zonesLoaded,
  shouldLoadZones,
  loadZones,
} from '../utils/utils';
import moment from 'moment';
import _ from 'lodash';

const DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm a';
const ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
const CDN_URL = 'https://cdn.form.io/';
const JSDELIVR_CDN_URL = 'https://cdn.jsdelivr.net';
const CDN_FLATPICKR_LOCALE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.9/l10n';
const SHORTCUT_BUTTONS_PLUGIN_URL = '/npm/shortcut-buttons-flatpickr@0.1.0/dist/';
const SHORTCUT_BUTTONS_CSS = `${JSDELIVR_CDN_URL}${SHORTCUT_BUTTONS_PLUGIN_URL}themes/light.min.css`;
const SHORTCUT_BUTTONS_PLUGIN = `${JSDELIVR_CDN_URL}${SHORTCUT_BUTTONS_PLUGIN_URL}shortcut-buttons-flatpickr.min.js`;

const isIEBrowser = getBrowserInfo().ie;

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

  constructor(settings, component, instance, index) {
    super(settings, component, instance, index);
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

    const dateFormatInfo = getLocaleDateFormatInfo(this.settings.language);
    this.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'G:i K'
    };

    this.closedOn = 0;
    this.valueFormat = this.settings.dateFormat || ISO_8601_FORMAT;
    this.valueMomentFormat = convertFormatToMoment(this.valueFormat);

    const isReadOnly = this.settings.readOnly;

    this.settings.minDate = isReadOnly ? null : getDateSetting(this.settings.minDate);
    this.settings.maxDate = isReadOnly ? null : getDateSetting(this.settings.maxDate);
    this.settings.disable = this.disabledDates;
    this.settings.disableWeekends ? this.settings.disable.push(this.disableWeekends) : '';
    this.settings.disableWeekdays ? this.settings.disable.push(this.disableWeekdays) : '';
    this.settings.disableFunction ? this.settings.disable.push(this.disableFunction) : '';
    this.settings.wasDefaultValueChanged = false;
    this.settings.defaultValue = '';
    this.settings.manualInputValue = '';
    this.settings.isManuallyOverriddenValue = false;
    this.settings.currentValue = '';
    this.settings.altFormat = convertFormatToFlatpickr(this.settings.format);
    this.settings.dateFormat = convertFormatToFlatpickr(this.settings.dateFormat);
    this.settings.position = 'auto center';
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
        this.emit('update');
      }

      if (this.settings.wasDefaultValueChanged) {
        this.calendar._input.value = this.settings.defaultValue;
        this.settings.wasDefaultValueChanged = false;
      }
      if (this.calendar) {
        this.emit('blur');
      }
    };

    Formio.requireLibrary('flatpickr-css', 'flatpickr', [
      { type: 'styles', src: `${CDN_URL}${this.flatpickrType}/flatpickr.min.css` }
    ], true);

    if (this.component.shortcutButtons) {
      this.component.shortcutButtons = this.component.shortcutButtons.filter((btn) => btn.label && btn.onClick);
    }

    if (this.component.shortcutButtons?.length) {
      Formio.requireLibrary('shortcut-buttons-flatpickr-css', 'ShortcutButtonsPlugin', [
        { type: 'styles', src: SHORTCUT_BUTTONS_CSS }
      ], true);
    }

    return superAttach
      .then(() => {
        if (this.component.shortcutButtons?.length) {
          return Formio.requireLibrary(
            'shortcut-buttons-flatpickr', 'ShortcutButtonsPlugin', SHORTCUT_BUTTONS_PLUGIN, true
          );
        }
      })
      .then((ShortcutButtonsPlugin) => {
        return Formio.requireLibrary('flatpickr', 'flatpickr', `${CDN_URL}${this.flatpickrType}/flatpickr.min.js`, true)
          .then((Flatpickr) => {
            if (this.component.shortcutButtons?.length && ShortcutButtonsPlugin) {
              this.initShortcutButtonsPlugin(ShortcutButtonsPlugin);
            }

            this.settings.formatDate = this.getFlatpickrFormatDate(Flatpickr);

            if (this._input) {
              const { locale } = this.settings;

              if (locale && locale.length >= 2 && locale !== 'en') {
                return Formio.requireLibrary(
                  `flatpickr-${locale}`,
                  `flatpickr-${locale}`,
                  `${CDN_FLATPICKR_LOCALE_URL}/${locale}.min.js`,
                  false,
                  () => this.initFlatpickr(Flatpickr)
                );
              }
              else {
                this.initFlatpickr(Flatpickr);
              }
            }
          });
      })
      .catch((err) => {
        console.warn(err);
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

  defineTimezone() {
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

  get timezone() {
    return this.defineTimezone();
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
        if (dates && dates.length) {
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
      value = value ? formatDate(value, convertFormatToMoment(this.settings.format), this.timezone, convertFormatToMoment(this.valueMomentFormat)) : value;
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
    return formatDate(value, format, this.timezone, convertFormatToMoment(this.calendar ? this.valueFormat : this.settings.dateFormat));
  }

  setErrorClasses(hasErrors) {
    if (!this.input) {
      return;
    }

    if (hasErrors) {
      this.addClass(this.input, 'is-invalid');
      this.input.setAttribute('aria-invalid', 'true');
    }
    else {
      this.removeClass(this.input, 'is-invalid');
      this.input.setAttribute('aria-invalid', 'false');
    }
  }

  validationValue(value) {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value.map(val => new Date(val));
  }

  isCalendarElement(element) {
    if (!element) {
      return true;
    }

    if (this.calendar?.config?.appendTo?.contains(element)) {
      return true;
    }

    return this.calendar?.calendarContainer?.contains(element);
  }

  initFlatpickr(Flatpickr) {
    const dateValue = this._input.value;
    // Create a new flatpickr.
    this.calendar = new Flatpickr(this._input, { ...this.settings, disableMobile: true });

    if (dateValue) {
      this.calendar.setDate(dateValue, false, this.settings.altFormat);
    }

    this.calendar.altInput.addEventListener('input', (event) => {
      if (this.settings.allowInput && this.settings.currentValue !== event.target.value) {
        this.settings.manualInputValue = event.target.value;
        this.settings.isManuallyOverriddenValue = true;
        this.settings.currentValue = event.target.value;
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

    // Fixes an issue with IE11 where value is set only after the second click
    // TODO: Remove when the issue is solved in the flatpickr library
    if (isIEBrowser) {
      // Remove the original blur listener, because value will be set to empty since relatedTarget is null in IE11
      const originalBlurListener = this.calendar._handlers.find(({ event, element }) => event === 'blur' && element === this.calendar._input);
      this.calendar._input.removeEventListener('blur', originalBlurListener.handler);
      // Add the same event listener as in the original library, but with workaround for IE11 issue
      this.addEventListener(this.calendar._input, 'blur', (event) => {
        const activeElement = this.settings.shadowRoot ? this.settings.shadowRoot.activeElement : document.activeElement;
        const relatedTarget = event.relatedTarget ? event.relatedTarget : activeElement;
        const isInput = event.target === this.calendar._input;

        if (isInput && !this.isCalendarElement(relatedTarget)) {
          this.calendar.setDate(
            this.calendar._input.value,
            true,
            event.target === this.calendar.altInput
              ? this.calendar.config.altFormat
              : this.calendar.config.dateFormat
          );
        }
      });
    }
    // Make sure we commit the value after a blur event occurs.
    this.addEventListener(this.calendar._input, 'blur', (event) => {
      const activeElement = this.settings.shadowRoot ? this.settings.shadowRoot.activeElement : document.activeElement;
      const relatedTarget = event.relatedTarget ? event.relatedTarget : activeElement;

      if (!(isIEBrowser && !relatedTarget) && !this.isCalendarElement(relatedTarget)) {
        const inputValue = this.calendar.input.value;
        const dateValue = inputValue ? moment(this.calendar.input.value, convertFormatToMoment(this.valueFormat)).toDate() : inputValue;

        this.calendar.setDate(dateValue, true, this.settings.altFormat);
      }
      else if (!this.calendar.input.value) {
        const value = moment({ hour: this.calendar?.config?.defaultHour, minute: this.calendar?.config?.defaultMinute }).toDate();
        this.calendar.setDate(value, true, this.settings.format);
      }
    });

    // FJS-1103: When hit the enter button, the field not saving the year correctly
    this.addEventListener(this.calendar.altInput, 'keydown', (event) => {
      if (event.keyCode === 13) {
        if (this.calendar.isOpen) {
          this.calendar.close();
          event.stopPropagation();
        }
      }
    });
  }

  initShortcutButtonsPlugin(ShortcutButtonsPlugin) {
    this.settings.plugins = [
      // eslint-disable-next-line new-cap
      ShortcutButtonsPlugin({
        button: this.component.shortcutButtons.map((btn) => ({ label: btn.label, attributes: btn.attribute })),
        onClick: (index) => {
          const getValue = this.component.shortcutButtons[index].onClick;
          const date = this.evaluate(getValue, { date: new Date() }, 'date');
          this.calendar.setDate(date, true);
        }
      })
    ];
  }

  getFlatpickrFormatDate(Flatpickr) {
    return (date, format) => {
      // Only format this if this is the altFormat and the form is readOnly.
      if (this.settings.readOnly && (format === this.settings.altFormat)) {
        if (this.settings.saveAs === 'text' || !this.settings.enableTime || this.loadZones()) {
          return Flatpickr.formatDate(date, format);
        }

        const currentValue = new Date(this.getValue());
        if (currentValue.toString() === date.toString()) {
          let compValue = this.componentInstance.dataValue;
          if (Array.isArray(compValue)) {
            compValue = compValue[this.valueIndex];
          }
          return formatOffset(Flatpickr.formatDate.bind(Flatpickr), new Date(compValue), format, this.timezone);
        }
        return formatOffset(Flatpickr.formatDate.bind(Flatpickr), date, format, this.timezone);
      }

      return Flatpickr.formatDate(date, format);
    };
  }

  destroy() {
    super.destroy();
    if (this.calendar) {
      this.calendar.destroy();
    }
  }
}
