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
import Input from '../_classes/input/Input';
import { conformToMask } from 'vanilla-text-mask';
import * as FormioUtils from '../../utils/utils';
var TextFieldComponent = /** @class */ (function (_super) {
    __extends(TextFieldComponent, _super);
    function TextFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextFieldComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input.schema.apply(Input, __spreadArrays([{
                label: 'Text Field',
                key: 'textField',
                type: 'textfield',
                mask: false,
                inputType: 'text',
                inputFormat: 'plain',
                inputMask: '',
                tableView: true,
                spellcheck: true,
                validate: {
                    minLength: '',
                    maxLength: '',
                    pattern: ''
                }
            }], extend));
    };
    Object.defineProperty(TextFieldComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Text Field',
                icon: 'terminal',
                group: 'basic',
                documentation: 'http://help.form.io/userguide/#textfield',
                weight: 0,
                schema: TextFieldComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextFieldComponent.prototype, "defaultSchema", {
        get: function () {
            return TextFieldComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextFieldComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.type = 'input';
            if (this.component.hasOwnProperty('spellcheck')) {
                info.attr.spellcheck = this.component.spellcheck;
            }
            if (this.component.mask) {
                info.attr.type = 'password';
            }
            else {
                info.attr.type = (this.component.inputType === 'password') ? 'password' : 'text';
            }
            info.changeEvent = 'input';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextFieldComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the mask value object.
     *
     * @param value
     * @param flags
     * @return {*}
     */
    TextFieldComponent.prototype.maskValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        // Convert it into the correct format.
        if (!value || (typeof value !== 'object')) {
            value = {
                value: value,
                maskName: this.component.inputMasks[0].label
            };
        }
        // If no value is provided, then set the defaultValue.
        if (!value.value) {
            var defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;
            value.value = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
        }
        return value;
    };
    /**
     * Normalize the value set in the data object.
     *
     * @param value
     * @param flags
     * @return {*}
     */
    TextFieldComponent.prototype.normalizeValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!this.isMultipleMasksField) {
            return _super.prototype.normalizeValue.call(this, value);
        }
        if (Array.isArray(value)) {
            return _super.prototype.normalizeValue.call(this, value.map(function (val) { return _this.maskValue(val, flags); }));
        }
        return _super.prototype.normalizeValue.call(this, this.maskValue(value, flags));
    };
    /**
     * Sets the value at this index.
     *
     * @param index
     * @param value
     * @param flags
     */
    TextFieldComponent.prototype.setValueAt = function (index, value, flags) {
        if (flags === void 0) { flags = {}; }
        if (!this.isMultipleMasksField) {
            return _super.prototype.setValueAt.call(this, index, value, flags);
        }
        value = this.maskValue(value, flags);
        var textValue = value.value || '';
        var textInput = this.refs.mask ? this.refs.mask[index] : null;
        var maskInput = this.refs.select ? this.refs.select[index] : null;
        var mask = this.getMaskPattern(value.maskName);
        if (textInput && maskInput && mask) {
            textInput.value = conformToMask(textValue, FormioUtils.getInputMask(mask)).conformedValue;
            maskInput.value = value.maskName;
        }
        else {
            return _super.prototype.setValueAt.call(this, index, textValue, flags);
        }
    };
    /**
     * Returns the value at this index.
     *
     * @param index
     * @return {*}
     */
    TextFieldComponent.prototype.getValueAt = function (index) {
        if (!this.isMultipleMasksField) {
            return _super.prototype.getValueAt.call(this, index);
        }
        var textInput = this.refs.mask ? this.refs.mask[index] : null;
        var maskInput = this.refs.select ? this.refs.select[index] : null;
        return {
            value: textInput ? textInput.value : undefined,
            maskName: maskInput ? maskInput.value : undefined
        };
    };
    TextFieldComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        if (!this.isMultipleMasksField) {
            return _super.prototype.isEmpty.call(this, (value || '').toString().trim());
        }
        return _super.prototype.isEmpty.call(this, value) || (this.component.multiple ? value.length === 0 : (!value.maskName || !value.value));
    };
    return TextFieldComponent;
}(Input));
export default TextFieldComponent;
