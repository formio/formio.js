"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flatpickr = _interopRequireDefault(require("flatpickr"));

var _InputWidget2 = _interopRequireDefault(require("./InputWidget"));

var _utils = require("../utils/utils");

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm a';
var ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';

var CalendarWidget =
/*#__PURE__*/
function (_InputWidget) {
  _inherits(CalendarWidget, _InputWidget);

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
        minDate: '',
        maxDate: ''
      };
    }
    /* eslint-enable camelcase */

  }]);

  function CalendarWidget(settings, component) {
    var _this;

    _classCallCheck(this, CalendarWidget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CalendarWidget).call(this, settings, component)); // Change the format to map to the settings.

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

      if (input && !input.getAttribute('placeholder')) {
        input.setAttribute('placeholder', this.settings.format);
      }

      var dateFormatInfo = (0, _utils.getLocaleDateFormatInfo)(this.settings.language);
      this.defaultFormat = {
        date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
        time: 'G:i K'
      };
      this.closedOn = 0;
      this.valueFormat = this.settings.dateFormat || ISO_8601_FORMAT;
      this.valueMomentFormat = (0, _utils.convertFormatToMoment)(this.valueFormat);
      this.settings.minDate = (0, _utils.getDateSetting)(this.settings.minDate);
      this.settings.maxDate = (0, _utils.getDateSetting)(this.settings.maxDate);
      this.settings.altFormat = (0, _utils.convertFormatToFlatpickr)(this.settings.format);
      this.settings.dateFormat = (0, _utils.convertFormatToFlatpickr)(this.settings.dateFormat);

      this.settings.onChange = function () {
        return _this3.emit('update');
      };

      this.settings.onClose = function () {
        _this3.closedOn = Date.now();

        if (_this3.calendar) {
          _this3.emit('blur');
        }
      };

      this.settings.formatDate = function (date, format) {
        // Only format this if this is the altFormat and the form is readOnly.
        if (_this3.settings.readOnly && format === _this3.settings.altFormat) {
          if (_this3.settings.saveAs === 'text' || _this3.loadZones()) {
            return _flatpickr.default.formatDate(date, format);
          }

          return (0, _utils.formatOffset)(_flatpickr.default.formatDate.bind(_flatpickr.default), date, format, _this3.timezone);
        }

        return _flatpickr.default.formatDate(date, format);
      };

      if (this._input) {
        // Create a new flatpickr.
        this.calendar = new _flatpickr.default(this._input, this.settings); // Enforce the input mask of the format.

        this.setInputMask(this.calendar._input, (0, _utils.convertFormatToMask)(this.settings.format)); // Make sure we commit the value after a blur event occurs.

        this.addEventListener(this.calendar._input, 'blur', function () {
          return _this3.calendar.setDate(_this3.calendar._input.value, true, _this3.settings.altFormat);
        });
      }

      return superAttach;
    }
  }, {
    key: "addSuffix",
    value: function addSuffix(suffix) {
      var _this4 = this;

      this.addEventListener(suffix, 'click', function () {
        if (_this4.calendar && !_this4.calendar.isOpen && Date.now() - _this4.closedOn > 200) {
          _this4.calendar.open();
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
    /**
     * Return the value of the selected date.
     *
     * @return {*}
     */

  }, {
    key: "getValue",
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

      return (0, _utils.formatDate)(value, format, this.timezone);
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
  }]);

  return CalendarWidget;
}(_InputWidget2.default);

exports.default = CalendarWidget;