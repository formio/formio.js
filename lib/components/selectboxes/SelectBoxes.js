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
import RadioComponent from '../radio/Radio';
var SelectBoxesComponent = /** @class */ (function (_super) {
    __extends(SelectBoxesComponent, _super);
    function SelectBoxesComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.validators = _this.validators.concat('minSelectedCount', 'maxSelectedCount');
        return _this;
    }
    SelectBoxesComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return RadioComponent.schema.apply(RadioComponent, __spreadArrays([{
                type: 'selectboxes',
                label: 'Select Boxes',
                key: 'selectBoxes',
                inline: false
            }], extend));
    };
    Object.defineProperty(SelectBoxesComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Select Boxes',
                group: 'basic',
                icon: 'plus-square',
                weight: 60,
                documentation: 'http://help.form.io/userguide/#selectboxes',
                schema: SelectBoxesComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    SelectBoxesComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.component.inputType = 'checkbox';
    };
    Object.defineProperty(SelectBoxesComponent.prototype, "defaultSchema", {
        get: function () {
            return SelectBoxesComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectBoxesComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.attr.name += '[]';
            info.attr.type = 'checkbox';
            info.attr.class = 'form-check-input';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectBoxesComponent.prototype, "emptyValue", {
        get: function () {
            return this.component.values.reduce(function (prev, value) {
                prev[value.value] = false;
                return prev;
            }, {});
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Only empty if the values are all false.
     *
     * @param value
     * @return {boolean}
     */
    SelectBoxesComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        var empty = true;
        for (var key in value) {
            if (value.hasOwnProperty(key) && value[key]) {
                empty = false;
                break;
            }
        }
        return empty;
    };
    SelectBoxesComponent.prototype.getValue = function () {
        if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        var value = {};
        _.each(this.refs.input, function (input) {
            value[input.value] = !!input.checked;
        });
        return value;
    };
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    SelectBoxesComponent.prototype.normalizeValue = function (value) {
        var _a;
        value = value || {};
        if (typeof value !== 'object') {
            if (typeof value === 'string') {
                value = (_a = {},
                    _a[value] = true,
                    _a);
            }
            else {
                value = {};
            }
        }
        if (Array.isArray(value)) {
            _.each(value, function (val) {
                value[val] = true;
            });
        }
        return value;
    };
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     */
    SelectBoxesComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = this.updateValue(value, flags);
        value = this.dataValue;
        _.each(this.refs.input, function (input) {
            if (_.isUndefined(value[input.value])) {
                value[input.value] = false;
            }
            input.checked = !!value[input.value];
        });
        return changed;
    };
    SelectBoxesComponent.prototype.getValueAsString = function (value) {
        if (!value) {
            return '';
        }
        return _(this.component.values || [])
            .filter(function (v) { return value[v.value]; })
            .map('label')
            .join(', ');
    };
    SelectBoxesComponent.prototype.checkComponentValidity = function (data, dirty, rowData) {
        var _this = this;
        var minCount = this.component.validate.minSelectedCount;
        var maxCount = this.component.validate.maxSelectedCount;
        if ((maxCount || minCount) && !this.isValid(data, dirty)) {
            var count = Object.keys(this.validationValue).reduce(function (total, key) {
                if (_this.validationValue[key]) {
                    total++;
                }
                return total;
            }, 0);
            if (maxCount && count >= maxCount) {
                if (this.refs.input) {
                    this.refs.input.forEach(function (item) {
                        if (!item.checked) {
                            item.disabled = true;
                        }
                    });
                }
                if (maxCount && count > maxCount) {
                    var message = this.component.maxSelectedCountMessage
                        ? this.component.maxSelectedCountMessage
                        : "You can only select up to " + maxCount + " items.";
                    this.setCustomValidity(message, dirty);
                    return false;
                }
            }
            else if (minCount && count < minCount) {
                if (this.refs.input) {
                    this.refs.input.forEach(function (item) {
                        item.disabled = false;
                    });
                }
                var message = this.component.minSelectedCountMessage
                    ? this.component.minSelectedCountMessage
                    : "You must select at least " + minCount + " items.";
                this.setCustomValidity(message, dirty);
                return false;
            }
            else {
                if (this.refs.input) {
                    this.refs.input.forEach(function (item) {
                        item.disabled = false;
                    });
                }
            }
        }
        return _super.prototype.checkComponentValidity.call(this, data, dirty, rowData);
    };
    return SelectBoxesComponent;
}(RadioComponent));
export default SelectBoxesComponent;
