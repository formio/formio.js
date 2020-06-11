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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
import moment from 'moment';
import Input from '../_classes/input/Input';
import { Utils as FormioUtils } from '../../utils';
import Widgets from '../../widgets';
var DateTimeComponent = /** @class */ (function (_super) {
    __extends(DateTimeComponent, _super);
    function DateTimeComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        var timezone = (_this.component.timezone || _this.options.timezone);
        var time24hr = !_.get(_this.component, 'timePicker.showMeridian', true);
        // Change the format to map to the settings.
        if (!_this.component.enableDate) {
            _this.component.format = _this.component.format.replace(/yyyy-MM-dd /g, '');
        }
        if (!_this.component.enableTime) {
            _this.component.format = _this.component.format.replace(/ hh:mm a$/g, '');
        }
        else if (time24hr) {
            _this.component.format = _this.component.format.replace(/hh:mm a$/g, 'HH:mm');
        }
        else {
            _this.component.format = _this.component.format.replace(/HH:mm$/g, 'hh:mm a');
        }
        var customOptions = _this.component.customOptions || {};
        if (typeof customOptions === 'string') {
            try {
                customOptions = JSON.parse(customOptions);
            }
            catch (err) {
                console.warn(err.message);
                customOptions = {};
            }
        }
        /* eslint-disable camelcase */
        _this.component.widget = __assign({ type: 'calendar', timezone: timezone, displayInTimezone: _.get(_this.component, 'displayInTimezone', 'viewer'), submissionTimezone: _this.submissionTimezone, language: _this.options.language, useLocaleSettings: _.get(_this.component, 'useLocaleSettings', false), allowInput: _.get(_this.component, 'allowInput', true), mode: _this.component.multiple ? 'multiple' : 'single', enableTime: _.get(_this.component, 'enableTime', true), noCalendar: !_.get(_this.component, 'enableDate', true), format: _this.component.format, hourIncrement: _.get(_this.component, 'timePicker.hourStep', 1), minuteIncrement: _.get(_this.component, 'timePicker.minuteStep', 5), time_24hr: time24hr, readOnly: _this.options.readOnly, minDate: _.get(_this.component, 'datePicker.minDate'), disabledDates: _.get(_this.component, 'datePicker.disable'), disableWeekends: _.get(_this.component, 'datePicker.disableWeekends'), disableWeekdays: _.get(_this.component, 'datePicker.disableWeekdays'), disableFunction: _.get(_this.component, 'datePicker.disableFunction'), maxDate: _.get(_this.component, 'datePicker.maxDate') }, customOptions);
        /* eslint-enable camelcase */
        // Add the validators date.
        _this.validators.push('date');
        return _this;
    }
    DateTimeComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input.schema.apply(Input, __spreadArrays([{
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
                },
                customOptions: {},
            }], extend));
    };
    Object.defineProperty(DateTimeComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Date / Time',
                group: 'advanced',
                icon: 'calendar',
                documentation: 'http://help.form.io/userguide/#datetime',
                weight: 40,
                schema: DateTimeComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    DateTimeComponent.prototype.performInputMapping = function (input) {
        if (input.widget && input.widget.settings) {
            input.widget.settings.submissionTimezone = this.submissionTimezone;
        }
        return input;
    };
    Object.defineProperty(DateTimeComponent.prototype, "widget", {
        get: function () {
            var widget = this.component.widget ? new Widgets[this.component.widget.type](this.component.widget, this.component) : null;
            return widget;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeComponent.prototype, "defaultSchema", {
        get: function () {
            return DateTimeComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = _super.prototype.defaultValue;
            if (!defaultValue && this.component.defaultDate) {
                defaultValue = FormioUtils.getDateSetting(this.component.defaultDate);
                defaultValue = defaultValue ? defaultValue.toISOString() : '';
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    DateTimeComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        if (value && (value.toString() === 'Invalid Date')) {
            return true;
        }
        return _super.prototype.isEmpty.call(this, value);
    };
    DateTimeComponent.prototype.formatValue = function (input) {
        var result = moment.utc(input).toISOString();
        return result === 'Invalid date' ? input : result;
    };
    DateTimeComponent.prototype.isEqual = function (valueA, valueB) {
        if (valueB === void 0) { valueB = this.dataValue; }
        var format = FormioUtils.convertFormatToMoment(this.component.format);
        return (this.isEmpty(valueA) && this.isEmpty(valueB))
            || moment.utc(valueA).format(format) === moment.utc(valueB).format(format);
    };
    DateTimeComponent.prototype.createWrapper = function () {
        return false;
    };
    DateTimeComponent.prototype.checkValidity = function (data, dirty, rowData) {
        if (this.refs.input) {
            this.refs.input.forEach(function (input) {
                if (input.widget && input.widget.enteredDate) {
                    dirty = true;
                }
            });
        }
        return _super.prototype.checkValidity.call(this, data, dirty, rowData);
    };
    DateTimeComponent.prototype.focus = function () {
        if (this.refs.input && this.refs.input[0]) {
            var sibling = this.refs.input[0].nextSibling;
            if (sibling) {
                sibling.focus();
            }
        }
    };
    return DateTimeComponent;
}(Input));
export default DateTimeComponent;
