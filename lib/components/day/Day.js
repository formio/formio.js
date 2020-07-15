"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.pad-start");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DayComponent = /*#__PURE__*/function (_Field) {
  _inherits(DayComponent, _Field);

  var _super = _createSuper(DayComponent);

  function DayComponent() {
    _classCallCheck(this, DayComponent);

    return _super.apply(this, arguments);
  }

  _createClass(DayComponent, [{
    key: "inputDefinition",
    value: function inputDefinition(name) {
      var min, max;

      if (name === 'day') {
        min = 1;
        max = 31;
      }

      if (name === 'month') {
        min = 1;
        max = 12;
      }

      if (name === 'year') {
        min = _lodash.default.get(this.component, 'fields.year.minYear', 1900) || 1900;
        max = _lodash.default.get(this.component, 'fields.year.maxYear', 2030) || 1900;
      }

      return {
        type: 'input',
        ref: name,
        attr: {
          id: "".concat(this.component.key, "-").concat(name),
          class: "form-control ".concat(this.transform('class', "formio-day-component-".concat(name))),
          type: this.component.fields[name].type === 'select' ? 'select' : 'number',
          placeholder: this.component.fields[name].placeholder,
          step: 1,
          min: min,
          max: max
        }
      };
    }
  }, {
    key: "selectDefinition",
    value: function selectDefinition(name) {
      return {
        multiple: false,
        ref: name,
        widget: 'html5',
        attr: {
          id: "".concat(this.component.key, "-").concat(name),
          class: 'form-control',
          name: name,
          lang: this.options.language
        }
      };
    }
  }, {
    key: "setErrorClasses",
    value: function setErrorClasses(elements, dirty, hasError) {
      _get(_getPrototypeOf(DayComponent.prototype), "setErrorClasses", this).call(this, elements, dirty, hasError);

      _get(_getPrototypeOf(DayComponent.prototype), "setErrorClasses", this).call(this, [this.refs.day, this.refs.month, this.refs.year], dirty, hasError);
    }
  }, {
    key: "removeInputError",
    value: function removeInputError(elements) {
      _get(_getPrototypeOf(DayComponent.prototype), "removeInputError", this).call(this, [this.refs.day, this.refs.month, this.refs.year]);

      _get(_getPrototypeOf(DayComponent.prototype), "removeInputError", this).call(this, elements);
    }
  }, {
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(DayComponent.prototype), "init", this).call(this);

      this.validators = this.validators.concat(['day', 'maxDate', 'minDate', 'minYear', 'maxYear']);
      var minYear = this.component.fields.year.minYear;
      var maxYear = this.component.fields.year.maxYear;
      this.component.maxYear = maxYear;
      this.component.minYear = minYear;
      var dateFormatInfo = (0, _utils.getLocaleDateFormatInfo)(this.options.language);
      this.dayFirst = this.component.useLocaleSettings ? dateFormatInfo.dayFirst : this.component.dayFirst;
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(DayComponent.prototype), "render", this).call(this, this.renderTemplate('day', {
        dayFirst: this.dayFirst,
        showDay: this.showDay,
        showMonth: this.showMonth,
        showYear: this.showYear,
        day: this.renderField('day'),
        month: this.renderField('month'),
        year: this.renderField('year')
      }));
    }
  }, {
    key: "renderField",
    value: function renderField(name) {
      var _this = this;

      if (this.component.fields[name].type === 'select') {
        return this.renderTemplate('select', {
          input: this.selectDefinition(name),
          selectOptions: this["".concat(name, "s")].reduce(function (html, option) {
            return html + _this.renderTemplate('selectOption', {
              option: option,
              selected: false,
              attrs: {}
            });
          }, '')
        });
      } else {
        return this.renderTemplate('input', {
          input: this.inputDefinition(name)
        });
      }
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this2 = this;

      this.loadRefs(element, {
        day: 'single',
        month: 'single',
        year: 'single',
        input: 'multiple'
      });

      var superAttach = _get(_getPrototypeOf(DayComponent.prototype), "attach", this).call(this, element);

      if (this.shouldDisabled) {
        this.setDisabled(this.refs.day, true);
        this.setDisabled(this.refs.month, true);
        this.setDisabled(this.refs.year, true);

        if (this.refs.input) {
          this.refs.input.forEach(function (input) {
            return _this2.setDisabled(input, true);
          });
        }
      } else {
        this.addEventListener(this.refs.day, 'input', function () {
          return _this2.updateValue(null, {
            modified: true
          });
        }); // TODO: Need to rework this to work with day select as well.
        // Change day max input when month changes.

        this.addEventListener(this.refs.month, 'input', function () {
          var maxDay = _this2.refs.year ? parseInt(new Date(_this2.refs.year.value, _this2.refs.month.value, 0).getDate(), 10) : '';

          var day = _this2.getFieldValue('day');

          if (!_this2.component.fields.day.hide && maxDay) {
            _this2.refs.day.max = maxDay;
          }

          if (maxDay && day > maxDay) {
            _this2.refs.day.value = _this2.refs.day.max;
          }

          _this2.updateValue(null, {
            modified: true
          });
        });
        this.addEventListener(this.refs.year, 'input', function () {
          return _this2.updateValue(null, {
            modified: true
          });
        });
        this.addEventListener(this.refs.input, this.info.changeEvent, function () {
          return _this2.updateValue(null, {
            modified: true
          });
        });
      }

      this.setValue(this.dataValue);
      return superAttach;
    }
  }, {
    key: "validateRequired",
    value: function validateRequired(setting, value) {
      var _this$parts = this.parts,
          day = _this$parts.day,
          month = _this$parts.month,
          year = _this$parts.year;

      if (this.dayRequired && !day) {
        return false;
      }

      if (this.monthRequired && !month) {
        return false;
      }

      if (this.yearRequired && !year) {
        return false;
      }

      if (!(0, _utils.boolValue)(setting)) {
        return true;
      }

      return !this.isEmpty(value);
    }
  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
      if (!value || this.valueMask.test(value)) {
        return value;
      }

      var dateParts = [];
      var valueParts = value.split('/');

      var getNextPart = function getNextPart(shouldTake, defaultValue) {
        return dateParts.push(shouldTake ? valueParts.shift() : defaultValue);
      };

      if (this.dayFirst) {
        getNextPart(this.showDay, '00');
      }

      getNextPart(this.showMonth, '00');

      if (!this.dayFirst) {
        getNextPart(this.showDay, '00');
      }

      getNextPart(this.showYear, '0000');
      return dateParts.join('/');
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
      var day;

      if (this.component.dayFirst) {
        day = parts.shift();
      }

      var month = parts.shift();

      if (!this.component.dayFirst) {
        day = parts.shift();
      }

      var year = parts.shift();

      if (this.refs.day && this.showDay) {
        this.refs.day.value = day === '00' ? '' : parseInt(day, 10);
      }

      if (this.refs.month && this.showMonth) {
        this.refs.month.value = month === '00' ? '' : parseInt(month, 10);
      }

      if (this.refs.year && this.showYear) {
        this.refs.year.value = year === '0000' ? '' : parseInt(year, 10);
      }
    }
  }, {
    key: "getFieldValue",
    value: function getFieldValue(name) {
      var parts = this.dataValue ? this.dataValue.split('/') : [];
      var val = 0;

      switch (name) {
        case 'month':
          val = parts[this.dayFirst ? 1 : 0];
          break;

        case 'day':
          val = parts[this.dayFirst ? 0 : 1];
          break;

        case 'year':
          val = parts[2];
          break;
      }

      val = parseInt(val, 10);
      return !_lodash.default.isNaN(val) && _lodash.default.isNumber(val) ? val : 0;
    }
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

      if (this.showDay && this.refs.day) {
        day = parseInt(this.refs.day.value, 10);
      }

      if (day === undefined || _lodash.default.isNaN(day)) {
        day = defaults[DAY] && !_lodash.default.isNaN(defaults[DAY]) ? defaults[DAY] : 0;
      }

      if (this.showMonth && this.refs.month) {
        // Months are 0 indexed.
        month = parseInt(this.refs.month.value, 10);
      }

      if (month === undefined || _lodash.default.isNaN(month)) {
        month = defaults[MONTH] && !_lodash.default.isNaN(defaults[MONTH]) ? defaults[MONTH] : 0;
      }

      if (this.showYear && this.refs.year) {
        year = parseInt(this.refs.year.value);
      }

      if (year === undefined || _lodash.default.isNaN(year)) {
        year = defaults[YEAR] && !_lodash.default.isNaN(defaults[YEAR]) ? defaults[YEAR] : 0;
      }

      var result;

      if (!day && !month && !year) {
        return null;
      } // add trailing zeros if the data is showed


      day = this.showDay ? day.toString().padStart(2, 0) : '';
      month = this.showMonth ? month.toString().padStart(2, 0) : '';
      year = this.showYear ? year.toString().padStart(4, 0) : '';

      if (this.component.dayFirst) {
        result = "".concat(day).concat(this.showDay && this.showMonth || this.showDay && this.showYear ? '/' : '').concat(month).concat(this.showMonth && this.showYear ? '/' : '').concat(year);
      } else {
        result = "".concat(month).concat(this.showDay && this.showMonth || this.showMonth && this.showYear ? '/' : '').concat(day).concat(this.showDay && this.showYear ? '/' : '').concat(year);
      }

      return result;
    }
    /**
     * Return the date object for this component.
     * @returns {Date}
     */

  }, {
    key: "normalizeMinMaxDates",
    value: function normalizeMinMaxDates() {
      return [this.component.minDate, this.component.maxDate].map(function (date) {
        return date ? date.split('-').reverse().join('/') : date;
      });
    }
    /**
     * Return the raw value.
     *
     * @returns {Date}
     */

  }, {
    key: "getValue",
    value: function getValue() {
      var result = _get(_getPrototypeOf(DayComponent.prototype), "getValue", this).call(this);

      return !result ? this.dataValue : result;
    }
    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */

  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      var date = this.date;

      if (date) {
        this.refs.input[index].value = date;
        return this.refs.input[index].value;
      } else {
        this.refs.input[index].value = '';
        return null;
      }
    }
    /**
     * Get the input value of the date.
     *
     * @param value
     * @return {null}
     */

  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      return this.getDate(value) || '';
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.dayFirst && this.showDay || !this.dayFirst && !this.showMonth && this.showDay) {
        this.refs.day.focus();
      } else if (this.dayFirst && !this.showDay && this.showMonth || !this.dayFirst && this.showMonth) {
        this.refs.month.focus();
      } else if (!this.showDay && !this.showDay && this.showYear) {
        this.refs.year.focus();
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
    key: "emptyValue",

    /**
     * The empty value for day component.
     *
     * @return {'00/00/0000'}
     */
    get: function get() {
      return '00/00/0000';
    }
  }, {
    key: "valueMask",
    get: function get() {
      return /^\d{2}\/\d{2}\/\d{4}$/;
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
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(DayComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.attr.type = 'hidden';
      info.changeEvent = 'input';
      return info;
    }
  }, {
    key: "days",
    get: function get() {
      if (this._days) {
        return this._days;
      }

      this._days = [{
        value: '',
        label: _lodash.default.get(this.component, 'fields.day.placeholder', '')
      }];

      for (var x = 1; x <= 31; x++) {
        this._days.push({
          value: x,
          label: x.toString()
        });
      }

      return this._days;
    }
  }, {
    key: "months",
    get: function get() {
      if (this._months) {
        return this._months;
      }

      this._months = [{
        value: '',
        label: _lodash.default.get(this.component, 'fields.month.placeholder') || (this.hideInputLabels ? this.t('Month') : '')
      }, {
        value: 1,
        label: 'January'
      }, {
        value: 2,
        label: 'February'
      }, {
        value: 3,
        label: 'March'
      }, {
        value: 4,
        label: 'April'
      }, {
        value: 5,
        label: 'May'
      }, {
        value: 6,
        label: 'June'
      }, {
        value: 7,
        label: 'July'
      }, {
        value: 8,
        label: 'August'
      }, {
        value: 9,
        label: 'September'
      }, {
        value: 10,
        label: 'October'
      }, {
        value: 11,
        label: 'November'
      }, {
        value: 12,
        label: 'December'
      }];
      return this._months;
    }
  }, {
    key: "years",
    get: function get() {
      if (this._years) {
        return this._years;
      }

      this._years = [{
        value: '',
        label: _lodash.default.get(this.component, 'fields.year.placeholder', '')
      }];
      var minYears = _lodash.default.get(this.component, 'fields.year.minYear', 1900) || 1900;
      var maxYears = _lodash.default.get(this.component, 'fields.year.maxYear', 2030) || 2030;

      for (var x = minYears; x <= maxYears; x++) {
        this._years.push({
          value: x,
          label: x.toString()
        });
      }

      return this._years;
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(DayComponent.prototype), "disabled", disabled, this, true);

      if (!this.refs.year || !this.refs.month || !this.refs.day) {
        return;
      }

      if (disabled) {
        this.refs.year.setAttribute('disabled', 'disabled');
        this.refs.month.setAttribute('disabled', 'disabled');
        this.refs.day.setAttribute('disabled', 'disabled');
      } else {
        this.refs.year.removeAttribute('disabled');
        this.refs.month.removeAttribute('disabled');
        this.refs.day.removeAttribute('disabled');
      }
    }
  }, {
    key: "parts",
    get: function get() {
      return {
        day: this.getFieldValue('day'),
        month: this.getFieldValue('month'),
        year: this.getFieldValue('year')
      };
    }
    /**
     * Get the format for the value string.
     * @returns {string}
     */

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
  }, {
    key: "validationValue",
    get: function get() {
      var _ref5 = this.dayFirst ? this.normalizeMinMaxDates() : [this.component.minDate, this.component.maxDate];

      var _ref6 = _slicedToArray(_ref5, 2);

      this.component.minDate = _ref6[0];
      this.component.maxDate = _ref6[1];
      return this.dataValue;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2.default.schema.apply(_Field2.default, [{
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
        icon: 'calendar',
        documentation: 'http://help.form.io/userguide/#day',
        weight: 50,
        schema: DayComponent.schema()
      };
    }
  }]);

  return DayComponent;
}(_Field2.default);

exports.default = DayComponent;