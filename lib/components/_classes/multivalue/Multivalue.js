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
import Field from '../field/Field';
import _ from 'lodash';
var Multivalue = /** @class */ (function (_super) {
    __extends(Multivalue, _super);
    function Multivalue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Multivalue.prototype, "dataValue", {
        get: function () {
            var parent = _super.prototype.dataValue;
            if (!parent && this.component.multiple) {
                return [];
            }
            return parent;
        },
        set: function (value) {
            _super.prototype.dataValue = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Multivalue.prototype, "defaultValue", {
        get: function () {
            var value = _super.prototype.defaultValue;
            if (this.component.multiple) {
                if (_.isArray(value)) {
                    value = !value.length ? [_super.prototype.emptyValue] : value;
                }
                else {
                    value = [value];
                }
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Multivalue.prototype, "addAnother", {
        get: function () {
            return this.t(this.component.addAnother || 'Add Another');
        },
        enumerable: false,
        configurable: true
    });
    Multivalue.prototype.useWrapper = function () {
        return this.component.hasOwnProperty('multiple') && this.component.multiple;
    };
    Multivalue.prototype.render = function () {
        // If single value field.
        if (!this.useWrapper()) {
            return _super.prototype.render.call(this, "<div ref=\"element\">" + this.renderElement(this.dataValue) + "</div>");
        }
        // Make sure dataValue is in the correct array format.
        var dataValue = this.dataValue;
        if (!Array.isArray(dataValue)) {
            dataValue = dataValue ? [dataValue] : [];
        }
        // If multiple value field.
        return _super.prototype.render.call(this, this.renderTemplate('multiValueTable', {
            rows: dataValue.map(this.renderRow.bind(this)).join(''),
            disabled: this.disabled,
            addAnother: this.addAnother,
        }));
    };
    Multivalue.prototype.renderElement = function () {
        return '';
    };
    Multivalue.prototype.renderRow = function (value, index) {
        return this.renderTemplate('multiValueRow', {
            index: index,
            disabled: this.disabled,
            element: "" + this.renderElement(value, index),
        });
    };
    Multivalue.prototype.attach = function (dom) {
        var _this = this;
        var superAttach = _super.prototype.attach.call(this, dom);
        this.loadRefs(dom, {
            addButton: 'multiple',
            input: 'multiple',
            removeRow: 'multiple',
            mask: 'multiple',
            select: 'multiple',
        });
        this.refs.input.forEach(this.attachElement.bind(this));
        if (!this.component.multiple) {
            return;
        }
        this.refs.removeRow.forEach(function (removeButton, index) {
            _this.addEventListener(removeButton, 'click', function (event) {
                event.preventDefault();
                _this.removeValue(index);
            });
        });
        // If single value field.
        this.refs.addButton.forEach(function (addButton) {
            _this.addEventListener(addButton, 'click', function (event) {
                event.preventDefault();
                _this.addValue();
            });
        });
        return superAttach;
    };
    Multivalue.prototype.detach = function () {
        if (this.refs.input && this.refs.input.length) {
            this.refs.input.forEach(function (input) {
                if (input.mask) {
                    input.mask.destroy();
                }
                if (input.widget) {
                    input.widget.destroy();
                }
            });
        }
        if (this.refs.mask && this.refs.mask.length) {
            this.refs.mask.forEach(function (input) {
                if (input.mask) {
                    input.mask.destroy();
                }
            });
        }
        _super.prototype.detach.call(this);
    };
    /**
     * Attach inputs to the element.
     *
     * @param element
     * @param index
     */
    Multivalue.prototype.attachElement = function (element, index) {
        var _this = this;
        this.addEventListener(element, this.inputInfo.changeEvent, function () {
            // Delay update slightly to give input mask a chance to run.
            var textCase = _.get(_this.component, 'case', 'mixed');
            if (textCase !== 'mixed') {
                var selectionStart = element.selectionStart, selectionEnd = element.selectionEnd;
                if (textCase === 'uppercase' && element.value) {
                    element.value = element.value.toUpperCase();
                }
                if (textCase === 'lowercase' && element.value) {
                    element.value = element.value.toLowerCase();
                }
                if (element.selectionStart && element.selectionEnd) {
                    element.selectionStart = selectionStart;
                    element.selectionEnd = selectionEnd;
                }
            }
            // If a mask is present, delay the update to allow mask to update first.
            if (element.mask) {
                setTimeout(function () {
                    return _this.updateValue(null, {
                        modified: (_this.component.type !== 'hidden')
                    }, index);
                }, 1);
            }
            else {
                return _this.updateValue(null, {
                    modified: (_this.component.type !== 'hidden')
                }, index);
            }
        });
        if (!this.attachMultiMask(index)) {
            this.setInputMask(element);
        }
    };
    Multivalue.prototype.onSelectMaskHandler = function (event) {
        this.updateMask(event.target.maskInput, this.getMaskPattern(event.target.value));
    };
    Multivalue.prototype.getMaskPattern = function (maskName) {
        if (!this.multiMasks) {
            this.multiMasks = {};
        }
        if (this.multiMasks[maskName]) {
            return this.multiMasks[maskName];
        }
        var mask = this.component.inputMasks.find(function (inputMask) { return inputMask.label === maskName; });
        this.multiMasks[maskName] = mask ? mask.mask : this.component.inputMasks[0].mask;
        return this.multiMasks[maskName];
    };
    Multivalue.prototype.attachMultiMask = function (index) {
        if (!(this.isMultipleMasksField && this.component.inputMasks.length && this.refs.input.length)) {
            return false;
        }
        var maskSelect = this.refs.select[index];
        maskSelect.onchange = this.onSelectMaskHandler.bind(this);
        maskSelect.maskInput = this.refs.mask[index];
        this.setInputMask(maskSelect.maskInput, this.component.inputMasks[0].mask);
        return true;
    };
    Multivalue.prototype.updateMask = function (input, mask) {
        if (!mask) {
            return;
        }
        this.setInputMask(input, mask, !this.component.placeholder);
        this.updateValue();
    };
    /**
     * Adds a new empty value to the data array.
     */
    Multivalue.prototype.addNewValue = function (value) {
        if (value === undefined) {
            value = this.component.defaultValue ?
                this.component.defaultValue : this.emptyValue;
            // If default is an empty aray, default back to empty value.
            if (Array.isArray(value) && value.length === 0) {
                value = this.emptyValue;
            }
        }
        var dataValue = this.dataValue || [];
        if (!Array.isArray(dataValue)) {
            dataValue = [dataValue];
        }
        if (Array.isArray(value)) {
            dataValue = dataValue.concat(value);
        }
        else {
            dataValue.push(value);
        }
        this.dataValue = dataValue;
    };
    /**
     * Adds a new empty value to the data array, and add a new row to contain it.
     */
    Multivalue.prototype.addValue = function () {
        this.addNewValue();
        this.redraw();
        this.checkConditions();
        if (!this.isEmpty(this.dataValue)) {
            this.restoreValue();
        }
        if (this.root) {
            this.root.onChange();
        }
    };
    return Multivalue;
}(Field));
export default Multivalue;
