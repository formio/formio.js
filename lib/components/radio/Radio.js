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
import Field from '../_classes/field/Field';
var RadioComponent = /** @class */ (function (_super) {
    __extends(RadioComponent, _super);
    function RadioComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.previousValue = _this.dataValue || null;
        return _this;
    }
    RadioComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field.schema.apply(Field, __spreadArrays([{
                type: 'radio',
                inputType: 'radio',
                label: 'Radio',
                key: 'radio',
                values: [{ label: '', value: '' }],
                fieldSet: false
            }], extend));
    };
    Object.defineProperty(RadioComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Radio',
                group: 'basic',
                icon: 'dot-circle-o',
                weight: 80,
                documentation: 'http://help.form.io/userguide/#radio',
                schema: RadioComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "defaultSchema", {
        get: function () {
            return RadioComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'input';
            info.changeEvent = 'click';
            info.attr.class = 'form-check-input';
            info.attr.name = info.attr.name += "[" + this.id + "]";
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "isRadio", {
        get: function () {
            return this.component.inputType === 'radio';
        },
        enumerable: false,
        configurable: true
    });
    RadioComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('radio', {
            input: this.inputInfo,
            inline: this.component.inline,
            values: this.component.values,
            value: this.dataValue,
            row: this.row,
        }));
    };
    RadioComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { input: 'multiple', wrapper: 'multiple' });
        this.refs.input.forEach(function (input, index) {
            _this.addEventListener(input, _this.inputInfo.changeEvent, function () { return _this.updateValue(null, {
                modified: true,
            }); });
            _this.addShortcut(input, _this.component.values[index].shortcut);
            if (_this.isRadio) {
                var dataValue_1 = _this.dataValue;
                if (!_.isString(_this.dataValue)) {
                    dataValue_1 = _.toString(_this.dataValue);
                }
                input.checked = (dataValue_1 === input.value);
                _this.addEventListener(input, 'keyup', function (event) {
                    if (event.key === ' ' && dataValue_1 === input.value) {
                        event.preventDefault();
                        _this.updateValue(null, {
                            modified: true,
                        });
                    }
                });
            }
        });
        return _super.prototype.attach.call(this, element);
    };
    RadioComponent.prototype.detach = function (element) {
        var _this = this;
        if (element && this.refs.input) {
            this.refs.input.forEach(function (input, index) {
                _this.removeShortcut(input, _this.component.values[index].shortcut);
            });
        }
    };
    RadioComponent.prototype.getValue = function () {
        if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        var value = this.dataValue;
        this.refs.input.forEach(function (input) {
            if (input.checked) {
                value = input.value;
            }
        });
        return value;
    };
    RadioComponent.prototype.getValueAsString = function (value) {
        if (!value) {
            return '';
        }
        if (!_.isString(value)) {
            value = _.toString(value);
        }
        var option = _.find(this.component.values, function (v) { return v.value === value; });
        return _.get(option, 'label', '');
    };
    RadioComponent.prototype.setValueAt = function (index, value) {
        if (this.refs.input && this.refs.input[index] && value !== null && value !== undefined) {
            var inputValue = this.refs.input[index].value;
            this.refs.input[index].checked = (inputValue === value.toString());
        }
    };
    RadioComponent.prototype.updateValue = function (value, flags) {
        var _this = this;
        var changed = _super.prototype.updateValue.call(this, value, flags);
        if (changed && this.refs.wrapper) {
            //add/remove selected option class
            var value_1 = this.dataValue;
            var optionSelectedClass_1 = 'radio-selected';
            this.refs.wrapper.forEach(function (wrapper, index) {
                var input = _this.refs.input[index];
                if (input && input.value.toString() === value_1.toString()) {
                    //add class to container when selected
                    _this.addClass(wrapper, optionSelectedClass_1);
                }
                else {
                    _this.removeClass(wrapper, optionSelectedClass_1);
                }
            });
        }
        if (!flags || !flags.modified || !this.isRadio) {
            return changed;
        }
        // If they clicked on the radio that is currently selected, it needs to reset the value.
        this.currentValue = this.dataValue;
        var shouldResetValue = !(flags && flags.noUpdateEvent)
            && this.previousValue === this.currentValue;
        if (shouldResetValue) {
            this.resetValue();
            this.triggerChange();
        }
        this.previousValue = this.dataValue;
        return changed;
    };
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    RadioComponent.prototype.normalizeValue = function (value) {
        var dataType = this.component.dataType || 'auto';
        if (value === this.emptyValue) {
            return value;
        }
        switch (dataType) {
            case 'auto':
                if (!isNaN(parseFloat(value)) && isFinite(value)) {
                    value = +value;
                }
                if (value === 'true') {
                    value = true;
                }
                if (value === 'false') {
                    value = false;
                }
                break;
            case 'number':
                value = +value;
                break;
            case 'string':
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                else {
                    value = value.toString();
                }
                break;
            case 'boolean':
                value = !(!value || value.toString() === 'false');
                break;
        }
        return _super.prototype.normalizeValue.call(this, value);
    };
    return RadioComponent;
}(Field));
export default RadioComponent;
