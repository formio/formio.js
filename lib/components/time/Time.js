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
import moment from 'moment';
import { superGet } from '../../utils/utils';
import TextFieldComponent from '../textfield/TextField';
var defaultDataFormat = 'HH:mm:ss';
var TimeComponent = /** @class */ (function (_super) {
    __extends(TimeComponent, _super);
    function TimeComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.component.inputMask = _this.getInputMaskFromFormat(_this.component.format);
        _this.component.inputType = _this.component.inputType || 'time';
        _this.rawData = _this.component.multiple ? [] : _this.emptyValue;
        return _this;
    }
    TimeComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextFieldComponent.schema.apply(TextFieldComponent, __spreadArrays([{
                type: 'time',
                label: 'Time',
                key: 'time',
                inputType: 'time',
                format: 'HH:mm',
                dataFormat: defaultDataFormat,
            }], extend));
    };
    TimeComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        if (this.component.inputType === 'text') {
            this.validators.push('time');
        }
    };
    Object.defineProperty(TimeComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Time',
                icon: 'clock-o',
                group: 'advanced',
                documentation: 'http://help.form.io/userguide/#time',
                weight: 55,
                schema: TimeComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "dataFormat", {
        get: function () {
            return this.component.dataFormat || defaultDataFormat;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "defaultSchema", {
        get: function () {
            return TimeComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "defaultValue", {
        get: function () {
            var _this = this;
            var value = superGet(TextFieldComponent, 'defaultValue', this);
            if (this.component.multiple && Array.isArray(value)) {
                value = value.map(function (item) { return item ? _this.getStringAsValue(item) : item; });
            }
            else {
                if (value) {
                    value = this.getStringAsValue(value);
                }
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "validationValue", {
        get: function () {
            return this.rawData || this.dataValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "inputInfo", {
        get: function () {
            var info = superGet(TextFieldComponent, 'inputInfo', this);
            info.attr.type = this.component.inputType;
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeComponent.prototype, "skipMaskValidation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    TimeComponent.prototype.isNotCompleteInput = function (value) {
        return value.includes('_');
    };
    TimeComponent.prototype.removeValue = function (index) {
        this.rawData = Array.isArray(this.rawData) ? __spreadArrays(this.rawData.slice(0, index), this.rawData.slice(index + 1)) : this.emptyValue;
        _super.prototype.removeValue.call(this, index);
    };
    TimeComponent.prototype.resetRawData = function (index) {
        if (index) {
            this.setRawValue(this.emptyValue, index);
        }
        else {
            this.rawData = [];
        }
    };
    TimeComponent.prototype.setRawValue = function (value, index) {
        if (Array.isArray(this.rawData)) {
            this.rawData[index] = value;
        }
        else {
            this.rawData = value;
        }
    };
    TimeComponent.prototype.getRawValue = function (index) {
        if (index && Array.isArray(this.rawData)) {
            return this.rawData[index] || this.emptyValue;
        }
        else {
            return this.rawData;
        }
    };
    TimeComponent.prototype.getValueAt = function (index) {
        if (!this.refs.input.length || !this.refs.input[index]) {
            return this.emptyValue;
        }
        var value = this.refs.input[index].value;
        if (!value) {
            this.resetRawData(index);
            return this.emptyValue;
        }
        this.setRawValue(value, index);
        return this.getStringAsValue(value);
    };
    TimeComponent.prototype.setValueAt = function (index, value) {
        if (value) {
            this.setRawValue(this.getValueAsString(value), index);
        }
        this.refs.input[index].value = this.getRawValue(index);
    };
    TimeComponent.prototype.getStringAsValue = function (view) {
        return view ? moment(view, this.component.format).format(this.component.dataFormat) : view;
    };
    TimeComponent.prototype.getValueAsString = function (value) {
        return (value ? moment(value, this.component.dataFormat).format(this.component.format) : value) || '';
    };
    TimeComponent.prototype.getInputMaskFromFormat = function (format) {
        if (format === 'LT') {
            return '99:99 AA';
        }
        if (format === 'LTS') {
            return '99:99:99 AA';
        }
        return format.replace(/[hHmMsSk]/g, '9')
            .replace(/[aA]/, 'AA');
    };
    TimeComponent.prototype.addFocusBlurEvents = function (element) {
        var _this = this;
        _super.prototype.addFocusBlurEvents.call(this, element);
        this.addEventListener(element, 'blur', function () {
            element.value = _this.getValueAsString(element.value);
        });
    };
    return TimeComponent;
}(TextFieldComponent));
export default TimeComponent;
