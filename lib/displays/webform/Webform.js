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
import _ from 'lodash';
import moment from 'moment';
import EventEmitter from '../../EventEmitter';
import i18next from 'i18next';
import Formio from '../../Formio';
import NativePromise from 'native-promise-only';
import Components from '../../components/Components';
import NestedDataComponent from '../../components/_classes/nesteddata/NestedDataComponent';
import { fastCloneDeep, currentTimezone, getStringFromComponentPath } from '../../utils/utils';
import { eachComponent } from '../../utils/formUtils';
// Initialize the available forms.
Formio.forms = {};
// Allow people to register components.
Formio.registerComponent = Components.setComponent;
function getIconSet(icons) {
    if (icons === 'fontawesome') {
        return 'fa';
    }
    return icons || '';
}
function getOptions(options) {
    options = _.defaults(options, {
        submitOnEnter: false,
        iconset: getIconSet((options && options.icons) ? options.icons : Formio.icons),
        i18next: i18next,
        saveDraft: false,
        alwaysDirty: false,
        saveDraftThrottle: 5000
    });
    if (!options.events) {
        options.events = new EventEmitter({
            wildcard: false,
            maxListeners: 0
        });
    }
    return options;
}
/**
 * Renders a Form.io form within the webpage.
 */
var Webform = /** @class */ (function (_super) {
    __extends(Webform, _super);
    /**
     * Creates a new Form instance.
     *
     * @param {Object} options - The options to create a new form instance.
     * @param {boolean} options.saveDraft - Set this if you would like to enable the save draft feature.
     * @param {boolean} options.saveDraftThrottle - The throttle for the save draft feature.
     * @param {boolean} options.readOnly - Set this form to readOnly
     * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
     * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
     * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
     */
    /* eslint-disable max-statements */
    function Webform() {
        var _this_1 = this;
        var element, options;
        if (arguments[0] instanceof HTMLElement || arguments[1]) {
            element = arguments[0];
            options = arguments[1];
        }
        else {
            options = arguments[0];
        }
        _this_1 = _super.call(this, null, getOptions(options)) || this;
        _this_1.executeShortcuts = function (event) {
            var target = event.target;
            if (!_this_1.keyboardCatchableElement(target)) {
                return;
            }
            var ctrl = event.ctrlKey || event.metaKey;
            var keyCode = event.keyCode;
            var char = '';
            if (65 <= keyCode && keyCode <= 90) {
                char = String.fromCharCode(keyCode);
            }
            else if (keyCode === 13) {
                char = 'Enter';
            }
            else if (keyCode === 27) {
                char = 'Esc';
            }
            _.each(_this_1.shortcuts, function (shortcut) {
                if (shortcut.ctrl && !ctrl) {
                    return;
                }
                if (shortcut.shortcut === char) {
                    shortcut.element.click();
                    event.preventDefault();
                }
            });
        };
        _this_1.element = element;
        // Keep track of all available forms globally.
        Formio.forms[_this_1.id] = _this_1;
        // Set the base url.
        if (_this_1.options.baseUrl) {
            Formio.setBaseUrl(_this_1.options.baseUrl);
        }
        /**
         * The i18n configuration for this component.
         */
        var i18n = require('./i18n').default;
        if (options && options.i18n && !options.i18nReady) {
            // Support legacy way of doing translations.
            if (options.i18n.resources) {
                i18n = options.i18n;
            }
            else {
                _.each(options.i18n, function (lang, code) {
                    if (code === 'options') {
                        _.merge(i18n, lang);
                    }
                    else if (!i18n.resources[code]) {
                        i18n.resources[code] = { translation: lang };
                    }
                    else {
                        _.assign(i18n.resources[code].translation, lang);
                    }
                });
            }
            options.i18n = i18n;
            options.i18nReady = true;
        }
        if (options && options.i18n) {
            _this_1.options.i18n = options.i18n;
        }
        else {
            _this_1.options.i18n = i18n;
        }
        // Set the language.
        if (_this_1.options.language) {
            _this_1.options.i18n.lng = _this_1.options.language;
        }
        /**
         * The type of this element.
         * @type {string}
         */
        _this_1.type = 'form';
        _this_1._src = '';
        _this_1._loading = false;
        _this_1._form = {};
        _this_1.draftEnabled = false;
        _this_1.savingDraft = true;
        if (_this_1.options.saveDraftThrottle) {
            _this_1.triggerSaveDraft = _.throttle(_this_1.saveDraft.bind(_this_1), _this_1.options.saveDraftThrottle);
        }
        else {
            _this_1.triggerSaveDraft = _this_1.saveDraft.bind(_this_1);
        }
        _this_1.customErrors = [];
        /**
         * Determines if this form should submit the API on submit.
         * @type {boolean}
         */
        _this_1.nosubmit = false;
        /**
         * Determines if the form has tried to be submitted, error or not.
         *
         * @type {boolean}
         */
        _this_1.submitted = false;
        /**
         * Determines if the form is being submitted at the moment.
         *
         * @type {boolean}
         */
        _this_1.submitting = false;
        /**
         * The Formio instance for this form.
         * @type {Formio}
         */
        _this_1.formio = null;
        /**
         * The loader HTML element.
         * @type {HTMLElement}
         */
        _this_1.loader = null;
        /**
         * The alert HTML element
         * @type {HTMLElement}
         */
        _this_1.alert = null;
        /**
         * Promise that is triggered when the submission is done loading.
         * @type {Promise}
         */
        _this_1.onSubmission = null;
        /**
         * Determines if this submission is explicitly set.
         * @type {boolean}
         */
        _this_1.submissionSet = false;
        /**
         * Promise that executes when the form is ready and rendered.
         * @type {Promise}
         *
         * @example
         * import Webform from 'formiojs/Webform';
         * let form = new Webform(document.getElementById('formio'));
         * form.formReady.then(() => {
         *   console.log('The form is ready!');
         * });
         * form.src = 'https://examples.form.io/example';
         */
        _this_1.formReady = new NativePromise(function (resolve, reject) {
            /**
             * Called when the formReady state of this form has been resolved.
             *
             * @type {function}
             */
            _this_1.formReadyResolve = resolve;
            /**
             * Called when this form could not load and is rejected.
             *
             * @type {function}
             */
            _this_1.formReadyReject = reject;
        });
        /**
         * Promise that executes when the submission is ready and rendered.
         * @type {Promise}
         *
         * @example
         * import Webform from 'formiojs/Webform';
         * let form = new Webform(document.getElementById('formio'));
         * form.submissionReady.then(() => {
         *   console.log('The submission is ready!');
         * });
         * form.src = 'https://examples.form.io/example/submission/234234234234234243';
         */
        _this_1.submissionReady = new NativePromise(function (resolve, reject) {
            /**
             * Called when the formReady state of this form has been resolved.
             *
             * @type {function}
             */
            _this_1.submissionReadyResolve = resolve;
            /**
             * Called when this form could not load and is rejected.
             *
             * @type {function}
             */
            _this_1.submissionReadyReject = reject;
        });
        _this_1.shortcuts = [];
        // Set language after everything is established.
        _this_1.localize().then(function () {
            _this_1.language = _this_1.options.language;
        });
        // See if we need to restore the draft from a user.
        if (_this_1.options.saveDraft && Formio.events) {
            Formio.events.on('formio.user', function (user) {
                _this_1.formReady.then(function () {
                    // Only restore a draft if the submission isn't explicitly set.
                    if (!_this_1.submissionSet) {
                        _this_1.restoreDraft(user._id);
                    }
                });
            });
        }
        _this_1.component.clearOnHide = false;
        // Ensure the root is set to this component.
        _this_1.root = _this_1;
        return _this_1;
    }
    Object.defineProperty(Webform.prototype, "language", {
        /* eslint-enable max-statements */
        /**
         * Sets the language for this form.
         *
         * @param lang
         * @return {Promise}
         */
        set: function (lang) {
            var _this_1 = this;
            return new NativePromise(function (resolve, reject) {
                _this_1.options.language = lang;
                if (i18next.language === lang) {
                    return resolve();
                }
                try {
                    i18next.changeLanguage(lang, function (err) {
                        if (err) {
                            return reject(err);
                        }
                        _this_1.redraw();
                        _this_1.emit('languageChanged');
                        resolve();
                    });
                }
                catch (err) {
                    return reject(err);
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Webform.prototype, "conditions", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.schema.settings) === null || _a === void 0 ? void 0 : _a.conditions) !== null && _b !== void 0 ? _b : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Webform.prototype, "variables", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.schema.settings) === null || _a === void 0 ? void 0 : _a.variables) !== null && _b !== void 0 ? _b : [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add a language for translations
     *
     * @param code
     * @param lang
     * @param active
     * @return {*}
     */
    Webform.prototype.addLanguage = function (code, lang, active) {
        if (active === void 0) { active = false; }
        i18next.addResourceBundle(code, 'translation', lang, true, true);
        if (active) {
            this.language = code;
        }
    };
    /**
     * Perform the localization initialization.
     * @returns {*}
     */
    Webform.prototype.localize = function () {
        var _this_1 = this;
        if (i18next.initialized) {
            return NativePromise.resolve(i18next);
        }
        i18next.initialized = true;
        return new NativePromise(function (resolve, reject) {
            try {
                i18next.init(_this_1.options.i18n, function (err) {
                    // Get language but remove any ;q=1 that might exist on it.
                    _this_1.options.language = i18next.language.split(';')[0];
                    if (err) {
                        return reject(err);
                    }
                    resolve(i18next);
                });
            }
            catch (err) {
                return reject(err);
            }
        });
    };
    Webform.prototype.keyboardCatchableElement = function (element) {
        if (element.nodeName === 'TEXTAREA') {
            return false;
        }
        if (element.nodeName === 'INPUT') {
            return [
                'text',
                'email',
                'password'
            ].indexOf(element.type) === -1;
        }
        return true;
    };
    Webform.prototype.addShortcut = function (element, shortcut) {
        if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
            return;
        }
        shortcut = _.capitalize(shortcut);
        if (shortcut === 'Enter' || shortcut === 'Esc') {
            // Restrict Enter and Esc only for buttons
            if (element.tagName !== 'BUTTON') {
                return;
            }
            this.shortcuts.push({
                shortcut: shortcut,
                element: element
            });
        }
        else {
            this.shortcuts.push({
                ctrl: true,
                shortcut: shortcut,
                element: element
            });
        }
    };
    Webform.prototype.removeShortcut = function (element, shortcut) {
        if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
            return;
        }
        _.remove(this.shortcuts, {
            shortcut: shortcut,
            element: element
        });
    };
    Object.defineProperty(Webform.prototype, "src", {
        /**
         * Get the embed source of the form.
         *
         * @returns {string}
         */
        get: function () {
            return this._src;
        },
        /**
         * Set the Form source, which is typically the Form.io embed URL.
         *
         * @param {string} value - The value of the form embed url.
         *
         * @example
         * import Webform from 'formiojs/Webform';
         * let form = new Webform(document.getElementById('formio'));
         * form.formReady.then(() => {
         *   console.log('The form is formReady!');
         * });
         * form.src = 'https://examples.form.io/example';
         */
        set: function (value) {
            this.setSrc(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Loads the submission if applicable.
     */
    Webform.prototype.loadSubmission = function () {
        var _this_1 = this;
        this.loadingSubmission = true;
        if (this.formio.submissionId) {
            this.onSubmission = this.formio.loadSubmission().then(function (submission) { return _this_1.setSubmission(submission); }, function (err) { return _this_1.submissionReadyReject(err); }).catch(function (err) { return _this_1.submissionReadyReject(err); });
        }
        else {
            this.submissionReadyResolve();
        }
        return this.submissionReady;
    };
    /**
     * Set the src of the form renderer.
     *
     * @param value
     * @param options
     */
    Webform.prototype.setSrc = function (value, options) {
        var _this_1 = this;
        if (this.setUrl(value, options)) {
            this.nosubmit = false;
            return this.formio.loadForm({ params: { live: 1 } }).then(function (form) {
                var setForm = _this_1.setForm(form);
                _this_1.loadSubmission();
                return setForm;
            }).catch(function (err) {
                console.warn(err);
                _this_1.formReadyReject(err);
            });
        }
        return NativePromise.resolve();
    };
    Object.defineProperty(Webform.prototype, "url", {
        /**
         * Get the embed source of the form.
         *
         * @returns {string}
         */
        get: function () {
            return this._src;
        },
        /**
         * Set the form source but don't initialize the form and submission from the url.
         *
         * @param {string} value - The value of the form embed url.
         */
        set: function (value) {
            this.setUrl(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the url of the form renderer.
     *
     * @param value
     * @param options
     */
    Webform.prototype.setUrl = function (value, options) {
        if (!value ||
            (typeof value !== 'string') ||
            (value === this._src)) {
            return false;
        }
        this._src = value;
        this.nosubmit = true;
        this.formio = this.options.formio = new Formio(value, options);
        if (this.type === 'form') {
            // Set the options source so this can be passed to other components.
            this.options.src = value;
        }
        return true;
    };
    Object.defineProperty(Webform.prototype, "ready", {
        /**
         * Called when both the form and submission have been loaded.
         *
         * @returns {Promise} - The promise to trigger when both form and submission have loaded.
         */
        get: function () {
            var _this_1 = this;
            return this.formReady.then(function () {
                return _super.prototype.ready.then(function () {
                    return _this_1.loadingSubmission ? _this_1.submissionReady : true;
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Webform.prototype, "loading", {
        /**
         * Returns if this form is loading.
         *
         * @returns {boolean} - TRUE means the form is loading, FALSE otherwise.
         */
        get: function () {
            return this._loading;
        },
        /**
         * Set the loading state for this form, and also show the loader spinner.
         *
         * @param {boolean} loading - If this form should be "loading" or not.
         */
        set: function (loading) {
            if (this._loading !== loading) {
                this._loading = loading;
                if (!this.loader && loading) {
                    this.loader = this.ce('div', {
                        class: 'loader-wrapper'
                    });
                    var spinner = this.ce('div', {
                        class: 'loader text-center'
                    });
                    this.loader.appendChild(spinner);
                }
                /* eslint-disable max-depth */
                if (this.loader) {
                    try {
                        if (loading) {
                            this.prependTo(this.loader, this.wrapper);
                        }
                        else {
                            this.removeChildFrom(this.loader, this.wrapper);
                        }
                    }
                    catch (err) {
                        // ingore
                    }
                }
                /* eslint-enable max-depth */
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the JSON schema for the form to be rendered.
     *
     * @example
     * import Webform from 'formiojs/Webform';
     * let form = new Webform(document.getElementById('formio'));
     * form.setForm({
     *   components: [
     *     {
     *       type: 'textfield',
     *       key: 'firstName',
     *       label: 'First Name',
     *       placeholder: 'Enter your first name.',
     *       input: true
     *     },
     *     {
     *       type: 'textfield',
     *       key: 'lastName',
     *       label: 'Last Name',
     *       placeholder: 'Enter your last name',
     *       input: true
     *     },
     *     {
     *       type: 'button',
     *       action: 'submit',
     *       label: 'Submit',
     *       theme: 'primary'
     *     }
     *   ]
     * });
     *
     * @param {Object} form - The JSON schema of the form @see https://examples.form.io/example for an example JSON schema.
     * @returns {*}
     */
    Webform.prototype.setForm = function (form, flags) {
        var _this_1 = this;
        // Create the form.
        this._form = form;
        // Allow the form to provide component overrides.
        if (form && form.settings && form.settings.components) {
            this.options.components = form.settings.components;
        }
        // See if they pass a module, and evaluate it if so.
        if (form && form.module) {
            var formModule = null;
            if (typeof form.module === 'string') {
                try {
                    formModule = this.evaluate("return " + form.module);
                }
                catch (err) {
                    console.warn(err);
                }
            }
            else {
                formModule = form.module;
            }
            if (formModule) {
                Formio.use(formModule);
                // Since we got here after instantiation, we need to manually apply form options.
                if (formModule.options && formModule.options.form) {
                    this.options = Object.assign(this.options, formModule.options.form);
                }
            }
        }
        this.initialized = false;
        var rebuild = this.rebuild() || NativePromise.resolve();
        return rebuild.then(function () {
            _this_1.emit('formLoad', form);
            _this_1.triggerRecaptcha();
            // Make sure to trigger onChange after a render event occurs to speed up form rendering.
            var resolveForm = function (flags) {
                _this_1.onChange();
                _this_1.formReadyResolve(flags);
            };
            if (flags && flags.validateOnInit) {
                resolveForm(flags);
            }
            else {
                setTimeout(resolveForm, 0);
            }
            return _this_1.formReady;
        });
    };
    Object.defineProperty(Webform.prototype, "form", {
        /**
         * Gets the form object.
         *
         * @returns {Object} - The form JSON schema.
         */
        get: function () {
            if (!this._form) {
                this._form = {
                    components: []
                };
            }
            return this._form;
        },
        /**
         * Sets the form value.
         *
         * @alias setForm
         * @param {Object} form - The form schema object.
         */
        set: function (form) {
            this.setForm(form);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Webform.prototype, "submission", {
        /**
         * Returns the submission object that was set within this form.
         *
         * @returns {Object}
         */
        get: function () {
            return this.getValue();
        },
        /**
         * Sets the submission of a form.
         *
         * @example
         * import Webform from 'formiojs/Webform';
         * let form = new Webform(document.getElementById('formio'));
         * form.src = 'https://examples.form.io/example';
         * form.submission = {data: {
         *   firstName: 'Joe',
         *   lastName: 'Smith',
         *   email: 'joe@example.com'
         * }};
         *
         * @param {Object} submission - The Form.io submission object.
         */
        set: function (submission) {
            this.setSubmission(submission);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets a submission and returns the promise when it is ready.
     * @param submission
     * @param flags
     * @return {Promise.<TResult>}
     */
    Webform.prototype.setSubmission = function (submission, flags) {
        var _this_1 = this;
        if (flags === void 0) { flags = {}; }
        flags = __assign(__assign({}, flags), { fromSubmission: true });
        return this.onSubmission = this.formReady.then(function (resolveFlags) {
            if (resolveFlags) {
                flags = __assign(__assign({}, flags), resolveFlags);
            }
            _this_1.submissionSet = true;
            _this_1.triggerChange(flags);
            _this_1.setValue(submission, flags);
            return _this_1.submissionReadyResolve(submission);
        }, function (err) { return _this_1.submissionReadyReject(err); }).catch(function (err) { return _this_1.submissionReadyReject(err); });
    };
    /**
     * Saves a submission draft.
     */
    Webform.prototype.saveDraft = function () {
        var _this_1 = this;
        if (!this.draftEnabled) {
            return;
        }
        if (!this.formio) {
            console.warn(this.t('saveDraftInstanceError'));
            return;
        }
        if (!Formio.getUser()) {
            console.warn(this.t('saveDraftAuthError'));
            return;
        }
        var draft = fastCloneDeep(this.submission);
        draft.state = 'draft';
        if (!this.savingDraft) {
            this.savingDraft = true;
            this.formio.saveSubmission(draft).then(function (sub) {
                // Set id to submission to avoid creating new draft submission
                _this_1.submission._id = sub._id;
                _this_1.savingDraft = false;
                _this_1.emit('saveDraft', sub);
            });
        }
    };
    /**
     * Restores a draft submission based on the user who is authenticated.
     *
     * @param {userId} - The user id where we need to restore the draft from.
     */
    Webform.prototype.restoreDraft = function (userId) {
        var _this_1 = this;
        if (!this.formio) {
            console.warn(this.t('restoreDraftInstanceError'));
            return;
        }
        this.savingDraft = true;
        this.formio.loadSubmissions({
            params: {
                state: 'draft',
                owner: userId
            }
        }).then(function (submissions) {
            if (submissions.length > 0 && !_this_1.options.skipDraftRestore) {
                var draft_1 = fastCloneDeep(submissions[0]);
                return _this_1.setSubmission(draft_1).then(function () {
                    _this_1.draftEnabled = true;
                    _this_1.savingDraft = false;
                    _this_1.emit('restoreDraft', draft_1);
                });
            }
            // Enable drafts so that we can keep track of changes.
            _this_1.draftEnabled = true;
            _this_1.savingDraft = false;
            _this_1.emit('restoreDraft', null);
        });
    };
    Object.defineProperty(Webform.prototype, "schema", {
        get: function () {
            var schema = fastCloneDeep(_.omit(this._form, ['components']));
            schema.components = [];
            this.eachComponent(function (component) { return schema.components.push(component.schema); });
            return schema;
        },
        enumerable: false,
        configurable: true
    });
    Webform.prototype.mergeData = function (_this, _that) {
        _.mergeWith(_this, _that, function (thisValue, thatValue) {
            if (Array.isArray(thisValue) && Array.isArray(thatValue) && thisValue.length !== thatValue.length) {
                return thatValue;
            }
        });
    };
    Webform.prototype.setValue = function (submission, flags) {
        if (flags === void 0) { flags = {}; }
        if (!submission || !submission.data) {
            submission = { data: {} };
        }
        // Metadata needs to be available before setValue
        this._submission.metadata = submission.metadata || {};
        this.editing = !!submission._id;
        // Set the timezone in the options if available.
        if (!this.options.submissionTimezone &&
            submission.metadata &&
            submission.metadata.timezone) {
            this.options.submissionTimezone = submission.metadata.timezone;
        }
        var changed = _super.prototype.setValue.call(this, submission.data, flags);
        if (!flags.sanitize) {
            this.mergeData(this.data, submission.data);
        }
        submission.data = submission.data
            ? __assign(__assign({}, this.data), submission.data) : this.data;
        this._submission = submission;
        return changed;
    };
    Webform.prototype.getValue = function () {
        if (!this._submission.data) {
            this._submission.data = {};
        }
        if (this.viewOnly) {
            return this._submission;
        }
        var submission = this._submission;
        submission.data = this.data;
        return this._submission;
    };
    /**
     * Build the form.
     */
    Webform.prototype.init = function () {
        var _this_1 = this;
        this._submission = this._submission || { data: {} };
        // Remove any existing components.
        if (this.components && this.components.length) {
            this.destroyComponents();
            this.components = [];
        }
        if (this.component) {
            this.component.components = this.form ? this.form.components : [];
        }
        else {
            this.component = this.form;
        }
        this.component.type = 'form';
        this.component.input = false;
        this.addComponents();
        this.on('submitButton', function (options) {
            _this_1.submit(false, options).catch(function (e) { return e !== false && console.log(e); });
        }, true);
        this.on('checkValidity', function (data) { return _this_1.checkValidity(data, true, data); }, true);
        this.on('requestUrl', function (args) { return (_this_1.submitUrl(args.url, args.headers)); }, true);
        this.on('resetForm', function () { return _this_1.resetValue(); }, true);
        this.on('deleteSubmission', function () { return _this_1.deleteSubmission(); }, true);
        this.on('refreshData', function () { return _this_1.updateValue(); }, true);
        this.executeFormController();
        return this.formReady;
    };
    Webform.prototype.executeFormController = function () {
        var _this_1 = this;
        // If no controller value or
        // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
        if (!this.form || !this.form.controller
            || ((!this.visible || this.component.hidden) && this.component.clearOnHide && !this.rootPristine)) {
            return false;
        }
        this.formReady.then(function () {
            _this_1.evaluate(_this_1.form.controller, {
                components: _this_1.components,
            });
        });
    };
    Webform.prototype.destroy = function (deleteFromGlobal) {
        if (deleteFromGlobal === void 0) { deleteFromGlobal = false; }
        this.off('submitButton');
        this.off('checkValidity');
        this.off('requestUrl');
        this.off('resetForm');
        this.off('deleteSubmission');
        this.off('refreshData');
        if (deleteFromGlobal) {
            delete Formio.forms[this.id];
        }
        return _super.prototype.destroy.call(this);
    };
    Webform.prototype.build = function (element) {
        var _this_1 = this;
        if (element || this.element) {
            return this.ready.then(function () {
                element = element || _this_1.element;
                _super.prototype.build.call(_this_1, element);
            });
        }
        return this.ready;
    };
    Webform.prototype.getClassName = function () {
        return 'formio-form';
    };
    Webform.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('webform', {
            classes: this.getClassName(),
            children: this.renderComponents(),
        }), this.builderMode ? 'builder' : 'form', true);
    };
    Webform.prototype.redraw = function () {
        // Don't bother if we have not built yet.
        if (!this.element) {
            return NativePromise.resolve();
        }
        this.clear();
        this.setContent(this.element, this.render());
        return this.attach(this.element);
    };
    Webform.prototype.attach = function (element) {
        var _this_1 = this;
        this.element = element;
        this.loadRefs(element, { webform: 'single' });
        var childPromise = this.attachComponents(this.refs.webform);
        this.addEventListener(this.element, 'keydown', this.executeShortcuts);
        this.currentForm = this;
        this.hook('attachWebform', element, this);
        return childPromise.then(function () {
            _this_1.emit('render', _this_1.element);
            return _this_1.setValue(_this_1._submission, {
                noUpdateEvent: true,
            });
        });
    };
    Webform.prototype.hasRequiredFields = function () {
        var result = false;
        eachComponent(this.form.components, function (component) {
            if (component.validate.required) {
                result = true;
                return true;
            }
        }, true);
        return result;
    };
    Webform.prototype.resetValue = function () {
        _.each(this.getComponents(), function (comp) { return (comp.resetValue()); });
        this.setPristine(true);
        this.redraw();
    };
    /**
     * Sets a new alert to display in the error dialog of the form.
     *
     * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
     * @param {string} message - The message to show in the alert.
     * @param {string} classes - Styling classes for alert.
     */
    Webform.prototype.setAlert = function (type, message, classes) {
        var _this_1 = this;
        if (!type && this.submitted) {
            if (this.alert) {
                if (this.refs.errorRef && this.refs.errorRef.length) {
                    this.refs.errorRef.forEach(function (el) {
                        _this_1.removeEventListener(el, 'click');
                        _this_1.removeEventListener(el, 'keypress');
                    });
                }
                this.removeChild(this.alert);
                this.alert = null;
            }
            return;
        }
        if (this.options.noAlerts) {
            if (!message) {
                this.emit('error', false);
            }
            return;
        }
        if (this.alert) {
            try {
                if (this.refs.errorRef && this.refs.errorRef.length) {
                    this.refs.errorRef.forEach(function (el) {
                        _this_1.removeEventListener(el, 'click');
                        _this_1.removeEventListener(el, 'keypress');
                    });
                }
                this.removeChild(this.alert);
                this.alert = null;
            }
            catch (err) {
                // ignore
            }
        }
        if (message) {
            this.alert = this.ce('div', {
                class: classes || "alert alert-" + type,
                id: "error-list-" + this.id,
            });
            if (message instanceof HTMLElement) {
                this.appendTo(message, this.alert);
            }
            else {
                this.setContent(this.alert, message);
            }
        }
        if (!this.alert) {
            return;
        }
        this.loadRefs(this.alert, { errorRef: 'multiple' });
        if (this.refs.errorRef && this.refs.errorRef.length) {
            this.refs.errorRef.forEach(function (el) {
                _this_1.addEventListener(el, 'click', function (e) {
                    var key = e.currentTarget.dataset.componentKey;
                    _this_1.focusOnComponent(key);
                });
                _this_1.addEventListener(el, 'keypress', function (e) {
                    if (e.keyCode === 13) {
                        var key = e.currentTarget.dataset.componentKey;
                        _this_1.focusOnComponent(key);
                    }
                });
            });
        }
        this.prepend(this.alert);
    };
    /**
     * Focus on selected component.
     *
     * @param {string} key - The key of selected component.
     * @returns {*}
     */
    Webform.prototype.focusOnComponent = function (key) {
        if (key) {
            var component = this.getComponent(key);
            if (component) {
                component.focus();
            }
        }
    };
    /**
     * Show the errors of this form within the alert dialog.
     *
     * @param {Object} error - An optional additional error to display along with the component errors.
     * @returns {*}
     */
    Webform.prototype.showErrors = function (error, triggerEvent) {
        var _this_1 = this;
        this.loading = false;
        var errors = this.errors;
        if (error) {
            errors = errors.concat(error);
        }
        errors = errors.concat(this.customErrors);
        if (!errors.length) {
            this.setAlert(false);
            return;
        }
        // Mark any components as invalid if in a custom message.
        errors.forEach(function (err) {
            var _a = err.components, components = _a === void 0 ? [] : _a;
            if (err.component) {
                components.push(err.component);
            }
            if (err.path) {
                components.push(err.path);
            }
            components.forEach(function (path) {
                var component = _this_1.getComponent(path, _.identity);
                var components = _.compact(Array.isArray(component) ? component : [component]);
                components.forEach(function (component) { return component.setCustomValidity(err.message, true); });
            });
        });
        var message = document.createDocumentFragment();
        var p = this.ce('p');
        this.setContent(p, this.t('error'));
        var ul = this.ce('ul');
        errors.forEach(function (err) {
            if (err) {
                var createListItem_1 = function (message, index) {
                    var params = {
                        ref: 'errorRef',
                        tabIndex: 0,
                        'aria-label': message + ". Click to navigate to the field with following error."
                    };
                    var li = _this_1.ce('li', params);
                    _this_1.setContent(li, message);
                    var messageFromIndex = !_.isUndefined(index) && err.messages && err.messages[index];
                    var keyOrPath = (messageFromIndex && messageFromIndex.path) || (err.component && err.component.key);
                    if (keyOrPath) {
                        var formattedKeyOrPath = getStringFromComponentPath(keyOrPath);
                        li.dataset.componentKey = formattedKeyOrPath;
                    }
                    _this_1.appendTo(li, ul);
                };
                if (err.messages && err.messages.length) {
                    var errLabel_1 = _this_1.t(err.component.label);
                    err.messages.forEach(function (_a, index) {
                        var message = _a.message;
                        return createListItem_1(errLabel_1 + ". " + message, index);
                    });
                }
                else if (err) {
                    var message_1 = _.isObject(err) ? err.message || '' : err;
                    createListItem_1(message_1);
                }
            }
        });
        p.appendChild(ul);
        message.appendChild(p);
        this.setAlert('danger', message);
        if (triggerEvent) {
            this.emit('error', errors);
        }
        return errors;
    };
    /**
     * Called when the submission has completed, or if the submission needs to be sent to an external library.
     *
     * @param {Object} submission - The submission object.
     * @param {boolean} saved - Whether or not this submission was saved to the server.
     * @returns {object} - The submission object.
     */
    Webform.prototype.onSubmit = function (submission, saved) {
        this.loading = false;
        this.submitting = false;
        this.setPristine(true);
        // We want to return the submitted submission and setValue will mutate the submission so cloneDeep it here.
        this.setValue(fastCloneDeep(submission), {
            noValidate: true,
            noCheck: true
        });
        this.setAlert('success', "<p>" + this.t('complete') + "</p>");
        this.emit('submit', submission);
        if (saved) {
            this.emit('submitDone', submission);
        }
        return submission;
    };
    /**
     * Called when an error occurs during the submission.
     *
     * @param {Object} error - The error that occured.
     */
    Webform.prototype.onSubmissionError = function (error) {
        if (error) {
            // Normalize the error.
            if (typeof error === 'string') {
                error = { message: error };
            }
            if ('details' in error) {
                error = error.details;
            }
        }
        this.submitting = false;
        this.setPristine(false);
        this.emit('submitError', error);
        // Allow for silent cancellations (no error message, no submit button error state)
        if (error && error.silent) {
            this.emit('change', { isValid: true });
            return false;
        }
        return this.showErrors(error, true);
    };
    /**
     * Trigger the change event for this form.
     *
     * @param changed
     * @param flags
     */
    Webform.prototype.onChange = function (flags, changed, modified) {
        flags = flags || {};
        var isChangeEventEmitted = false;
        // For any change events, clear any custom errors for that component.
        if (changed && changed.component) {
            this.customErrors = this.customErrors.filter(function (err) { return err.component && err.component !== changed.component.key; });
        }
        _super.prototype.onChange.call(this, flags, true);
        var value = _.clone(this.submission);
        flags.changed = value.changed = changed;
        if (modified && this.pristine) {
            this.pristine = false;
        }
        value.isValid = this.checkData(value.data, flags);
        this.loading = false;
        if (this.submitted) {
            this.showErrors();
        }
        // See if we need to save the draft of the form.
        if (modified && this.options.saveDraft) {
            this.triggerSaveDraft();
        }
        if (!flags || !flags.noEmit) {
            this.emit('change', value, flags);
            isChangeEventEmitted = true;
        }
        // The form is initialized after the first change event occurs.
        if (isChangeEventEmitted && !this.initialized) {
            this.emit('initialized');
            this.initialized = true;
        }
    };
    Webform.prototype.checkData = function (data, flags) {
        if (flags === void 0) { flags = {}; }
        var valid = _super.prototype.checkData.call(this, data, flags);
        if ((_.isEmpty(flags) || flags.noValidate) && this.submitted) {
            this.showErrors();
        }
        return valid;
    };
    /**
     * Send a delete request to the server.
     */
    Webform.prototype.deleteSubmission = function () {
        var _this_1 = this;
        return this.formio.deleteSubmission()
            .then(function () {
            _this_1.emit('submissionDeleted', _this_1.submission);
            _this_1.resetValue();
        });
    };
    /**
     * Cancels the submission.
     *
     * @alias reset
     */
    Webform.prototype.cancel = function (noconfirm) {
        var shouldReset = this.hook('beforeCancel', true);
        if (shouldReset && (noconfirm || confirm(this.t('confirmCancel')))) {
            this.resetValue();
            return true;
        }
        else {
            return false;
        }
    };
    Webform.prototype.setMetadata = function (submission) {
        // Add in metadata about client submitting the form
        submission.metadata = submission.metadata || {};
        _.defaults(submission.metadata, {
            timezone: _.get(this, '_submission.metadata.timezone', currentTimezone()),
            offset: parseInt(_.get(this, '_submission.metadata.offset', moment().utcOffset()), 10),
            origin: document.location.origin,
            referrer: document.referrer,
            browserName: navigator.appName,
            userAgent: navigator.userAgent,
            pathName: window.location.pathname,
            onLine: navigator.onLine
        });
    };
    Webform.prototype.submitForm = function (options) {
        var _this_1 = this;
        if (options === void 0) { options = {}; }
        return new NativePromise(function (resolve, reject) {
            // Read-only forms should never submit.
            if (_this_1.options.readOnly) {
                return resolve({
                    submission: _this_1.submission,
                    saved: false
                });
            }
            var submission = fastCloneDeep(_this_1.submission || {});
            _this_1.setMetadata(submission);
            submission.state = options.state || 'submitted';
            var isDraft = (submission.state === 'draft');
            _this_1.hook('beforeSubmit', __assign(__assign({}, submission), { component: options.component }), function (err) {
                if (err) {
                    return reject(err);
                }
                if (!isDraft && !submission.data) {
                    return reject('Invalid Submission');
                }
                if (!isDraft && !_this_1.checkValidity(submission.data, true, submission.data)) {
                    return reject();
                }
                _this_1.everyComponent(function (comp) {
                    var persistent = comp.component.persistent;
                    if (persistent === 'client-only') {
                        _.unset(submission.data, comp.path);
                    }
                });
                _this_1.hook('customValidation', __assign(__assign({}, submission), { component: options.component }), function (err) {
                    if (err) {
                        // If string is returned, cast to object.
                        if (typeof err === 'string') {
                            err = {
                                message: err
                            };
                        }
                        // Ensure err is an array.
                        err = Array.isArray(err) ? err : [err];
                        // Set as custom errors.
                        _this_1.customErrors = err;
                        return reject();
                    }
                    _this_1.loading = true;
                    // Use the form action to submit the form if available.
                    if (_this_1._form && _this_1._form.action) {
                        var method = (submission.data._id && _this_1._form.action.includes(submission.data._id)) ? 'PUT' : 'POST';
                        return Formio.makeStaticRequest(_this_1._form.action, method, submission, _this_1.formio ? _this_1.formio.options : {})
                            .then(function (result) { return resolve({
                            submission: result,
                            saved: true,
                        }); })
                            .catch(reject);
                    }
                    var submitFormio = _this_1.formio;
                    if (_this_1.nosubmit || !submitFormio) {
                        return resolve({
                            submission: submission,
                            saved: false,
                        });
                    }
                    // If this is an actionUrl, then make sure to save the action and not the submission.
                    var submitMethod = submitFormio.actionUrl ? 'saveAction' : 'saveSubmission';
                    submitFormio[submitMethod](submission)
                        .then(function (result) { return resolve({
                        submission: result,
                        saved: true,
                    }); })
                        .catch(reject);
                });
            });
        });
    };
    Webform.prototype.executeSubmit = function (options) {
        var _this_1 = this;
        this.submitted = true;
        this.submitting = true;
        return this.submitForm(options)
            .then(function (_a) {
            var submission = _a.submission, saved = _a.saved;
            return _this_1.onSubmit(submission, saved);
        })
            .catch(function (err) { return NativePromise.reject(_this_1.onSubmissionError(err)); });
    };
    /**
     * Submits the form.
     *
     * @example
     * import Webform from 'formiojs/Webform';
     * let form = new Webform(document.getElementById('formio'));
     * form.src = 'https://examples.form.io/example';
     * form.submission = {data: {
     *   firstName: 'Joe',
     *   lastName: 'Smith',
     *   email: 'joe@example.com'
     * }};
     * form.submit().then((submission) => {
     *   console.log(submission);
     * });
     *
     * @param {boolean} before - If this submission occured from the before handlers.
     *
     * @returns {Promise} - A promise when the form is done submitting.
     */
    Webform.prototype.submit = function (before, options) {
        var _this_1 = this;
        if (!before) {
            return this.beforeSubmit(options).then(function () { return _this_1.executeSubmit(options); });
        }
        else {
            return this.executeSubmit(options);
        }
    };
    Webform.prototype.submitUrl = function (URL, headers) {
        var _this_1 = this;
        if (!URL) {
            return console.warn('Missing URL argument');
        }
        var submission = this.submission || {};
        var API_URL = URL;
        var settings = {
            method: 'POST',
            headers: {}
        };
        if (headers && headers.length > 0) {
            headers.map(function (e) {
                if (e.header !== '' && e.value !== '') {
                    settings.headers[e.header] = _this_1.interpolate(e.value, submission);
                }
            });
        }
        if (API_URL && settings) {
            try {
                Formio.makeStaticRequest(API_URL, settings.method, submission, { headers: settings.headers }).then(function () {
                    _this_1.emit('requestDone');
                    _this_1.setAlert('success', '<p> Success </p>');
                });
            }
            catch (e) {
                this.showErrors(e.statusText + " " + e.status);
                this.emit('error', e.statusText + " " + e.status);
                console.error(e.statusText + " " + e.status);
            }
        }
        else {
            this.emit('error', 'You should add a URL to this button.');
            this.setAlert('warning', 'You should add a URL to this button.');
            return console.warn('You should add a URL to this button.');
        }
    };
    Webform.prototype.triggerRecaptcha = function () {
        if (!this || !this.components) {
            return;
        }
        var recaptchaComponent = this.components.find(function (component) {
            return component.component.type === 'recaptcha' &&
                component.component.eventType === 'formLoad';
        });
        if (recaptchaComponent) {
            recaptchaComponent.verify((this.form.name ? this.form.name : 'form') + "Load");
        }
    };
    Object.defineProperty(Webform.prototype, "nosubmit", {
        get: function () {
            return this._nosubmit || false;
        },
        set: function (value) {
            this._nosubmit = !!value;
            this.emit('nosubmit', this._nosubmit);
        },
        enumerable: false,
        configurable: true
    });
    return Webform;
}(NestedDataComponent));
export default Webform;
Webform.setBaseUrl = Formio.setBaseUrl;
Webform.setApiUrl = Formio.setApiUrl;
Webform.setAppUrl = Formio.setAppUrl;
