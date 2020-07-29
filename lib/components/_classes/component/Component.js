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
/* globals Quill, ClassicEditor, CKEDITOR */
import { conformToMask } from 'vanilla-text-mask';
import NativePromise from 'native-promise-only';
import Tooltip from 'tooltip.js';
import _ from 'lodash';
import isMobile from 'ismobilejs';
import { Formio } from '../../../Formio';
import * as FormioUtils from '../../../utils/utils';
import { Conjunctions, Operators, Transformers, ValueSources, } from '../../../validator';
import Validator from '../../../validator/Validator';
import { Templates } from '../../../templates/Templates';
import { fastCloneDeep, boolValue, delay } from '../../../utils/utils';
import Base from '../base/Base';
import ComponentModal from '../componentModal/ComponentModal';
var isIEBrowser = FormioUtils.getIEBrowserVersion();
var CKEDITOR_URL = isIEBrowser
    ? 'https://cdn.ckeditor.com/4.14.1/standard/ckeditor.js'
    : 'https://cdn.form.io/ckeditor/19.0.0/ckeditor.js';
var QUILL_URL = isIEBrowser
    ? 'https://cdn.quilljs.com/1.3.7'
    : 'https://cdn.quilljs.com/2.0.0-dev.3';
var QUILL_TABLE_URL = 'https://cdn.form.io/quill/quill-table.js';
var ACE_URL = 'https://cdn.form.io/ace/1.4.10/ace.js';
/**
 * This is the Component class
 which all elements within the FormioForm derive from.
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    /**
     * Initialize a new Component.
     *
     * @param {Object} component - The component JSON you wish to initialize.
     * @param {Object} options - The options for this component.
     * @param {Object} data - The global data submission object this component will belong.
     */
    /* eslint-disable max-statements */
    function Component(component, options, data) {
        var _this = _super.call(this, Object.assign({
            renderMode: 'form',
            attachMode: 'full'
        }, options || {})) || this;
        // Restore the component id.
        if (component && component.id) {
            _this.id = component.id;
        }
        /**
         * Determines if this component has a condition assigned to it.
         * @type {null}
         * @private
         */
        _this._hasCondition = null;
        /**
         * References to dom elements
         */
        _this.refs = {};
        // Allow global override for any component JSON.
        if (component &&
            _this.options.components &&
            _this.options.components[component.type]) {
            _.merge(component, _this.options.components[component.type]);
        }
        /**
         * Set the validator instance.
         */
        _this.validator = Validator;
        /**
         * The data path to this specific component instance.
         *
         * @type {string}
         */
        _this.path = '';
        /**
         * Points to the root component, usually the FormComponent.
         *
         * @type {Component}
         */
        _this.root = _this.options.root;
        /**
         * The Form.io component JSON schema.
         * @type {*}
         */
        _this.component = _this.mergeSchema(component || {});
        // Save off the original component to be used in logic.
        _this.originalComponent = fastCloneDeep(_this.component);
        /**
         * If the component has been attached
         */
        _this.attached = false;
        /**
         * If the component has been rendered
         */
        _this.rendered = false;
        /**
         * The data object in which this component resides.
         * @type {*}
         */
        _this._data = data || {};
        // Add the id to the component.
        _this.component.id = _this.id;
        /**
         * The existing error that this component has.
         * @type {string}
         */
        _this.error = '';
        /**
         * Tool tip text after processing
         * @type {string}
         */
        _this.tooltip = '';
        /**
         * The row path of this component.
         * @type {number}
         */
        _this.row = _this.options.row;
        /**
         * Determines if this component is disabled, or not.
         *
         * @type {boolean}
         */
        _this._disabled = boolValue(_this.component.disabled) ? _this.component.disabled : false;
        /**
         * If this input has been input and provided value.
         *
         * @type {boolean}
         */
        _this.pristine = true;
        /**
         * Points to the parent component.
         *
         * @type {Component}
         */
        _this.parent = _this.options.parent;
        _this.options.name = _this.options.name || 'data';
        /**
         * The validators that are assigned to this component.
         * @type {[string]}
         */
        _this.validators = ['required', 'minLength', 'maxLength', 'minWords', 'maxWords', 'custom', 'pattern', 'json', 'mask'];
        _this._path = '';
        // Nested forms don't have parents so we need to pass their path in.
        _this._parentPath = _this.options.parentPath || '';
        _this.resetCaches();
        /**
         * Determines if this component is visible, or not.
         */
        _this._parentVisible = _this.options.hasOwnProperty('parentVisible') ? _this.options.parentVisible : true;
        _this._visible = _this._parentVisible && _this.conditionallyVisible(null, data);
        _this._parentDisabled = false;
        /**
         * Used to trigger a new change in this component.
         * @type {function} - Call to trigger a change in this component.
         */
        var changes = [];
        var lastChanged = null;
        var triggerArgs = [];
        var _triggerChange = _.debounce(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.root) {
                _this.root.changing = false;
            }
            triggerArgs = [];
            if (!args[1] && lastChanged) {
                // Set the changed component if one isn't provided.
                args[1] = lastChanged;
            }
            if (_.isEmpty(args[0]) && lastChanged) {
                // Set the flags if it is empty and lastChanged exists.
                args[0] = lastChanged.flags;
            }
            lastChanged = null;
            args[3] = changes;
            var retVal = _this.onChange.apply(_this, args);
            changes = [];
            return retVal;
        }, 100);
        _this.triggerChange = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args[1]) {
                // Make sure that during the debounce that we always track lastChanged component, even if they
                // don't provide one later.
                lastChanged = args[1];
                changes.push(lastChanged);
            }
            if (_this.root) {
                _this.root.changing = true;
            }
            if (args.length) {
                triggerArgs = args;
            }
            return _triggerChange.apply(void 0, triggerArgs);
        };
        /**
         * Used to trigger a redraw event within this component.
         *
         * @type {Function}
         */
        _this.triggerRedraw = _.debounce(_this.redraw.bind(_this), 100);
        /**
         * list of attached tooltips
         * @type {Array}
         */
        _this.tooltips = [];
        // To force this component to be invalid.
        _this.invalid = false;
        if (_this.component) {
            _this.type = _this.component.type;
            if (_this.allowData && _this.key) {
                _this.options.name += "[" + _this.key + "]";
                // If component is visible or not set to clear on hide, set the default value.
                if (_this.visible || !_this.component.clearOnHide) {
                    if (!_this.hasValue()) {
                        _this.dataValue = _this.defaultValue;
                    }
                    else {
                        // Ensure the dataValue is set.
                        /* eslint-disable  no-self-assign */
                        _this.dataValue = _this.dataValue;
                        /* eslint-enable  no-self-assign */
                    }
                }
            }
            /**
             * The element information for creating the input element.
             * @type {*}
             */
            _this.info = _this.elementInfo();
        }
        // Allow anyone to hook into the component creation.
        _this.hook('component');
        if (!_this.options.skipInit) {
            _this.init();
        }
        return _this;
    }
    Component.schema = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        return _.merge.apply(_, __spreadArrays([{
                /**
                 * Determines if this component provides an input.
                 */
                input: true,
                /**
                 * The data key for this component (how the data is stored in the database).
                 */
                key: '',
                /**
                 * The input placeholder for this component.
                 */
                placeholder: '',
                /**
                 * The input prefix
                 */
                prefix: '',
                /**
                 * The custom CSS class to provide to this component.
                 */
                customClass: '',
                /**
                 * The input suffix.
                 */
                suffix: '',
                /**
                 * If this component should allow an array of values to be captured.
                 */
                multiple: false,
                /**
                 * The default value of this compoennt.
                 */
                defaultValue: null,
                /**
                 * If the data of this component should be protected (no GET api requests can see the data)
                 */
                protected: false,
                /**
                 * Validate if the value of this component should be unique within the form.
                 */
                unique: false,
                /**
                 * If the value of this component should be persisted within the backend api database.
                 */
                persistent: true,
                /**
                 * Determines if the component should be within the form, but not visible.
                 */
                hidden: false,
                /**
                 * If the component should be cleared when hidden.
                 */
                clearOnHide: true,
                /**
                 * This will refresh this component options when this field changes.
                 */
                refreshOn: '',
                /**
                 * This will redraw the component when this field changes.
                 */
                redrawOn: '',
                /**
                 * If this component should be included as a column within a submission table.
                 */
                tableView: false,
                /**
                 * If this component should be rendering in modal.
                 */
                modalEdit: false,
                /**
                 * The input label provided to this component.
                 */
                label: '',
                labelPosition: 'top',
                description: '',
                errorLabel: '',
                tooltip: '',
                hideLabel: false,
                tabindex: '',
                disabled: false,
                autofocus: false,
                dbIndex: false,
                customDefaultValue: '',
                calculateValue: '',
                calculateServer: false,
                widget: null,
                /**
                 * Attributes that will be assigned to the input elements of this component.
                 */
                attributes: {},
                /**
                 * This will perform the validation on either "change" or "blur" of the input element.
                 */
                validateOn: 'change',
                /**
                 * The validation criteria for this component.
                 */
                validate: {
                    /**
                     * If this component is required.
                     */
                    required: false,
                    /**
                     * Custom JavaScript validation.
                     */
                    custom: '',
                    /**
                     * If the custom validation should remain private (only the backend will see it and execute it).
                     */
                    customPrivate: false,
                    /**
                     * If this component should implement a strict date validation if the Calendar widget is implemented.
                     */
                    strictDateValidation: false,
                    multiple: false,
                    unique: false
                },
                /**
                 * The simple conditional settings for a component.
                 */
                conditional: {
                    show: null,
                    when: null,
                    eq: ''
                },
                overlay: {
                    style: '',
                    left: '',
                    top: '',
                    width: '',
                    height: '',
                },
                allowCalculateOverride: false,
                encrypted: false,
                showCharCount: false,
                showWordCount: false,
                properties: {},
                allowMultipleMasks: false
            }], sources));
    };
    /**
     * Provides a table view for this component. Override if you wish to do something different than using getView
     * method of your instance.
     *
     * @param value
     * @param options
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    Component.tableView = function (value, options) { };
    Object.defineProperty(Component.prototype, "data", {
        /* eslint-enable max-statements */
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.mergeSchema = function (component) {
        if (component === void 0) { component = {}; }
        return _.defaultsDeep(component, this.defaultSchema);
    };
    Object.defineProperty(Component.prototype, "ready", {
        // Allow componets to notify when ready.
        get: function () {
            return NativePromise.resolve(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelInfo", {
        get: function () {
            var label = {};
            label.hidden = this.labelIsHidden();
            label.className = '';
            label.labelPosition = this.component.labelPosition;
            label.tooltipClass = this.iconClass('question-sign') + " text-muted";
            var isPDFReadOnlyMode = this.parent &&
                this.parent.form &&
                (this.parent.form.display === 'pdf') &&
                this.options.readOnly;
            if (this.hasInput && this.component.validate && boolValue(this.component.validate.required) && !isPDFReadOnlyMode) {
                label.className += ' field-required';
            }
            if (label.hidden) {
                label.className += ' control-label--hidden';
            }
            if (this.info.attr.id) {
                label.for = this.info.attr.id;
            }
            return label;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.init = function () {
        this.disabled = this.shouldDisabled;
    };
    Component.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.detach();
    };
    Object.defineProperty(Component.prototype, "shouldDisabled", {
        get: function () {
            return this.options.readOnly || this.component.disabled || (this.options.hasOwnProperty('disabled') && this.options.disabled[this.key]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isInputComponent", {
        get: function () {
            return !this.component.hasOwnProperty('input') || this.component.input;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "allowData", {
        get: function () {
            return this.hasInput;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "hasInput", {
        get: function () {
            return this.isInputComponent || (this.refs.input && this.refs.input.length);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "defaultSchema", {
        get: function () {
            return Component.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "key", {
        get: function () {
            return _.get(this.component, 'key', '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "parentVisible", {
        get: function () {
            return this._parentVisible;
        },
        set: function (value) {
            if (this._parentVisible !== value) {
                this._parentVisible = value;
                this.clearOnHide();
                this.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "parentDisabled", {
        get: function () {
            return this._parentDisabled;
        },
        set: function (value) {
            if (this._parentDisabled !== value) {
                this._parentDisabled = value;
                this.clearOnHide();
                this.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "visible", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            // Show only if visibility changes or if we are in builder mode or if hidden fields should be shown.
            if (this.builderMode || this.previewMode || this.options.showHiddenFields) {
                return true;
            }
            if (this.options.hide &&
                this.options.hide[this.component.key]) {
                return false;
            }
            if (this.options.show &&
                this.options.show[this.component.key]) {
                return true;
            }
            return this._visible && this._parentVisible;
        },
        /**
         *
         * @param value {boolean}
         */
        set: function (value) {
            if (this._visible !== value) {
                this._visible = value;
                this.clearOnHide();
                this.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "currentForm", {
        get: function () {
            return this._currentForm;
        },
        set: function (instance) {
            this._currentForm = instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "fullMode", {
        get: function () {
            return this.options.attachMode === 'full';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "builderMode", {
        get: function () {
            return this.options.attachMode === 'builder';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "previewMode", {
        get: function () {
            return Boolean(this.options.preview);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "calculatedPath", {
        get: function () {
            console.warn('component.calculatedPath was deprecated, use component.path instead.');
            return this.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelPosition", {
        get: function () {
            return this.component.labelPosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelWidth", {
        get: function () {
            return this.component.labelWidth || 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelMargin", {
        get: function () {
            return this.component.labelMargin || 3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isAdvancedLabel", {
        get: function () {
            return [
                'left-left',
                'left-right',
                'right-left',
                'right-right'
            ].includes(this.labelPosition);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelPositions", {
        get: function () {
            return this.labelPosition.split('-');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "skipInEmail", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.rightDirection = function (direction) {
        return direction === 'right';
    };
    Component.prototype.getLabelInfo = function () {
        var isRightPosition = this.rightDirection(this.labelPositions[0]);
        var isRightAlign = this.rightDirection(this.labelPositions[1]);
        var labelStyles = "\n      flex: " + this.labelWidth + ";\n      " + (isRightPosition ? 'margin-left' : 'margin-right') + ":" + this.labelMargin + "%;\n    ";
        var contentStyles = "\n      flex: " + (100 - this.labelWidth - this.labelMargin) + ";\n    ";
        return {
            isRightPosition: isRightPosition,
            isRightAlign: isRightAlign,
            labelStyles: labelStyles,
            contentStyles: contentStyles
        };
    };
    /**
     * Returns only the schema that is different from the default.
     *
     * @param schema
     * @param defaultSchema
     */
    Component.prototype.getModifiedSchema = function (schema, defaultSchema, recursion) {
        var _this = this;
        var modified = {};
        if (!defaultSchema) {
            return schema;
        }
        _.each(schema, function (val, key) {
            if (!_.isArray(val) && _.isObject(val) && defaultSchema.hasOwnProperty(key)) {
                var subModified = _this.getModifiedSchema(val, defaultSchema[key], true);
                if (!_.isEmpty(subModified)) {
                    modified[key] = subModified;
                }
            }
            else if (_.isArray(val)) {
                if (val.length !== 0) {
                    modified[key] = val;
                }
            }
            else if ((!recursion && (key === 'type')) ||
                (!recursion && (key === 'key')) ||
                (!recursion && (key === 'label')) ||
                (!recursion && (key === 'input')) ||
                (!recursion && (key === 'tableView')) ||
                (val !== '' && !defaultSchema.hasOwnProperty(key)) ||
                (val !== '' && val !== defaultSchema[key])) {
                modified[key] = val;
            }
        });
        return modified;
    };
    Object.defineProperty(Component.prototype, "schema", {
        /**
         * Returns the JSON schema for this component.
         */
        get: function () {
            return fastCloneDeep(this.getModifiedSchema(_.omit(this.component, 'id'), this.defaultSchema));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Translate a text using the i18n system.
     *
     * @param {string} text - The i18n identifier.
     * @param {Object} params - The i18n parameters to use for translation.
     */
    Component.prototype.t = function (text, params) {
        if (params === void 0) { params = {}; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!text) {
            return '';
        }
        params.data = this.rootValue;
        params.row = this.data;
        params.component = this.component;
        return _super.prototype.t.apply(this, __spreadArrays([text, params], args));
    };
    Component.prototype.labelIsHidden = function () {
        return !this.component.label ||
            (!this.inDataGrid && this.component.hideLabel) ||
            (this.inDataGrid && !this.component.dataGridLabel) ||
            this.options.inputsOnly;
    };
    Object.defineProperty(Component.prototype, "transform", {
        get: function () {
            return Templates.current.hasOwnProperty('transform') ? Templates.current.transform.bind(Templates.current) : function (type, value) { return value; };
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.getTemplate = function (names, modes) {
        modes = Array.isArray(modes) ? modes : [modes];
        names = Array.isArray(names) ? names : [names];
        if (!modes.includes('form')) {
            modes.push('form');
        }
        var result = null;
        if (this.options.templates) {
            result = this.checkTemplate(this.options.templates, names, modes);
            if (result) {
                return result;
            }
        }
        var frameworkTemplates = this.options.template ? Templates.templates[this.options.template] : Templates.current;
        result = this.checkTemplate(frameworkTemplates, names, modes);
        if (result) {
            return result;
        }
        // Default back to bootstrap if not defined.
        var name = names[names.length - 1];
        var templatesByName = Templates.defaultTemplates[name];
        if (!templatesByName) {
            return "Unknown template: " + name;
        }
        var templateByMode = this.checkTemplateMode(templatesByName, modes);
        if (templateByMode) {
            return templateByMode;
        }
        return templatesByName.form;
    };
    Component.prototype.checkTemplate = function (templates, names, modes) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            var templatesByName = templates[name_1];
            if (templatesByName) {
                var templateByMode = this.checkTemplateMode(templatesByName, modes);
                if (templateByMode) {
                    return templateByMode;
                }
            }
        }
        return null;
    };
    Component.prototype.checkTemplateMode = function (templatesByName, modes) {
        for (var _i = 0, modes_1 = modes; _i < modes_1.length; _i++) {
            var mode = modes_1[_i];
            var templateByMode = templatesByName[mode];
            if (templateByMode) {
                return templateByMode;
            }
        }
        return null;
    };
    Component.prototype.renderTemplate = function (name, data, modeOption) {
        var _this = this;
        if (data === void 0) { data = {}; }
        // Need to make this fall back to form if renderMode is not found similar to how we search templates.
        var mode = modeOption || this.options.renderMode || 'form';
        data.component = this.component;
        data.self = this;
        data.options = this.options;
        data.readOnly = this.options.readOnly;
        data.iconClass = this.iconClass.bind(this);
        data.size = this.size.bind(this);
        data.t = this.t.bind(this);
        data.transform = this.transform;
        data.id = data.id || this.id;
        data.key = data.key || this.key;
        data.value = data.value || this.dataValue;
        data.disabled = this.disabled;
        data.builder = this.builderMode;
        data.render = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn("Form.io 'render' template function is deprecated.\n      If you need to render template (template A) inside of another template (template B),\n      pass pre-compiled template A (use this.renderTemplate('template_A_name') as template context variable for template B");
            return _this.renderTemplate.apply(_this, args);
        };
        data.label = this.labelInfo;
        data.tooltip = this.interpolate(this.component.tooltip || '').replace(/(?:\r\n|\r|\n)/g, '<br />');
        // Allow more specific template names
        var names = [
            name + "-" + this.component.type + "-" + this.key,
            name + "-" + this.component.type,
            name + "-" + this.key,
            "" + name,
        ];
        // Allow template alters.
        // console.log(`render${name.charAt(0).toUpperCase() + name.substring(1, name.length)}`, data);
        return this.hook("render" + (name.charAt(0).toUpperCase() + name.substring(1, name.length)), this.interpolate(this.getTemplate(names, mode), data), data, mode);
    };
    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */
    Component.prototype.sanitize = function (dirty) {
        return FormioUtils.sanitize(dirty, this.options);
    };
    /**
     * Render a template string into html.
     *
     * @param template
     * @param data
     * @param actions
     *
     * @return {HTMLElement} - The created element.
     */
    Component.prototype.renderString = function (template, data) {
        if (!template) {
            return '';
        }
        // Interpolate the template and populate
        return this.interpolate(template, data);
    };
    Component.prototype.performInputMapping = function (input) {
        return input;
    };
    Component.prototype.getBrowserLanguage = function () {
        var nav = window.navigator;
        var browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
        var language;
        // support for HTML 5.1 "navigator.languages"
        if (Array.isArray(nav.languages)) {
            for (var i = 0; i < nav.languages.length; i++) {
                language = nav.languages[i];
                if (language && language.length) {
                    return language.split(';')[0];
                }
            }
        }
        // support for other well known properties in browsers
        for (var i = 0; i < browserLanguagePropertyKeys.length; i++) {
            language = nav[browserLanguagePropertyKeys[i]];
            if (language && language.length) {
                return language.split(';')[0];
            }
        }
        return null;
    };
    /**
     * Called before a next and previous page is triggered allowing the components
     * to perform special functions.
     *
     * @return {*}
     */
    Component.prototype.beforePage = function () {
        return NativePromise.resolve(true);
    };
    Component.prototype.beforeNext = function () {
        return this.beforePage(true);
    };
    /**
     * Called before a submission is triggered allowing the components
     * to perform special async functions.
     *
     * @return {*}
     */
    Component.prototype.beforeSubmit = function () {
        return NativePromise.resolve(true);
    };
    Object.defineProperty(Component.prototype, "submissionTimezone", {
        /**
         * Return the submission timezone.
         *
         * @return {*}
         */
        get: function () {
            this.options.submissionTimezone = this.options.submissionTimezone || _.get(this.root, 'options.submissionTimezone');
            return this.options.submissionTimezone;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.loadRefs = function (element, refs) {
        for (var ref in refs) {
            if (refs[ref] === 'single') {
                this.refs[ref] = element.querySelector("[ref=\"" + ref + "\"]");
            }
            else {
                this.refs[ref] = element.querySelectorAll("[ref=\"" + ref + "\"]");
            }
        }
    };
    Component.prototype.setOpenModalElement = function () {
        this.componentModal.setOpenModalElement(this.getModalPreviewTemplate());
    };
    Component.prototype.getModalPreviewTemplate = function () {
        return this.renderTemplate('modalPreview', {
            previewText: this.getValueAsString(this.dataValue) || this.t('Click to set value')
        });
    };
    Component.prototype.build = function (element) {
        element = element || this.element;
        this.empty(element);
        this.setContent(element, this.render());
        return this.attach(element);
    };
    Object.defineProperty(Component.prototype, "hasModalSaveButton", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.render = function (children, topLevel) {
        if (children === void 0) { children = "Unknown component: " + this.component.type; }
        if (topLevel === void 0) { topLevel = false; }
        var isVisible = this.visible;
        this.rendered = true;
        if (!this.builderMode && !this.previewMode && this.component.modalEdit) {
            return ComponentModal.render(this, {
                visible: isVisible,
                showSaveButton: this.hasModalSaveButton,
                id: this.id,
                classes: this.className,
                styles: this.customStyle,
                children: children
            }, topLevel);
        }
        else {
            return this.renderTemplate('component', {
                visible: isVisible,
                id: this.id,
                classes: this.className,
                styles: this.customStyle,
                children: children
            }, topLevel);
        }
    };
    Component.prototype.attach = function (element) {
        var _this = this;
        if (!this.builderMode && !this.previewMode && this.component.modalEdit) {
            var modalShouldBeOpened = this.componentModal ? this.componentModal.isOpened : false;
            var currentValue = modalShouldBeOpened ? this.componentModal.currentValue : this.dataValue;
            this.componentModal = new ComponentModal(this, element, modalShouldBeOpened, currentValue);
            this.setOpenModalElement();
        }
        this.attached = true;
        this.element = element;
        element.component = this;
        // If this already has an id, get it from the dom. If SSR, it could be different from the initiated id.
        if (this.element.id) {
            this.id = this.element.id;
        }
        this.loadRefs(element, {
            messageContainer: 'single',
            tooltip: 'multiple'
        });
        this.refs.tooltip.forEach(function (tooltip, index) {
            var title = _this.interpolate(tooltip.getAttribute('data-title') || _this.t(_this.component.tooltip)).replace(/(?:\r\n|\r|\n)/g, '<br />');
            _this.tooltips[index] = new Tooltip(tooltip, {
                trigger: 'hover click focus',
                placement: 'right',
                html: true,
                title: title,
                template: "\n          <div class=\"tooltip\" style=\"opacity: 1;\" role=\"tooltip\">\n            <div class=\"tooltip-arrow\"></div>\n            <div class=\"tooltip-inner\"></div>\n          </div>",
            });
        });
        // Attach logic.
        this.attachLogic();
        this.addFocusBlurEvents(element);
        this.autofocus();
        // Allow global attach.
        this.hook('attachComponent', element, this);
        // Allow attach per component type.
        var type = this.component.type;
        if (type) {
            this.hook("attach" + (type.charAt(0).toUpperCase() + type.substring(1, type.length)), element, this);
        }
        return NativePromise.resolve();
    };
    Component.prototype.addFocusBlurEvents = function (element) {
        var _this = this;
        this.addEventListener(element, 'focusin', function (event) {
            event.stopPropagation();
            if (!_this.root) {
                return;
            }
            if (_this.root.focusedComponent !== _this) {
                if (_this.root.pendingBlur) {
                    _this.root.pendingBlur();
                }
                _this.root.focusedComponent = _this;
                _this.addClass(element, 'formio-active-component');
                _this.emit('focus', _this);
            }
            else if (_this.root.focusedComponent === _this && _this.root.pendingBlur) {
                _this.root.pendingBlur.cancel();
                _this.root.pendingBlur = null;
            }
        });
        this.addEventListener(element, 'focusout', function (event) {
            event.stopPropagation();
            if (!_this.root) {
                return;
            }
            _this.root.pendingBlur = delay(function () {
                _this.emit('blur', _this);
                if (_this.component.validateOn === 'blur') {
                    _this.root.triggerChange({}, {
                        instance: _this,
                        component: _this.component,
                        value: _this.dataValue,
                        flags: {}
                    });
                }
                _this.root.focusedComponent = null;
                _this.removeClass(element, 'formio-active-component');
                _this.root.pendingBlur = null;
            });
        });
    };
    Component.prototype.addShortcut = function (element, shortcut) {
        // Avoid infinite recursion.
        if (!element || !this.root || (this.root === this)) {
            return;
        }
        if (!shortcut) {
            shortcut = this.component.shortcut;
        }
        this.root.addShortcut(element, shortcut);
    };
    Component.prototype.removeShortcut = function (element, shortcut) {
        // Avoid infinite recursion.
        if (!element || (this.root === this)) {
            return;
        }
        if (!shortcut) {
            shortcut = this.component.shortcut;
        }
        this.root.removeShortcut(element, shortcut);
    };
    /**
     * Remove all event handlers.
     */
    Component.prototype.detach = function () {
        this.refs = {};
        this.removeEventListeners();
        this.detachLogic();
        if (this.tooltip) {
            this.tooltip.dispose();
        }
    };
    Component.prototype.checkRefresh = function (refreshData, changed, flags) {
        var changePath = _.get(changed, 'instance.path', false);
        // Don't let components change themselves.
        if (changePath && this.path === changePath) {
            return;
        }
        if (refreshData === 'data') {
            this.refresh(this.data, changed, flags);
        }
        else if ((changePath && changePath === refreshData) && changed && changed.instance &&
            // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
            // in fields inside EditGrids could alter their state from other rows (which is bad).
            this.inContext(changed.instance)) {
            this.refresh(changed.value, changed, flags);
        }
    };
    Component.prototype.checkRefreshOn = function (changes, flags) {
        var _this = this;
        changes = changes || [];
        var refreshOn = this.component.refreshOn || this.component.redrawOn;
        // If they wish to refresh on a value, then add that here.
        if (refreshOn) {
            if (Array.isArray(refreshOn)) {
                refreshOn.forEach(function (refreshData) { return changes.forEach(function (changed) { return _this.checkRefresh(refreshData, changed, flags); }); });
            }
            else {
                changes.forEach(function (changed) { return _this.checkRefresh(refreshOn, changed, flags); });
            }
        }
    };
    /**
     * Refreshes the component with a new value.
     *
     * @param value
     */
    Component.prototype.refresh = function (value) {
        if (this.hasOwnProperty('refreshOnValue')) {
            this.refreshOnChanged = !_.isEqual(value, this.refreshOnValue);
        }
        else {
            this.refreshOnChanged = true;
        }
        this.refreshOnValue = fastCloneDeep(value);
        if (this.refreshOnChanged) {
            if (this.component.clearOnRefresh) {
                this.setValue(null);
            }
            this.triggerRedraw();
        }
    };
    /**
     * Checks to see if a separate component is in the "context" of this component. This is determined by first checking
     * if they share the same "data" object. It will then walk up the parent tree and compare its parents data objects
     * with the components data and returns true if they are in the same context.
     *
     * Different rows of the same EditGrid, for example, are in different contexts.
     *
     * @param component
     */
    Component.prototype.inContext = function (component) {
        if (component.data === this.data) {
            return true;
        }
        var parent = this.parent;
        while (parent) {
            if (parent.data === component.data) {
                return true;
            }
            parent = parent.parent;
        }
        return false;
    };
    Object.defineProperty(Component.prototype, "viewOnly", {
        get: function () {
            return this.options.readOnly && this.options.viewAsHtml;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.createViewOnlyElement = function () {
        this.element = this.ce('dl', {
            id: this.id
        });
        if (this.element) {
            // Ensure you can get the component info from the element.
            this.element.component = this;
        }
        return this.element;
    };
    Object.defineProperty(Component.prototype, "defaultViewOnlyValue", {
        get: function () {
            return '-';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Uses the widget to determine the output string.
     *
     * @param value
     * @return {*}
     */
    Component.prototype.getWidgetValueAsString = function (value, options) {
        var _this = this;
        var noInputWidget = !this.refs.input || !this.refs.input[0] || !this.refs.input[0].widget;
        if (!value || noInputWidget) {
            return value;
        }
        if (Array.isArray(value)) {
            var values_1 = [];
            value.forEach(function (val, index) {
                var widget = _this.refs.input[index] && _this.refs.input[index].widget;
                if (widget) {
                    values_1.push(widget.getValueAsString(val, options));
                }
            });
            return values_1;
        }
        var widget = this.refs.input[0].widget;
        return widget.getValueAsString(value, options);
    };
    Component.prototype.getValueAsString = function (value, options) {
        if (!value) {
            return '';
        }
        value = this.getWidgetValueAsString(value, options);
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        if (_.isPlainObject(value)) {
            return JSON.stringify(value);
        }
        if (value === null || value === undefined) {
            return '';
        }
        return value.toString();
    };
    Component.prototype.getView = function (value, options) {
        if (this.component.protected) {
            return '--- PROTECTED ---';
        }
        return this.getValueAsString(value, options);
    };
    Component.prototype.updateItems = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.restoreValue();
        this.onChange.apply(this, args);
    };
    /**
     * @param {*} data
     * @param {boolean} [forceUseValue=false] - if true, return 'value' property of the data
     * @return {*}
     */
    Component.prototype.itemValue = function (data, forceUseValue) {
        if (forceUseValue === void 0) { forceUseValue = false; }
        if (_.isObject(data)) {
            if (this.valueProperty) {
                return _.get(data, this.valueProperty);
            }
            if (forceUseValue) {
                return data.value;
            }
        }
        return data;
    };
    Component.prototype.itemValueForHTMLMode = function (value) {
        var _this = this;
        if (Array.isArray(value)) {
            var values = value.map(function (item) { return Array.isArray(item) ? _this.itemValueForHTMLMode(item) : _this.itemValue(item); });
            return values.join(', ');
        }
        return this.itemValue(value);
    };
    Component.prototype.createModal = function (element, attr, confirm) {
        var _this = this;
        var dialog = this.ce('div', attr || {});
        this.setContent(dialog, this.renderTemplate('dialog'));
        // Add refs to dialog, not "this".
        dialog.refs = {};
        this.loadRefs.call(dialog, dialog, {
            dialogOverlay: 'single',
            dialogContents: 'single',
            dialogClose: 'single',
        });
        dialog.refs.dialogContents.appendChild(element);
        document.body.appendChild(dialog);
        document.body.classList.add('modal-open');
        dialog.close = function () {
            document.body.classList.remove('modal-open');
            dialog.dispatchEvent(new CustomEvent('close'));
        };
        this.addEventListener(dialog, 'close', function () { return _this.removeChildFrom(dialog, document.body); });
        var close = function (event) {
            event.preventDefault();
            dialog.close();
        };
        var handleCloseClick = function (e) {
            if (confirm) {
                confirm().then(function () { return close(e); })
                    .catch(function () { });
            }
            else {
                close(e);
            }
        };
        this.addEventListener(dialog.refs.dialogOverlay, 'click', handleCloseClick);
        this.addEventListener(dialog.refs.dialogClose, 'click', handleCloseClick);
        return dialog;
    };
    Object.defineProperty(Component.prototype, "className", {
        /**
         * Retrieves the CSS class name of this component.
         * @returns {string} - The class name of this component.
         */
        get: function () {
            var className = this.hasInput ? 'form-group has-feedback ' : '';
            className += "formio-component formio-component-" + this.component.type + " ";
            if (this.key) {
                className += "formio-component-" + this.key + " ";
            }
            if (this.component.multiple) {
                className += 'formio-component-multiple ';
            }
            if (this.component.customClass) {
                className += this.component.customClass;
            }
            if (this.hasInput && this.component.validate && boolValue(this.component.validate.required)) {
                className += ' required';
            }
            if (this.labelIsHidden()) {
                className += ' formio-component-label-hidden';
            }
            if (!this.visible) {
                className += ' formio-hidden';
            }
            return className;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "customStyle", {
        /**
         * Build the custom style from the layout values
         * @return {string} - The custom style
         */
        get: function () {
            var customCSS = '';
            _.each(this.component.style, function (value, key) {
                if (value !== '') {
                    customCSS += key + ":" + value + ";";
                }
            });
            return customCSS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isMobile", {
        get: function () {
            return isMobile();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the outside wrapping element of this component.
     * @returns {HTMLElement}
     */
    Component.prototype.getElement = function () {
        return this.element;
    };
    /**
     * Create an evaluation context for all script executions and interpolations.
     *
     * @param additional
     * @return {*}
     */
    Component.prototype.evalContext = function (additional) {
        return _super.prototype.evalContext.call(this, Object.assign({
            component: this.component,
            row: this.data,
            rowIndex: this.rowIndex,
            data: this.rootValue,
            iconClass: this.iconClass.bind(this),
            submission: (this.root ? this.root._submission : {}),
            form: this.root ? this.root._form : {},
            options: this.options,
        }, additional));
    };
    /**
     * Sets the pristine flag for this component.
     *
     * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
     */
    Component.prototype.setPristine = function (pristine) {
        this.pristine = pristine;
    };
    /**
     * Removes a value out of the data array and rebuild the rows.
     * @param {number} index - The index of the data element to remove.
     */
    Component.prototype.removeValue = function (index) {
        this.splice(index);
        this.redraw();
        this.restoreValue();
        this.triggerRootChange();
    };
    Component.prototype.iconClass = function (name, spinning) {
        var iconset = this.options.iconset || Templates.current.defaultIconset || 'fa';
        return Templates.current.hasOwnProperty('iconClass')
            ? Templates.current.iconClass(iconset, name, spinning)
            : this.options.iconset === 'fa' ? Templates.defaultTemplates.iconClass(iconset, name, spinning) : name;
    };
    Component.prototype.size = function (size) {
        return Templates.current.hasOwnProperty('size')
            ? Templates.current.size(size)
            : size;
    };
    Object.defineProperty(Component.prototype, "name", {
        /**
         * The readible name for this component.
         * @returns {string} - The name of the component.
         */
        get: function () {
            return this.t(this.component.label || this.component.placeholder || this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "errorLabel", {
        /**
         * Returns the error label for this component.
         * @return {*}
         */
        get: function () {
            return this.t(this.component.errorLabel
                || this.component.label
                || this.component.placeholder
                || this.key);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the error message provided a certain type of error.
     * @param type
     * @return {*}
     */
    Component.prototype.errorMessage = function (type) {
        return (this.component.errors && this.component.errors[type]) ? this.component.errors[type] : type;
    };
    Component.prototype.setContent = function (element, content) {
        if (element instanceof HTMLElement) {
            element.innerHTML = this.sanitize(content);
            return true;
        }
        return false;
    };
    Component.prototype.redraw = function () {
        // Don't bother if we have not built yet.
        if (!this.element || !this.element.parentNode) {
            // Return a non-resolving promise.
            return NativePromise.resolve();
        }
        this.detach();
        // Since we are going to replace the element, we need to know it's position so we can find it in the parent's children.
        var parent = this.element.parentNode;
        var index = Array.prototype.indexOf.call(parent.children, this.element);
        this.element.outerHTML = this.sanitize(this.render());
        this.element = parent.children[index];
        return this.attach(this.element);
    };
    Component.prototype.rebuild = function () {
        this.destroy();
        this.init();
        return this.redraw();
    };
    Component.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.tooltips.forEach(function (tooltip) { return tooltip.dispose(); });
        this.tooltips = [];
        this.refs.input = [];
    };
    Component.prototype.hasClass = function (element, className) {
        if (!element) {
            return;
        }
        return _super.prototype.hasClass.call(this, element, this.transform('class', className));
    };
    Component.prototype.addClass = function (element, className) {
        if (!element) {
            return;
        }
        return _super.prototype.addClass.call(this, element, this.transform('class', className));
    };
    Component.prototype.removeClass = function (element, className) {
        if (!element) {
            return;
        }
        return _super.prototype.removeClass.call(this, element, this.transform('class', className));
    };
    /**
     * Determines if this component has a condition defined.
     *
     * @return {null}
     */
    Component.prototype.hasCondition = function () {
        if (this._hasCondition !== null) {
            return this._hasCondition;
        }
        this._hasCondition = FormioUtils.hasCondition(this.component);
        return this._hasCondition;
    };
    /**
     * Check if this component is conditionally visible.
     *
     * @param data
     * @return {boolean}
     */
    Component.prototype.conditionallyVisible = function (data, row) {
        data = data || this.rootValue;
        row = row || this.data;
        if (this.builderMode || this.previewMode || !this.hasCondition()) {
            return !this.component.hidden;
        }
        data = data || (this.root ? this.root.data : {});
        return this.checkCondition(row, data);
    };
    /**
     * Checks the condition of this component.
     *
     * TODO: Switch row and data parameters to be consistent with other methods.
     *
     * @param row - The row contextual data.
     * @param data - The global data object.
     * @return {boolean} - True if the condition applies to this component.
     */
    Component.prototype.checkCondition = function (row, data) {
        return FormioUtils.checkCondition(this.component, row || this.data, data || this.rootValue, this.root ? this.root._form : {}, this);
    };
    /**
     * Check for conditionals and hide/show the element based on those conditions.
     */
    Component.prototype.checkComponentConditions = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        if (!this.builderMode & !this.previewMode && this.fieldLogic(data, row)) {
            this.redraw();
        }
        // Check advanced conditions
        var visible = this.conditionallyVisible(data, row);
        if (this.visible !== visible) {
            this.visible = visible;
        }
        return visible;
    };
    /**
     * Checks conditions for this component and any sub components.
     * @param args
     * @return {boolean}
     */
    Component.prototype.checkConditions = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        return this.checkComponentConditions(data, flags, row);
    };
    Object.defineProperty(Component.prototype, "logic", {
        get: function () {
            return this.component.logic || [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Check all triggers and apply necessary actions.
     *
     * @param data
     */
    Component.prototype.fieldLogic = function (data, row) {
        var _this = this;
        data = data || this.rootValue;
        row = row || this.data;
        var logics = this.logic;
        // If there aren't logic, don't go further.
        if (logics.length === 0) {
            return;
        }
        var newComponent = fastCloneDeep(this.originalComponent);
        var changed = logics.reduce(function (changed, logic) {
            var result = FormioUtils.checkTrigger(newComponent, logic.trigger, row, data, _this.root ? _this.root._form : {}, _this);
            return (result ? _this.applyActions(newComponent, logic.actions, result, row, data) : false) || changed;
        }, false);
        // If component definition changed, replace and mark as changed.
        if (!_.isEqual(this.component, newComponent)) {
            this.component = newComponent;
            // If disabled changed, be sure to distribute the setting.
            this.disabled = this.shouldDisabled;
            changed = true;
        }
        return changed;
    };
    Component.prototype.isIE = function () {
        var userAgent = window.navigator.userAgent;
        var msie = userAgent.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
        }
        var trident = userAgent.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = userAgent.indexOf('rv:');
            return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
        }
        var edge = userAgent.indexOf('Edge/');
        if (edge > 0) {
            // IE 12 (aka Edge) => return version number
            return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    };
    Component.prototype.applyActions = function (newComponent, actions, result, row, data) {
        var _this = this;
        data = data || this.rootValue;
        row = row || this.data;
        return actions.reduce(function (changed, action) {
            switch (action.type) {
                case 'property': {
                    FormioUtils.setActionProperty(newComponent, action, result, row, data, _this);
                    var property = action.property.value;
                    if (!_.isEqual(_.get(_this.component, property), _.get(newComponent, property))) {
                        changed = true;
                    }
                    break;
                }
                case 'value': {
                    var oldValue = _this.getValue();
                    var newValue = action.variable
                        ? _this.calculateVariable(action.variable)
                        : _this.evaluate(action.value, {
                            value: _.clone(oldValue),
                            data: data,
                            row: row,
                            component: newComponent,
                            result: result,
                        }, 'value');
                    if (!_.isEqual(oldValue, newValue)) {
                        _this.setValue(newValue);
                        if (_this.viewOnly) {
                            _this.dataValue = newValue;
                        }
                        changed = true;
                    }
                    break;
                }
                case 'mergeComponentSchema': {
                    var schema = _this.evaluate(action.schemaDefinition, {
                        value: _.clone(_this.getValue()),
                        data: data,
                        row: row,
                        component: newComponent,
                        result: result,
                    }, 'schema');
                    _.assign(newComponent, schema);
                    if (!_.isEqual(_this.component, newComponent)) {
                        changed = true;
                    }
                    break;
                }
            }
            return changed;
        }, false);
    };
    /**
     * Add a new input error to this element.
     *
     * @param message
     * @param dirty
     */
    Component.prototype.addMessages = function (messages) {
        var _this = this;
        if (!messages) {
            return;
        }
        // Standardize on array of objects for message.
        if (typeof messages === 'string') {
            messages = {
                messages: messages,
                level: 'error',
            };
        }
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        if (this.refs.messageContainer) {
            this.setContent(this.refs.messageContainer, messages.map(function (message) {
                return _this.renderTemplate('message', message);
            }).join(''));
        }
    };
    Component.prototype.getMessageClass = function (level) {
        return this.options["component" + _.capitalize(level) + "Class"] || this.transform('class', "formio-" + level + "-wrapper");
    };
    Component.prototype.setErrorClasses = function (elements, dirty, _a) {
        var hasErrors = _a.hasErrors, hasWarnings = _a.hasWarnings, hasInfos = _a.hasInfos, hasMessages = _a.hasMessages;
        this.clearErrorClasses();
        if (hasMessages) {
            this.addClass(this.element, 'has-message');
        }
        if (hasErrors) {
            if (dirty && this.options.highlightErrors) {
                this.addClass(this.element, this.getMessageClass('error'));
            }
        }
        else if (hasWarnings) {
            if (dirty && this.options.highlightErrors) {
                this.addClass(this.element, this.getMessageClass('warning'));
            }
        }
        else if (hasInfos) {
            if (dirty && this.options.highlightErrors) {
                this.addClass(this.element, this.getMessageClass('info'));
            }
        }
    };
    Component.prototype.clearOnHide = function () {
        // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
        if (!this.rootPristine &&
            this.component.clearOnHide !== false &&
            !this.options.readOnly &&
            !this.options.showHiddenFields) {
            if (!this.visible) {
                this.deleteValue();
            }
            else if (!this.hasValue()) {
                // If shown, ensure the default is set.
                this.setValue(this.defaultValue, {
                    noUpdateEvent: true
                });
            }
        }
    };
    Component.prototype.triggerRootChange = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.options.onChange) {
            (_a = this.options).onChange.apply(_a, args);
        }
        else if (this.root) {
            (_b = this.root).triggerChange.apply(_b, args);
        }
    };
    Component.prototype.onChange = function (flags, fromRoot) {
        flags = flags || {};
        if (flags.modified) {
            this.pristine = false;
            this.addClass(this.getElement(), 'formio-modified');
        }
        // If we are supposed to validate on blur, then don't trigger validation yet.
        if (this.component.validateOn === 'blur' && !this.errors.length) {
            flags.noValidate = true;
        }
        if (this.component.onChange) {
            this.evaluate(this.component.onChange, {
                flags: flags
            });
        }
        // Set the changed variable.
        var changed = {
            instance: this,
            component: this.component,
            value: this.dataValue,
            flags: flags
        };
        // Emit the change.
        this.emit('componentChange', changed);
        // Do not propogate the modified flag.
        var modified = false;
        if (flags.modified) {
            modified = true;
            delete flags.modified;
        }
        // Bubble this change up to the top.
        if (!fromRoot) {
            this.triggerRootChange(flags, changed, modified);
        }
        return changed;
    };
    Object.defineProperty(Component.prototype, "wysiwygDefault", {
        get: function () {
            return {
                quill: {
                    theme: 'snow',
                    placeholder: this.t(this.component.placeholder),
                    modules: {
                        toolbar: [
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            ['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }, 'clean'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
                            ['blockquote', 'code-block'],
                            ['link', 'image', 'video', 'formula', 'source']
                        ]
                    }
                },
                ace: {
                    theme: 'ace/theme/xcode',
                    maxLines: 12,
                    minLines: 12,
                    tabSize: 2,
                    mode: 'javascript',
                    placeholder: this.t(this.component.placeholder)
                },
                ckeditor: {
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            '|',
                            'imageStyle:full',
                            'imageStyle:alignLeft',
                            'imageStyle:alignCenter',
                            'imageStyle:alignRight'
                        ],
                        styles: [
                            'full',
                            'alignLeft',
                            'alignCenter',
                            'alignRight'
                        ]
                    }
                },
                default: {}
            };
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.addCKE = function (element, settings, onChange) {
        settings = _.isEmpty(settings) ? {} : settings;
        settings.base64Upload = true;
        settings.mediaEmbed = { previewsInData: true };
        settings = _.merge(this.wysiwygDefault.ckeditor, _.get(this.options, 'editors.ckeditor.settings', {}), settings);
        return Formio.requireLibrary('ckeditor', isIEBrowser ? 'CKEDITOR' : 'ClassicEditor', _.get(this.options, 'editors.ckeditor.src', CKEDITOR_URL), true)
            .then(function () {
            if (!element.parentNode) {
                return NativePromise.reject();
            }
            if (isIEBrowser) {
                var editor_1 = CKEDITOR.replace(element);
                editor_1.on('change', function () { return onChange(editor_1.getData()); });
                return NativePromise.resolve(editor_1);
            }
            else {
                return ClassicEditor.create(element, settings).then(function (editor) {
                    editor.model.document.on('change', function () { return onChange(editor.data.get()); });
                    return editor;
                });
            }
        });
    };
    Component.prototype.addQuill = function (element, settings, onChange) {
        var _this = this;
        settings = _.isEmpty(settings) ? this.wysiwygDefault.quill : settings;
        settings = _.merge(this.wysiwygDefault.quill, _.get(this.options, 'editors.quill.settings', {}), settings);
        settings = __assign(__assign({}, settings), { modules: {
                table: true
            } });
        // Lazy load the quill css.
        Formio.requireLibrary("quill-css-" + settings.theme, 'Quill', [
            { type: 'styles', src: QUILL_URL + "/quill." + settings.theme + ".css" }
        ], true);
        // Lazy load the quill library.
        return Formio.requireLibrary('quill', 'Quill', _.get(this.options, 'editors.quill.src', QUILL_URL + "/quill.min.js"), true)
            .then(function () {
            return Formio.requireLibrary('quill-table', 'Quill', QUILL_TABLE_URL, true)
                .then(function () {
                if (!element.parentNode) {
                    return NativePromise.reject();
                }
                _this.quill = new Quill(element, isIEBrowser ? __assign(__assign({}, settings), { modules: {} }) : settings);
                /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/
                var txtArea = document.createElement('textarea');
                txtArea.setAttribute('class', 'quill-source-code');
                _this.quill.addContainer('ql-custom').appendChild(txtArea);
                var qlSource = element.parentNode.querySelector('.ql-source');
                if (qlSource) {
                    _this.addEventListener(qlSource, 'click', function (event) {
                        event.preventDefault();
                        if (txtArea.style.display === 'inherit') {
                            _this.quill.setContents(_this.quill.clipboard.convert(txtArea.value));
                        }
                        txtArea.style.display = (txtArea.style.display === 'none') ? 'inherit' : 'none';
                    });
                }
                /** END CODEBLOCK **/
                // Make sure to select cursor when they click on the element.
                _this.addEventListener(element, 'click', function () { return _this.quill.focus(); });
                // Allows users to skip toolbar items when tabbing though form
                var elm = document.querySelectorAll('.ql-formats > button');
                for (var i = 0; i < elm.length; i++) {
                    elm[i].setAttribute('tabindex', '-1');
                }
                _this.quill.on('text-change', function () {
                    txtArea.value = _this.quill.root.innerHTML;
                    onChange(txtArea);
                });
                return _this.quill;
            });
        });
    };
    Component.prototype.addAce = function (element, settings, onChange) {
        if (!settings || (settings.theme === 'snow')) {
            var mode = settings ? settings.mode : '';
            settings = {};
            if (mode) {
                settings.mode = mode;
            }
        }
        settings = _.merge(this.wysiwygDefault.ace, _.get(this.options, 'editors.ace.settings', {}), settings || {});
        return Formio.requireLibrary('ace', 'ace', _.get(this.options, 'editors.ace.src', ACE_URL), true)
            .then(function (editor) {
            editor = editor.edit(element);
            editor.removeAllListeners('change');
            editor.setOptions(settings);
            editor.getSession().setMode("ace/mode/" + settings.mode);
            editor.on('change', function () { return onChange(editor.getValue()); });
            return editor;
        });
    };
    Object.defineProperty(Component.prototype, "tree", {
        get: function () {
            return this.component.tree || false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "emptyValue", {
        /**
         * The empty value for this component.
         *
         * @return {null}
         */
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns if this component has a value set.
     *
     */
    Component.prototype.hasValue = function (data) {
        return _.has(data || this.data, this.key);
    };
    Object.defineProperty(Component.prototype, "rootValue", {
        /**
         * Get the data value at the root level.
         *
         * @return {*}
         */
        get: function () {
            return this.root ? this.root.data : this.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "rootPristine", {
        get: function () {
            return _.get(this, 'root.pristine', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "dataValue", {
        /**
         * Get the static value of this component.
         * @return {*}
         */
        get: function () {
            if (!this.key ||
                (!this.visible && this.component.clearOnHide && !this.rootPristine)) {
                return this.emptyValue;
            }
            if (!this.hasValue()) {
                var empty = this.component.multiple ? [] : this.emptyValue;
                if (!this.rootPristine) {
                    this.dataValue = empty;
                }
                return empty;
            }
            return _.get(this._data, this.key);
        },
        /**
         * Sets the static value of this component.
         *
         * @param value
         */
        set: function (value) {
            if (!this.allowData ||
                !this.key ||
                (!this.visible && this.component.clearOnHide && !this.rootPristine)) {
                return;
            }
            if ((value !== null) && (value !== undefined)) {
                value = this.hook('setDataValue', value, this.key, this._data);
            }
            if ((value === null) || (value === undefined)) {
                this.unset();
                return;
            }
            _.set(this._data, this.key, value);
            return;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Splice a value from the dataValue.
     *
     * @param index
     */
    Component.prototype.splice = function (index) {
        if (this.hasValue()) {
            var dataValue = this.dataValue || [];
            if (_.isArray(dataValue) && dataValue.hasOwnProperty(index)) {
                dataValue.splice(index, 1);
                this.dataValue = dataValue;
                this.triggerChange();
            }
        }
    };
    Component.prototype.unset = function () {
        _.unset(this._data, this.key);
    };
    /**
     * Deletes the value of the component.
     */
    Component.prototype.deleteValue = function () {
        this.setValue(null, {
            noUpdateEvent: true,
            noDefault: true
        });
        this.unset();
    };
    Object.defineProperty(Component.prototype, "defaultValue", {
        get: function () {
            var defaultValue = this.emptyValue;
            if (this.component.defaultValue) {
                defaultValue = this.component.defaultValue;
            }
            if (!this.previewMode) {
                if (this.component.customDefaultValueVariable) {
                    defaultValue = this.calculateVariable(this.component.customDefaultValueVariable);
                }
                else if (this.component.customDefaultValue) {
                    defaultValue = this.evaluate(this.component.customDefaultValue, { value: '' }, 'value');
                }
            }
            if (this.defaultMask) {
                if (typeof defaultValue === 'string') {
                    defaultValue = conformToMask(defaultValue, this.defaultMask).conformedValue;
                    if (!FormioUtils.matchInputMask(defaultValue, this.defaultMask)) {
                        defaultValue = '';
                    }
                }
                else {
                    defaultValue = '';
                }
            }
            // Clone so that it creates a new instance.
            return _.cloneDeep(defaultValue);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the input value of this component.
     *
     * @return {*}
     */
    Component.prototype.getValue = function () {
        if (!this.hasInput || this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        var values = [];
        for (var i in this.refs.input) {
            if (this.refs.input.hasOwnProperty(i)) {
                if (!this.component.multiple) {
                    return this.getValueAt(i);
                }
                values.push(this.getValueAt(i));
            }
        }
        if (values.length === 0 && !this.component.multiple) {
            return '';
        }
        return values;
    };
    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */
    Component.prototype.getValueAt = function (index) {
        var input = this.performInputMapping(this.refs.input[index]);
        return input ? input.value : undefined;
    };
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     *
     * @return {boolean} - If the value changed.
     */
    Component.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = this.updateValue(value, flags);
        if (this.componentModal && flags && flags.fromSubmission) {
            this.componentModal.setValue(value);
        }
        value = this.dataValue;
        if (!this.hasInput) {
            return changed;
        }
        var isArray = Array.isArray(value);
        if (isArray &&
            Array.isArray(this.defaultValue) &&
            this.refs.hasOwnProperty('input') &&
            this.refs.input &&
            (this.refs.input.length !== value.length)) {
            this.redraw();
        }
        for (var i in this.refs.input) {
            if (this.refs.input.hasOwnProperty(i)) {
                this.setValueAt(i, isArray ? value[i] : value, flags);
            }
        }
        return changed;
    };
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */
    Component.prototype.setValueAt = function (index, value, flags) {
        if (flags === void 0) { flags = {}; }
        if (!flags.noDefault && (value === null || value === undefined) && !this.component.multiple) {
            value = this.defaultValue;
        }
        var input = this.performInputMapping(this.refs.input[index]);
        if (input.mask) {
            input.mask.textMaskInputElement.update(value);
        }
        else if (input.widget && input.widget.setValue) {
            input.widget.setValue(value);
        }
        else {
            input.value = value;
        }
    };
    Object.defineProperty(Component.prototype, "hasSetValue", {
        get: function () {
            return this.hasValue() && !this.isEmpty(this.dataValue);
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.setDefaultValue = function () {
        if (this.defaultValue) {
            var defaultValue = (this.component.multiple && !this.dataValue.length) ? [] : this.defaultValue;
            this.setValue(defaultValue, {
                noUpdateEvent: true
            });
        }
    };
    /**
     * Restore the value of a control.
     */
    Component.prototype.restoreValue = function () {
        if (this.hasSetValue) {
            this.setValue(this.dataValue, {
                noUpdateEvent: true
            });
        }
        else {
            this.setDefaultValue();
        }
    };
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    Component.prototype.normalizeValue = function (value) {
        if (this.component.multiple && !Array.isArray(value)) {
            value = value ? [value] : [];
        }
        return value;
    };
    /**
     * Update a value of this component.
     *
     * @param flags
     */
    Component.prototype.updateComponentValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var newValue = (!flags.resetValue && (value === undefined || value === null)) ? this.getValue() : value;
        newValue = this.normalizeValue(newValue, flags);
        var changed = ((newValue !== undefined) ? this.hasChanged(newValue, this.dataValue) : false);
        if (changed) {
            this.dataValue = newValue;
            this.updateOnChange(flags, changed);
        }
        return changed;
    };
    /**
     * Updates the value of this component plus all sub-components.
     *
     * @param args
     * @return {boolean}
     */
    Component.prototype.updateValue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.updateComponentValue.apply(this, args);
    };
    Component.prototype.getIcon = function (name, content, styles, ref) {
        if (ref === void 0) { ref = 'icon'; }
        return this.renderTemplate('icon', {
            className: this.iconClass(name),
            ref: ref,
            styles: styles,
            content: content
        });
    };
    /**
     * Resets the value of this component.
     */
    Component.prototype.resetValue = function () {
        this.setValue(this.emptyValue, {
            noUpdateEvent: true,
            noValidate: true,
            resetValue: true
        });
        this.unset();
    };
    /**
     * Determine if the value of this component has changed.
     *
     * @param newValue
     * @param oldValue
     * @return {boolean}
     */
    Component.prototype.hasChanged = function (newValue, oldValue) {
        if (((newValue === undefined) || (newValue === null)) &&
            ((oldValue === undefined) || (oldValue === null) || this.isEmpty(oldValue))) {
            return false;
        }
        // If we do not have a value and are getting set to anything other than undefined or null, then we changed.
        if (newValue !== undefined &&
            newValue !== null &&
            this.allowData &&
            !this.hasValue()) {
            return true;
        }
        return !_.isEqual(newValue, oldValue);
    };
    /**
     * Update the value on change.
     *
     * @param flags
     */
    Component.prototype.updateOnChange = function (flags, changed) {
        if (flags === void 0) { flags = {}; }
        if (changed === void 0) { changed = false; }
        if (!flags.noUpdateEvent && changed) {
            this.triggerChange(flags);
            return true;
        }
        return false;
    };
    /**
     * Perform a calculated value operation.
     *
     * @param data - The global data object.
     *
     * @return {boolean} - If the value changed during calculation.
     */
    Component.prototype.convertNumberOrBoolToString = function (value) {
        if (typeof value === 'number' || typeof value === 'boolean') {
            return value.toString();
        }
        return value;
    };
    Component.prototype.calculateComponentValue = function (data, flags, row) {
        // If no calculated value or
        // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
        var _a = this.component, hidden = _a.hidden, clearOnHide = _a.clearOnHide, calculateValue = _a.calculateValue, calculateValueVariable = _a.calculateValueVariable;
        var hasCalculationLogic = Boolean(calculateValue || calculateValueVariable);
        var shouldBeCleared = (!this.visible || hidden) && clearOnHide && !this.rootPristine;
        if (!hasCalculationLogic || shouldBeCleared || this.builderMode || this.previewMode) {
            return false;
        }
        // If this component allows overrides.
        var allowOverride = this.component.allowCalculateOverride;
        var firstPass = false;
        var dataValue = this.dataValue;
        // First pass, the calculatedValue is undefined.
        if (this.calculatedValue === undefined) {
            firstPass = true;
            this.calculatedValue = null;
        }
        // Calculate the new value.
        var calculatedValue = calculateValueVariable
            ? this.calculateVariable(calculateValueVariable)
            : this.evaluate(calculateValue, {
                value: dataValue,
                data: data,
                row: row || this.data
            }, 'value');
        if (_.isNil(calculatedValue)) {
            calculatedValue = this.emptyValue;
        }
        // reassigning calculated value to the right one if rows(for ex. dataGrid rows) were reordered
        if (flags.isReordered && allowOverride) {
            this.calculatedValue = calculatedValue;
        }
        var currentCalculatedValue = this.convertNumberOrBoolToString(this.calculatedValue);
        var newCalculatedValue = this.convertNumberOrBoolToString(calculatedValue);
        var normCurr = this.normalizeValue(currentCalculatedValue);
        var normNew = this.normalizeValue(newCalculatedValue);
        // Check to ensure that the calculated value is different than the previously calculated value.
        if (allowOverride &&
            this.calculatedValue &&
            !_.isEqual(dataValue, currentCalculatedValue) &&
            _.isEqual(newCalculatedValue, currentCalculatedValue)) {
            return false;
        }
        if (_.isEqual(normCurr, normNew) && allowOverride) {
            return false;
        }
        if (flags.fromSubmission) {
            this.calculatedValue = calculatedValue;
            return false;
        }
        // If this is the firstPass, and the dataValue is different than to the calculatedValue.
        if (allowOverride &&
            firstPass &&
            !this.isEmpty(dataValue) &&
            !_.isEqual(dataValue, this.convertNumberOrBoolToString(calculatedValue)) &&
            !_.isEqual(calculatedValue, this.convertNumberOrBoolToString(calculatedValue))) {
            // Return that we have a change so it will perform another pass.
            this.calculatedValue = calculatedValue;
            return true;
        }
        // Set the new value.
        var changed = flags.dataSourceInitialLoading ? false : this.setValue(calculatedValue, flags);
        this.calculatedValue = calculatedValue;
        return changed;
    };
    /**
     * Performs calculations in this component plus any child components.
     *
     * @param args
     * @return {boolean}
     */
    Component.prototype.calculateValue = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        return this.calculateComponentValue(data, flags, row);
    };
    Object.defineProperty(Component.prototype, "logicOptions", {
        get: function () {
            return {
                targetComponentInstance: this,
                sourceComponentInstance: this,
                formInstance: this.root,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "engineOptions", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "logicContext", {
        get: function () {
            return {
                options: this.logicOptions,
                engineOptions: this.engineOptions,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "conditions", {
        get: function () {
            var _a;
            return (_a = this.component.conditions) !== null && _a !== void 0 ? _a : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "variables", {
        get: function () {
            var _a;
            return (_a = this.component.variables) !== null && _a !== void 0 ? _a : [];
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.updateLogicContext = function (context) {
        return __assign(__assign({}, context), { targetComponentInstance: this });
    };
    Component.prototype.calculateCondition = function (name, context) {
        var _this = this;
        var _a;
        if (context === void 0) { context = this.logicContext; }
        // Identify recurrent reference.
        if (this.lockedConditions.has(name)) {
            throw new Error("Found recurrent reference with condition '" + name + "'.");
        }
        var cachedValue = this.conditionsCache[name];
        if (cachedValue) {
            return cachedValue;
        }
        var updatedContext = this.updateLogicContext(context);
        var condition = this.conditions.find(function (_a) {
            var key = _a.key;
            return (key === name);
        });
        if (!condition) {
            if (this.parent) {
                return this.parent.calculateCondition(name, updatedContext);
            }
            return false;
        }
        this.lockedConditions.add(name);
        var _b = condition.conjunction, conjunction = _b === void 0 ? 'and' : _b, _c = condition.parts, parts = _c === void 0 ? [] : _c;
        var Conjunction = Conjunctions.getConjunction(conjunction);
        if (!Conjunction) {
            return false;
        }
        var conjunctionInstance = new Conjunction(updatedContext);
        var result = conjunctionInstance.execute(parts.map((function (part) {
            var evaluationContext = {
                part: part,
                context: updatedContext,
            };
            var evaluator = function (_a) {
                var _b = _a === void 0 ? evaluationContext : _a, _c = _b.part, part = _c === void 0 ? evaluationContext.part : _c, _d = _b.context, context = _d === void 0 ? evaluationContext.context : _d;
                return _this.calculateConditionPart(part, context);
            };
            evaluator.evaluationContext = evaluationContext;
            return Conjunction.lazyConditionPartsEvaluation ? evaluator : evaluator();
        })));
        this.lockedConditions.delete(name);
        var _d = ((_a = updatedContext.engineOptions) !== null && _a !== void 0 ? _a : this.engineOptions).cachable, cachable = _d === void 0 ? true : _d;
        if (cachable) {
            this.conditionsCache[name] = result;
        }
        return result;
    };
    Component.prototype.calculateConditionPart = function (conditionPart, context) {
        if (context === void 0) { context = this.logicContext; }
        var updatedContext = this.updateLogicContext(context);
        var type = conditionPart.type;
        if (type === 'existing') {
            var condition = conditionPart.condition;
            return this.calculateCondition(condition, updatedContext);
        }
        if (type === 'new') {
            var operator = conditionPart.operator;
            return this.calculateOperator(operator, updatedContext);
        }
        return false;
    };
    Component.prototype.calculateOperator = function (operator, context) {
        var _this = this;
        if (context === void 0) { context = this.logicContext; }
        var updatedContext = this.updateLogicContext(context);
        var _a = operator, name = _a.name, _b = name + "Arguments", _c = _a[_b], args = _c === void 0 ? {} : _c, _d = name + "Options", _e = _a[_d], options = _e === void 0 ? {} : _e;
        var Operator = Operators.getOperator(name);
        if (!Operator) {
            return false;
        }
        var presetArguments = Operator.presetArguments;
        var operatorInstance = new Operator(updatedContext);
        return operatorInstance.execute(_.mapValues(__assign(__assign({}, presetArguments), args), function (_a) {
            var valueSource = _a.valueSource, _b = valueSource + "Input", input = _a[_b];
            var evaluationContext = {
                valueSource: valueSource,
                input: input,
                context: updatedContext,
            };
            var evaluator = function (_a) {
                var _b = _a === void 0 ? evaluationContext : _a, _c = _b.valueSource, valueSource = _c === void 0 ? evaluationContext.valueSource : _c, _d = _b.input, input = _d === void 0 ? evaluationContext.input : _d, _e = _b.context, context = _e === void 0 ? evaluationContext.context : _e;
                return _this.calculateValueDefinition(valueSource, input, context);
            };
            evaluator.evaluationContext = evaluationContext;
            return Operator.lazyArgsEvaluation ? evaluator : evaluator();
        }), options);
    };
    Component.prototype.calculateValueDefinition = function (valueSource, input, context) {
        if (context === void 0) { context = this.logicContext; }
        var updatedContext = this.updateLogicContext(context);
        var ValueSource = ValueSources.getValueSource(valueSource);
        if (!ValueSource) {
            return null;
        }
        var valueSourceInstance = new ValueSource(updatedContext);
        return valueSourceInstance.getValue(input);
    };
    Component.prototype.calculateVariable = function (name, context) {
        var _this = this;
        var _a;
        if (context === void 0) { context = this.logicContext; }
        // Identify recurrent reference.
        if (this.lockedVariables.has(name)) {
            throw new Error("Found recurrent reference with variable '" + name + "'.");
        }
        var cachedValue = this.variablesCache[name];
        if (cachedValue) {
            return cachedValue;
        }
        var updatedContext = this.updateLogicContext(context);
        var variable = this.variables.find(function (_a) {
            var key = _a.key;
            return (key === name);
        });
        if (!variable) {
            if (this.parent) {
                return this.parent.calculateVariable(name, updatedContext);
            }
            return null;
        }
        this.lockedVariables.add(name);
        var _b = variable, valueSource = _b.valueSource, _c = valueSource + "Input", input = _b[_c], _d = _b.transform, transform = _d === void 0 ? {} : _d;
        var evaluationContext = {
            valueSource: valueSource,
            input: input,
            context: updatedContext,
        };
        var valueEvaluator = function (_a) {
            var _b = _a === void 0 ? evaluationContext : _a, _c = _b.valueSource, valueSource = _c === void 0 ? evaluationContext.valueSource : _c, _d = _b.input, input = _d === void 0 ? evaluationContext.input : _d, _e = _b.context, context = _e === void 0 ? evaluationContext.context : _e;
            return _this.calculateValueDefinition(valueSource, input, context);
        };
        valueEvaluator.evaluationContext = evaluationContext;
        var result = this.applyTransform(valueEvaluator, transform, updatedContext);
        this.lockedVariables.delete(name);
        var _e = ((_a = updatedContext.engineOptions) !== null && _a !== void 0 ? _a : this.engineOptions).cachable, cachable = _e === void 0 ? true : _e;
        if (cachable) {
            this.variablesCache[name] = result;
        }
        return result;
    };
    Component.prototype.applyTransform = function (valueEvaluator, transform, context) {
        var _this = this;
        if (context === void 0) { context = this.logicContext; }
        var updatedContext = this.updateLogicContext(context);
        var _a = transform, _b = _a.name, name = _b === void 0 ? 'identity' : _b, _c = name + "Arguments", _d = _a[_c], args = _d === void 0 ? {} : _d, _e = name + "Options", _f = _a[_e], options = _f === void 0 ? {} : _f;
        var Transformer = Transformers.getTransformer(name);
        if (!Transformer) {
            return valueEvaluator();
        }
        var presetArguments = Transformer.presetArguments;
        var transformerInstance = new Transformer(updatedContext);
        return transformerInstance.transform((Transformer.lazyValueEvaluation ? valueEvaluator : valueEvaluator()), _.mapValues(__assign(__assign({}, presetArguments), args), function (_a) {
            var valueSource = _a.valueSource, _b = valueSource + "Input", input = _a[_b];
            var evaluationContext = {
                valueSource: valueSource,
                input: input,
                context: updatedContext,
            };
            var evaluator = function (_a) {
                var _b = _a === void 0 ? evaluationContext : _a, _c = _b.valueSource, valueSource = _c === void 0 ? evaluationContext.valueSource : _c, _d = _b.input, input = _d === void 0 ? evaluationContext.input : _d, _e = _b.context, context = _e === void 0 ? evaluationContext.context : _e;
                return _this.calculateValueDefinition(valueSource, input, context);
            };
            evaluator.evaluationContext = evaluationContext;
            return Transformer.lazyArgsEvaluation ? evaluator : evaluator();
        }), options);
    };
    Component.prototype.getRowIndexes = function () {
        var indexes = {};
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var currentComponent = this;
        while (currentComponent.parent) {
            var parent_1 = currentComponent.parent;
            if (['editgrid', 'datagrid'].includes(parent_1.component.type)) {
                indexes[parent_1.path] = currentComponent.rowIndex;
            }
            currentComponent = parent_1;
        }
        return indexes;
    };
    Object.defineProperty(Component.prototype, "label", {
        /**
         * Get this component's label text.
         *
         */
        get: function () {
            return this.component.label;
        },
        /**
         * Set this component's label text and render it.
         *
         * @param value - The new label text.
         */
        set: function (value) {
            this.component.label = value;
            if (this.labelElement) {
                this.labelElement.innerText = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get FormioForm element at the root of this component tree.
     *
     */
    Component.prototype.getRoot = function () {
        return this.root;
    };
    /**
     * Returns the invalid message, or empty string if the component is valid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */
    Component.prototype.invalidMessage = function (data, dirty, ignoreCondition, row) {
        if (!ignoreCondition && !this.checkCondition(row, data)) {
            return '';
        }
        // See if this is forced invalid.
        if (this.invalid) {
            return this.invalid;
        }
        // No need to check for errors if there is no input or if it is pristine.
        if (!this.hasInput || (!dirty && this.pristine)) {
            return '';
        }
        return _.map(Validator.checkComponent(this, data), 'message').join('\n\n');
    };
    /**
     * Returns if the component is valid or not.
     *
     * @param data
     * @param dirty
     * @return {boolean}
     */
    Component.prototype.isValid = function (data, dirty) {
        return !this.invalidMessage(data, dirty);
    };
    Component.prototype.setComponentValidity = function (messages, dirty, silentCheck) {
        var hasErrors = !!messages.filter(function (message) { return message.level === 'error'; }).length;
        if (messages.length && (!silentCheck || this.error) && (dirty || !this.pristine)) {
            this.setCustomValidity(messages, dirty);
        }
        else {
            this.setCustomValidity('');
        }
        return !hasErrors;
    };
    /**
     * Checks the validity of this component and sets the error message if it is invalid.
     *
     * @param data
     * @param dirty
     * @param row
     * @return {boolean}
     */
    Component.prototype.checkComponentValidity = function (data, dirty, row, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        data = data || this.rootValue;
        row = row || this.data;
        var _a = options.async, async = _a === void 0 ? false : _a, _b = options.silentCheck, silentCheck = _b === void 0 ? false : _b;
        if (this.shouldSkipValidation(data, dirty, row)) {
            this.setCustomValidity('');
            return async ? NativePromise.resolve(true) : true;
        }
        var check = Validator.checkComponent(this, data, row, true, async);
        return async ?
            check.then(function (messages) { return _this.setComponentValidity(messages, dirty, silentCheck); }) :
            this.setComponentValidity(check, dirty, silentCheck);
    };
    Component.prototype.checkValidity = function (data, dirty, row, silentCheck) {
        data = data || this.rootValue;
        row = row || this.data;
        return this.checkComponentValidity(data, dirty, row, { silentCheck: silentCheck });
    };
    Component.prototype.checkAsyncValidity = function (data, dirty, row, silentCheck) {
        return NativePromise.resolve(this.checkComponentValidity(data, dirty, row, { async: true, silentCheck: silentCheck }));
    };
    Component.prototype.resetCaches = function () {
        this.conditionsCache = {};
        this.variablesCache = {};
        this.lockedConditions = new Set();
        this.lockedVariables = new Set();
    };
    /**
     * Check the conditions, calculations, and validity of a single component and triggers an update if
     * something changed.
     *
     * @param data - The root data of the change event.
     * @param flags - The flags from this change event.
     *
     * @return boolean - If component is valid or not.
     */
    Component.prototype.checkData = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        this.resetCaches();
        this.checkRefreshOn(flags.changes, flags);
        if (flags.noCheck) {
            return true;
        }
        this.calculateComponentValue(data, flags, row);
        this.checkComponentConditions(data, flags, row);
        if (flags.noValidate && !flags.validateOnInit) {
            return true;
        }
        // We need to perform a test to see if they provided a default value that is not valid and immediately show
        // an error if that is the case.
        var isDirty = !this.builderMode &&
            !this.previewMode &&
            !this.isEmpty(this.defaultValue) &&
            this.isEqual(this.defaultValue, this.dataValue);
        // We need to set dirty if they explicitly set noValidate to false.
        if (this.options.alwaysDirty || flags.dirty) {
            isDirty = true;
        }
        // See if they explicitely set the values with setSubmission.
        if (flags.fromSubmission && this.hasValue(data)) {
            isDirty = true;
        }
        return this.checkComponentValidity(data, isDirty, row);
    };
    Object.defineProperty(Component.prototype, "validationValue", {
        get: function () {
            return this.dataValue;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        var isEmptyArray = (_.isArray(value) && value.length === 1) ? _.isEqual(value[0], this.emptyValue) : false;
        return value == null || value.length === 0 || _.isEqual(value, this.emptyValue) || isEmptyArray;
    };
    Component.prototype.isEqual = function (valueA, valueB) {
        if (valueB === void 0) { valueB = this.dataValue; }
        return (this.isEmpty(valueA) && this.isEmpty(valueB)) || _.isEqual(valueA, valueB);
    };
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */
    Component.prototype.validateMultiple = function () {
        return true;
    };
    Object.defineProperty(Component.prototype, "errors", {
        get: function () {
            return this.error ? [this.error] : [];
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.clearErrorClasses = function () {
        this.removeClass(this.element, this.getMessageClass('error'));
        this.removeClass(this.element, this.getMessageClass('warning'));
        this.removeClass(this.element, this.getMessageClass('info'));
        this.removeClass(this.element, 'has-message');
    };
    Component.prototype.setCustomValidity = function (messages, dirty, external) {
        var inputRefs = this.isInputComponent ? this.refs.input || [] : null;
        if (typeof messages === 'string' && messages) {
            messages = {
                level: 'error',
                message: messages,
            };
        }
        if (!Array.isArray(messages)) {
            if (messages) {
                messages = [messages];
            }
            else {
                messages = [];
            }
        }
        var levels = messages.map(function (message) { return message.level; });
        var hasErrors = levels.includes('error');
        var hasWarnings = levels.includes('warning');
        var hasInfos = levels.includes('info');
        var hasMessages = Boolean(messages.length);
        var options = {
            hasErrors: hasErrors,
            hasWarnings: hasWarnings,
            hasInfos: hasInfos,
            hasMessages: hasMessages,
        };
        if (messages.length) {
            if (this.refs.messageContainer) {
                this.empty(this.refs.messageContainer);
            }
            this.error = {
                component: this.component,
                message: messages[0].message,
                messages: messages,
                external: !!external,
            };
            this.emit('componentError', this.error);
            this.addMessages(messages, dirty, inputRefs);
            if (inputRefs) {
                this.setErrorClasses(inputRefs, dirty, options);
            }
        }
        else if (this.error && this.error.external === !!external) {
            if (this.refs.messageContainer) {
                this.empty(this.refs.messageContainer);
            }
            this.error = null;
            if (inputRefs) {
                this.setErrorClasses(inputRefs, dirty, options);
            }
            this.clearErrorClasses();
        }
        // if (!this.refs.input) {
        //   return;
        // }
        // this.refs.input.forEach(input => {
        //   input = this.performInputMapping(input);
        //   if (typeof input.setCustomValidity === 'function') {
        //     input.setCustomValidity(message, dirty);
        //   }
        // });
    };
    /**
     * Determines if the value of this component is hidden from the user as if it is coming from the server, but is
     * protected.
     *
     * @return {boolean|*}
     */
    Component.prototype.isValueHidden = function () {
        if (!this.root || !this.root.hasOwnProperty('editing')) {
            return false;
        }
        if (!this.root || !this.root.editing) {
            return false;
        }
        return (this.component.protected || !this.component.persistent || (this.component.persistent === 'client-only'));
    };
    Component.prototype.shouldSkipValidation = function (data, dirty, row) {
        var _this = this;
        var rules = [
            // Force valid if component is read-only
            function () { return _this.options.readOnly; },
            // Force valid if we in builder mode
            function () { return _this.builderMode; },
            // Force valid if we in preview mode
            function () { return _this.previewMode; },
            // Check to see if we are editing and if so, check component persistence.
            function () { return _this.isValueHidden(); },
            // Force valid if component is hidden.
            function () { return !_this.visible; },
            // Force valid if component is conditionally hidden.
            function () { return !_this.checkCondition(row, data); }
        ];
        return rules.some(function (pred) { return pred(); });
    };
    // Maintain reverse compatibility.
    Component.prototype.whenReady = function () {
        console.warn('The whenReady() method has been deprecated. Please use the dataReady property instead.');
        return this.dataReady;
    };
    Object.defineProperty(Component.prototype, "dataReady", {
        get: function () {
            return NativePromise.resolve();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Prints out the value of this component as a string value.
     */
    Component.prototype.asString = function (value) {
        value = value || this.getValue();
        return (Array.isArray(value) ? value : [value]).map(_.toString).join(', ');
    };
    Object.defineProperty(Component.prototype, "disabled", {
        /**
         * Return if the component is disabled.
         * @return {boolean}
         */
        get: function () {
            return this._disabled || this.parentDisabled;
        },
        /**
         * Disable this component.
         *
         * @param {boolean} disabled
         */
        set: function (disabled) {
            this._disabled = disabled;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.setDisabled = function (element, disabled) {
        if (!element) {
            return;
        }
        element.disabled = disabled;
        if (disabled) {
            element.setAttribute('disabled', 'disabled');
        }
        else {
            element.removeAttribute('disabled');
        }
    };
    Component.prototype.setLoading = function (element, loading) {
        if (!element || (element.loading === loading)) {
            return;
        }
        element.loading = loading;
        if (!element.loader && loading) {
            element.loader = this.ce('i', {
                class: this.iconClass('refresh', true) + " button-icon-right"
            });
        }
        if (element.loader) {
            if (loading) {
                this.appendTo(element.loader, element);
            }
            else {
                this.removeChildFrom(element.loader, element);
            }
        }
    };
    Component.prototype.selectOptions = function (select, tag, options, defaultValue) {
        var _this = this;
        _.each(options, function (option) {
            var attrs = {
                value: option.value
            };
            if (defaultValue !== undefined && (option.value === defaultValue)) {
                attrs.selected = 'selected';
            }
            var optionElement = _this.ce('option', attrs);
            optionElement.appendChild(_this.text(option.label));
            select.appendChild(optionElement);
        });
    };
    Component.prototype.setSelectValue = function (select, value) {
        var options = select.querySelectorAll('option');
        _.each(options, function (option) {
            if (option.value === value) {
                option.setAttribute('selected', 'selected');
            }
            else {
                option.removeAttribute('selected');
            }
        });
        if (select.onchange) {
            select.onchange();
        }
        if (select.onselect) {
            select.onselect();
        }
    };
    Component.prototype.getRelativePath = function (path) {
        var keyPart = "." + this.key;
        var thisPath = this.isInputComponent ? this.path
            : this.path.slice(0).replace(keyPart, '');
        return path.replace(thisPath, '');
    };
    Component.prototype.clear = function () {
        this.detach();
        this.empty(this.getElement());
    };
    Component.prototype.append = function (element) {
        this.appendTo(element, this.element);
    };
    Component.prototype.prepend = function (element) {
        this.prependTo(element, this.element);
    };
    Component.prototype.removeChild = function (element) {
        this.removeChildFrom(element, this.element);
    };
    Component.prototype.detachLogic = function () {
        var _this = this;
        this.logic.forEach(function (logic) {
            if (logic.trigger.type === 'event') {
                var event_1 = _this.interpolate(logic.trigger.event);
                _this.off(event_1); // only applies to callbacks on this component
            }
        });
    };
    Component.prototype.attachLogic = function () {
        var _this = this;
        // Do not attach logic during builder mode.
        if (this.builderMode || this.previewMode) {
            return;
        }
        this.logic.forEach(function (logic) {
            if (logic.trigger.type === 'event') {
                var event_2 = _this.interpolate(logic.trigger.event);
                _this.on(event_2, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var newComponent = fastCloneDeep(_this.originalComponent);
                    if (_this.applyActions(newComponent, logic.actions, args)) {
                        // If component definition changed, replace it.
                        if (!_.isEqual(_this.component, newComponent)) {
                            _this.component = newComponent;
                        }
                        _this.redraw();
                    }
                }, true);
            }
        });
    };
    /**
     * Get the element information.
     */
    Component.prototype.elementInfo = function () {
        var attributes = {
            name: this.options.name,
            type: this.component.inputType || 'text',
            class: 'form-control',
            lang: this.options.language
        };
        if (this.component.placeholder) {
            attributes.placeholder = this.t(this.component.placeholder);
        }
        if (this.component.tabindex) {
            attributes.tabindex = this.component.tabindex;
        }
        if (this.disabled) {
            attributes.disabled = 'disabled';
        }
        _.defaults(attributes, this.component.attributes);
        return {
            type: 'input',
            component: this.component,
            changeEvent: 'change',
            attr: attributes
        };
    };
    Component.prototype.autofocus = function () {
        var _this = this;
        if (this.component.autofocus && !this.builderMode && !this.previewMode) {
            this.on('render', function () { return _this.focus(); }, true);
        }
    };
    Component.prototype.focus = function () {
        if ('beforeFocus' in this.parent) {
            this.parent.beforeFocus(this);
        }
        if (this.refs.input && this.refs.input[0]) {
            this.refs.input[0].focus();
        }
    };
    Object.defineProperty(Component.prototype, "fileService", {
        /**
         * Get `Formio` instance for working with files
         */
        get: function () {
            if (this.options.fileService) {
                return this.options.fileService;
            }
            if (this.options.formio) {
                return this.options.formio;
            }
            if (this.root && this.root.formio) {
                return this.root.formio;
            }
            var formio = new Formio();
            // If a form is loaded, then make sure to set the correct formUrl.
            if (this.root && this.root._form && this.root._form._id) {
                formio.formUrl = formio.projectUrl + "/form/" + this.root._form._id;
            }
            return formio;
        },
        enumerable: false,
        configurable: true
    });
    return Component;
}(Base));
export default Component;
Component.externalLibraries = {};
Component.requireLibrary = function (name, property, src, polling) {
    if (!Component.externalLibraries.hasOwnProperty(name)) {
        Component.externalLibraries[name] = {};
        Component.externalLibraries[name].ready = new NativePromise(function (resolve, reject) {
            Component.externalLibraries[name].resolve = resolve;
            Component.externalLibraries[name].reject = reject;
        });
        var callbackName = name + "Callback";
        if (!polling && !window[callbackName]) {
            window[callbackName] = function () {
                this.resolve();
            }.bind(Component.externalLibraries[name]);
        }
        // See if the plugin already exists.
        var plugin = _.get(window, property);
        if (plugin) {
            Component.externalLibraries[name].resolve(plugin);
        }
        else {
            src = Array.isArray(src) ? src : [src];
            src.forEach(function (lib) {
                var attrs = {};
                var elementType = '';
                if (typeof lib === 'string') {
                    lib = {
                        type: 'script',
                        src: lib
                    };
                }
                switch (lib.type) {
                    case 'script':
                        elementType = 'script';
                        attrs = {
                            src: lib.src,
                            type: 'text/javascript',
                            defer: true,
                            async: true
                        };
                        break;
                    case 'styles':
                        elementType = 'link';
                        attrs = {
                            href: lib.src,
                            rel: 'stylesheet'
                        };
                        break;
                }
                // Add the script to the top page.
                var script = document.createElement(elementType);
                for (var attr in attrs) {
                    script.setAttribute(attr, attrs[attr]);
                }
                document.getElementsByTagName('head')[0].appendChild(script);
            });
            // if no callback is provided, then check periodically for the script.
            if (polling) {
                setTimeout(function checkLibrary() {
                    var plugin = _.get(window, property);
                    if (plugin) {
                        Component.externalLibraries[name].resolve(plugin);
                    }
                    else {
                        // check again after 200 ms.
                        setTimeout(checkLibrary, 200);
                    }
                }, 200);
            }
        }
    }
    return Component.externalLibraries[name].ready;
};
Component.libraryReady = function (name) {
    if (Component.externalLibraries.hasOwnProperty(name) &&
        Component.externalLibraries[name].ready) {
        return Component.externalLibraries[name].ready;
    }
    return NativePromise.reject(name + " library was not required.");
};
