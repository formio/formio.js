"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.reflect.set.js");

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.pad-start.js");

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DayComponent = /*#__PURE__*/function (_Field) {
  _inherits(DayComponent, _Field);

  var _super = _createSuper(DayComponent);

  function DayComponent() {
    _classCallCheck(this, DayComponent);

    return _super.apply(this, arguments);
  }

  _createClass(DayComponent, [{
    key: "emptyValue",
    get:
    /**
     * The empty value for day component.
     *
     * @return {'00/00/0000'}
     */
    function get() {
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
      return this.showDay && _lodash["default"].get(this.component, 'fields.day.required', false);
    }
  }, {
    key: "showDay",
    get: function get() {
      return !_lodash["default"].get(this.component, 'fields.day.hide', false);
    }
  }, {
    key: "monthRequired",
    get: function get() {
      return this.showMonth && _lodash["default"].get(this.component, 'fields.month.required', false);
    }
  }, {
    key: "showMonth",
    get: function get() {
      return !_lodash["default"].get(this.component, 'fields.month.hide', false);
    }
  }, {
    key: "yearRequired",
    get: function get() {
      return this.showYear && _lodash["default"].get(this.component, 'fields.year.required', false);
    }
  }, {
    key: "showYear",
    get: function get() {
      return !_lodash["default"].get(this.component, 'fields.year.hide', false);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return DayComponent.schema();
    }
  }, {
    key: "shouldDisabled",
    get: function get() {
      return _get(_getPrototypeOf(DayComponent.prototype), "shouldDisabled", this) || this.parentDisabled;
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
        min = _lodash["default"].get(this.component, 'fields.year.minYear', 1900) || 1900;
        max = _lodash["default"].get(this.component, 'fields.year.maxYear', 2030) || 1900;
      }

      return {
        type: 'input',
        ref: name,
        attr: {
          id: "".concat(this.component.key, "-").concat(name),
          "class": "form-control ".concat(this.transform('class', "formio-day-component-".concat(name))),
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
          "class": 'form-control',
          name: name,
          lang: this.options.language
        }
      };
    }
  }, {
    key: "days",
    get: function get() {
      if (this._days) {
        return this._days;
      }

      this._days = [{
        value: '',
        label: _lodash["default"].get(this.component, 'fields.day.placeholder', '')
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
        label: _lodash["default"].get(this.component, 'fields.month.placeholder') || (this.hideInputLabels ? this.t('Month') : '')
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
        label: _lodash["default"].get(this.component, 'fields.year.placeholder', '')
      }];
      var minYears = _lodash["default"].get(this.component, 'fields.year.minYear', 1900) || 1900;
      var maxYears = _lodash["default"].get(this.component, 'fields.year.maxYear', 2030) || 2030;

      for (var x = minYears; x <= maxYears; x++) {
        this._years.push({
          value: x,
          label: x.toString()
        });
      }

      return this._years;
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
      if (this.isHtmlRenderMode()) {
        return _get(_getPrototypeOf(DayComponent.prototype), "render", this).call(this, this.renderTemplate('input'));
      }

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
          prefix: this.prefix,
          suffix: this.suffix,
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

      this.setValue(this.dataValue); // Force the disabled state with getters and setters.

      this.disabled = this.shouldDisabled;
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
      return !_lodash["default"].isNaN(val) && _lodash["default"].isNumber(val) ? val : 0;
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
    /**
     * Return the date for this component.
     *
     * @param value
     * @return {*}
     */

  }, {
    key: "getDate",
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

      if (day === undefined || _lodash["default"].isNaN(day)) {
        day = defaults[DAY] && !_lodash["default"].isNaN(defaults[DAY]) ? defaults[DAY] : 0;
      }

      if (this.showMonth && this.refs.month) {
        // Months are 0 indexed.
        month = parseInt(this.refs.month.value, 10);
      }

      if (month === undefined || _lodash["default"].isNaN(month)) {
        month = defaults[MONTH] && !_lodash["default"].isNaN(defaults[MONTH]) ? defaults[MONTH] : 0;
      }

      if (this.showYear && this.refs.year) {
        year = parseInt(this.refs.year.value);
      }

      if (year === undefined || _lodash["default"].isNaN(year)) {
        year = defaults[YEAR] && !_lodash["default"].isNaN(defaults[YEAR]) ? defaults[YEAR] : 0;
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
    key: "date",
    get: function get() {
      return this.getDate();
    }
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
    key: "validationValue",
    get: function get() {
      var _ref3 = this.dayFirst ? this.normalizeMinMaxDates() : [this.component.minDate, this.component.maxDate];

      var _ref4 = _slicedToArray(_ref3, 2);

      this.component.minDate = _ref4[0];
      this.component.maxDate = _ref4[1];
      return this.dataValue;
    }
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
      var date = this.date || this.emptyValue;

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
        var _this$refs$day;

        (_this$refs$day = this.refs.day) === null || _this$refs$day === void 0 ? void 0 : _this$refs$day.focus();
      } else if (this.dayFirst && !this.showDay && this.showMonth || !this.dayFirst && this.showMonth) {
        var _this$refs$month;

        (_this$refs$month = this.refs.month) === null || _this$refs$month === void 0 ? void 0 : _this$refs$month.focus();
      } else if (!this.showDay && !this.showDay && this.showYear) {
        var _this$refs$year;

        (_this$refs$year = this.refs.year) === null || _this$refs$year === void 0 ? void 0 : _this$refs$year.focus();
      }
    }
  }, {
    key: "isPartialDay",
    value: function isPartialDay(value) {
      if (!value) {
        return false;
      }

      var _ref5 = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2],
          _ref6 = _slicedToArray(_ref5, 3),
          DAY = _ref6[0],
          MONTH = _ref6[1],
          YEAR = _ref6[2];

      var values = value.split('/');
      return values[DAY] === '00' || values[MONTH] === '00' || values[YEAR] === '0000';
    }
  }, {
    key: "getValidationFormat",
    value: function getValidationFormat() {
      return this.dayFirst ? 'DD-MM-YYYY' : 'MM-DD-YYYY';
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2["default"].schema.apply(_Field2["default"], [{
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
        documentation: '/userguide/forms/form-components#day',
        weight: 50,
        schema: DayComponent.schema()
      };
    }
  }]);

  return DayComponent;
}(_Field2["default"]);

exports["default"] = DayComponent;