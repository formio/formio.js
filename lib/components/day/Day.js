'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayComponent = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Base = require('../base/Base');

var _utils = require('../../utils');

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
    var dateFormatInfo = (0, _utils.getLocaleDateFormatInfo)(_this.options.language);
    _this.dayFirst = _this.component.useLocaleSettings ? dateFormatInfo.dayFirst : _this.component.dayFirst;
    return _this;
  }

  _createClass(DayComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(DayComponent.prototype.__proto__ || Object.getPrototypeOf(DayComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.attr.type = 'hidden';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: 'createDayInput',
    value: function createDayInput(subinputAtTheBottom) {
      var _this2 = this;

      var dayColumn = this.ce('div', {
        class: 'form-group col col-xs-3'
      });

      var id = this.component.key + '-day';

      var dayLabel = this.ce('label', {
        for: id,
        class: _lodash2.default.get(this.component, 'fields.day.required', false) ? 'field-required' : ''
      });
      dayLabel.appendChild(this.text(this.t('day')));
      this.setSubinputLabelStyle(dayLabel);
      if (!subinputAtTheBottom) {
        dayColumn.appendChild(dayLabel);
      }

      var dayInputWrapper = this.ce('div');
      this.dayInput = this.ce('input', {
        class: 'form-control',
        type: 'number',
        step: '1',
        min: '1',
        max: '31',
        placeholder: _lodash2.default.get(this.component, 'fields.day.placeholder', ''),
        id: id
      });
      this.hook('input', this.dayInput, dayInputWrapper);
      this.addEventListener(this.dayInput, 'change', function () {
        return _this2.updateValue();
      });
      dayInputWrapper.appendChild(this.dayInput);
      this.setSubinputStyle(dayInputWrapper);
      dayColumn.appendChild(dayInputWrapper);

      if (subinputAtTheBottom) {
        dayColumn.appendChild(dayLabel);
      }

      return dayColumn;
    }
  }, {
    key: 'createMonthInput',
    value: function createMonthInput(subinputAtTheBottom) {
      var monthColumn = this.ce('div', {
        class: 'form-group col col-xs-4'
      });

      var id = this.component.key + '-month';

      var monthLabel = this.ce('label', {
        for: id,
        class: _lodash2.default.get(this.component, 'fields.month.required', false) ? 'field-required' : ''
      });
      monthLabel.appendChild(this.text(this.t('month')));
      this.setSubinputLabelStyle(monthLabel);
      if (!subinputAtTheBottom) {
        monthColumn.appendChild(monthLabel);
      }

      var monthInputWrapper = this.ce('div');
      this.monthInput = this.ce('select', {
        class: 'form-control',
        id: id
      });
      this.hook('input', this.monthInput, monthInputWrapper);
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
      monthInputWrapper.appendChild(this.monthInput);
      this.setSubinputStyle(monthInputWrapper);
      monthColumn.appendChild(monthInputWrapper);

      if (subinputAtTheBottom) {
        monthColumn.appendChild(monthLabel);
      }

      return monthColumn;
    }
  }, {
    key: 'createYearInput',
    value: function createYearInput(subinputAtTheBottom) {
      var _this3 = this;

      var yearColumn = this.ce('div', {
        class: 'form-group col col-xs-5'
      });

      var id = this.component.key + '-year';

      var yearLabel = this.ce('label', {
        for: id,
        class: _lodash2.default.get(this.component, 'fields.year.required', false) ? 'field-required' : ''
      });
      yearLabel.appendChild(this.text(this.t('year')));
      this.setSubinputLabelStyle(yearLabel);
      if (!subinputAtTheBottom) {
        yearColumn.appendChild(yearLabel);
      }

      var yearInputWrapper = this.ce('div');
      this.yearInput = this.ce('input', {
        class: 'form-control',
        type: 'number',
        step: '1',
        min: '1',
        placeholder: _lodash2.default.get(this.component, 'fields.year.placeholder', ''),
        value: new Date().getFullYear(),
        id: id
      });

      this.hook('input', this.yearInput, yearInputWrapper);
      this.addEventListener(this.yearInput, 'change', function () {
        return _this3.updateValue();
      });
      yearInputWrapper.appendChild(this.yearInput);
      this.setSubinputStyle(yearInputWrapper);
      yearColumn.appendChild(yearInputWrapper);

      if (subinputAtTheBottom) {
        yearColumn.appendChild(yearLabel);
      }

      return yearColumn;
    }
  }, {
    key: 'createInput',
    value: function createInput(container) {
      var inputGroup = this.ce('div', {
        class: 'input-group row',
        style: 'width: 100%'
      });
      var subinputAtTheBottom = this.component.inputsLabelPosition === 'bottom';

      var _createInputs = this.createInputs(subinputAtTheBottom),
          _createInputs2 = _slicedToArray(_createInputs, 3),
          dayColumn = _createInputs2[0],
          monthColumn = _createInputs2[1],
          yearColumn = _createInputs2[2];

      // Add the columns to the day select in the right order.


      if (this.dayFirst && !_lodash2.default.get(this.component, 'fields.day.hide', false)) {
        inputGroup.appendChild(dayColumn);
      }
      if (!_lodash2.default.get(this.component, 'fields.month.hide', false)) {
        inputGroup.appendChild(monthColumn);
      }
      if (!this.dayFirst && !_lodash2.default.get(this.component, 'fields.day.hide', false)) {
        inputGroup.appendChild(dayColumn);
      }
      if (!_lodash2.default.get(this.component, 'fields.year.hide', false)) {
        inputGroup.appendChild(yearColumn);
      }

      var input = this.ce(this.info.type, this.info.attr);
      this.addInput(input, inputGroup);
      this.errorContainer = container;
      this.setInputStyles(inputGroup);
      container.appendChild(inputGroup);
    }
  }, {
    key: 'createInputs',
    value: function createInputs(subinputAtTheBottom) {
      return [this.createDayInput(subinputAtTheBottom), this.createMonthInput(subinputAtTheBottom), this.createYearInput(subinputAtTheBottom)];
    }
  }, {
    key: 'setSubinputLabelStyle',
    value: function setSubinputLabelStyle(label) {
      var inputsLabelPosition = this.component.inputsLabelPosition;


      if (inputsLabelPosition === 'left') {
        _lodash2.default.assign(label.style, {
          float: 'left',
          width: '30%',
          marginRight: '3%',
          textAlign: 'left'
        });
      }

      if (inputsLabelPosition === 'right') {
        _lodash2.default.assign(label.style, {
          float: 'right',
          width: '30%',
          marginLeft: '3%',
          textAlign: 'right'
        });
      }
    }
  }, {
    key: 'setSubinputStyle',
    value: function setSubinputStyle(input) {
      var inputsLabelPosition = this.component.inputsLabelPosition;


      if (['left', 'right'].indexOf(inputsLabelPosition) !== -1) {
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
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      if (!value) {
        return;
      }
      var parts = value.split('/');
      if (this.component.dayFirst && !_lodash2.default.get(this.component, 'fields.day.hide', false)) {
        this.dayInput.value = parseInt(parts.shift(), 10);
      }
      if (!_lodash2.default.get(this.component, 'fields.month.hide', false)) {
        this.monthInput.value = parseInt(parts.shift(), 10);
      }
      if (!this.component.dayFirst && !_lodash2.default.get(this.component, 'fields.day.hide', false)) {
        this.dayInput.value = parseInt(parts.shift(), 10);
      }
      if (!_lodash2.default.get(this.component, 'fields.year.hide', false)) {
        this.yearInput.value = parseInt(parts.shift(), 10);
      }
    }

    /**
     * Get the format for the value string.
     * @returns {string}
     */

  }, {
    key: 'getValueAt',


    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */
    value: function getValueAt(index) {
      this.inputs[index].value = this.date.format(this.format);
      return this.inputs[index].value;
    }
  }, {
    key: 'getView',
    value: function getView() {
      var date = this.date;
      return date.isValid() ? date.format(this.format) : null;
    }
  }, {
    key: 'months',
    get: function get() {
      if (this._months) {
        return this._months;
      }
      this._months = [{ value: 0, label: _lodash2.default.get(this.component, 'fields.month.placeholder', '') }, { value: 1, label: this.t('january') }, { value: 2, label: this.t('february') }, { value: 3, label: this.t('march') }, { value: 4, label: this.t('april') }, { value: 5, label: this.t('may') }, { value: 6, label: this.t('june') }, { value: 7, label: this.t('july') }, { value: 8, label: this.t('august') }, { value: 9, label: this.t('september') }, { value: 10, label: this.t('october') }, { value: 11, label: this.t('november') }, { value: 12, label: this.t('december') }];
      return this._months;
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return '';
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
      if (this.component.dayFirst && !_lodash2.default.get(this.component, 'fields.day.hide', false)) {
        format += 'D/';
      }
      if (!_lodash2.default.get(this.component, 'fields.month.hide', false)) {
        format += 'M/';
      }
      if (!this.component.dayFirst && !_lodash2.default.get(this.component, 'fields.day.hide', false)) {
        format += 'D/';
      }
      if (!_lodash2.default.get(this.component, 'fields.year.hide', false)) {
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

    /**
     * Return the raw value.
     *
     * @returns {Date}
     */

  }, {
    key: 'validationValue',
    get: function get() {
      return this.date.format();
    }
  }]);

  return DayComponent;
}(_Base.BaseComponent);