"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Formio = _interopRequireDefault(require("../Formio"));

var _InputWidget2 = _interopRequireDefault(require("./InputWidget"));

var _utils = require("../utils/utils");

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm a';
var ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
var CDN_URL = 'https://cdn.form.io/';

var CalendarWidget = /*#__PURE__*/function (_InputWidget) {
  _inherits(CalendarWidget, _InputWidget);

  var _super = _createSuper(CalendarWidget);

  _createClass(CalendarWidget, null, [{
    key: "defaultSettings",

    /* eslint-disable camelcase */
    get: function get() {
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

  }]);

  function CalendarWidget(settings, component) {
    var _this;

    _classCallCheck(this, CalendarWidget);

    _this = _super.call(this, settings, component); // Change the format to map to the settings.

    if (_this.settings.noCalendar) {
      _this.settings.format = _this.settings.format.replace(/yyyy-MM-dd /g, '');
    }

    if (!_this.settings.enableTime) {
      _this.settings.format = _this.settings.format.replace(/ hh:mm a$/g, '');
    } else if (_this.settings.time_24hr) {
      _this.settings.format = _this.settings.format.replace(/hh:mm a$/g, 'HH:mm');
    }

    return _this;
  }
  /**
   * Load the timezones.
   *
   * @return {boolean} TRUE if the zones are loading, FALSE otherwise.
   */


  _createClass(CalendarWidget, [{
    key: "loadZones",
    value: function loadZones() {
      var _this2 = this;

      var timezone = this.timezone;

      if (!(0, _utils.zonesLoaded)() && (0, _utils.shouldLoadZones)(timezone)) {
        (0, _utils.loadZones)(timezone).then(function () {
          return _this2.emit('redraw');
        }); // Return zones are loading.

        return true;
      } // Zones are already loaded.


      return false;
    }
  }, {
    key: "attach",
    value: function attach(input) {
      var _this3 = this;

      var superAttach = _get(_getPrototypeOf(CalendarWidget.prototype), "attach", this).call(this, input);

      this.setPlaceholder(input);
      var dateFormatInfo = (0, _utils.getLocaleDateFormatInfo)(this.settings.language);
      this.defaultFormat = {
        date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
        time: 'G:i K'
      };
      this.closedOn = 0;
      this.valueFormat = this.settings.dateFormat || ISO_8601_FORMAT;
      this.valueMomentFormat = (0, _utils.convertFormatToMoment)(this.valueFormat);
      this.settings.minDate = (0, _utils.getDateSetting)(this.settings.minDate);
      this.settings.disable = this.disabledDates;
      this.settings.disableWeekends ? this.settings.disable.push(this.disableWeekends) : '';
      this.settings.disableWeekdays ? this.settings.disable.push(this.disableWeekdays) : '';
      this.settings.disableFunction ? this.settings.disable.push(this.disableFunction) : '';
      this.settings.maxDate = (0, _utils.getDateSetting)(this.settings.maxDate);
      this.settings.wasDefaultValueChanged = false;
      this.settings.defaultValue = '';
      this.settings.manualInputValue = '';
      this.settings.isManuallyOverriddenValue = false;
      this.settings.altFormat = (0, _utils.convertFormatToFlatpickr)(this.settings.format);
      this.settings.dateFormat = (0, _utils.convertFormatToFlatpickr)(this.settings.dateFormat);

      this.settings.onChange = function () {
        if (_this3.settings.allowInput) {
          if (_this3.settings.isManuallyOverriddenValue && _this3.settings.enableTime) {
            _this3.calendar._input.value = _this3.settings.manualInputValue;
          } else {
            _this3.settings.manualInputValue = '';
          }

          _this3.settings.isManuallyOverriddenValue = false;
        }

        _this3.emit('update');
      };

      this.settings.onOpen = function () {
        return _this3.hook('onCalendarOpen');
      };

      this.settings.onClose = function () {
        _this3.hook('onCalendarClose');

        _this3.closedOn = Date.now();

        if (_this3.settings.allowInput && _this3.settings.enableTime) {
          _this3.calendar._input.value = _this3.settings.manualInputValue || _this3.calendar._input.value;
          _this3.settings.isManuallyOverriddenValue = false;
        }

        if (_this3.settings.wasDefaultValueChanged) {
          _this3.calendar._input.value = _this3.settings.defaultValue;
          _this3.settings.wasDefaultValueChanged = false;
        }

        if (_this3.calendar) {
          _this3.emit('blur');
        }
      };

      _Formio.default.requireLibrary('flatpickr-css', 'flatpickr-css', [{
        type: 'styles',
        src: "".concat(CDN_URL).concat(this.flatpickrType, "/flatpickr.min.css")
      }], true);

      return superAttach.then(function () {
        return _Formio.default.requireLibrary('flatpickr', 'flatpickr', "".concat(CDN_URL).concat(_this3.flatpickrType, "/flatpickr.min.js"), true).then(function (Flatpickr) {
          _this3.settings.formatDate = function (date, format) {
            // Only format this if this is the altFormat and the form is readOnly.
            if (_this3.settings.readOnly && format === _this3.settings.altFormat) {
              if (_this3.settings.saveAs === 'text' || !_this3.settings.enableTime || _this3.loadZones()) {
                return Flatpickr.formatDate(date, format);
              }

              return (0, _utils.formatOffset)(Flatpickr.formatDate.bind(Flatpickr), date, format, _this3.timezone);
            }

            return Flatpickr.formatDate(date, format);
          };

          if (_this3._input) {
            var dateValue = _this3._input.value; // Create a new flatpickr.

            _this3.calendar = new Flatpickr(_this3._input, _this3.settings);

            if (dateValue) {
              _this3.calendar.setDate(dateValue, false, _this3.settings.altFormat);
            }

            _this3.calendar.altInput.addEventListener('input', function (event) {
              if (_this3.settings.allowInput) {
                _this3.settings.manualInputValue = event.target.value;
                _this3.settings.isManuallyOverriddenValue = true;
              }

              if (event.target.value === '' && _this3.calendar.selectedDates.length > 0) {
                _this3.settings.wasDefaultValueChanged = true;
                _this3.settings.defaultValue = event.target.value;

                _this3.calendar.clear();
              } else {
                _this3.settings.wasDefaultValueChanged = false;
              }
            });

            if (!_this3.settings.readOnly) {
              // Enforce the input mask of the format.
              _this3.setInputMask(_this3.calendar._input, (0, _utils.convertFormatToMask)(_this3.settings.format));
            } // Make sure we commit the value after a blur event occurs.


            _this3.addEventListener(_this3.calendar._input, 'blur', function (event) {
              var _event$relatedTarget;

              if (!((_event$relatedTarget = event.relatedTarget) !== null && _event$relatedTarget !== void 0 && _event$relatedTarget.className.split(/\s+/).includes('flatpickr-day'))) {
                var inputValue = _this3.calendar.input.value;

                var _dateValue = inputValue ? (0, _moment.default)(_this3.calendar.input.value, (0, _utils.convertFormatToMoment)(_this3.valueFormat)).toDate() : inputValue;

                _this3.calendar.setDate(_dateValue, true, _this3.settings.altFormat);
              }
            }); // FJS-1103: When hit the enter button, the field not saving the year correctly


            _this3.addEventListener(_this3.calendar.altInput, 'keydown', function (event) {
              if (event.keyCode === 13) {
                _this3.calendar.altInput.blur();

                _this3.calendar.close();

                event.stopPropagation();
              }
            });
          }
        });
      });
    }
  }, {
    key: "addSuffix",
    value: function addSuffix(suffix) {
      var _this4 = this;

      this.addEventListener(suffix, 'click', function (event) {
        event.stopPropagation();

        if (_this4.calendar) {
          if (!_this4.calendar.isOpen && Date.now() - _this4.closedOn > 200) {
            _this4.calendar.open();
          } else if (_this4.calendar.isOpen) {
            _this4.calendar.close();
          }
        }
      });
      return suffix;
    }
  }, {
    key: "getDateValue",

    /**
     * Return the date value.
     *
     * @param date
     * @param format
     * @return {string}
     */
    value: function getDateValue(date, format) {
      return (0, _moment.default)(date).format((0, _utils.convertFormatToMoment)(format));
    }
  }, {
    key: "getValue",

    /**
     * Return the value of the selected date.
     *
     * @return {*}
     */
    value: function getValue() {
      // Standard output format.
      if (!this.calendar) {
        return _get(_getPrototypeOf(CalendarWidget.prototype), "getValue", this).call(this);
      } // Get the selected dates from the calendar widget.


      var dates = this.calendar.selectedDates;

      if (!dates || !dates.length) {
        return _get(_getPrototypeOf(CalendarWidget.prototype), "getValue", this).call(this);
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

  }, {
    key: "setValue",
    value: function setValue(value) {
      if (!this.calendar) {
        value = value ? (0, _utils.formatDate)(value, (0, _utils.convertFormatToMoment)(this.settings.format), this.timezone, (0, _utils.convertFormatToMoment)(this.valueMomentFormat)) : value;
        return _get(_getPrototypeOf(CalendarWidget.prototype), "setValue", this).call(this, value);
      }

      if (value) {
        if (this.settings.saveAs !== 'text' && this.settings.readOnly && !this.loadZones()) {
          this.calendar.setDate((0, _utils.momentDate)(value, this.valueFormat, this.timezone).toDate(), false);
        } else {
          this.calendar.setDate((0, _moment.default)(value, this.valueMomentFormat).toDate(), false);
        }
      } else {
        this.calendar.clear(false);
      }
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value, format) {
      format = format || this.dateFormat;

      if (this.settings.saveAs === 'text') {
        return this.getDateValue(value, format);
      }

      return (0, _utils.formatDate)(value, format, this.timezone, (0, _utils.convertFormatToMoment)(this.calendar ? this.valueFormat : this.settings.dateFormat));
    }
  }, {
    key: "setPlaceholder",
    value: function setPlaceholder(input) {
      if (input && !input.getAttribute('placeholder')) {
        input.setAttribute('placeholder', this.settings.format);
      }
    }
  }, {
    key: "setErrorClasses",
    value: function setErrorClasses(hasErrors) {
      if (!this.input) {
        return;
      }

      if (hasErrors) {
        this.input.className = "".concat(this.input.className, " is-invalid");
      } else {
        this.input.className = this.input.className.replace('is-invalid', '');
      }
    }
  }, {
    key: "validationValue",
    value: function validationValue(value) {
      if (typeof value === 'string') {
        return new Date(value);
      }

      return value.map(function (val) {
        return new Date(val);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(CalendarWidget.prototype), "destroy", this).call(this);

      if (this.calendar) {
        this.calendar.destroy();
      }
    }
  }, {
    key: "disableWeekends",
    get: function get() {
      return function (date) {
        return date.getDay() === 0 || date.getDay() === 6;
      };
    }
  }, {
    key: "disableWeekdays",
    get: function get() {
      var _this5 = this;

      return function (date) {
        return !_this5.disableWeekends(date);
      };
    }
  }, {
    key: "disableFunction",
    get: function get() {
      var _this6 = this;

      return function (date) {
        return _this6.evaluate("return ".concat(_this6.settings.disableFunction), {
          date: date
        });
      };
    }
  }, {
    key: "timezone",
    get: function get() {
      if (this.settings.timezone) {
        return this.settings.timezone;
      }

      if (this.settings.displayInTimezone === 'submission' && this.settings.submissionTimezone) {
        return this.settings.submissionTimezone;
      }

      if (this.settings.displayInTimezone === 'utc') {
        return 'UTC';
      } // Return current timezone if none are provided.


      return (0, _utils.currentTimezone)();
    }
  }, {
    key: "defaultSettings",
    get: function get() {
      return CalendarWidget.defaultSettings;
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(CalendarWidget.prototype), "disabled", disabled, this, true);

      if (this.calendar) {
        if (disabled) {
          this.calendar._input.setAttribute('disabled', 'disabled');
        } else {
          this.calendar._input.removeAttribute('disabled');
        }

        this.calendar.close();
        this.calendar.redraw();
      }
    }
  }, {
    key: "input",
    get: function get() {
      return this.calendar ? this.calendar.altInput : null;
    }
  }, {
    key: "disabledDates",
    get: function get() {
      if (this.settings.disabledDates) {
        var disabledDates = this.settings.disabledDates.split(',');
        return disabledDates.map(function (item) {
          var dateMask = /\d{4}-\d{2}-\d{2}/g;
          var dates = item.match(dateMask);

          if (dates && dates.length) {
            return dates.length === 1 ? item.match(dateMask)[0] : {
              from: item.match(dateMask)[0],
              to: item.match(dateMask)[1]
            };
          }
        });
      }

      return [];
    }
  }, {
    key: "localeFormat",
    get: function get() {
      var format = '';

      if (this.settings.enableDate) {
        format += this.defaultFormat.date;
      }

      if (this.settings.enableTime) {
        format += this.defaultFormat.time;
      }

      return format;
    }
  }, {
    key: "dateTimeFormat",
    get: function get() {
      return this.settings.useLocaleSettings ? this.localeFormat : (0, _utils.convertFormatToFlatpickr)(this.dateFormat);
    }
  }, {
    key: "dateFormat",
    get: function get() {
      return _lodash.default.get(this.settings, 'format', DEFAULT_FORMAT);
    }
  }, {
    key: "flatpickrType",
    get: function get() {
      return 'flatpickr';
    }
  }]);

  return CalendarWidget;
}(_InputWidget2.default);

exports.default = CalendarWidget;