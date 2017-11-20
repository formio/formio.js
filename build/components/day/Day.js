'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base = require('../base/Base');

var _get3 = require('lodash/get');

var _get4 = _interopRequireDefault(_get3);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayComponent = exports.DayComponent = function (_BaseComponent) {
  _inherits(DayComponent, _BaseComponent);

  function DayComponent(component, options, data) {
    _classCallCheck(this, DayComponent);

    var _this = _possibleConstructorReturn(this, (DayComponent.__proto__ || Object.getPrototypeOf(DayComponent)).call(this, component, options, data));

    _this.validators.push('date');
    return _this;
  }

  _createClass(DayComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get2(DayComponent.prototype.__proto__ || Object.getPrototypeOf(DayComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.attr.type = 'hidden';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: 'createDayInput',
    value: function createDayInput() {
      var _this2 = this;

      var dayColumn = this.ce('div', {
        class: 'form-group col col-xs-3'
      });
      var dayLabel = this.ce('label', {
        for: this.component.key + '-day',
        class: (0, _get4.default)(this.component, 'fields.day.required', false) ? 'field-required' : ''
      });
      dayLabel.appendChild(this.text(this.t('day')));
      dayColumn.appendChild(dayLabel);
      this.dayInput = this.ce('input', {
        class: 'form-control',
        type: 'number',
        step: '1',
        min: '1',
        max: '31',
        placeholder: (0, _get4.default)(this.component, 'fields.day.placeholder', ''),
        id: this.component.key + '-day'
      });
      this.addEventListener(this.dayInput, 'change', function () {
        return _this2.updateValue();
      });
      dayColumn.appendChild(this.dayInput);
      return dayColumn;
    }
  }, {
    key: 'createMonthInput',
    value: function createMonthInput() {
      var monthColumn = this.ce('div', {
        class: 'form-group col col-xs-4'
      });
      var monthLabel = this.ce('label', {
        for: this.component.key + '-month',
        class: (0, _get4.default)(this.component, 'fields.month.required', false) ? 'field-required' : ''
      });
      monthLabel.appendChild(this.text(this.t('month')));
      monthColumn.appendChild(monthLabel);
      this.monthInput = this.ce('select', {
        class: 'form-control',
        id: this.component.key + '-month'
      });
      this.selectOptions(this.monthInput, 'monthOption', this.months);
      var self = this;

      // Ensure the day limits match up with the months selected.
      this.monthInput.onchange = function () {
        self.dayInput.max = new Date(self.yearInput.value, this.value, 0).getDate();
        if (self.dayInput.value > self.dayInput.max) {
          self.dayInput.value = self.dayInput.max;
        }
        self.updateValue();
      };
      monthColumn.appendChild(this.monthInput);
      return monthColumn;
    }
  }, {
    key: 'createYearInput',
    value: function createYearInput() {
      var _this3 = this;

      var yearColumn = this.ce('div', {
        class: 'form-group col col-xs-5'
      });
      var yearLabel = this.ce('label', {
        for: this.component.key + '-year',
        class: (0, _get4.default)(this.component, 'fields.year.required', false) ? 'field-required' : ''
      });
      yearLabel.appendChild(this.text(this.t('year')));
      yearColumn.appendChild(yearLabel);
      this.yearInput = this.ce('input', {
        class: 'form-control',
        type: 'number',
        step: '1',
        min: '1',
        placeholder: (0, _get4.default)(this.component, 'fields.year.placeholder', ''),
        value: new Date().getFullYear(),
        id: this.component.key + '-year'
      });
      this.addEventListener(this.yearInput, 'change', function () {
        return _this3.updateValue();
      });
      yearColumn.appendChild(this.yearInput);
      return yearColumn;
    }
  }, {
    key: 'createInput',
    value: function createInput(container) {
      var inputGroup = this.ce('div', {
        class: 'input-group row'
      });

      var dayColumn = this.createDayInput();
      var monthColumn = this.createMonthInput();
      var yearColumn = this.createYearInput();

      // Add the columns to the day select in the right order.
      if (this.component.dayFirst && !(0, _get4.default)(this.component, 'fields.day.hide', false)) {
        inputGroup.appendChild(dayColumn);
      }
      if (!(0, _get4.default)(this.component, 'fields.month.hide', false)) {
        inputGroup.appendChild(monthColumn);
      }
      if (!this.component.dayFirst && !(0, _get4.default)(this.component, 'fields.day.hide', false)) {
        inputGroup.appendChild(dayColumn);
      }
      if (!(0, _get4.default)(this.component, 'fields.year.hide', false)) {
        inputGroup.appendChild(yearColumn);
      }

      var input = this.ce(this.info.type, this.info.attr);
      this.addInput(input, inputGroup);
      this.errorContainer = container;
      container.appendChild(inputGroup);
    }

    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */

  }, {
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      if (!value) {
        return;
      }
      var parts = value.split('/');
      if (this.component.dayFirst && !(0, _get4.default)(this.component, 'fields.day.hide', false)) {
        this.dayInput.value = parseInt(parts.shift(), 10);
      }
      if (!(0, _get4.default)(this.component, 'fields.month.hide', false)) {
        this.monthInput.value = parseInt(parts.shift(), 10);
      }
      if (!this.component.dayFirst && !(0, _get4.default)(this.component, 'fields.day.hide', false)) {
        this.dayInput.value = parseInt(parts.shift(), 10);
      }
      if (!(0, _get4.default)(this.component, 'fields.year.hide', false)) {
        this.yearInput.value = parseInt(parts.shift(), 10);
      }
    }

    /**
     * Get the format for the value string.
     * @returns {string}
     */

  }, {
    key: 'getRawValue',


    /**
     * Return the raw value.
     *
     * @returns {Date}
     */
    value: function getRawValue() {
      return this.date.format();
    }

    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */

  }, {
    key: 'getValueAt',
    value: function getValueAt(index) {
      this.inputs[index].value = this.date.format(this.format);
      return this.inputs[index].value;
    }
  }, {
    key: 'months',
    get: function get() {
      if (this._months) {
        return this._months;
      }
      this._months = [{ value: 0, label: (0, _get4.default)(this.component, 'fields.month.placeholder', '') }, { value: 1, label: this.t('january') }, { value: 2, label: this.t('february') }, { value: 3, label: this.t('march') }, { value: 4, label: this.t('april') }, { value: 5, label: this.t('may') }, { value: 6, label: this.t('june') }, { value: 7, label: this.t('july') }, { value: 8, label: this.t('august') }, { value: 9, label: this.t('september') }, { value: 10, label: this.t('october') }, { value: 11, label: this.t('november') }, { value: 12, label: this.t('december') }];
      return this._months;
    }
  }, {
    key: 'disabled',
    set: function set(disabled) {
      _set(DayComponent.prototype.__proto__ || Object.getPrototypeOf(DayComponent.prototype), 'disabled', disabled, this);
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
    key: 'format',
    get: function get() {
      var format = '';
      if (this.component.dayFirst && !(0, _get4.default)(this.component, 'fields.day.hide', false)) {
        format += 'D/';
      }
      if (!(0, _get4.default)(this.component, 'fields.month.hide', false)) {
        format += 'M/';
      }
      if (!this.component.dayFirst && !(0, _get4.default)(this.component, 'fields.day.hide', false)) {
        format += 'D/';
      }
      if (!(0, _get4.default)(this.component, 'fields.year.hide', false)) {
        format += 'YYYY';
      }
      return format;
    }

    /**
     * Return the date object for this component.
     * @returns {Date}
     */

  }, {
    key: 'date',
    get: function get() {
      var day = this.dayInput.value;
      var month = this.monthInput.value;
      var year = this.yearInput.value;
      return (0, _moment2.default)([parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)]);
    }
  }]);

  return DayComponent;
}(_Base.BaseComponent);