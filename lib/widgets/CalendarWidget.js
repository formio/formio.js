var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Flatpickr from 'flatpickr';
import _ from 'lodash';
import moment from 'moment';
import { convertFormatToFlatpickr, convertFormatToMask, convertFormatToMoment, currentTimezone, formatDate, formatOffset, getDateSetting, getLocaleDateFormatInfo, momentDate, zonesLoaded, shouldLoadZones, loadZones, superGet, superSet, } from '../utils/utils';
import InputWidget from './InputWidget';
var DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm a';
var ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
var CalendarWidget = /** @class */ (function (_super) {
    __extends(CalendarWidget, _super);
    /* eslint-enable camelcase */
    function CalendarWidget(settings, component) {
        var _this = _super.call(this, settings, component) || this;
        // Change the format to map to the settings.
        if (_this.settings.noCalendar) {
            _this.settings.format = _this.settings.format.replace(/yyyy-MM-dd /g, '');
        }
        if (!_this.settings.enableTime) {
            _this.settings.format = _this.settings.format.replace(/ hh:mm a$/g, '');
        }
        else if (_this.settings.time_24hr) {
            _this.settings.format = _this.settings.format.replace(/hh:mm a$/g, 'HH:mm');
        }
        return _this;
    }
    Object.defineProperty(CalendarWidget, "defaultSettings", {
        /* eslint-disable camelcase */
        get: function () {
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
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Load the timezones.
     *
     * @return {boolean} TRUE if the zones are loading, FALSE otherwise.
     */
    CalendarWidget.prototype.loadZones = function () {
        var _this = this;
        var timezone = this.timezone;
        if (!zonesLoaded() && shouldLoadZones(timezone)) {
            loadZones(timezone).then(function () { return _this.emit('redraw'); });
            // Return zones are loading.
            return true;
        }
        // Zones are already loaded.
        return false;
    };
    CalendarWidget.prototype.attach = function (input) {
        var _this = this;
        var superAttach = _super.prototype.attach.call(this, input);
        this.setPlaceholder(input);
        var dateFormatInfo = getLocaleDateFormatInfo(this.settings.language);
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
        this.settings.onChange = function () {
            if (_this.settings.allowInput) {
                if (_this.settings.isManuallyOverriddenValue && _this.settings.enableTime) {
                    _this.calendar._input.value = _this.settings.manualInputValue;
                }
                else {
                    _this.settings.manualInputValue = '';
                }
                _this.settings.isManuallyOverriddenValue = false;
            }
            _this.emit('update');
        };
        this.settings.onOpen = function () { return _this.hook('onCalendarOpen'); };
        this.settings.onClose = function () {
            _this.hook('onCalendarClose');
            _this.closedOn = Date.now();
            if (_this.settings.allowInput && _this.settings.enableTime) {
                _this.calendar._input.value = _this.settings.manualInputValue || _this.calendar._input.value;
                _this.settings.isManuallyOverriddenValue = false;
            }
            if (_this.settings.wasDefaultValueChanged) {
                _this.calendar._input.value = _this.settings.defaultValue;
                _this.settings.wasDefaultValueChanged = false;
            }
            if (_this.calendar) {
                _this.emit('blur');
            }
        };
        this.settings.formatDate = function (date, format) {
            // Only format this if this is the altFormat and the form is readOnly.
            if (_this.settings.readOnly && (format === _this.settings.altFormat)) {
                if (_this.settings.saveAs === 'text' || !_this.settings.enableTime || _this.loadZones()) {
                    return Flatpickr.formatDate(date, format);
                }
                return formatOffset(Flatpickr.formatDate.bind(Flatpickr), date, format, _this.timezone);
            }
            return Flatpickr.formatDate(date, format);
        };
        if (this._input) {
            // Create a new flatpickr.
            this.calendar = new Flatpickr(this._input, this.settings);
            this.calendar.altInput.addEventListener('input', function (event) {
                if (_this.settings.allowInput) {
                    _this.settings.manualInputValue = event.target.value;
                    _this.settings.isManuallyOverriddenValue = true;
                }
                if (event.target.value === '' && _this.calendar.selectedDates.length > 0) {
                    _this.settings.wasDefaultValueChanged = true;
                    _this.settings.defaultValue = event.target.value;
                    _this.calendar.clear();
                }
                else {
                    _this.settings.wasDefaultValueChanged = false;
                }
            });
            if (!this.settings.readOnly) {
                // Enforce the input mask of the format.
                this.setInputMask(this.calendar._input, convertFormatToMask(this.settings.format));
            }
            // Make sure we commit the value after a blur event occurs.
            this.addEventListener(this.calendar._input, 'blur', function () {
                return _this.calendar.setDate(_this.calendar._input.value, true, _this.settings.altFormat);
            });
        }
        return superAttach;
    };
    Object.defineProperty(CalendarWidget.prototype, "disableWeekends", {
        get: function () {
            return function (date) {
                return (date.getDay() === 0 || date.getDay() === 6);
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "disableWeekdays", {
        get: function () {
            var _this = this;
            return function (date) { return !_this.disableWeekends(date); };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "disableFunction", {
        get: function () {
            var _this = this;
            return function (date) { return _this.evaluate("return " + _this.settings.disableFunction, {
                date: date
            }); };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "timezone", {
        get: function () {
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "defaultSettings", {
        get: function () {
            return CalendarWidget.defaultSettings;
        },
        enumerable: false,
        configurable: true
    });
    CalendarWidget.prototype.addSuffix = function (suffix) {
        var _this = this;
        this.addEventListener(suffix, 'click', function () {
            if (_this.calendar && !_this.calendar.isOpen && ((Date.now() - _this.closedOn) > 200)) {
                _this.calendar.open();
            }
        });
        return suffix;
    };
    Object.defineProperty(CalendarWidget.prototype, "disabled", {
        get: function () {
            return superGet(InputWidget, 'disabled', this);
        },
        set: function (disabled) {
            superSet(InputWidget, 'disabled', this, disabled);
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "input", {
        get: function () {
            return this.calendar ? this.calendar.altInput : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "disabledDates", {
        get: function () {
            if (this.settings.disabledDates) {
                var disabledDates = this.settings.disabledDates.split(',');
                return disabledDates.map(function (item) {
                    var dateMask = /\d{4}-\d{2}-\d{2}/g;
                    var dates = item.match(dateMask);
                    if (dates.length) {
                        return dates.length === 1 ? item.match(dateMask)[0] : {
                            from: item.match(dateMask)[0],
                            to: item.match(dateMask)[1],
                        };
                    }
                });
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "localeFormat", {
        get: function () {
            var format = '';
            if (this.settings.enableDate) {
                format += this.defaultFormat.date;
            }
            if (this.settings.enableTime) {
                format += this.defaultFormat.time;
            }
            return format;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "dateTimeFormat", {
        get: function () {
            return this.settings.useLocaleSettings ? this.localeFormat : convertFormatToFlatpickr(this.dateFormat);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "dateFormat", {
        get: function () {
            return _.get(this.settings, 'format', DEFAULT_FORMAT);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return the date value.
     *
     * @param date
     * @param format
     * @return {string}
     */
    CalendarWidget.prototype.getDateValue = function (date, format) {
        return moment(date).format(convertFormatToMoment(format));
    };
    /**
     * Return the value of the selected date.
     *
     * @return {*}
     */
    CalendarWidget.prototype.getValue = function () {
        // Standard output format.
        if (!this.calendar) {
            return _super.prototype.getValue.call(this);
        }
        // Get the selected dates from the calendar widget.
        var dates = this.calendar.selectedDates;
        if (!dates || !dates.length) {
            return _super.prototype.getValue.call(this);
        }
        if (!(dates[0] instanceof Date)) {
            return 'Invalid Date';
        }
        return this.getDateValue(dates[0], this.valueFormat);
    };
    /**
     * Set the selected date value.
     *
     * @param value
     */
    CalendarWidget.prototype.setValue = function (value) {
        if (!this.calendar) {
            return _super.prototype.setValue.call(this, value);
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
    };
    CalendarWidget.prototype.getValueAsString = function (value, format) {
        format = format || this.dateFormat;
        if (this.settings.saveAs === 'text') {
            return this.getDateValue(value, format);
        }
        return formatDate(value, format, this.timezone);
    };
    CalendarWidget.prototype.setPlaceholder = function (input) {
        if (input && !input.getAttribute('placeholder')) {
            input.setAttribute('placeholder', this.settings.format);
        }
    };
    CalendarWidget.prototype.validationValue = function (value) {
        if (typeof value === 'string') {
            return new Date(value);
        }
        return value.map(function (val) { return new Date(val); });
    };
    CalendarWidget.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.calendar) {
            this.calendar.destroy();
        }
    };
    return CalendarWidget;
}(InputWidget));
export default CalendarWidget;
