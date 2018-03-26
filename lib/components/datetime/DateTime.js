'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _flatpickr = require('flatpickr');

var _flatpickr2 = _interopRequireDefault(_flatpickr);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Base = require('../base/Base');

var _utils = require('../../utils');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeComponent = exports.DateTimeComponent = function (_BaseComponent) {
  _inherits(DateTimeComponent, _BaseComponent);

  function DateTimeComponent(component, options, data) {
    _classCallCheck(this, DateTimeComponent);

    var _this = _possibleConstructorReturn(this, (DateTimeComponent.__proto__ || Object.getPrototypeOf(DateTimeComponent)).call(this, component, options, data));

    _this.validators.push('date');
    _this.closedOn = 0;

    var dateFormatInfo = (0, _utils.getLocaleDateFormatInfo)(_this.options.language);
    _this.defaultFormat = {
      date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
      time: 'h:i K'
    };
    return _this;
  }

  _createClass(DateTimeComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(DateTimeComponent.prototype.__proto__ || Object.getPrototypeOf(DateTimeComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.attr.type = 'text';
      info.changeEvent = 'input';
      this.component.suffix = true;
      return info;
    }
  }, {
    key: 'createWrapper',


    // This select component can handle multiple items on its own.
    value: function createWrapper() {
      return false;
    }
  }, {
    key: 'getLocaleFormat',
    value: function getLocaleFormat() {
      var format = '';

      if (this.component.enableDate) {
        format += this.defaultFormat.date;
      }

      if (this.component.enableTime) {
        format += this.defaultFormat.time;
      }

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
    key: 'getValueAt',
    value: function getValueAt(index) {
      if (!this.inputs[index]) {
        return '';
      }

      var calendar = this.getCalendar(this.inputs[index]);
      if (!calendar) {
        return _get(DateTimeComponent.prototype.__proto__ || Object.getPrototypeOf(DateTimeComponent.prototype), 'getValueAt', this).call(this, index);
      }

      var dates = calendar.selectedDates;
      if (!dates || !dates.length) {
        return '';
      }

      return typeof dates[0].toISOString === 'function' ? dates[0].toISOString() : 'Invalid Date';
    }
  }, {
    key: 'getView',
    value: function getView(value) {
      return value ? (0, _moment2.default)(value).format((0, _utils.convertFormatToMoment)(_lodash2.default.get(this.component, 'format', ''))) : '';
    }
  }, {
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      if (value) {
        // Convert to a standard ISO-8601 format. Needed for proper IE function.
        value = (0, _moment2.default)(value).toISOString();

        var calendar = this.getCalendar(this.inputs[index]);
        if (!calendar) {
          return _get(DateTimeComponent.prototype.__proto__ || Object.getPrototypeOf(DateTimeComponent.prototype), 'setValueAt', this).call(this, index, value);
        }

        calendar.setDate(value ? new Date(value) : new Date(), false);
      }
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return 0;
    }

    /**
     * Get the default date for the calendar.
     * @return {*}
     */

  }, {
    key: 'defaultDate',
    get: function get() {
      return (0, _utils.getDateSetting)(this.component.defaultDate);
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
        enableTime: _lodash2.default.get(this.component, 'enableTime', true),
        noCalendar: !_lodash2.default.get(this.component, 'enableDate', true),
        altFormat: this.component.useLocaleSettings ? this.getLocaleFormat() : (0, _utils.convertFormatToFlatpickr)(_lodash2.default.get(this.component, 'format', '')),
        dateFormat: 'U',
        defaultDate: this.defaultDate,
        hourIncrement: _lodash2.default.get(this.component, 'timePicker.hourStep', 1),
        minuteIncrement: _lodash2.default.get(this.component, 'timePicker.minuteStep', 5),
        minDate: (0, _utils.getDateSetting)(_lodash2.default.get(this.component, 'datePicker.minDate')),
        maxDate: (0, _utils.getDateSetting)(_lodash2.default.get(this.component, 'datePicker.maxDate')),
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
      _lodash2.default.each(this.inputs, function (input) {
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
  }, {
    key: 'validationValue',
    get: function get() {
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
  }]);

  return DateTimeComponent;
}(_Base.BaseComponent);