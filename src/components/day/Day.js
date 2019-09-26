"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.pad-start");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var DayComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(DayComponent, _BaseComponent);

  _createClass(DayComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
        type: 'day',
        label: 'Day',
        key: 'day',
        fields: {
          day: {
            type: 'number',
            placeholder: '',
            required: false
          },
          month: {
            type: 'select',
            placeholder: '',
            required: false
          },
          year: {
            type: 'number',
            placeholder: '',
            required: false
          }
        },
        dayFirst: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Day',
        group: 'advanced',
        icon: 'fa fa-calendar',
        documentation: 'http://help.form.io/userguide/#day',
        weight: 50,
        schema: DayComponent.schema()
      };
    }
  }]);

  function DayComponent(component, options, data) {
    var _this;

    _classCallCheck(this, DayComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DayComponent).call(this, component, options, data));
    _this.validators = _this.validators.concat(['day', 'maxDate', 'minDate']);
    var dateFormatInfo = (0, _utils.getLocaleDateFormatInfo)(_this.options.language);
    _this.dayFirst = _this.component.useLocaleSettings ? dateFormatInfo.dayFirst : _this.component.dayFirst;
    _this.hideInputLabels = _this.component.hideInputLabels;
    return _this;
  }

  _createClass(DayComponent, [{
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(DayComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.attr.type = 'hidden';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: "getInputValue",
    value: function getInputValue(input, defaultValue) {
      if (_lodash.default.isObject(input)) {
        var value = parseInt(input.value, 10);

        if (!_lodash.default.isNaN(value) && _lodash.default.isNumber(value)) {
          return value;
        }
      }

      return defaultValue;
    }
  }, {
    key: "validateRequired",
    value: function validateRequired(setting, value) {
      var day = this.getInputValue(this.dayInput, 0);
      var month = this.getInputValue(this.monthInput, 0) - 1;
      var year = this.getInputValue(this.yearInput, 0);

      if (this.dayRequired && day === 0) {
        return false;
      }

      if (this.monthRequired && month < 0) {
        return false;
      }

      if (this.yearRequired && year === 0) {
        return false;
      }

      if (!(0, _utils.boolValue)(setting)) {
        return true;
      }

      return !this.isEmpty(value);
    }
  }, {
    key: "createDayInput",
    value: function createDayInput(subinputAtTheBottom) {
      var _this2 = this;

      var dayColumn = this.ce('div', {
        class: 'form-group col col-xs-3'
      });
      var id = "".concat(this.component.key, "-day");
      var dayLabel = !this.hideInputLabels ? this.ce('label', {
        for: id,
        class: _lodash.default.get(this.component, 'fields.day.required', false) ? 'field-required' : ''
      }) : null;

      if (dayLabel) {
        dayLabel.appendChild(this.text(this.t('day')));
        this.setSubinputLabelStyle(dayLabel);
      }

      if (dayLabel && !subinputAtTheBottom) {
        dayColumn.appendChild(dayLabel);
      }

      var dayInputWrapper = this.ce('div');
      this.dayInput = this.ce('input', {
        class: 'form-control',
        type: 'number',
        step: '1',
        min: '1',
        max: '31',
        placeholder: _lodash.default.get(this.component, 'fields.day.placeholder') || (this.hideInputLabels ? this.t('Day') : ''),
        id: id
      });
      this.hook('input', this.dayInput, dayInputWrapper);
      this.addFocusBlurEvents(this.dayInput);
      this.addEventListener(this.dayInput, 'change', function () {
        return _this2.updateValue();
      });
      dayInputWrapper.appendChild(this.dayInput);
      this.setSubinputStyle(dayInputWrapper);
      dayColumn.appendChild(dayInputWrapper);

      if (dayLabel && subinputAtTheBottom) {
        dayColumn.appendChild(dayLabel);
      }

      return dayColumn;
    }
  }, {
    key: "createMonthInput",
    value: function createMonthInput(subinputAtTheBottom) {
      var monthColumn = this.ce('div', {
        class: 'form-group col col-xs-4'
      });
      var id = "".concat(this.component.key, "-month");
      var monthLabel = !this.hideInputLabels ? this.ce('label', {
        for: id,
        class: _lodash.default.get(this.component, 'fields.month.required', false) ? 'field-required' : ''
      }) : null;

      if (monthLabel) {
        monthLabel.appendChild(this.text(this.t('month')));
        this.setSubinputLabelStyle(monthLabel);
      }

      if (monthLabel && !subinputAtTheBottom) {
        monthColumn.appendChild(monthLabel);
      }

      var monthInputWrapper = this.ce('div');
      this.monthInput = this.ce('select', {
        class: 'form-control',
        id: id
      });
      this.hook('input', this.monthInput, monthInputWrapper);
      this.addFocusBlurEvents(this.monthInput);
      this.selectOptions(this.monthInput, 'monthOption', this.months);
      var self = this; // Ensure the day limits match up with the months selected.

      this.monthInput.onchange = function () {
        var maxDay = parseInt(new Date(self.yearInput.value, this.value, 0).getDate(), 0);
        var day = self.getInputValue(self.dayInput, 0);
        self.dayInput.max = maxDay;

        if (day > maxDay) {
          self.dayInput.value = self.dayInput.max;
        }

        self.updateValue();
      };

      monthInputWrapper.appendChild(this.monthInput);
      this.setSubinputStyle(monthInputWrapper);
      monthColumn.appendChild(monthInputWrapper);

      if (monthLabel && subinputAtTheBottom) {
        monthColumn.appendChild(monthLabel);
      }

      return monthColumn;
    }
  }, {
    key: "createYearInput",
    value: function createYearInput(subinputAtTheBottom) {
      var _this3 = this;

      var yearColumn = this.ce('div', {
        class: 'form-group col col-xs-5'
      });
      var id = "".concat(this.component.key, "-year");
      var yearLabel = !this.hideInputLabels ? this.ce('label', {
        for: id,
        class: _lodash.default.get(this.component, 'fields.year.required', false) ? 'field-required' : ''
      }) : null;

      if (yearLabel) {
        yearLabel.appendChild(this.text(this.t('year')));
        this.setSubinputLabelStyle(yearLabel);
      }

      if (yearLabel && !subinputAtTheBottom) {
        yearColumn.appendChild(yearLabel);
      }

      var yearInputWrapper = this.ce('div');
      this.yearInput = this.ce('input', {
        class: 'form-control',
        type: 'number',
        step: '1',
        min: '1',
        placeholder: _lodash.default.get(this.component, 'fields.year.placeholder') || (this.hideInputLabels ? this.t('Year') : ''),
        id: id
      });
      this.hook('input', this.yearInput, yearInputWrapper);
      this.addFocusBlurEvents(this.yearInput);
      this.addEventListener(this.yearInput, 'change', function () {
        return _this3.updateValue();
      });
      yearInputWrapper.appendChild(this.yearInput);
      this.setSubinputStyle(yearInputWrapper);
      yearColumn.appendChild(yearInputWrapper);

      if (yearLabel && subinputAtTheBottom) {
        yearColumn.appendChild(yearLabel);
      }

      return yearColumn;
    }
  }, {
    key: "createInput",
    value: function createInput(container) {
      var inputGroup = this.ce('div', {
        class: 'input-group row',
        style: 'width: 100%'
      });
      var subinputAtTheBottom = this.component.inputsLabelPosition === 'bottom';

      var _this$createInputs = this.createInputs(subinputAtTheBottom),
          _this$createInputs2 = _slicedToArray(_this$createInputs, 3),
          dayColumn = _this$createInputs2[0],
          monthColumn = _this$createInputs2[1],
          yearColumn = _this$createInputs2[2]; // Add the columns to the day select in the right order.


      if (this.dayFirst && this.showDay) {
        inputGroup.appendChild(dayColumn);
      }

      if (this.showMonth) {
        inputGroup.appendChild(monthColumn);
      }

      if (!this.dayFirst && this.showDay) {
        inputGroup.appendChild(dayColumn);
      }

      if (this.showYear) {
        inputGroup.appendChild(yearColumn);
      }

      var input = this.ce(this.info.type, this.info.attr);
      this.addInput(input, inputGroup);
      this.errorContainer = container;
      this.setInputStyles(inputGroup);
      container.appendChild(inputGroup);
    }
  }, {
    key: "createInputs",
    value: function createInputs(subinputAtTheBottom) {
      return [this.createDayInput(subinputAtTheBottom), this.createMonthInput(subinputAtTheBottom), this.createYearInput(subinputAtTheBottom)];
    }
  }, {
    key: "setSubinputLabelStyle",
    value: function setSubinputLabelStyle(label) {
      var inputsLabelPosition = this.component.inputsLabelPosition;

      if (inputsLabelPosition === 'left') {
        _lodash.default.assign(label.style, {
          float: 'left',
          width: '30%',
          marginRight: '3%',
          textAlign: 'left'
        });
      }

      if (inputsLabelPosition === 'right') {
        _lodash.default.assign(label.style, {
          float: 'right',
          width: '30%',
          marginLeft: '3%',
          textAlign: 'right'
        });
      }
    }
  }, {
    key: "setSubinputStyle",
    value: function setSubinputStyle(input) {
      var inputsLabelPosition = this.component.inputsLabelPosition;

      if (['left', 'right'].includes(inputsLabelPosition)) {
        input.style.width = '67%';

        if (inputsLabelPosition === 'left') {
          input.style.marginLeft = '33%';
        } else {
          input.style.marginRight = '33%';
        }
      }
    }
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */

  }, {
    key: "setValueAt",
    value: function setValueAt(index, value) {
      // temporary solution to avoid input reset
      // on invalid date.
      if (!value || value === 'Invalid date') {
        return null;
      }

      var parts = value.split('/');
      var day, month, year;

      if (this.component.dayFirst && this.showDay) {
        day = parts.shift();
        this.dayInput.value = day === '00' ? undefined : parseInt(day, 10);
      }

      if (this.showMonth) {
        month = parts.shift();
        this.monthInput.value = month === '00' ? undefined : parseInt(month, 10);
      }

      if (!this.component.dayFirst && this.showDay) {
        day = parts.shift();
        this.dayInput.value = day === '00' ? undefined : parseInt(day, 10);
      }

      if (this.showYear) {
        year = parts.shift();
        this.yearInput.value = year === '0000' ? undefined : parseInt(year, 10);
      }
    }
    /**
     * Get the format for the value string.
     * @returns {string}
     */

  }, {
    key: "getDate",

    /**
     * Return the date for this component.
     *
     * @param value
     * @return {*}
     */
    value: function getDate(value) {
      var defaults = [],
          day,
          month,
          year; // Map positions to identifiers to get default values for each part of day

      var _ref = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2],
          _ref2 = _slicedToArray(_ref, 3),
          DAY = _ref2[0],
          MONTH = _ref2[1],
          YEAR = _ref2[2];

      var defaultValue = value || this.component.defaultValue;

      if (defaultValue) {
        defaults = defaultValue.split('/').map(function (x) {
          return parseInt(x, 10);
        });
      }

      if (this.showDay && this.dayInput) {
        day = parseInt(this.dayInput.value, 10);
      }

      if (day === undefined || _lodash.default.isNaN(day)) {
        day = defaults[DAY] && !_lodash.default.isNaN(defaults[DAY]) ? defaults[DAY] : 0;
      }

      if (this.showMonth && this.monthInput) {
        month = parseInt(this.monthInput.value, 10);
      }

      if (month === undefined || _lodash.default.isNaN(month)) {
        month = defaults[MONTH] && !_lodash.default.isNaN(defaults[MONTH]) ? defaults[MONTH] : 0;
      }

      if (this.showYear && this.yearInput) {
        year = parseInt(this.yearInput.value);
      }

      if (year === undefined || _lodash.default.isNaN(year)) {
        year = defaults[YEAR] && !_lodash.default.isNaN(defaults[YEAR]) ? defaults[YEAR] : 0;
      }

      var result;

      if (!day && !month && !year) {
        return undefined;
      } //add trailing zeros


      day = day.toString().padStart(2, 0);
      month = month.toString().padStart(2, 0);
      year = year.toString().padStart(4, 0);

      if (this.component.dayFirst) {
        result = "".concat(day, "/").concat(month, "/").concat(year);
      } else {
        result = "".concat(month, "/").concat(day, "/").concat(year);
      }

      return result;
    }
    /**
     * Return the date object for this component.
     * @returns {Date}
     */

  }, {
    key: "getValueAt",

    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */
    value: function getValueAt(index) {
      var date = this.date;

      if (date) {
        this.inputs[index].value = date;
        return this.inputs[index].value;
      } else {
        this.inputs[index].value = '';
        return null;
      }
    }
    /**
     * Get the view of the date.
     *
     * @param value
     * @return {null}
     */

  }, {
    key: "getView",
    value: function getView(value) {
      return this.getDate(value);
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.dayFirst && this.showDay || !this.dayFirst && !this.showMonth && this.showDay) {
        this.dayInput.focus();
      } else if (this.dayFirst && !this.showDay && this.showMonth || !this.dayFirst && this.showMonth) {
        this.monthInput.focus();
      } else if (!this.showDay && !this.showDay && this.showYear) {
        this.yearInput.focus();
      }
    }
  }, {
    key: "isPartialDay",
    value: function isPartialDay(value) {
      if (!value) {
        return false;
      }

      var _ref3 = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2],
          _ref4 = _slicedToArray(_ref3, 3),
          DAY = _ref4[0],
          MONTH = _ref4[1],
          YEAR = _ref4[2];

      var values = value.split('/');
      return values[DAY] === '00' || values[MONTH] === '00' || values[YEAR] === '0000';
    }
  }, {
    key: "dayRequired",
    get: function get() {
      return this.showDay && _lodash.default.get(this.component, 'fields.day.required', false);
    }
  }, {
    key: "showDay",
    get: function get() {
      return !_lodash.default.get(this.component, 'fields.day.hide', false);
    }
  }, {
    key: "monthRequired",
    get: function get() {
      return this.showMonth && _lodash.default.get(this.component, 'fields.month.required', false);
    }
  }, {
    key: "showMonth",
    get: function get() {
      return !_lodash.default.get(this.component, 'fields.month.hide', false);
    }
  }, {
    key: "yearRequired",
    get: function get() {
      return this.showYear && _lodash.default.get(this.component, 'fields.year.required', false);
    }
  }, {
    key: "showYear",
    get: function get() {
      return !_lodash.default.get(this.component, 'fields.year.hide', false);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return DayComponent.schema();
    }
  }, {
    key: "months",
    get: function get() {
      if (this._months) {
        return this._months;
      }

      this._months = [{
        value: undefined,
        label: _lodash.default.get(this.component, 'fields.month.placeholder') || (this.hideInputLabels ? this.t('Month') : '')
      }, {
        value: 1,
        label: this.t('january')
      }, {
        value: 2,
        label: this.t('february')
      }, {
        value: 3,
        label: this.t('march')
      }, {
        value: 4,
        label: this.t('april')
      }, {
        value: 5,
        label: this.t('may')
      }, {
        value: 6,
        label: this.t('june')
      }, {
        value: 7,
        label: this.t('july')
      }, {
        value: 8,
        label: this.t('august')
      }, {
        value: 9,
        label: this.t('september')
      }, {
        value: 10,
        label: this.t('october')
      }, {
        value: 11,
        label: this.t('november')
      }, {
        value: 12,
        label: this.t('december')
      }];
      return this._months;
    }
    /**
     * The empty value for day component.
     *
     * @return {'00/00/0000'}
     */

  }, {
    key: "emptyValue",
    get: function get() {
      return '00/00/0000';
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(DayComponent.prototype), "disabled", disabled, this, true);

      if (!this.yearInput || !this.monthInput || !this.dayInput) {
        return;
      }

      if (disabled) {
        this.yearInput.setAttribute('disabled', 'disabled');
        this.monthInput.setAttribute('disabled', 'disabled');
        this.dayInput.setAttribute('disabled', 'disabled');
      } else {
        this.yearInput.removeAttribute('disabled');
        this.monthInput.removeAttribute('disabled');
        this.dayInput.removeAttribute('disabled');
      }
    }
  }, {
    key: "format",
    get: function get() {
      var format = '';

      if (this.component.dayFirst && this.showDay) {
        format += 'D/';
      }

      if (this.showMonth) {
        format += 'M/';
      }

      if (!this.component.dayFirst && this.showDay) {
        format += 'D/';
      }

      if (this.showYear) {
        format += 'YYYY';
        return format;
      } else {
        // Trim off the "/" from the end of the format string.
        return format.length ? format.substring(0, format.length - 1) : format;
      }
    }
  }, {
    key: "date",
    get: function get() {
      return this.getDate();
    }
    /**
     * Return the raw value.
     *
     * @returns {Date}
     */

  }, {
    key: "validationValue",
    get: function get() {
      return this.date;
    }
  }]);

  return DayComponent;
}(_Base.default);

exports.default = DayComponent;