'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base = require('../base/Base');

var _flatpickr = require('flatpickr');

var _flatpickr2 = _interopRequireDefault(_flatpickr);

var _get3 = require('lodash/get');

var _get4 = _interopRequireDefault(_get3);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var momentModule = require('moment');

var DateTimeComponent = exports.DateTimeComponent = function (_BaseComponent) {
  _inherits(DateTimeComponent, _BaseComponent);

  function DateTimeComponent(component, options, data) {
    _classCallCheck(this, DateTimeComponent);

    var _this = _possibleConstructorReturn(this, (DateTimeComponent.__proto__ || Object.getPrototypeOf(DateTimeComponent)).call(this, component, options, data));

    _this.validators.push('date');
    _this.closedOn = 0;
    return _this;
  }

  _createClass(DateTimeComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get2(DateTimeComponent.prototype.__proto__ || Object.getPrototypeOf(DateTimeComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.attr.type = 'text';
      info.changeEvent = 'input';
      this.component.suffix = true;
      return info;
    }

    /**
     * Return a translated date setting.
     *
     * @param date
     * @return {*}
     */

  }, {
    key: 'getDateSetting',
    value: function getDateSetting(date) {
      if (!date) {
        return null;
      }

      var dateSetting = new Date(date);
      if (!dateSetting || isNaN(dateSetting.getDate())) {
        try {
          var moment = momentModule;
          dateSetting = new Date(eval(date));
        } catch (e) {
          dateSetting = null;
        }
      }

      // Ensure this is a date.
      if (dateSetting && isNaN(dateSetting.getDate())) {
        dateSetting = null;
      }

      return dateSetting;
    }

    /**
     * Get the default date for the calendar.
     * @return {*}
     */

  }, {
    key: 'createWrapper',


    // This select component can handle multiple items on its own.
    value: function createWrapper() {
      return false;
    }

    /**
     * Convert the format from the angular-datepicker module.
     * @param format
     * @return {string|XML|*}
     */

  }, {
    key: 'convertFormat',
    value: function convertFormat(format) {
      // Year conversion.
      format = format.replace(/y/g, 'Y');
      format = format.replace('YYYY', 'Y');
      format = format.replace('YY', 'y');

      // Month conversion.
      format = format.replace('MMMM', 'F');
      format = format.replace(/M/g, 'n');
      format = format.replace('nnn', 'M');
      format = format.replace('nn', 'm');

      // Day in month.
      format = format.replace(/d/g, 'j');
      format = format.replace('jj', 'd');

      // Day in week.
      format = format.replace('EEEE', 'l');
      format = format.replace('EEE', 'D');

      // Hours, minutes, seconds
      format = format.replace('HH', 'H');
      format = format.replace('hh', 'h');
      format = format.replace('mm', 'i');
      format = format.replace('ss', 'S');
      format = format.replace(/a/g, 'K');
      return format;
    }
  }, {
    key: 'addSuffix',
    value: function addSuffix(input, inputGroup) {
      var _this2 = this;

      var suffix = this.ce('span', {
        class: 'input-group-addon',
        style: 'cursor: pointer'
      });
      suffix.appendChild(this.getIcon(this.component.enableDate ? 'calendar' : 'time'));
      var calendar = this.getCalendar(input);
      if (calendar) {
        this.addEventListener(suffix, 'click', function () {
          // Make sure the calendar is not already open and that it did not just close (like from blur event).
          if (!calendar.isOpen && Date.now() - _this2.closedOn > 200) {
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

  }, {
    key: 'getCalendar',
    value: function getCalendar(input) {
      if (!input.calendar && !this.options.noCalendar) {
        input.calendar = new _flatpickr2.default(input, this.config);
      }
      return input.calendar;
    }
  }, {
    key: 'getDate',
    value: function getDate(value) {
      var timestamp = parseInt(value, 10);
      if (!timestamp) {
        return null;
      }
      return new Date(timestamp * 1000);
    }
  }, {
    key: 'getRawValue',
    value: function getRawValue() {
      var values = [];
      for (var i in this.inputs) {
        if (this.inputs.hasOwnProperty(i)) {
          if (!this.component.multiple) {
            return this.getDate(this.inputs[i].value);
          }
          values.push(this.getDate(this.inputs[i].value));
        }
      }
      return values;
    }
  }, {
    key: 'getValueAt',
    value: function getValueAt(index) {
      if (!this.inputs[index]) {
        return '';
      }

      var calendar = this.getCalendar(this.inputs[index]);
      if (!calendar) {
        return _get2(DateTimeComponent.prototype.__proto__ || Object.getPrototypeOf(DateTimeComponent.prototype), 'getValueAt', this).call(this, index);
      }

      var dates = calendar.selectedDates;
      if (!dates || !dates.length) {
        return '';
      }

      return dates[0].toISOString();
    }
  }, {
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      if (value) {
        var calendar = this.getCalendar(this.inputs[index]);
        if (!calendar) {
          return _get2(DateTimeComponent.prototype.__proto__ || Object.getPrototypeOf(DateTimeComponent.prototype), 'setValueAt', this).call(this, index, value);
        }

        calendar.setDate(value ? new Date(value) : new Date(), false);
      }
    }
  }, {
    key: 'defaultDate',
    get: function get() {
      return this.getDateSetting(this.component.defaultDate);
    }
  }, {
    key: 'config',
    get: function get() {
      var _this3 = this;

      return {
        altInput: true,
        clickOpens: true,
        enableDate: true,
        mode: this.component.multiple ? 'multiple' : 'single',
        enableTime: (0, _get4.default)(this.component, 'enableTime', true),
        noCalendar: !(0, _get4.default)(this.component, 'enableDate', true),
        altFormat: this.convertFormat((0, _get4.default)(this.component, 'format', '')),
        dateFormat: 'U',
        defaultDate: this.defaultDate,
        hourIncrement: (0, _get4.default)(this.component, 'timePicker.hourStep', 1),
        minuteIncrement: (0, _get4.default)(this.component, 'timePicker.minuteStep', 5),
        minDate: this.getDateSetting((0, _get4.default)(this.component, 'datePicker.minDate')),
        maxDate: this.getDateSetting((0, _get4.default)(this.component, 'datePicker.maxDate')),
        onChange: function onChange() {
          return _this3.onChange();
        },
        onClose: function onClose() {
          return _this3.closedOn = Date.now();
        }
      };
    }
  }, {
    key: 'disabled',
    set: function set(disabled) {
      var _this4 = this;

      _set(DateTimeComponent.prototype.__proto__ || Object.getPrototypeOf(DateTimeComponent.prototype), 'disabled', disabled, this);
      (0, _each3.default)(this.inputs, function (input) {
        var calendar = _this4.getCalendar(input);
        if (calendar) {
          if (disabled) {
            calendar._input.setAttribute('disabled', 'disabled');
          } else {
            calendar._input.removeAttribute('disabled');
          }
          calendar.redraw();
        }
      });
    }
  }]);

  return DateTimeComponent;
}(_Base.BaseComponent);