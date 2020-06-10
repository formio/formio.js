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
import Choices from 'choices.js';
var TagsComponent = /** @class */ (function (_super) {
    __extends(TagsComponent, _super);
    function TagsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagsComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input.schema.apply(Input, __spreadArrays([{
                type: 'tags',
                label: 'Tags',
                key: 'tags',
                delimeter: ',',
                storeas: 'string',
                maxTags: 0
            }], extend));
    };
    Object.defineProperty(TagsComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Tags',
                icon: 'tags',
                group: 'advanced',
                documentation: 'http://help.form.io/userguide/#tags',
                weight: 30,
                schema: TagsComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    TagsComponent.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    Object.defineProperty(TagsComponent.prototype, "emptyValue", {
        get: function () {
            return (this.component.storeas === 'string') ? '' : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagsComponent.prototype, "defaultSchema", {
        get: function () {
            return TagsComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagsComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.type = 'input';
            info.attr.type = 'text';
            info.changeEvent = 'change';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagsComponent.prototype, "delimiter", {
        get: function () {
            return this.component.delimeter || ',';
        },
        enumerable: false,
        configurable: true
    });
    TagsComponent.prototype.attachElement = function (element, index) {
        var _this = this;
        _super.prototype.attachElement.call(this, element, index);
        if (!element) {
            return;
        }
        element.setAttribute('dir', this.i18next.dir());
        if (this.choices) {
            this.choices.destroy();
        }
        this.choices = new Choices(element, {
            delimiter: this.delimiter,
            editItems: true,
            maxItemCount: this.component.maxTags,
            removeItemButton: true,
            duplicateItemsAllowed: false,
        });
        this.choices.itemList.element.tabIndex = element.tabIndex;
        this.addEventListener(this.choices.input.element, 'blur', function () {
            var value = _this.choices.input.value;
            var maxTagsNumber = _this.component.maxTags;
            var valuesCount = _this.choices.getValue(true).length;
            if (value) {
                if (maxTagsNumber && valuesCount === maxTagsNumber) {
                    _this.choices.addItems = false;
                    _this.choices.clearInput();
                }
                else {
                    _this.choices.setValue([value]);
                    _this.choices.clearInput();
                    _this.choices.hideDropdown(true);
                    _this.updateValue(null, {
                        modified: true
                    });
                }
            }
        });
    };
    TagsComponent.prototype.detach = function () {
        _super.prototype.detach.call(this);
        if (this.choices) {
            this.choices.destroy();
            this.choices = null;
        }
    };
    TagsComponent.prototype.normalizeValue = function (value) {
        if (this.component.storeas === 'string' && Array.isArray(value)) {
            return value.join(this.delimiter);
        }
        else if (this.component.storeas === 'array' && typeof value === 'string') {
            return value.split(this.delimiter).filter(function (result) { return result; });
        }
        return value;
    };
    TagsComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, value, flags);
        if (this.choices) {
            var dataValue = this.dataValue;
            this.choices.removeActiveItems();
            if (dataValue) {
                if (typeof dataValue === 'string') {
                    dataValue = dataValue.split(this.delimiter).filter(function (result) { return result; });
                }
                this.choices.setValue(Array.isArray(dataValue) ? dataValue : [dataValue]);
            }
        }
        return changed;
    };
    Object.defineProperty(TagsComponent.prototype, "disabled", {
        get: function () {
            return _super.prototype.disabled;
        },
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            if (!this.choices) {
                return;
            }
            if (disabled) {
                this.choices.disable();
            }
            else {
                this.choices.enable();
            }
        },
        enumerable: false,
        configurable: true
    });
    TagsComponent.prototype.focus = function () {
        if (this.refs.input && this.refs.input.length) {
            this.refs.input[0].parentNode.lastChild.focus();
        }
    };
    return TagsComponent;
}(Input));
export default TagsComponent;
