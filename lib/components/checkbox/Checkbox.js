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
import { superGet } from '../../utils/utils';
import Field from '../_classes/field/Field';
var CheckBoxComponent = /** @class */ (function (_super) {
    __extends(CheckBoxComponent, _super);
    function CheckBoxComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckBoxComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field.schema.apply(Field, __spreadArrays([{
                type: 'checkbox',
                inputType: 'checkbox',
                label: 'Checkbox',
                key: 'checkbox',
                dataGridLabel: true,
                labelPosition: 'right',
                value: '',
                name: ''
            }], extend));
    };
    Object.defineProperty(CheckBoxComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Checkbox',
                group: 'basic',
                icon: 'check-square',
                documentation: 'http://help.form.io/userguide/#checkbox',
                weight: 50,
                schema: CheckBoxComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "defaultSchema", {
        get: function () {
            return CheckBoxComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "defaultValue", {
        get: function () {
            var name = this.component.name;
            return name ? (this.component[name] || this.emptyValue) : (this.component.defaultValue || false).toString() === 'true';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "labelClass", {
        get: function () {
            var className = '';
            if (this.isInputComponent
                && !this.options.inputsOnly
                && this.component.validate
                && this.component.validate.required) {
                className += ' field-required';
            }
            return "" + className;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "hasSetValue", {
        get: function () {
            return this.hasValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'input';
            info.changeEvent = 'click';
            info.attr.type = this.component.inputType || 'checkbox';
            info.attr.class = 'form-check-input';
            if (this.component.name) {
                info.attr.name = "data[" + this.component.name + "]";
            }
            info.attr.value = this.component.value ? this.component.value : 0;
            info.label = this.t(this.component.label);
            info.labelClass = this.labelClass;
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckBoxComponent.prototype, "labelInfo", {
        get: function () {
            return {
                hidden: true
            };
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('checkbox', {
            input: this.inputInfo,
            checked: this.checked,
            tooltip: this.interpolate(this.t(this.component.tooltip) || '').replace(/(?:\r\n|\r|\n)/g, '<br />')
        }));
    };
    CheckBoxComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { input: 'multiple' });
        this.input = this.refs.input[0];
        if (this.refs.input) {
            this.addEventListener(this.input, this.inputInfo.changeEvent, function () { return _this.updateValue(null, {
                modified: true
            }); });
            this.addShortcut(this.input);
        }
        return _super.prototype.attach.call(this, element);
    };
    CheckBoxComponent.prototype.detach = function (element) {
        if (element && this.input) {
            this.removeShortcut(this.input);
        }
    };
    Object.defineProperty(CheckBoxComponent.prototype, "emptyValue", {
        get: function () {
            return this.component.inputType === 'radio' ? null : false;
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        return _super.prototype.isEmpty.call(this, value) || value === false;
    };
    Object.defineProperty(CheckBoxComponent.prototype, "key", {
        get: function () {
            return this.component.name ? this.component.name : superGet(Field, 'key', this);
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.prototype.getValueAt = function (index) {
        if (this.component.name) {
            return this.refs.input[index].checked ? this.component.value : '';
        }
        return !!this.refs.input[index].checked;
    };
    CheckBoxComponent.prototype.getValue = function () {
        var value = _super.prototype.getValue.call(this);
        if (this.component.name) {
            return value ? this.setCheckedState(value) : this.setCheckedState(this.dataValue);
        }
        else {
            return (value === '') ? this.dataValue : !!value;
        }
    };
    Object.defineProperty(CheckBoxComponent.prototype, "checked", {
        get: function () {
            if (this.component.name) {
                return (this.dataValue === this.component.value);
            }
            return !!this.dataValue;
        },
        enumerable: false,
        configurable: true
    });
    CheckBoxComponent.prototype.setCheckedState = function (value) {
        if (!this.input) {
            return;
        }
        if (this.component.name) {
            this.input.value = (value === this.component.value) ? this.component.value : 0;
            this.input.checked = (value === this.component.value) ? 1 : 0;
        }
        else if (value === 'on') {
            this.input.value = 1;
            this.input.checked = 1;
        }
        else if (value === 'off') {
            this.input.value = 0;
            this.input.checked = 0;
        }
        else if (value) {
            this.input.value = 1;
            this.input.checked = 1;
        }
        else {
            this.input.value = 0;
            this.input.checked = 0;
        }
        if (this.input.checked) {
            this.input.setAttribute('checked', true);
        }
        else {
            this.input.removeAttribute('checked');
        }
        return value;
    };
    CheckBoxComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        if (this.setCheckedState(value) !== undefined ||
            (!this.input && value !== undefined && (this.visible || !this.component.clearOnHide))) {
            return this.updateValue(value, flags);
        }
        return false;
    };
    CheckBoxComponent.prototype.getValueAsString = function (value) {
        return value ? 'Yes' : 'No';
    };
    return CheckBoxComponent;
}(Field));
export default CheckBoxComponent;
