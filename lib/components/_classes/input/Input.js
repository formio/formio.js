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
import Multivalue from '../multivalue/Multivalue';
import { convertStringToHTMLElement } from '../../../utils/utils';
import Widgets from '../../../widgets';
import _ from 'lodash';
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.triggerUpdateValueAt = _.debounce(_this.updateValueAt.bind(_this), 100);
        return _this;
    }
    Input.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Multivalue.schema.apply(Multivalue, __spreadArrays([{
                widget: {
                    type: 'input'
                }
            }], extend));
    };
    Object.defineProperty(Input.prototype, "inputInfo", {
        get: function () {
            var attr = {
                name: this.options.name,
                type: this.component.inputType || 'text',
                class: 'form-control',
                lang: this.options.language
            };
            if (this.component.placeholder) {
                attr.placeholder = this.t(this.component.placeholder);
            }
            if (this.component.tabindex) {
                attr.tabindex = this.component.tabindex;
            }
            if (this.disabled) {
                attr.disabled = 'disabled';
            }
            _.defaults(attr, this.component.attributes);
            return {
                id: this.key,
                type: 'input',
                changeEvent: 'input',
                content: '',
                attr: attr
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "maskOptions", {
        get: function () {
            return _.map(this.component.inputMasks, function (mask) {
                return {
                    label: mask.label,
                    value: mask.label
                };
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "isMultipleMasksField", {
        get: function () {
            return this.component.allowMultipleMasks && !!this.component.inputMasks && !!this.component.inputMasks.length;
        },
        enumerable: false,
        configurable: true
    });
    Input.prototype.getMaskByName = function (maskName) {
        var inputMask = _.find(this.component.inputMasks, function (inputMask) {
            return inputMask.label === maskName;
        });
        return inputMask ? inputMask.mask : undefined;
    };
    Input.prototype.setInputMask = function (input, inputMask) {
        return _super.prototype.setInputMask.call(this, input, (inputMask || this.component.inputMask), !this.component.placeholder);
    };
    Input.prototype.getMaskOptions = function () {
        return this.component.inputMasks
            .map(function (mask) { return ({
            label: mask.label,
            value: mask.label,
        }); });
    };
    Input.prototype.getWordCount = function (value) {
        return value.trim().split(/\s+/).length;
    };
    Object.defineProperty(Input.prototype, "remainingWords", {
        get: function () {
            var maxWords = _.parseInt(_.get(this.component, 'validate.maxWords'), 10);
            var wordCount = this.getWordCount(this.dataValue);
            return maxWords - wordCount;
        },
        enumerable: false,
        configurable: true
    });
    Input.prototype.getValueAttribute = function (value) {
        return _.isObject(value) ? '' : value;
    };
    Input.prototype.renderElement = function (value, index) {
        // Double quotes cause the input value to close so replace them with html quote char.
        if (value && typeof value === 'string') {
            value = value.replace(/"/g, '&quot;');
        }
        var info = this.inputInfo;
        info.attr = info.attr || {};
        var formattedValue = this.formatValue(this.parseValue(value));
        info.attr.value = this.getValueAttribute(formattedValue);
        if (this.isMultipleMasksField) {
            info.attr.class += ' formio-multiple-mask-input';
        }
        // This should be in the calendar widget but it doesn't have access to renderTemplate.
        if (this.component.widget && this.component.widget.type === 'calendar') {
            var calendarIcon = this.renderTemplate('icon', {
                ref: 'icon',
                // After font-awesome would be updated to v5.x, "clock-o" should be replaced with "clock"
                className: this.iconClass(this.component.enableDate || this.component.widget.enableDate ? 'calendar' : 'clock-o'),
                styles: '',
                content: ''
            }).trim();
            if (this.component.prefix !== calendarIcon) {
                // converting string to HTML markup to render correctly DateTime component in portal.form.io
                this.originalComponent.suffix = this.component.suffix = convertStringToHTMLElement(calendarIcon, '[ref="icon"]');
            }
        }
        return this.isMultipleMasksField
            ? this.renderTemplate('multipleMasksInput', {
                input: info,
                value: value,
                index: index,
                selectOptions: this.getMaskOptions() || [],
            })
            : this.renderTemplate('input', {
                input: info,
                value: this.formatValue(this.parseValue(value)),
                index: index
            });
    };
    Input.prototype.setCounter = function (type, element, count, max) {
        if (max) {
            var remaining = max - count;
            if (remaining > 0) {
                this.removeClass(element, 'text-danger');
            }
            else {
                this.addClass(element, 'text-danger');
            }
            this.setContent(element, this.t("{{ remaining }} " + type + " remaining.", {
                remaining: remaining
            }));
        }
        else {
            this.setContent(element, this.t("{{ count }} " + type, {
                count: count
            }));
        }
    };
    Input.prototype.updateValueAt = function (value, flags, index) {
        flags = flags || {};
        if (_.get(this.component, 'showWordCount', false)) {
            if (this.refs.wordcount && this.refs.wordcount[index]) {
                var maxWords = _.parseInt(_.get(this.component, 'validate.maxWords', 0), 10);
                this.setCounter(this.t('words'), this.refs.wordcount[index], this.getWordCount(value), maxWords);
            }
        }
        if (_.get(this.component, 'showCharCount', false)) {
            if (this.refs.charcount && this.refs.charcount[index]) {
                var maxChars = _.parseInt(_.get(this.component, 'validate.maxLength', 0), 10);
                this.setCounter(this.t('characters'), this.refs.charcount[index], value.length, maxChars);
            }
        }
    };
    Input.prototype.getValueAt = function (index) {
        var input = this.performInputMapping(this.refs.input[index]);
        if (input && input.widget) {
            return input.widget.getValue();
        }
        return input ? input.value : undefined;
    };
    Input.prototype.updateValue = function (value, flags, index) {
        flags = flags || {};
        var changed = _super.prototype.updateValue.call(this, value, flags);
        this.triggerUpdateValueAt(this.dataValue, flags, index);
        return changed;
    };
    Input.prototype.parseValue = function (value) {
        return value;
    };
    Input.prototype.formatValue = function (value) {
        return value;
    };
    Input.prototype.attach = function (element) {
        this.loadRefs(element, {
            charcount: 'multiple',
            wordcount: 'multiple',
            prefix: 'multiple',
            suffix: 'multiple'
        });
        return _super.prototype.attach.call(this, element);
    };
    Input.prototype.getWidget = function (index) {
        index = index || 0;
        if (this.refs.input && this.refs.input[index]) {
            return this.refs.input[index].widget;
        }
        return null;
    };
    Input.prototype.getValueAsString = function (value, options) {
        return _super.prototype.getValueAsString.call(this, this.getWidgetValueAsString(value, options), options);
    };
    Input.prototype.attachElement = function (element, index) {
        var _this = this;
        _super.prototype.attachElement.call(this, element, index);
        if (element.widget) {
            element.widget.destroy();
        }
        // Attach the widget.
        element.widget = this.createWidget(index);
        if (element.widget) {
            element.widget.attach(element);
            if (this.refs.prefix && this.refs.prefix[index]) {
                element.widget.addPrefix(this.refs.prefix[index]);
            }
            if (this.refs.suffix && this.refs.suffix[index]) {
                element.widget.addSuffix(this.refs.suffix[index]);
            }
        }
        if (this.options.submitOnEnter) {
            this.addEventListener(element, 'keypress', function (event) {
                var key = event.keyCode || event.which;
                if (key === 13) {
                    event.preventDefault();
                    event.stopPropagation();
                    _this.emit('submitButton');
                }
            });
        }
    };
    /**
     * Creates an instance of a widget for this component.
     *
     * @return {null}
     */
    Input.prototype.createWidget = function (index) {
        var _this = this;
        // Return null if no widget is found.
        if (!this.component.widget) {
            return null;
        }
        // Get the widget settings.
        var settings = (typeof this.component.widget === 'string') ? {
            type: this.component.widget
        } : this.component.widget;
        // Make sure we have a widget.
        if (!Widgets.hasOwnProperty(settings.type)) {
            return null;
        }
        // Create the widget.
        var widget = new Widgets[settings.type](settings, this.component);
        widget.on('update', function () { return _this.updateValue(widget.getValue(), {
            modified: true
        }, index); }, true);
        widget.on('redraw', function () { return _this.redraw(); }, true);
        return widget;
    };
    Input.prototype.detach = function () {
        _super.prototype.detach.call(this);
        if (this.refs && this.refs.input) {
            for (var i = 0; i <= this.refs.input.length; i++) {
                var widget = this.getWidget(i);
                if (widget) {
                    widget.destroy();
                }
            }
        }
    };
    return Input;
}(Multivalue));
export default Input;
