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
import Component from '../_classes/component/Component';
import EventEmitter from 'eventemitter2';
import NativePromise from 'native-promise-only';
import { isMongoId, eachComponent, getStringFromComponentPath, getArrayFromComponentPath } from '../../utils/utils';
import Formio from '../../Formio';
import Form from '../../Form';
var FormComponent = /** @class */ (function (_super) {
    __extends(FormComponent, _super);
    function FormComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component.schema.apply(Component, __spreadArrays([{
                label: 'Form',
                type: 'form',
                key: 'form',
                src: '',
                reference: true,
                form: '',
                path: '',
                tableView: true,
            }], extend));
    };
    Object.defineProperty(FormComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Nested Form',
                icon: 'wpforms',
                group: 'premium',
                documentation: 'http://help.form.io/userguide/#form',
                weight: 110,
                schema: FormComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.formObj = {
            display: this.component.display,
            settings: this.component.settings,
            components: this.component.components
        };
        this.valueChanged = false;
        this.subForm = null;
        this.formSrc = '';
        if (this.component.src) {
            this.formSrc = this.component.src;
        }
        if (!this.component.src &&
            !this.options.formio &&
            (this.component.form || this.component.path)) {
            if (this.component.project) {
                this.formSrc = Formio.getBaseUrl();
                // Check to see if it is a MongoID.
                if (isMongoId(this.component.project)) {
                    this.formSrc += '/project';
                }
                this.formSrc += "/" + this.component.project;
                this.options.project = this.formSrc;
            }
            else {
                this.formSrc = Formio.getProjectUrl();
                this.options.project = this.formSrc;
            }
            if (this.component.form) {
                this.formSrc += "/form/" + this.component.form;
            }
            else if (this.component.path) {
                this.formSrc += "/" + this.component.path;
            }
        }
        // Build the source based on the root src path.
        if (!this.formSrc && this.options.formio) {
            var rootSrc = this.options.formio.formsUrl;
            if (this.component.path) {
                var parts = rootSrc.split('/');
                parts.pop();
                this.formSrc = parts.join('/') + "/" + this.component.path;
            }
            if (this.component.form) {
                this.formSrc = rootSrc + "/" + this.component.form;
            }
        }
        // Add revision version if set.
        if (this.component.revision || this.component.revision === 0) {
            this.formSrc += "/v/" + this.component.revision;
        }
        return this.createSubForm();
    };
    Object.defineProperty(FormComponent.prototype, "dataReady", {
        get: function () {
            return this.subFormReady || NativePromise.resolve();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "defaultValue", {
        get: function () {
            // Not not provide a default value unless the subform is ready so that it will initialize correctly.
            return this.subForm ? _super.prototype.defaultValue : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "defaultSchema", {
        get: function () {
            return FormComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "emptyValue", {
        get: function () {
            return { data: {} };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "ready", {
        get: function () {
            return this.subFormReady || NativePromise.resolve();
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.getComponent = function (path, fn) {
        path = getArrayFromComponentPath(path);
        if (path[0] === 'data') {
            path.shift();
        }
        var originalPathStr = this.path + ".data." + getStringFromComponentPath(path);
        if (this.subForm) {
            return this.subForm.getComponent(path, fn, originalPathStr);
        }
    };
    FormComponent.prototype.getSubOptions = function (options) {
        if (options === void 0) { options = {}; }
        options.parentPath = this.path + ".data.";
        options.events = this.createEmitter();
        // Make sure to not show the submit button in wizards in the nested forms.
        _.set(options, 'buttonSettings.showSubmit', false);
        if (!this.options) {
            return options;
        }
        if (this.options.base) {
            options.base = this.options.base;
        }
        if (this.options.project) {
            options.project = this.options.project;
        }
        if (this.options.readOnly) {
            options.readOnly = this.options.readOnly;
        }
        if (this.options.breadcrumbSettings) {
            options.breadcrumbSettings = this.options.breadcrumbSettings;
        }
        if (this.options.buttonSettings) {
            options.buttonSettings = _.clone(this.options.buttonSettings);
        }
        if (this.options.viewAsHtml) {
            options.viewAsHtml = this.options.viewAsHtml;
        }
        if (this.options.language) {
            options.language = this.options.language;
        }
        if (this.options.template) {
            options.template = this.options.template;
        }
        if (this.options.templates) {
            options.templates = this.options.templates;
        }
        if (this.options.renderMode) {
            options.renderMode = this.options.renderMode;
        }
        if (this.options.attachMode) {
            options.attachMode = this.options.attachMode;
        }
        if (this.options.iconset) {
            options.iconset = this.options.iconset;
        }
        if (this.options.fileService) {
            options.fileService = this.options.fileService;
        }
        return options;
    };
    FormComponent.prototype.render = function () {
        if (this.builderMode) {
            return _super.prototype.render.call(this, this.component.label || 'Nested form');
        }
        var subform = this.subForm ? this.subForm.render() : this.renderTemplate('loading');
        return _super.prototype.render.call(this, subform);
    };
    FormComponent.prototype.asString = function (value) {
        return this.getValueAsString(value);
    };
    /**
     * Prints out the value of form components as a datagrid value.
     */
    FormComponent.prototype.getValueAsString = function (value) {
        if (!value) {
            return 'No data provided';
        }
        if (!value.data && value._id) {
            return value._id;
        }
        if (!value.data || !Object.keys(value.data).length) {
            return 'No data provided';
        }
        return '[Complex Data]';
    };
    FormComponent.prototype.attach = function (element) {
        var _this = this;
        // Don't attach in builder.
        if (this.builderMode) {
            return _super.prototype.attach.call(this, element);
        }
        return _super.prototype.attach.call(this, element)
            .then(function () {
            return _this.subFormReady.then(function () {
                _this.empty(element);
                if (_this.options.builder) {
                    _this.setContent(element, _this.ce('div', {
                        class: 'text-muted text-center p-2'
                    }, _this.text(_this.formObj.title)));
                    return;
                }
                _this.setContent(element, _this.render());
                if (_this.subForm) {
                    _this.subForm.attach(element);
                    if (!_this.valueChanged) {
                        _this.setDefaultValue();
                    }
                }
            });
        });
    };
    FormComponent.prototype.detach = function () {
        if (this.subForm) {
            this.subForm.detach();
        }
        _super.prototype.detach.call(this);
    };
    Object.defineProperty(FormComponent.prototype, "currentForm", {
        get: function () {
            return this._currentForm;
        },
        set: function (instance) {
            var _this = this;
            this._currentForm = instance;
            if (!this.subForm) {
                return;
            }
            this.subForm.getComponents().forEach(function (component) {
                component.currentForm = _this;
            });
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.destroy = function () {
        if (this.subForm) {
            this.subForm.destroy();
            this.subForm = null;
            this.subFormReady = null;
        }
        _super.prototype.destroy.call(this);
    };
    FormComponent.prototype.redraw = function () {
        if (this.subForm) {
            this.subForm.form = this.formObj;
        }
        return _super.prototype.redraw.call(this);
    };
    /**
     * Pass everyComponent to subform.
     * @param args
     * @returns {*|void}
     */
    FormComponent.prototype.everyComponent = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.subForm) {
            (_a = this.subForm).everyComponent.apply(_a, args);
        }
    };
    /**
     * Create a subform instance.
     *
     * @return {*}
     */
    FormComponent.prototype.createSubForm = function () {
        var _this = this;
        this.subFormReady = this.loadSubForm().then(function (form) {
            if (!form) {
                return;
            }
            // Iterate through every component and hide the submit button.
            eachComponent(form.components, function (component) {
                if ((component.type === 'button') &&
                    ((component.action === 'submit') || !component.action)) {
                    component.hidden = true;
                }
            });
            // If the subform is already created then destroy the old one.
            if (_this.subForm) {
                _this.subForm.destroy();
            }
            // Render the form.
            return (new Form(form, _this.getSubOptions())).ready.then(function (instance) {
                _this.subForm = instance;
                _this.subForm.currentForm = _this;
                _this.subForm.parent = _this;
                _this.subForm.parentVisible = _this.visible;
                _this.subForm.on('change', function () {
                    if (_this.subForm) {
                        _this.dataValue = _this.subForm.getValue();
                        _this.triggerChange({
                            noEmit: true
                        });
                    }
                });
                _this.subForm.url = _this.formSrc;
                _this.subForm.nosubmit = true;
                _this.subForm.root = _this.root;
                _this.restoreValue();
                _this.valueChanged = false;
                return _this.subForm;
            });
        });
        return this.subFormReady;
    };
    /**
     * Load the subform.
     */
    FormComponent.prototype.loadSubForm = function () {
        var _this = this;
        if (this.builderMode || this.isHidden()) {
            return NativePromise.resolve();
        }
        // Determine if we already have a loaded form object.
        if (this.formObj &&
            this.formObj.components &&
            Array.isArray(this.formObj.components) &&
            this.formObj.components.length) {
            // Pass config down to sub forms.
            if (this.root && this.root.form && this.root.form.config && !this.formObj.config) {
                this.formObj.config = this.root.form.config;
            }
            return NativePromise.resolve(this.formObj);
        }
        else if (this.formSrc) {
            return (new Formio(this.formSrc)).loadForm({ params: { live: 1 } })
                .then(function (formObj) {
                _this.formObj = formObj;
                return formObj;
            });
        }
        return NativePromise.resolve();
    };
    FormComponent.prototype.checkComponentValidity = function (data, dirty, row) {
        if (this.subForm) {
            return this.subForm.checkValidity(this.dataValue.data, dirty);
        }
        return _super.prototype.checkComponentValidity.call(this, data, dirty, row);
    };
    FormComponent.prototype.checkComponentConditions = function (data, flags, row) {
        var visible = _super.prototype.checkComponentConditions.call(this, data, flags, row);
        // Return if already hidden
        if (!visible) {
            return visible;
        }
        if (this.subForm && this.subForm.hasCondition()) {
            return this.subForm.checkConditions(this.dataValue.data);
        }
        return visible;
    };
    FormComponent.prototype.calculateValue = function (data, flags, row) {
        if (this.subForm) {
            return this.subForm.calculateValue(this.dataValue.data, flags);
        }
        return _super.prototype.calculateValue.call(this, data, flags, row);
    };
    FormComponent.prototype.setPristine = function (pristine) {
        _super.prototype.setPristine.call(this, pristine);
        if (this.subForm) {
            this.subForm.setPristine(pristine);
        }
    };
    Object.defineProperty(FormComponent.prototype, "shouldSubmit", {
        /**
         * Determine if the subform should be submitted.
         * @return {*|boolean}
         */
        get: function () {
            return this.subFormReady && (!this.component.hasOwnProperty('reference') || this.component.reference) && !this.isHidden();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the data for the subform.
     *
     * @return {*}
     */
    FormComponent.prototype.getSubFormData = function () {
        if (_.get(this.subForm, 'form.display') === 'pdf') {
            return this.subForm.getSubmission();
        }
        else {
            return NativePromise.resolve(this.dataValue);
        }
    };
    /**
     * Submit the subform if configured to do so.
     *
     * @return {*}
     */
    FormComponent.prototype.submitSubForm = function (rejectOnError) {
        var _this = this;
        // If we wish to submit the form on next page, then do that here.
        if (this.shouldSubmit) {
            return this.subFormReady.then(function () {
                if (!_this.subForm) {
                    return _this.dataValue;
                }
                _this.subForm.nosubmit = false;
                return _this.subForm.submitForm().then(function (result) {
                    _this.subForm.loading = false;
                    _this.dataValue = result.submission;
                    return _this.dataValue;
                }).catch(function (err) {
                    if (rejectOnError) {
                        _this.subForm.onSubmissionError(err);
                        return NativePromise.reject(err);
                    }
                    else {
                        return {};
                    }
                });
            });
        }
        return this.getSubFormData();
    };
    /**
     * Submit the form before the next page is triggered.
     */
    FormComponent.prototype.beforePage = function (next) {
        var _this = this;
        // Should not submit child forms if we are going to the previous page
        if (!next) {
            return _super.prototype.beforePage.call(this, next);
        }
        return this.submitSubForm(true).then(function () { return _super.prototype.beforePage.call(_this, next); });
    };
    /**
     * Submit the form before the whole form is triggered.
     */
    FormComponent.prototype.beforeSubmit = function () {
        var _this = this;
        var submission = this.dataValue;
        // This submission has already been submitted, so just return the reference data.
        if (submission && submission._id && submission.form) {
            this.dataValue = submission;
            return NativePromise.resolve(this.dataValue);
        }
        return this.submitSubForm(false)
            .then(function () {
            return _this.dataValue;
        })
            .then(function () { return _super.prototype.beforeSubmit.call(_this); });
    };
    FormComponent.prototype.isHidden = function () {
        if (!this.visible) {
            return true;
        }
        return !_super.prototype.checkConditions.call(this, this.rootValue);
    };
    FormComponent.prototype.setValue = function (submission, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, submission, flags);
        this.valueChanged = true;
        if (this.subForm) {
            if (submission &&
                submission._id &&
                this.subForm.formio &&
                _.isEmpty(submission.data)) {
                var submissionUrl = this.subForm.formio.formsUrl + "/" + submission.form + "/submission/" + submission._id;
                this.subForm.setUrl(submissionUrl, this.options);
                this.subForm.loadSubmission();
            }
            else {
                this.subForm.setValue(submission, flags);
            }
        }
        return changed;
    };
    FormComponent.prototype.getValue = function () {
        if (this.subForm) {
            return this.subForm.getValue();
        }
        return this.dataValue;
    };
    Object.defineProperty(FormComponent.prototype, "errors", {
        get: function () {
            var errors = _super.prototype.errors;
            if (this.subForm) {
                errors = errors.concat(this.subForm.errors);
            }
            return errors;
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.updateSubFormVisibility = function () {
        if (this.subForm) {
            this.subForm.parentVisible = this.visible;
        }
    };
    Object.defineProperty(FormComponent.prototype, "visible", {
        get: function () {
            return _super.prototype.visible;
        },
        set: function (value) {
            var _this = this;
            if (this._visible !== value) {
                this._visible = value;
                this.clearOnHide();
                // Form doesn't load if hidden. If it becomes visible, create the form.
                if (!this.subForm && value) {
                    this.createSubForm();
                    this.subFormReady.then(function () {
                        _this.updateSubFormVisibility();
                    });
                    this.redraw();
                    return;
                }
                this.updateSubFormVisibility();
                this.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "parentVisible", {
        get: function () {
            return _super.prototype.parentVisible;
        },
        set: function (value) {
            var _this = this;
            if (this._parentVisible !== value) {
                this._parentVisible = value;
                this.clearOnHide();
                // Form doesn't load if hidden. If it becomes visible, create the form.
                if (!this.subForm && value) {
                    this.createSubForm();
                    this.subFormReady.then(function () {
                        _this.updateSubFormVisibility();
                    });
                    this.redraw();
                    return;
                }
                this.updateSubFormVisibility();
                this.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.isInternalEvent = function (event) {
        switch (event) {
            case 'focus':
            case 'blur':
            case 'componentChange':
            case 'componentError':
            case 'error':
            case 'formLoad':
            case 'languageChanged':
            case 'render':
            case 'checkValidity':
            case 'initialized':
            case 'submit':
            case 'submitButton':
            case 'nosubmit':
            case 'updateComponent':
            case 'submitDone':
            case 'submissionDeleted':
            case 'requestDone':
            case 'nextPage':
            case 'prevPage':
            case 'wizardNavigationClicked':
            case 'updateWizardNav':
            case 'restoreDraft':
            case 'saveDraft':
            case 'saveComponent':
            case 'pdfUploaded':
                return true;
            default:
                return false;
        }
    };
    FormComponent.prototype.createEmitter = function () {
        var emitter = new EventEmitter({
            wildcard: false,
            maxListeners: 0
        });
        var nativeEmit = emitter.emit;
        var that = this;
        emitter.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var eventType = event.replace(that.options.namespace + ".", '');
            nativeEmit.call.apply(nativeEmit, __spreadArrays([this, event], args));
            if (!that.isInternalEvent(eventType)) {
                that.emit.apply(that, __spreadArrays([eventType], args));
            }
        };
        return emitter;
    };
    FormComponent.prototype.deleteValue = function () {
        _super.prototype.setValue.call(this, null, {
            noUpdateEvent: true,
            noDefault: true
        });
        this.unset();
    };
    return FormComponent;
}(Component));
export default FormComponent;
