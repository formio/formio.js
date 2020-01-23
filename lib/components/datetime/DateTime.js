"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _Input2 = _interopRequireDefault(require("../_classes/input/Input"));

var _utils = _interopRequireDefault(require("../../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DateTimeComponent =
/*#__PURE__*/
function (_Input) {
  _inherits(DateTimeComponent, _Input);

  _createClass(DateTimeComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Input2.default.schema.apply(_Input2.default, [{
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
        }
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Date / Time',
        group: 'advanced',
        icon: 'calendar',
        documentation: 'http://help.form.io/userguide/#datetime',
        weight: 40,
        schema: DateTimeComponent.schema()
      };
    }
  }]);

  function DateTimeComponent(component, options, data) {
    var _this;

    _classCallCheck(this, DateTimeComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateTimeComponent).call(this, component, options, data));
    var timezone = _this.component.timezone || _this.options.timezone;
    var time24hr = !_lodash.default.get(_this.component, 'timePicker.showMeridian', true); // Change the format to map to the settings.

    if (!_this.component.enableDate) {
      _this.component.format = _this.component.format.replace(/yyyy-MM-dd /g, '');
    }

    if (!_this.component.enableTime) {
      _this.component.format = _this.component.format.replace(/ hh:mm a$/g, '');
    } else if (time24hr) {
      _this.component.format = _this.component.format.replace(/hh:mm a$/g, 'HH:mm');
    } else {
      _this.component.format = _this.component.format.replace(/HH:mm$/g, 'hh:mm a');
    }
    /* eslint-disable camelcase */


    _this.component.widget = {
      type: 'calendar',
      timezone: timezone,
      displayInTimezone: _lodash.default.get(_this.component, 'displayInTimezone', 'viewer'),
      submissionTimezone: _this.submissionTimezone,
      language: _this.options.language,
      useLocaleSettings: _lodash.default.get(_this.component, 'useLocaleSettings', false),
      allowInput: _lodash.default.get(_this.component, 'allowInput', true),
      mode: _this.component.multiple ? 'multiple' : 'single',
      enableTime: _lodash.default.get(_this.component, 'enableTime', true),
      noCalendar: !_lodash.default.get(_this.component, 'enableDate', true),
      format: _this.component.format,
      hourIncrement: _lodash.default.get(_this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _lodash.default.get(_this.component, 'timePicker.minuteStep', 5),
      time_24hr: time24hr,
      readOnly: _this.options.readOnly,
      minDate: _lodash.default.get(_this.component, 'datePicker.minDate'),
      maxDate: _lodash.default.get(_this.component, 'datePicker.maxDate')
    };
    /* eslint-enable camelcase */
    // Add the validators date.

    _this.validators.push('date');

    return _this;
  }

  _createClass(DateTimeComponent, [{
    key: "performInputMapping",
    value: function performInputMapping(input) {
      if (input.widget && input.widget.settings) {
        input.widget.settings.submissionTimezone = this.submissionTimezone;
      }

      return input;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;

      if (value && value.toString() === 'Invalid Date') {
        return true;
      }

      return _get(_getPrototypeOf(DateTimeComponent.prototype), "isEmpty", this).call(this, value);
    }
  }, {
    key: "formatValue",
    value: function formatValue(input) {
      var result = _moment.default.utc(input).toISOString();

      return result === 'Invalid date' ? input : result;
    }
  }, {
    key: "isEqual",
    value: function isEqual(valueA) {
      var valueB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataValue;

      var format = _utils.default.convertFormatToMoment(this.component.format);

      return this.isEmpty(valueA) && this.isEmpty(valueB) || _moment.default.utc(valueA).format(format) === _moment.default.utc(valueB).format(format);
    }
  }, {
    key: "createWrapper",
    value: function createWrapper() {
      return false;
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, rowData) {
      if (this.refs.input) {
        this.refs.input.forEach(function (input) {
          if (input.widget && input.widget.enteredDate) {
            dirty = true;
          }
        });
      }

      return _get(_getPrototypeOf(DateTimeComponent.prototype), "checkValidity", this).call(this, data, dirty, rowData);
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.refs.input && this.refs.input[0]) {
        var sibling = this.refs.input[0].nextSibling;

        if (sibling) {
          sibling.focus();
        }
      }
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return DateTimeComponent.schema();
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = _get(_getPrototypeOf(DateTimeComponent.prototype), "defaultValue", this);

      if (!defaultValue && this.component.defaultDate) {
        defaultValue = _utils.default.getDateSetting(this.component.defaultDate);
        defaultValue = defaultValue ? defaultValue.toISOString() : '';
      }

      return defaultValue;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }]);

  return DateTimeComponent;
}(_Input2.default);

exports.default = DateTimeComponent;