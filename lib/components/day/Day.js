var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
import { boolValue, getLocaleDateFormatInfo, superGet, superSet, } from '../../utils/utils';
import Field from '../_classes/field/Field';
var DayComponent = /** @class */ (function (_super) {
    __extends(DayComponent, _super);
    function DayComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field.schema.apply(Field, __spreadArrays([{
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
            }], extend));
    };
    Object.defineProperty(DayComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Day',
                group: 'advanced',
                icon: 'calendar',
                documentation: 'http://help.form.io/userguide/#day',
                weight: 50,
                schema: DayComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "emptyValue", {
        /**
         * The empty value for day component.
         *
         * @return {'00/00/0000'}
         */
        get: function () {
            return '00/00/0000';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "valueMask", {
        get: function () {
            return /^\d{2}\/\d{2}\/\d{4}$/;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "dayRequired", {
        get: function () {
            return this.showDay && _.get(this.component, 'fields.day.required', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "showDay", {
        get: function () {
            return !_.get(this.component, 'fields.day.hide', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "monthRequired", {
        get: function () {
            return this.showMonth && _.get(this.component, 'fields.month.required', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "showMonth", {
        get: function () {
            return !_.get(this.component, 'fields.month.hide', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "yearRequired", {
        get: function () {
            return this.showYear && _.get(this.component, 'fields.year.required', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "showYear", {
        get: function () {
            return !_.get(this.component, 'fields.year.hide', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "defaultSchema", {
        get: function () {
            return DayComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'input';
            info.attr.type = 'hidden';
            info.changeEvent = 'input';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    DayComponent.prototype.inputDefinition = function (name) {
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
            min = _.get(this.component, 'fields.year.minYear', 1900) || 1900;
            max = _.get(this.component, 'fields.year.maxYear', 2030) || 1900;
        }
        return {
            type: 'input',
            ref: name,
            attr: {
                id: this.component.key + "-" + name,
                class: "form-control " + this.transform('class', "formio-day-component-" + name),
                type: this.component.fields[name].type === 'select' ? 'select' : 'number',
                placeholder: this.component.fields[name].placeholder,
                step: 1,
                min: min,
                max: max,
            }
        };
    };
    DayComponent.prototype.selectDefinition = function (name) {
        return {
            multiple: false,
            ref: name,
            widget: 'html5',
            attr: {
                id: this.component.key + "-" + name,
                class: 'form-control',
                name: name,
                lang: this.options.language
            }
        };
    };
    Object.defineProperty(DayComponent.prototype, "days", {
        get: function () {
            if (this._days) {
                return this._days;
            }
            this._days = [
                { value: '', label: _.get(this.component, 'fields.day.placeholder', '') }
            ];
            for (var x = 1; x <= 31; x++) {
                this._days.push({
                    value: x,
                    label: x.toString()
                });
            }
            return this._days;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "months", {
        get: function () {
            if (this._months) {
                return this._months;
            }
            this._months = [
                {
                    value: '',
                    label: _.get(this.component, 'fields.month.placeholder') || (this.hideInputLabels ? this.t('Month') : '')
                },
                { value: 1, label: 'January' },
                { value: 2, label: 'February' },
                { value: 3, label: 'March' },
                { value: 4, label: 'April' },
                { value: 5, label: 'May' },
                { value: 6, label: 'June' },
                { value: 7, label: 'July' },
                { value: 8, label: 'August' },
                { value: 9, label: 'September' },
                { value: 10, label: 'October' },
                { value: 11, label: 'November' },
                { value: 12, label: 'December' }
            ];
            return this._months;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "years", {
        get: function () {
            if (this._years) {
                return this._years;
            }
            this._years = [
                { value: '', label: _.get(this.component, 'fields.year.placeholder', '') }
            ];
            var minYears = _.get(this.component, 'fields.year.minYear', 1900) || 1900;
            var maxYears = _.get(this.component, 'fields.year.maxYear', 2030) || 2030;
            for (var x = minYears; x <= maxYears; x++) {
                this._years.push({
                    value: x,
                    label: x.toString()
                });
            }
            return this._years;
        },
        enumerable: false,
        configurable: true
    });
    DayComponent.prototype.setErrorClasses = function (elements, dirty, options) {
        _super.prototype.setErrorClasses.call(this, elements, dirty, options);
        _super.prototype.setErrorClasses.call(this, [this.refs.day, this.refs.month, this.refs.year], dirty, options);
    };
    DayComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.validators = this.validators.concat(['day', 'maxDate', 'minDate', 'minYear', 'maxYear']);
        var minYear = this.component.fields.year.minYear;
        var maxYear = this.component.fields.year.maxYear;
        this.component.maxYear = maxYear;
        this.component.minYear = minYear;
        var dateFormatInfo = getLocaleDateFormatInfo(this.options.language);
        this.dayFirst = this.component.useLocaleSettings
            ? dateFormatInfo.dayFirst
            : this.component.dayFirst;
    };
    DayComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('day', {
            dayFirst: this.dayFirst,
            showDay: this.showDay,
            showMonth: this.showMonth,
            showYear: this.showYear,
            day: this.renderField('day'),
            month: this.renderField('month'),
            year: this.renderField('year'),
        }));
    };
    DayComponent.prototype.renderField = function (name) {
        var _this = this;
        if (this.component.fields[name].type === 'select') {
            return this.renderTemplate('select', {
                input: this.selectDefinition(name),
                selectOptions: this[name + "s"].reduce(function (html, option) {
                    return html + _this.renderTemplate('selectOption', {
                        option: option,
                        selected: false,
                        attrs: {}
                    });
                }, ''),
            });
        }
        else {
            return this.renderTemplate('input', {
                input: this.inputDefinition(name)
            });
        }
    };
    DayComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { day: 'single', month: 'single', year: 'single', input: 'multiple' });
        var superAttach = _super.prototype.attach.call(this, element);
        if (this.shouldDisabled) {
            this.setDisabled(this.refs.day, true);
            this.setDisabled(this.refs.month, true);
            this.setDisabled(this.refs.year, true);
            if (this.refs.input) {
                this.refs.input.forEach(function (input) { return _this.setDisabled(input, true); });
            }
        }
        else {
            this.addEventListener(this.refs.day, 'input', function () { return _this.updateValue(null, {
                modified: true
            }); });
            // TODO: Need to rework this to work with day select as well.
            // Change day max input when month changes.
            this.addEventListener(this.refs.month, 'input', function () {
                var maxDay = _this.refs.year ? parseInt(new Date(_this.refs.year.value, _this.refs.month.value, 0).getDate(), 10)
                    : '';
                var day = _this.getFieldValue('day');
                if (!_this.component.fields.day.hide && maxDay) {
                    _this.refs.day.max = maxDay;
                }
                if (maxDay && day > maxDay) {
                    _this.refs.day.value = _this.refs.day.max;
                }
                _this.updateValue(null, {
                    modified: true
                });
            });
            this.addEventListener(this.refs.year, 'input', function () { return _this.updateValue(null, {
                modified: true
            }); });
            this.addEventListener(this.refs.input, this.info.changeEvent, function () { return _this.updateValue(null, {
                modified: true
            }); });
        }
        this.setValue(this.dataValue);
        return superAttach;
    };
    DayComponent.prototype.validateRequired = function (setting, value) {
        var _a = this.parts, day = _a.day, month = _a.month, year = _a.year;
        if (this.dayRequired && !day) {
            return false;
        }
        if (this.monthRequired && !month) {
            return false;
        }
        if (this.yearRequired && !year) {
            return false;
        }
        if (!boolValue(setting)) {
            return true;
        }
        return !this.isEmpty(value);
    };
    Object.defineProperty(DayComponent.prototype, "disabled", {
        get: function () {
            return superGet(Field, 'disabled', this);
        },
        set: function (disabled) {
            superSet(Field, 'disabled', this, disabled);
            if (!this.refs.year || !this.refs.month || !this.refs.day) {
                return;
            }
            if (disabled) {
                this.refs.year.setAttribute('disabled', 'disabled');
                this.refs.month.setAttribute('disabled', 'disabled');
                this.refs.day.setAttribute('disabled', 'disabled');
            }
            else {
                this.refs.year.removeAttribute('disabled');
                this.refs.month.removeAttribute('disabled');
                this.refs.day.removeAttribute('disabled');
            }
        },
        enumerable: false,
        configurable: true
    });
    DayComponent.prototype.normalizeValue = function (value) {
        if (!value || this.valueMask.test(value)) {
            return value;
        }
        var dateParts = [];
        var valueParts = value.split('/');
        var getNextPart = function (shouldTake, defaultValue) {
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
    };
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */
    DayComponent.prototype.setValueAt = function (index, value) {
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
    };
    DayComponent.prototype.getFieldValue = function (name) {
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
        return (!_.isNaN(val) && _.isNumber(val)) ? val : 0;
    };
    Object.defineProperty(DayComponent.prototype, "parts", {
        get: function () {
            return {
                day: this.getFieldValue('day'),
                month: this.getFieldValue('month'),
                year: this.getFieldValue('year'),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayComponent.prototype, "format", {
        /**
         * Get the format for the value string.
         * @returns {string}
         */
        get: function () {
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
            }
            else {
                // Trim off the "/" from the end of the format string.
                return format.length ? format.substring(0, format.length - 1) : format;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return the date for this component.
     *
     * @param value
     * @return {*}
     */
    DayComponent.prototype.getDate = function (value) {
        var defaults = [], day, month, year;
        // Map positions to identifiers to get default values for each part of day
        var _a = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2], DAY = _a[0], MONTH = _a[1], YEAR = _a[2];
        var defaultValue = value || this.component.defaultValue;
        if (defaultValue) {
            defaults = defaultValue.split('/').map(function (x) { return parseInt(x, 10); });
        }
        if (this.showDay && this.refs.day) {
            day = parseInt(this.refs.day.value, 10);
        }
        if (day === undefined || _.isNaN(day)) {
            day = defaults[DAY] && !_.isNaN(defaults[DAY]) ? defaults[DAY] : 0;
        }
        if (this.showMonth && this.refs.month) {
            // Months are 0 indexed.
            month = parseInt(this.refs.month.value, 10);
        }
        if (month === undefined || _.isNaN(month)) {
            month = defaults[MONTH] && !_.isNaN(defaults[MONTH]) ? defaults[MONTH] : 0;
        }
        if (this.showYear && this.refs.year) {
            year = parseInt(this.refs.year.value);
        }
        if (year === undefined || _.isNaN(year)) {
            year = defaults[YEAR] && !_.isNaN(defaults[YEAR]) ? defaults[YEAR] : 0;
        }
        var result;
        if (!day && !month && !year) {
            return null;
        }
        // add trailing zeros if the data is showed
        day = this.showDay ? day.toString().padStart(2, 0) : '';
        month = this.showMonth ? month.toString().padStart(2, 0) : '';
        year = this.showYear ? year.toString().padStart(4, 0) : '';
        if (this.component.dayFirst) {
            result = "" + day + (this.showDay && this.showMonth || this.showDay && this.showYear ? '/' : '') + month + (this.showMonth && this.showYear ? '/' : '') + year;
        }
        else {
            result = "" + month + (this.showDay && this.showMonth || this.showMonth && this.showYear ? '/' : '') + day + (this.showDay && this.showYear ? '/' : '') + year;
        }
        return result;
    };
    Object.defineProperty(DayComponent.prototype, "date", {
        /**
         * Return the date object for this component.
         * @returns {Date}
         */
        get: function () {
            return this.getDate();
        },
        enumerable: false,
        configurable: true
    });
    DayComponent.prototype.normalizeMinMaxDates = function () {
        return [this.component.minDate, this.component.maxDate]
            .map(function (date) { return date ? date.split('-').reverse().join('/') : date; });
    };
    Object.defineProperty(DayComponent.prototype, "validationValue", {
        /**
         * Return the raw value.
         *
         * @returns {Date}
         */
        get: function () {
            var _a;
            _a = this.dayFirst ? this.normalizeMinMaxDates()
                : [this.component.minDate, this.component.maxDate], this.component.minDate = _a[0], this.component.maxDate = _a[1];
            return this.dataValue;
        },
        enumerable: false,
        configurable: true
    });
    DayComponent.prototype.getValue = function () {
        var result = _super.prototype.getValue.call(this);
        return (!result) ? this.dataValue : result;
    };
    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */
    DayComponent.prototype.getValueAt = function (index) {
        var date = this.date;
        if (date) {
            this.refs.input[index].value = date;
            return this.refs.input[index].value;
        }
        else {
            this.refs.input[index].value = '';
            return null;
        }
    };
    /**
     * Get the input value of the date.
     *
     * @param value
     * @return {null}
     */
    DayComponent.prototype.getValueAsString = function (value) {
        return this.getDate(value) || '';
    };
    DayComponent.prototype.focus = function () {
        if (this.dayFirst && this.showDay || !this.dayFirst && !this.showMonth && this.showDay) {
            this.refs.day.focus();
        }
        else if (this.dayFirst && !this.showDay && this.showMonth || !this.dayFirst && this.showMonth) {
            this.refs.month.focus();
        }
        else if (!this.showDay && !this.showDay && this.showYear) {
            this.refs.year.focus();
        }
    };
    DayComponent.prototype.isPartialDay = function (value) {
        if (!value) {
            return false;
        }
        var _a = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2], DAY = _a[0], MONTH = _a[1], YEAR = _a[2];
        var values = value.split('/');
        return (values[DAY] === '00' || values[MONTH] === '00' || values[YEAR] === '0000');
    };
    return DayComponent;
}(Field));
export default DayComponent;
