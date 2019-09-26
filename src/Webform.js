"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

var _i18next = _interopRequireDefault(require("i18next"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Components = _interopRequireDefault(require("./components/Components"));

var _NestedComponent2 = _interopRequireDefault(require("./components/nested/NestedComponent"));

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Initialize the available forms.
_Formio.default.forms = {}; // Allow people to register components.

_Formio.default.registerComponent = _Components.default.setComponent;

function getOptions(options) {
  options = _lodash.default.defaults(options, {
    submitOnEnter: false,
    icons: _Formio.default.icons || '',
    i18next: _i18next.default,
    saveDraft: false,
    saveDraftThrottle: 5000
  });

  if (!options.events) {
    options.events = new _EventEmitter.default({
      wildcard: false,
      maxListeners: 0
    });
  }

  return options;
}
/**
 * Renders a Form.io form within the webpage.
 */


var Webform =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(Webform, _NestedComponent);

  /**
   * Creates a new Form instance.
   *
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.saveDraft - Set this if you would like to enable the save draft feature.
   * @param {boolean} options.saveDraftThrottle - The throttle for the save draft feature.
   * @param {boolean} options.readOnly - Set this form to readOnly
   * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
   * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
   * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
   */

  /* eslint-disable max-statements */
  function Webform(element, options) {
    var _this2;

    _classCallCheck(this, Webform);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Webform).call(this, null, getOptions(options))); // Keep track of all available forms globally.

    _Formio.default.forms[_this2.id] = _assertThisInitialized(_this2); // Set the base url.

    if (_this2.options.baseUrl) {
      _Formio.default.setBaseUrl(_this2.options.baseUrl);
    }
    /**
     * The i18n configuration for this component.
     */


    var i18n = require('./i18n').default;

    if (options && options.i18n && !options.i18nReady) {
      // Support legacy way of doing translations.
      if (options.i18n.resources) {
        i18n = options.i18n;
      } else {
        _lodash.default.each(options.i18n, function (lang, code) {
          if (code === 'options') {
            _lodash.default.merge(i18n, lang);
          } else if (!i18n.resources[code]) {
            i18n.resources[code] = {
              translation: lang
            };
          } else {
            _lodash.default.assign(i18n.resources[code].translation, lang);
          }
        });
      }

      options.i18n = i18n;
      options.i18nReady = true;
    }

    if (options && options.i18n) {
      _this2.options.i18n = options.i18n;
    } else {
      _this2.options.i18n = i18n;
    } // Set the language.


    if (_this2.options.language) {
      _this2.options.i18n.lng = _this2.options.language;
    }
    /**
     * The type of this element.
     * @type {string}
     */


    _this2.type = 'form';
    _this2._src = '';
    _this2._loading = false;
    _this2._submission = {};
    _this2._form = {};
    _this2.draftEnabled = false;
    _this2.savingDraft = true;

    if (_this2.options.saveDraftThrottle) {
      _this2.triggerSaveDraft = _lodash.default.throttle(_this2.saveDraft.bind(_assertThisInitialized(_this2)), _this2.options.saveDraftThrottle);
    } else {
      _this2.triggerSaveDraft = _this2.saveDraft.bind(_assertThisInitialized(_this2));
    }

    _this2.customErrors = [];
    /**
     * Determines if this form should submit the API on submit.
     * @type {boolean}
     */

    _this2.nosubmit = false;
    /**
     * Determines if the form has tried to be submitted, error or not.
     *
     * @type {boolean}
     */

    _this2.submitted = false;
    /**
     * Determines if the form is being submitted at the moment.
     *
     * @type {boolean}
     */

    _this2.submitting = false;
    /**
     * The Formio instance for this form.
     * @type {Formio}
     */

    _this2.formio = null;
    /**
     * The loader HTML element.
     * @type {HTMLElement}
     */

    _this2.loader = null;
    /**
     * The alert HTML element
     * @type {HTMLElement}
     */

    _this2.alert = null;
    /**
     * Promise that is triggered when the submission is done loading.
     * @type {Promise}
     */

    _this2.onSubmission = null;
    /**
     * Promise that is triggered when the form is done building.
     * @type {Promise}
     */

    _this2.onFormBuild = null;
    /**
     * Determines if this submission is explicitly set.
     * @type {boolean}
     */

    _this2.submissionSet = false;
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

    _this2.formReady = new _nativePromiseOnly.default(function (resolve, reject) {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      _this2.formReadyResolve = resolve;
      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */

      _this2.formReadyReject = reject;
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

    _this2.submissionReady = new _nativePromiseOnly.default(function (resolve, reject) {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      _this2.submissionReadyResolve = resolve;
      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */

      _this2.submissionReadyReject = reject;
    });
    /**
     * Promise to trigger when the element for this form is established.
     *
     * @type {Promise}
     */

    _this2.onElement = new _nativePromiseOnly.default(function (resolve) {
      /**
       * Called when the element has been resolved.
       *
       * @type {function}
       */
      _this2.elementResolve = resolve;

      _this2.setElement(element);
    });
    _this2.shortcuts = []; // Set language after everything is established.

    _this2.localize().then(function () {
      _this2.language = _this2.options.language;
    }); // See if we need to restore the draft from a user.


    if (_this2.options.saveDraft && _Formio.default.events) {
      _Formio.default.events.on('formio.user', function (user) {
        _this2.formReady.then(function () {
          // Only restore a draft if the submission isn't explicitly set.
          if (!_this2.submissionSet) {
            _this2.restoreDraft(user._id);
          }
        });
      });
    }

    _this2.component.clearOnHide = false;
    return _this2;
  }
  /* eslint-enable max-statements */

  /**
   * Sets the language for this form.
   *
   * @param lang
   * @return {Promise}
   */


  _createClass(Webform, [{
    key: "addLanguage",

    /**
     * Add a language for translations
     *
     * @param code
     * @param lang
     * @param active
     * @return {*}
     */
    value: function addLanguage(code, lang) {
      var active = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _i18next.default.addResourceBundle(code, 'translation', lang, true, true);

      if (active) {
        this.language = code;
      }
    }
    /**
     * Perform the localization initialization.
     * @returns {*}
     */

  }, {
    key: "localize",
    value: function localize() {
      var _this3 = this;

      if (_i18next.default.initialized) {
        return _nativePromiseOnly.default.resolve(_i18next.default);
      }

      _i18next.default.initialized = true;
      return new _nativePromiseOnly.default(function (resolve, reject) {
        try {
          _i18next.default.init(_this3.options.i18n, function (err) {
            // Get language but remove any ;q=1 that might exist on it.
            _this3.options.language = _i18next.default.language.split(';')[0];

            if (err) {
              return reject(err);
            }

            resolve(_i18next.default);
          });
        } catch (err) {
          return reject(err);
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var preserveGlobal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!preserveGlobal) {
        delete _Formio.default.forms[this.id];
      }

      return _get(_getPrototypeOf(Webform.prototype), "destroy", this).call(this);
    }
    /**
     * Sets the the outside wrapper element of the Form.
     *
     * @param {HTMLElement} element - The element to set as the outside wrapper element for this form.
     */

  }, {
    key: "setElement",
    value: function setElement(element) {
      if (!element) {
        return;
      }

      if (this.element) {
        this.element.removeEventListener('keydown', this.executeShortcuts.bind(this));
      }

      this.wrapper = element;
      this.element = this.ce('div');
      this.wrapper.appendChild(this.element);
      this.showElement(false);
      this.element.addEventListener('keydown', this.executeShortcuts.bind(this));
      var classNames = this.element.getAttribute('class');
      classNames += ' formio-form';
      this.addClass(this.wrapper, classNames);
      this.loading = true;
      this.elementResolve(element);
    }
  }, {
    key: "keyboardCatchableElement",
    value: function keyboardCatchableElement(element) {
      if (element.nodeName === 'TEXTAREA') {
        return false;
      }

      if (element.nodeName === 'INPUT') {
        return ['text', 'email', 'password'].indexOf(element.type) === -1;
      }

      return true;
    }
  }, {
    key: "executeShortcuts",
    value: function executeShortcuts(event) {
      var target = event.target;

      if (!this.keyboardCatchableElement(target)) {
        return;
      }

      var ctrl = event.ctrlKey || event.metaKey;
      var keyCode = event.keyCode;
      var char = '';

      if (65 <= keyCode && keyCode <= 90) {
        char = String.fromCharCode(keyCode);
      } else if (keyCode === 13) {
        char = 'Enter';
      } else if (keyCode === 27) {
        char = 'Esc';
      }

      _lodash.default.each(this.shortcuts, function (shortcut) {
        if (shortcut.ctrl && !ctrl) {
          return;
        }

        if (shortcut.shortcut === char) {
          shortcut.element.click();
          event.preventDefault();
        }
      });
    }
  }, {
    key: "addShortcut",
    value: function addShortcut(element, shortcut) {
      if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
        return;
      }

      shortcut = _lodash.default.capitalize(shortcut);

      if (shortcut === 'Enter' || shortcut === 'Esc') {
        // Restrict Enter and Esc only for buttons
        if (element.tagName !== 'BUTTON') {
          return;
        }

        this.shortcuts.push({
          shortcut: shortcut,
          element: element
        });
      } else {
        this.shortcuts.push({
          ctrl: true,
          shortcut: shortcut,
          element: element
        });
      }
    }
  }, {
    key: "removeShortcut",
    value: function removeShortcut(element, shortcut) {
      if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
        return;
      }

      _lodash.default.remove(this.shortcuts, {
        shortcut: shortcut,
        element: element
      });
    }
    /**
     * Get the embed source of the form.
     *
     * @returns {string}
     */

  }, {
    key: "loadSubmission",

    /**
     * Loads the submission if applicable.
     */
    value: function loadSubmission() {
      var _this4 = this;

      this.loadingSubmission = true;

      if (this.formio.submissionId) {
        this.onSubmission = this.formio.loadSubmission().then(function (submission) {
          return _this4.setSubmission(submission);
        }, function (err) {
          return _this4.submissionReadyReject(err);
        }).catch(function (err) {
          return _this4.submissionReadyReject(err);
        });
      } else {
        this.submissionReadyResolve();
      }

      return this.submissionReady;
    }
    /**
     * Set the src of the form renderer.
     *
     * @param value
     * @param options
     */

  }, {
    key: "setSrc",
    value: function setSrc(value, options) {
      var _this5 = this;

      if (this.setUrl(value, options)) {
        this.nosubmit = false;
        this.formio.loadForm({
          params: {
            live: 1
          }
        }).then(function (form) {
          var setForm = _this5.setForm(form);

          _this5.loadSubmission();

          return setForm;
        }).catch(function (err) {
          console.warn(err);

          _this5.formReadyReject(err);
        });
      }
    }
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

  }, {
    key: "setUrl",

    /**
     * Sets the url of the form renderer.
     *
     * @param value
     * @param options
     */
    value: function setUrl(value, options) {
      if (!value || typeof value !== 'string' || value === this._src) {
        return false;
      }

      this._src = value;
      this.nosubmit = true;
      this.formio = this.options.formio = new _Formio.default(value, options);

      if (this.type === 'form') {
        // Set the options source so this can be passed to other components.
        this.options.src = value;
      }

      return true;
    }
    /**
     * Set the form source but don't initialize the form and submission from the url.
     *
     * @param {string} value - The value of the form embed url.
     */

  }, {
    key: "setForm",

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
    value: function setForm(form) {
      var _this6 = this;

      if (form.display === 'wizard') {
        console.warn('You need to instantiate the FormioWizard class to use this form as a wizard.');
      }

      if (this.onFormBuild) {
        return this.onFormBuild.then(function () {
          return _this6.createForm(form);
        }, function (err) {
          return _this6.formReadyReject(err);
        }).catch(function (err) {
          return _this6.formReadyReject(err);
        });
      } // Create the form.


      this._form = form; // Allow the form to provide component overrides.

      if (form && form.settings && form.settings.components) {
        this.options.components = form.settings.components;
      }

      this.initialized = false;
      return this.createForm(form).then(function () {
        _this6.emit('formLoad', form);

        _this6.triggerRecaptcha();

        return form;
      });
    }
    /**
     * Gets the form object.
     *
     * @returns {Object} - The form JSON schema.
     */

  }, {
    key: "setSubmissionValue",

    /**
     * Explicitely sets the submission value directly without waiting on any form loads etc.
     *
     * @param submission
     * @return {*}
     */
    value: function setSubmissionValue(submission, flags) {
      var _this7 = this;

      this.submissionSet = true;

      if (!this.setValue(submission, flags)) {
        if (this.hasChanged(submission, this.getValue())) {
          this.triggerChange({
            noValidate: true
          });
        }
      }

      return this.dataReady.then(function () {
        return _this7.submissionReadyResolve(submission);
      });
    }
    /**
     * Sets a submission and returns the promise when it is ready.
     * @param submission
     * @param flags
     * @return {Promise.<TResult>}
     */

  }, {
    key: "setSubmission",
    value: function setSubmission(submission, flags) {
      var _this8 = this;

      return this.onSubmission = this.formReady.then(function () {
        _this8.submissionSet = true;

        if (submission._fvid && _this8._form.revisions === 'original' && submission._fvid !== _this8._form._vid) {
          return _this8.formio.loadFormRevision(submission._fvid).then(function (revision) {
            _this8._form._vid = submission._fvid;
            _this8._form.components = revision.components;
            return _this8.setForm(_this8._form).then(function () {
              return _this8.setSubmissionValue(submission, flags);
            });
          });
        } else {
          return _this8.setSubmissionValue(submission, flags);
        }
      }, function (err) {
        return _this8.submissionReadyReject(err);
      }).catch(function (err) {
        return _this8.submissionReadyReject(err);
      });
    }
    /**
     * Saves a submission draft.
     */

  }, {
    key: "saveDraft",
    value: function saveDraft() {
      var _this9 = this;

      if (!this.draftEnabled) {
        return;
      }

      if (!this.formio) {
        console.warn('Cannot save draft because there is no formio instance.');
        return;
      }

      if (!_Formio.default.getUser()) {
        console.warn('Cannot save draft unless a user is authenticated.');
        return;
      }

      var draft = _lodash.default.cloneDeep(this.submission);

      draft.state = 'draft';

      if (!this.savingDraft) {
        this.savingDraft = true;
        this.formio.saveSubmission(draft).then(function (sub) {
          _this9.savingDraft = false;

          _this9.emit('saveDraft', sub);
        });
      }
    }
    /**
     * Restores a draft submission based on the user who is authenticated.
     *
     * @param {userId} - The user id where we need to restore the draft from.
     */

  }, {
    key: "restoreDraft",
    value: function restoreDraft(userId) {
      var _this10 = this;

      if (!this.formio) {
        console.warn('Cannot restore draft because there is no formio instance.');
        return;
      }

      this.savingDraft = true;
      this.formio.loadSubmissions({
        params: {
          state: 'draft',
          owner: userId
        }
      }).then(function (submissions) {
        if (submissions.length > 0) {
          var draft = _lodash.default.cloneDeep(submissions[0]);

          return _this10.setSubmission(draft).then(function () {
            _this10.draftEnabled = true;
            _this10.savingDraft = false;

            _this10.emit('restoreDraft', draft);
          });
        } // Enable drafts so that we can keep track of changes.


        _this10.draftEnabled = true;
        _this10.savingDraft = false;

        _this10.emit('restoreDraft', null);
      });
    }
  }, {
    key: "mergeData",
    value: function mergeData(_this, _that) {
      _lodash.default.mergeWith(_this, _that, function (thisValue, thatValue) {
        if (Array.isArray(thisValue) && Array.isArray(thatValue) && thisValue.length !== thatValue.length) {
          return thatValue;
        }
      });
    }
  }, {
    key: "setValue",
    value: function setValue(submission, flags) {
      if (!submission || !submission.data) {
        submission = {
          data: {}
        };
      } // Metadata needs to be available before setValue


      this._submission.metadata = submission.metadata || {}; // Set the timezone in the options if available.

      if (!this.options.submissionTimezone && submission.metadata && submission.metadata.timezone) {
        this.options.submissionTimezone = submission.metadata.timezone;
      }

      var changed = _get(_getPrototypeOf(Webform.prototype), "setValue", this).call(this, submission.data, flags);

      this.mergeData(this.data, submission.data);
      submission.data = this.data;
      this._submission = submission;
      return changed;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (!this._submission.data) {
        this._submission.data = {};
      }

      if (this.viewOnly) {
        return this._submission;
      }

      var submission = this._submission;
      submission.data = this.data;
      return this._submission;
    }
    /**
     * Create a new form.
     *
     * @param {Object} form - The form object that is created.
     * @returns {Promise.<TResult>}
     */

  }, {
    key: "createForm",
    value: function createForm(form) {
      var _this11 = this;

      /**
       * {@link BaseComponent.component}
       */
      if (this.component) {
        this.component.components = form.components;
      } else {
        this.component = form;
      }

      return this.onFormBuild = this.render().then(function () {
        _this11.formReadyResolve();

        _this11.onFormBuild = null;

        _this11.setValue(_this11.submission);

        if (!_this11.changing) {
          _this11.triggerChange();
        }

        return form;
      }).catch(function (err) {
        console.warn(err);

        _this11.formReadyReject(err);
      });
    }
    /**
     * Render the form within the HTML element.
     * @returns {Promise.<TResult>}
     */

  }, {
    key: "render",
    value: function render() {
      var _this12 = this;

      return this.onElement.then(function () {
        var state = _this12.clear();

        _this12.showElement(false);

        clearTimeout(_this12.build(state));
        _this12.isBuilt = true;

        _this12.on('resetForm', function () {
          return _this12.resetValue();
        }, true);

        _this12.on('deleteSubmission', function () {
          return _this12.deleteSubmission();
        }, true);

        _this12.on('refreshData', function () {
          return _this12.updateValue();
        }, true);

        setTimeout(function () {
          return _this12.emit('render');
        }, 1);
      });
    }
  }, {
    key: "resetValue",
    value: function resetValue() {
      _lodash.default.each(this.getComponents(), function (comp) {
        return comp.resetValue();
      });

      this.setPristine(true);
    }
    /**
     * Sets a new alert to display in the error dialog of the form.
     *
     * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
     * @param {string} message - The message to show in the alert.
     */

  }, {
    key: "setAlert",
    value: function setAlert(type, message) {
      if (this.options.noAlerts) {
        if (!message) {
          this.emit('error', false);
        }

        return;
      }

      if (this.alert) {
        try {
          this.removeChild(this.alert);
          this.alert = null;
        } catch (err) {// ignore
        }
      }

      if (message) {
        this.alert = this.ce('div', {
          class: "alert alert-".concat(type),
          role: 'alert'
        });
        this.alert.innerHTML = message;
      }

      if (!this.alert) {
        return;
      }

      this.prepend(this.alert);
    }
    /**
     * Build the form.
     */

  }, {
    key: "build",
    value: function build(state) {
      var _this13 = this;

      // Clear any existing event handlers in case this is a rebuild
      this.eventHandlers.forEach(function (h) {
        return _this13.removeEventListener(h.obj, h.type);
      });
      this.on('submitButton', function (options) {
        return _this13.submit(false, options);
      }, true);
      this.on('checkValidity', function (data) {
        return _this13.checkValidity(null, true, data);
      }, true);
      this.addComponents(null, null, null, state);
      this.currentForm = this;
      this.on('requestUrl', function (args) {
        return _this13.submitUrl(args.url, args.headers);
      }, true);
      return setTimeout(function () {
        _this13.onChange({
          noEmit: true
        });
      }, 1);
    }
    /**
     * Show the errors of this form within the alert dialog.
     *
     * @param {Object} error - An optional additional error to display along with the component errors.
     * @returns {*}
     */

  }, {
    key: "showErrors",
    value: function showErrors(error, triggerEvent) {
      var _this14 = this;

      this.loading = false;
      var errors = this.errors;

      if (error) {
        if (Array.isArray(error)) {
          errors = errors.concat(error);
        } else {
          errors.push(error);
        }
      }

      errors = errors.concat(this.customErrors);

      if (!errors.length) {
        this.setAlert(false);
        return;
      } // Mark any components as invalid if in a custom message.


      errors.forEach(function (err) {
        var _err$components = err.components,
            components = _err$components === void 0 ? [] : _err$components;

        if (err.component) {
          components.push(err.component);
        }

        if (err.path) {
          components.push(err.path);
        }

        components.forEach(function (path) {
          var component = _this14.getComponent(path, _lodash.default.identity);

          var components = _lodash.default.compact(Array.isArray(component) ? component : [component]);

          components.forEach(function (component) {
            return component.setCustomValidity(err.message, true);
          });
        });
      });
      var message = "\n      <p>".concat(this.t('error'), "</p>\n      <ul>\n        ").concat(errors.map(function (err) {
        return err ? "<li><strong>".concat(err.message || err, "</strong></li>") : '';
      }).join(''), "\n      </ul>\n    ");
      this.setAlert('danger', message);

      if (triggerEvent) {
        this.emit('error', errors);
      }

      return errors;
    }
    /**
     * Called when the submission has completed, or if the submission needs to be sent to an external library.
     *
     * @param {Object} submission - The submission object.
     * @param {boolean} saved - Whether or not this submission was saved to the server.
     * @returns {object} - The submission object.
     */

  }, {
    key: "onSubmit",
    value: function onSubmit(submission, saved) {
      this.loading = false;
      this.submitting = false;
      this.setPristine(true);
      this.setValue(submission, {
        noValidate: true,
        noCheck: true
      });
      this.setAlert('success', "<p>".concat(this.t('complete'), "</p>"));

      if (!submission.hasOwnProperty('saved')) {
        submission.saved = saved;
      }

      this.emit('submit', submission);

      if (saved) {
        this.emit('submitDone', submission);
      }

      return submission;
    }
    /**
     * Called when an error occurs during the submission.
     *
     * @param {Object} error - The error that occured.
     */

  }, {
    key: "onSubmissionError",
    value: function onSubmissionError(error) {
      if (error) {
        // Normalize the error.
        if (typeof error === 'string') {
          error = {
            message: error
          };
        }

        if ('details' in error) {
          error = error.details;
        }
      }

      this.submitting = false;
      this.setPristine(false);
      return this.showErrors(error, true);
    }
    /**
     * Trigger the change event for this form.
     *
     * @param changed
     * @param flags
     */

  }, {
    key: "onChange",
    value: function onChange() {
      var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var changed = arguments.length > 1 ? arguments[1] : undefined;
      var isChangeEventEmitted = false; // For any change events, clear any custom errors for that component.

      if (changed && changed.component) {
        this.customErrors = this.customErrors.filter(function (err) {
          return err.component && err.component !== changed.component.key;
        });
      }

      _get(_getPrototypeOf(Webform.prototype), "onChange", this).call(this, flags, true);

      var value = _lodash.default.clone(this._submission);

      value.changed = changed;
      flags.noValidate = !changed;
      value.isValid = this.checkData(value.data, flags, changed ? changed.instance : null);
      this.showElement(true);
      this.loading = false;

      if (this.submitted) {
        this.showErrors();
      } // See if we need to save the draft of the form.


      if (flags && flags.modified && this.options.saveDraft) {
        this.triggerSaveDraft();
      }

      if (!flags || !flags.noEmit) {
        this.emit('change', value);
        isChangeEventEmitted = true;
      } // The form is initialized after the first change event occurs.


      if (isChangeEventEmitted && !this.initialized) {
        this.emit('initialized');
        this.initialized = true;
      }
    }
  }, {
    key: "checkData",
    value: function checkData(data, flags, source) {
      var valid = _get(_getPrototypeOf(Webform.prototype), "checkData", this).call(this, data, flags, source);

      if ((_lodash.default.isEmpty(flags) || flags.noValidate) && this.submitted) {
        this.showErrors();
      }

      return valid;
    }
    /**
     * Send a delete request to the server.
     */

  }, {
    key: "deleteSubmission",
    value: function deleteSubmission() {
      var _this15 = this;

      return this.formio.deleteSubmission().then(function () {
        _this15.emit('submissionDeleted', _this15.submission);

        _this15.resetValue();
      });
    }
    /**
     * Cancels the submission.
     *
     * @alias reset
     */

  }, {
    key: "cancel",
    value: function cancel(noconfirm) {
      if (noconfirm || confirm('Are you sure you want to cancel?')) {
        this.emit('resetForm');
        this.resetValue();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this16 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _nativePromiseOnly.default(function (resolve, reject) {
        // Read-only forms should never submit.
        if (_this16.options.readOnly) {
          return resolve({
            submission: _this16.submission,
            saved: false
          });
        } // Add in metadata about client submitting the form


        _this16.submission.metadata = _this16.submission.metadata || {};

        _lodash.default.defaults(_this16.submission.metadata, {
          timezone: _lodash.default.get(_this16, '_submission.metadata.timezone', (0, _utils.currentTimezone)()),
          offset: parseInt(_lodash.default.get(_this16, '_submission.metadata.offset', (0, _moment.default)().utcOffset()), 10),
          referrer: document.referrer,
          browserName: navigator.appName,
          userAgent: navigator.userAgent,
          pathName: window.location.pathname,
          onLine: navigator.onLine
        });

        var submission = _lodash.default.cloneDeep(_this16.submission || {});

        submission.state = options.state || 'submitted';
        var isDraft = submission.state === 'draft';

        _this16.hook('beforeSubmit', submission, function (err) {
          if (err) {
            return reject(err);
          }

          if (!isDraft && !submission.data) {
            return reject('Invalid Submission');
          }

          if (!isDraft && !_this16.checkValidity(submission.data, true)) {
            return reject();
          }

          _this16.getAllComponents().forEach(function (comp) {
            var _comp$component = comp.component,
                persistent = _comp$component.persistent,
                key = _comp$component.key;

            if (persistent === 'client-only') {
              delete submission.data[key];
            }
          });

          _this16.hook('customValidation', submission, function (err) {
            if (err) {
              // If string is returned, cast to object.
              if (typeof err === 'string') {
                err = {
                  message: err
                };
              } // Ensure err is an array.


              err = Array.isArray(err) ? err : [err]; // Set as custom errors.

              _this16.customErrors = err;
              return reject();
            }

            _this16.loading = true; // Use the form action to submit the form if available.

            var submitFormio = _this16.formio;

            if (_this16._form && _this16._form.action) {
              submitFormio = new _Formio.default(_this16._form.action, _this16.formio ? _this16.formio.options : {});
            }

            if (_this16.nosubmit || !submitFormio) {
              return resolve({
                submission: submission,
                saved: false
              });
            } // If this is an actionUrl, then make sure to save the action and not the submission.


            var submitMethod = submitFormio.actionUrl ? 'saveAction' : 'saveSubmission';
            submitFormio[submitMethod](submission).then(function (result) {
              return resolve({
                submission: result,
                saved: true
              });
            }).catch(reject);
          });
        });
      });
    }
  }, {
    key: "executeSubmit",
    value: function executeSubmit(options) {
      var _this17 = this;

      this.submitted = true;
      this.submitting = true;
      return this.submitForm(options).then(function (_ref) {
        var submission = _ref.submission,
            saved = _ref.saved;
        return _this17.onSubmit(submission, saved);
      }).catch(function (err) {
        return _nativePromiseOnly.default.reject(_this17.onSubmissionError(err));
      });
    }
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

  }, {
    key: "submit",
    value: function submit(before, options) {
      var _this18 = this;

      if (!before) {
        return this.beforeSubmit(options).then(function () {
          return _this18.executeSubmit(options);
        });
      } else {
        return this.executeSubmit(options);
      }
    }
  }, {
    key: "submitUrl",
    value: function submitUrl(URL, headers) {
      var _this19 = this;

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
            settings.headers[e.header] = _this19.interpolate(e.value, submission);
          }
        });
      }

      if (API_URL && settings) {
        try {
          _Formio.default.makeStaticRequest(API_URL, settings.method, submission, {
            headers: settings.headers
          }).then(function () {
            _this19.emit('requestDone');

            _this19.setAlert('success', '<p> Success </p>');
          });
        } catch (e) {
          this.showErrors("".concat(e.statusText, " ").concat(e.status));
          this.emit('error', "".concat(e.statusText, " ").concat(e.status));
          console.error("".concat(e.statusText, " ").concat(e.status));
        }
      } else {
        this.emit('error', 'You should add a URL to this button.');
        this.setAlert('warning', 'You should add a URL to this button.');
        return console.warn('You should add a URL to this button.');
      }
    }
  }, {
    key: "triggerRecaptcha",
    value: function triggerRecaptcha() {
      var recaptchaComponent;
      this.root.everyComponent(function (component) {
        if (component.component.type === 'recaptcha' && component.component.eventType === 'formLoad') {
          recaptchaComponent = component;
          return false;
        }
      });

      if (recaptchaComponent) {
        recaptchaComponent.verify("".concat(this.form.name ? this.form.name : 'form', "Load"));
      }
    }
  }, {
    key: "language",
    set: function set(lang) {
      var _this20 = this;

      return new _nativePromiseOnly.default(function (resolve, reject) {
        _this20.options.language = lang;

        try {
          _i18next.default.changeLanguage(lang, function (err) {
            if (err) {
              return reject(err);
            }

            _this20.redraw();

            _this20.emit('languageChanged');

            resolve();
          });
        } catch (err) {
          return reject(err);
        }
      });
    }
  }, {
    key: "src",
    get: function get() {
      return this._src;
    },
    set: function set(value) {
      this.setSrc(value);
    }
    /**
     * Get the embed source of the form.
     *
     * @returns {string}
     */

  }, {
    key: "url",
    get: function get() {
      return this._src;
    },
    set: function set(value) {
      this.setUrl(value);
    }
    /**
     * Called when both the form and submission have been loaded.
     *
     * @returns {Promise} - The promise to trigger when both form and submission have loaded.
     */

  }, {
    key: "ready",
    get: function get() {
      var _this21 = this;

      return this.formReady.then(function () {
        return _this21.loadingSubmission ? _this21.submissionReady : true;
      });
    }
    /**
     * Returns if this form is loading.
     *
     * @returns {boolean} - TRUE means the form is loading, FALSE otherwise.
     */

  }, {
    key: "loading",
    get: function get() {
      return this._loading;
    }
    /**
     * Set the loading state for this form, and also show the loader spinner.
     *
     * @param {boolean} loading - If this form should be "loading" or not.
     */
    ,
    set: function set(loading) {
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
            } else {
              this.removeChildFrom(this.loader, this.wrapper);
            }
          } catch (err) {// ingore
          }
        }
        /* eslint-enable max-depth */

      }
    }
  }, {
    key: "form",
    get: function get() {
      return this._form;
    }
    /**
     * Sets the form value.
     *
     * @alias setForm
     * @param {Object} form - The form schema object.
     */
    ,
    set: function set(form) {
      this.setForm(form);
    }
    /**
     * Returns the submission object that was set within this form.
     *
     * @returns {Object}
     */

  }, {
    key: "submission",
    get: function get() {
      return this.getValue();
    }
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
    ,
    set: function set(submission) {
      this.setSubmission(submission);
    }
  }, {
    key: "schema",
    get: function get() {
      var schema = this._form;
      schema.components = [];
      this.eachComponent(function (component) {
        return schema.components.push(component.schema);
      });
      return schema;
    }
  }, {
    key: "nosubmit",
    set: function set(value) {
      this._nosubmit = !!value;
      this.emit('nosubmit', this._nosubmit);
    },
    get: function get() {
      return this._nosubmit || false;
    }
  }]);

  return Webform;
}(_NestedComponent2.default);

exports.default = Webform;
Webform.setBaseUrl = _Formio.default.setBaseUrl;
Webform.setApiUrl = _Formio.default.setApiUrl;
Webform.setAppUrl = _Formio.default.setAppUrl;