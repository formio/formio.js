"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _compareVersions = _interopRequireDefault(require("compare-versions"));

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

var _i18next = _interopRequireDefault(require("i18next"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Components = _interopRequireDefault(require("./components/Components"));

var _NestedDataComponent2 = _interopRequireDefault(require("./components/_classes/nesteddata/NestedDataComponent"));

var _utils = require("./utils/utils");

var _formUtils = require("./utils/formUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Initialize the available forms.
_Formio.default.forms = {}; // Allow people to register components.

_Formio.default.registerComponent = _Components.default.setComponent;

function getIconSet(icons) {
  if (icons === 'fontawesome') {
    return 'fa';
  }

  return icons || '';
}

function getOptions(options) {
  options = _lodash.default.defaults(options, {
    submitOnEnter: false,
    iconset: getIconSet(options && options.icons ? options.icons : _Formio.default.icons),
    i18next: _i18next.default,
    saveDraft: false,
    alwaysDirty: false,
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


var Webform = /*#__PURE__*/function (_NestedDataComponent) {
  _inherits(Webform, _NestedDataComponent);

  var _super = _createSuper(Webform);

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
    var _this2;

    _classCallCheck(this, Webform);

    var element, options;

    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    } else {
      options = arguments[0];
    }

    _this2 = _super.call(this, null, getOptions(options));

    _defineProperty(_assertThisInitialized(_this2), "executeShortcuts", function (event) {
      var target = event.target;

      if (!_this2.keyboardCatchableElement(target)) {
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

      _lodash.default.each(_this2.shortcuts, function (shortcut) {
        if (shortcut.ctrl && !ctrl) {
          return;
        }

        if (shortcut.shortcut === char) {
          shortcut.element.click();
          event.preventDefault();
        }
      });
    });

    _this2.element = element; // Keep track of all available forms globally.

    _Formio.default.forms[_this2.id] = _assertThisInitialized(_this2); // Set the base url.

    if (_this2.options.baseUrl) {
      _Formio.default.setBaseUrl(_this2.options.baseUrl);
    }
    /**
     * The i18n configuration for this component.
     */


    var i18n = _i18n.default;

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

    _this2.component.clearOnHide = false; // Ensure the root is set to this component.

    _this2.root = _assertThisInitialized(_this2);
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
      this.i18next.addResourceBundle(code, 'translation', lang, true, true);

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

      if (this.i18next.initialized) {
        return _nativePromiseOnly.default.resolve(this.i18next);
      }

      this.i18next.initialized = true;
      return new _nativePromiseOnly.default(function (resolve, reject) {
        try {
          _this3.i18next.init(_this3.options.i18n, function (err) {
            // Get language but remove any ;q=1 that might exist on it.
            _this3.options.language = _this3.i18next.language.split(';')[0];

            if (err) {
              return reject(err);
            }

            resolve(_this3.i18next);
          });
        } catch (err) {
          return reject(err);
        }
      });
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
        return this.formio.loadForm({
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

      return _nativePromiseOnly.default.resolve();
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
    value: function setForm(form, flags) {
      var _this$_form$component,
          _this6 = this;

      var isFormAlreadySet = this._form && ((_this$_form$component = this._form.components) === null || _this$_form$component === void 0 ? void 0 : _this$_form$component.length);

      try {
        // Do not set the form again if it has been already set
        if (isFormAlreadySet && JSON.stringify(this._form) === JSON.stringify(form)) {
          return _nativePromiseOnly.default.resolve();
        } // Create the form.


        this._form = flags !== null && flags !== void 0 && flags.keepAsReference ? form : _lodash.default.cloneDeep(form);

        if (this.onSetForm) {
          this.onSetForm(this._form, form);
        }
      } catch (err) {
        console.warn(err); // If provided form is not a valid JSON object, do not set it too

        return _nativePromiseOnly.default.resolve();
      } // Allow the form to provide component overrides.


      if (form && form.settings && form.settings.components) {
        this.options.components = form.settings.components;
      }

      if ('schema' in form && (0, _compareVersions.default)(form.schema, '1.x') > 0) {
        this.ready.then(function () {
          _this6.setAlert('alert alert-danger', 'Form schema is for a newer version, please upgrade your renderer. Some functionality may not work.');
        });
      } // See if they pass a module, and evaluate it if so.


      if (form && form.module) {
        var formModule = null;

        if (typeof form.module === 'string') {
          try {
            formModule = this.evaluate("return ".concat(form.module));
          } catch (err) {
            console.warn(err);
          }
        } else {
          formModule = form.module;
        }

        if (formModule) {
          _Formio.default.use(formModule); // Since we got here after instantiation, we need to manually apply form options.


          if (formModule.options && formModule.options.form) {
            this.options = Object.assign(this.options, formModule.options.form);
          }
        }
      }

      this.initialized = false;

      var rebuild = this.rebuild() || _nativePromiseOnly.default.resolve();

      return rebuild.then(function () {
        _this6.emit('formLoad', form);

        _this6.triggerRecaptcha(); // Make sure to trigger onChange after a render event occurs to speed up form rendering.


        setTimeout(function () {
          _this6.onChange(flags);

          _this6.formReadyResolve();
        }, 0);
        return _this6.formReady;
      });
    }
    /**
     * Gets the form object.
     *
     * @returns {Object} - The form JSON schema.
     */

  }, {
    key: "setSubmission",

    /**
     * Sets a submission and returns the promise when it is ready.
     * @param submission
     * @param flags
     * @return {Promise.<TResult>}
     */
    value: function setSubmission(submission) {
      var _this7 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      flags = _objectSpread(_objectSpread({}, flags), {}, {
        fromSubmission: _lodash.default.has(flags, 'fromSubmission') ? flags.fromSubmission : true
      });
      return this.onSubmission = this.formReady.then(function (resolveFlags) {
        if (resolveFlags) {
          flags = _objectSpread(_objectSpread({}, flags), resolveFlags);
        }

        _this7.submissionSet = true;

        _this7.triggerChange(flags);

        _this7.setValue(submission, flags);

        return _this7.submissionReadyResolve(submission);
      }, function (err) {
        return _this7.submissionReadyReject(err);
      }).catch(function (err) {
        return _this7.submissionReadyReject(err);
      });
    }
    /**
     * Saves a submission draft.
     */

  }, {
    key: "saveDraft",
    value: function saveDraft() {
      var _this8 = this;

      if (!this.draftEnabled) {
        return;
      }

      if (!this.formio) {
        console.warn(this.t('saveDraftInstanceError'));
        return;
      }

      if (!_Formio.default.getUser()) {
        console.warn(this.t('saveDraftAuthError'));
        return;
      }

      var draft = (0, _utils.fastCloneDeep)(this.submission);
      draft.state = 'draft';

      if (!this.savingDraft) {
        this.emit('saveDraftBegin');
        this.savingDraft = true;
        this.formio.saveSubmission(draft).then(function (sub) {
          // Set id to submission to avoid creating new draft submission
          _this8.submission._id = sub._id;
          _this8.savingDraft = false;

          _this8.emit('saveDraft', sub);
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
      var _this9 = this;

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
        if (submissions.length > 0 && !_this9.options.skipDraftRestore) {
          var draft = (0, _utils.fastCloneDeep)(submissions[0]);
          return _this9.setSubmission(draft).then(function () {
            _this9.draftEnabled = true;
            _this9.savingDraft = false;

            _this9.emit('restoreDraft', draft);
          });
        } // Enable drafts so that we can keep track of changes.


        _this9.draftEnabled = true;
        _this9.savingDraft = false;

        _this9.emit('restoreDraft', null);
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
    value: function setValue(submission) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!submission || !submission.data) {
        submission = {
          data: {}
        };
      } // Metadata needs to be available before setValue


      this._submission.metadata = submission.metadata || {};
      this.editing = !!submission._id; // Set the timezone in the options if available.

      if (!this.options.submissionTimezone && submission.metadata && submission.metadata.timezone) {
        this.options.submissionTimezone = submission.metadata.timezone;
      }

      var changed = _get(_getPrototypeOf(Webform.prototype), "setValue", this).call(this, submission.data, flags);

      if (!flags.sanitize) {
        this.mergeData(this.data, submission.data);
      }

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
     * Build the form.
     */

  }, {
    key: "init",
    value: function init() {
      var _this10 = this;

      this._submission = this._submission || {
        data: {}
      }; // Remove any existing components.

      if (this.components && this.components.length) {
        this.destroyComponents();
        this.components = [];
      }

      if (this.component) {
        this.component.components = this.form ? this.form.components : [];
      } else {
        this.component = this.form;
      }

      this.component.type = 'form';
      this.component.input = false;
      this.addComponents();
      this.on('submitButton', function (options) {
        _this10.submit(false, options).catch(function (e) {
          return e !== false && console.log(e);
        });
      }, true);
      this.on('checkValidity', function (data) {
        return _this10.checkValidity(data, true, data);
      }, true);
      this.on('requestUrl', function (args) {
        return _this10.submitUrl(args.url, args.headers);
      }, true);
      this.on('resetForm', function () {
        return _this10.resetValue();
      }, true);
      this.on('deleteSubmission', function () {
        return _this10.deleteSubmission();
      }, true);
      this.on('refreshData', function () {
        return _this10.updateValue();
      }, true);
      this.executeFormController();
      return this.formReady;
    }
  }, {
    key: "executeFormController",
    value: function executeFormController() {
      var _this11 = this;

      // If no controller value or
      // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
      if (!this.form || !this.form.controller || (!this.visible || this.component.hidden) && this.component.clearOnHide && !this.rootPristine) {
        return false;
      }

      this.formReady.then(function () {
        _this11.evaluate(_this11.form.controller, {
          components: _this11.components
        });
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var deleteFromGlobal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.off('submitButton');
      this.off('checkValidity');
      this.off('requestUrl');
      this.off('resetForm');
      this.off('deleteSubmission');
      this.off('refreshData');

      if (deleteFromGlobal) {
        delete _Formio.default.forms[this.id];
      }

      return _get(_getPrototypeOf(Webform.prototype), "destroy", this).call(this);
    }
  }, {
    key: "build",
    value: function build(element) {
      var _this12 = this;

      if (element || this.element) {
        return this.ready.then(function () {
          element = element || _this12.element;

          _get(_getPrototypeOf(Webform.prototype), "build", _this12).call(_this12, element);
        });
      }

      return this.ready;
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var classes = 'formio-form';

      if (this.options.readOnly) {
        classes += ' formio-read-only';
      }

      return classes;
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(Webform.prototype), "render", this).call(this, this.renderTemplate('webform', {
        classes: this.getClassName(),
        children: this.renderComponents()
      }), this.builderMode ? 'builder' : 'form', true);
    }
  }, {
    key: "redraw",
    value: function redraw() {
      // Don't bother if we have not built yet.
      if (!this.element) {
        return _nativePromiseOnly.default.resolve();
      }

      this.clear();
      this.setContent(this.element, this.render());
      return this.attach(this.element);
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this13 = this;

      this.element = element;
      this.loadRefs(element, {
        webform: 'single'
      });
      var childPromise = this.attachComponents(this.refs.webform);
      this.addEventListener(document, 'keydown', this.executeShortcuts);
      this.currentForm = this;
      return childPromise.then(function () {
        _this13.emit('render', _this13.element);

        return _this13.setValue(_this13._submission, {
          noUpdateEvent: true
        });
      });
    }
  }, {
    key: "hasRequiredFields",
    value: function hasRequiredFields() {
      var result = false;
      (0, _formUtils.eachComponent)(this.form.components, function (component) {
        if (component.validate.required) {
          result = true;
          return true;
        }
      }, true);
      return result;
    }
  }, {
    key: "resetValue",
    value: function resetValue() {
      _lodash.default.each(this.getComponents(), function (comp) {
        return comp.resetValue();
      });

      this.setPristine(true);
      this.redraw();
    }
    /**
     * Sets a new alert to display in the error dialog of the form.
     *
     * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
     * @param {string} message - The message to show in the alert.
     * @param {Object} options
     */

  }, {
    key: "setAlert",
    value: function setAlert(type, message, options) {
      var _this14 = this;

      if (!type && this.submitted) {
        if (this.alert) {
          if (this.refs.errorRef && this.refs.errorRef.length) {
            this.refs.errorRef.forEach(function (el) {
              _this14.removeEventListener(el, 'click');

              _this14.removeEventListener(el, 'keypress');
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
              _this14.removeEventListener(el, 'click');

              _this14.removeEventListener(el, 'keypress');
            });
          }

          this.removeChild(this.alert);
          this.alert = null;
        } catch (err) {// ignore
        }
      }

      if (message) {
        this.alert = this.ce('div', {
          class: options && options.classes || "alert alert-".concat(type),
          id: "error-list-".concat(this.id)
        });

        if (message instanceof HTMLElement) {
          this.appendTo(message, this.alert);
        } else {
          this.setContent(this.alert, message);
        }
      }

      if (!this.alert) {
        return;
      }

      this.loadRefs(this.alert, {
        errorRef: 'multiple'
      });

      if (this.refs.errorRef && this.refs.errorRef.length) {
        this.refs.errorRef.forEach(function (el) {
          _this14.addEventListener(el, 'click', function (e) {
            var key = e.currentTarget.dataset.componentKey;

            _this14.focusOnComponent(key);
          });

          _this14.addEventListener(el, 'keydown', function (e) {
            if (e.keyCode === 13) {
              e.preventDefault();
              var key = e.currentTarget.dataset.componentKey;

              _this14.focusOnComponent(key);
            }
          });
        });
      }

      this.prepend(this.alert);
    }
    /**
     * Focus on selected component.
     *
     * @param {string} key - The key of selected component.
     * @returns {*}
     */

  }, {
    key: "focusOnComponent",
    value: function focusOnComponent(key) {
      if (key) {
        var component = this.getComponent(key);

        if (component) {
          component.focus();
        }
      }
    }
    /**
     * Show the errors of this form within the alert dialog.
     *
     * @param {Object} error - An optional additional error to display along with the component errors.
     * @returns {*}
     */

    /* eslint-disable no-unused-vars */

  }, {
    key: "showErrors",
    value: function showErrors(error, triggerEvent, onChange) {
      var _this15 = this;

      this.loading = false;
      var errors = this.errors;

      if (error) {
        if (Array.isArray(error)) {
          errors = errors.concat(error);
        } else {
          errors.push(error);
        }
      } else {
        errors = _get(_getPrototypeOf(Webform.prototype), "errors", this);
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
          var component = _this15.getComponent(path, _lodash.default.identity);

          var components = _lodash.default.compact(Array.isArray(component) ? component : [component]);

          components.forEach(function (component) {
            return component.setCustomValidity(err.message, true);
          });
        });
      });
      var message = document.createDocumentFragment();
      var p = this.ce('p');
      this.setContent(p, this.t('error'));
      var ul = this.ce('ul');
      errors.forEach(function (err) {
        if (err) {
          var createListItem = function createListItem(message, index) {
            var params = {
              ref: 'errorRef',
              tabIndex: 0,
              'aria-label': "".concat(message, ". Click to navigate to the field with following error.")
            };

            var li = _this15.ce('li', params);

            var span = _this15.ce('span');

            li.style.cursor = 'pointer';

            _this15.setContent(span, (0, _utils.unescapeHTML)(message));

            _this15.appendTo(span, li);

            var messageFromIndex = !_lodash.default.isUndefined(index) && err.messages && err.messages[index];
            var keyOrPath = messageFromIndex && messageFromIndex.path || err.component && err.component.key;

            if (keyOrPath) {
              var formattedKeyOrPath = (0, _utils.getStringFromComponentPath)(keyOrPath);
              li.dataset.componentKey = formattedKeyOrPath;
            }

            _this15.appendTo(li, ul);
          };

          if (err.messages && err.messages.length) {
            var component = err.component;
            err.messages.forEach(function (_ref, index) {
              var message = _ref.message;

              var text = _this15.t('alertMessage', {
                label: _this15.t(component.label),
                message: message
              });

              createListItem(text, index);
            });
          } else if (err) {
            var _message = _lodash.default.isObject(err) ? err.message || '' : err;

            createListItem(_message);
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
    }
    /* eslint-enable no-unused-vars */

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
      this.setPristine(true); // We want to return the submitted submission and setValue will mutate the submission so cloneDeep it here.

      this.setValue((0, _utils.fastCloneDeep)(submission), {
        noValidate: true,
        noCheck: true
      });
      this.setAlert('success', "<p>".concat(this.t('complete'), "</p>"));
      this.emit('submit', submission, saved);

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
      this.emit('submitError', error); // Allow for silent cancellations (no error message, no submit button error state)

      if (error && error.silent) {
        this.emit('change', {
          isValid: true
        }, {
          silent: true
        });
        return false;
      }

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
    value: function onChange(flags, changed, modified, changes) {
      flags = flags || {};
      var isChangeEventEmitted = false; // For any change events, clear any custom errors for that component.

      if (changed && changed.component) {
        this.customErrors = this.customErrors.filter(function (err) {
          return err.component && err.component !== changed.component.key;
        });
      }

      _get(_getPrototypeOf(Webform.prototype), "onChange", this).call(this, flags, true);

      var value = _lodash.default.clone(this.submission);

      flags.changed = value.changed = changed;
      flags.changes = changes;

      if (modified && this.pristine) {
        this.pristine = false;
      }

      value.isValid = this.checkData(value.data, flags);
      this.loading = false;

      if (this.submitted) {
        this.showErrors();
      } // See if we need to save the draft of the form.


      if (modified && this.options.saveDraft) {
        this.triggerSaveDraft();
      }

      if (!flags || !flags.noEmit) {
        this.emit('change', value, flags, modified);
        isChangeEventEmitted = true;
      } // The form is initialized after the first change event occurs.


      if (isChangeEventEmitted && !this.initialized) {
        this.emit('initialized');
        this.initialized = true;
      }
    }
  }, {
    key: "checkData",
    value: function checkData(data) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var valid = _get(_getPrototypeOf(Webform.prototype), "checkData", this).call(this, data, flags);

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
      var _this16 = this;

      return this.formio.deleteSubmission().then(function () {
        _this16.emit('submissionDeleted', _this16.submission);

        _this16.resetValue();
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
      var shouldReset = this.hook('beforeCancel', true);

      if (shouldReset && (noconfirm || confirm(this.t('confirmCancel')))) {
        this.resetValue();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "setMetadata",
    value: function setMetadata(submission) {
      // Add in metadata about client submitting the form
      submission.metadata = submission.metadata || {};

      _lodash.default.defaults(submission.metadata, {
        timezone: _lodash.default.get(this, '_submission.metadata.timezone', (0, _utils.currentTimezone)()),
        offset: parseInt(_lodash.default.get(this, '_submission.metadata.offset', (0, _moment.default)().utcOffset()), 10),
        origin: document.location.origin,
        referrer: document.referrer,
        browserName: navigator.appName,
        userAgent: navigator.userAgent,
        pathName: window.location.pathname,
        onLine: navigator.onLine
      });
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this17 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _nativePromiseOnly.default(function (resolve, reject) {
        // Read-only forms should never submit.
        if (_this17.options.readOnly) {
          return resolve({
            submission: _this17.submission,
            saved: false
          });
        }

        var submission = (0, _utils.fastCloneDeep)(_this17.submission || {});

        _this17.setMetadata(submission);

        submission.state = options.state || 'submitted';
        var isDraft = submission.state === 'draft';

        _this17.hook('beforeSubmit', _objectSpread(_objectSpread({}, submission), {}, {
          component: options.component
        }), function (err) {
          if (err) {
            return reject(err);
          }

          if (!isDraft && !submission.data) {
            return reject('Invalid Submission');
          }

          if (!isDraft && !_this17.checkValidity(submission.data, true, submission.data)) {
            return reject();
          }

          _this17.everyComponent(function (comp) {
            var persistent = comp.component.persistent;

            if (persistent === 'client-only') {
              _lodash.default.unset(submission.data, comp.path);
            }
          });

          _this17.hook('customValidation', _objectSpread(_objectSpread({}, submission), {}, {
            component: options.component
          }), function (err) {
            if (err) {
              // If string is returned, cast to object.
              if (typeof err === 'string') {
                err = {
                  message: err
                };
              } // Ensure err is an array.


              err = Array.isArray(err) ? err : [err]; // Set as custom errors.

              _this17.customErrors = err;
              return reject();
            }

            _this17.loading = true; // Use the form action to submit the form if available.

            if (_this17._form && _this17._form.action) {
              var method = submission.data._id && _this17._form.action.includes(submission.data._id) ? 'PUT' : 'POST';
              return _Formio.default.makeStaticRequest(_this17._form.action, method, submission, _this17.formio ? _this17.formio.options : {}).then(function (result) {
                return resolve({
                  submission: result,
                  saved: true
                });
              }).catch(reject);
            }

            var submitFormio = _this17.formio;

            if (_this17.nosubmit || !submitFormio) {
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
      var _this18 = this;

      this.submitted = true;
      this.submitting = true;
      return this.submitForm(options).then(function (_ref2) {
        var submission = _ref2.submission,
            saved = _ref2.saved;
        return _this18.onSubmit(submission, saved);
      }).catch(function (err) {
        return _nativePromiseOnly.default.reject(_this18.onSubmissionError(err));
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
      var _this19 = this;

      if (!before) {
        return this.beforeSubmit(options).then(function () {
          return _this19.executeSubmit(options);
        });
      } else {
        return this.executeSubmit(options);
      }
    }
  }, {
    key: "submitUrl",
    value: function submitUrl(URL, headers) {
      var _this20 = this;

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
            settings.headers[e.header] = _this20.interpolate(e.value, submission);
          }
        });
      }

      if (API_URL && settings) {
        _Formio.default.makeStaticRequest(API_URL, settings.method, submission, {
          headers: settings.headers
        }).then(function () {
          _this20.emit('requestDone');

          _this20.setAlert('success', '<p> Success </p>');
        }).catch(function (e) {
          _this20.showErrors("".concat(e.statusText ? e.statusText : '', " ").concat(e.status ? e.status : e));

          _this20.emit('error', "".concat(e.statusText ? e.statusText : '', " ").concat(e.status ? e.status : e));

          console.error("".concat(e.statusText ? e.statusText : '', " ").concat(e.status ? e.status : e));

          _this20.setAlert('danger', "<p> ".concat(e.statusText ? e.statusText : '', " ").concat(e.status ? e.status : e, " </p>"));
        });
      } else {
        this.emit('error', 'You should add a URL to this button.');
        this.setAlert('warning', 'You should add a URL to this button.');
        return console.warn('You should add a URL to this button.');
      }
    }
  }, {
    key: "triggerRecaptcha",
    value: function triggerRecaptcha() {
      if (!this || !this.components) {
        return;
      }

      var recaptchaComponent = (0, _utils.searchComponents)(this.components, {
        'component.type': 'recaptcha',
        'component.eventType': 'formLoad'
      });

      if (recaptchaComponent.length > 0) {
        recaptchaComponent[0].verify("".concat(this.form.name ? this.form.name : 'form', "Load"));
      }
    }
  }, {
    key: "language",
    set: function set(lang) {
      var _this21 = this;

      return new _nativePromiseOnly.default(function (resolve, reject) {
        _this21.options.language = lang;

        if (_this21.i18next.language === lang) {
          return resolve();
        }

        try {
          _this21.i18next.changeLanguage(lang, function (err) {
            if (err) {
              return reject(err);
            }

            _this21.redraw();

            _this21.emit('languageChanged');

            resolve();
          });
        } catch (err) {
          return reject(err);
        }
      });
    }
  }, {
    key: "componentComponents",
    get: function get() {
      return this.form.components;
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
      var _this22 = this;

      return this.formReady.then(function () {
        return _get(_getPrototypeOf(Webform.prototype), "ready", _this22).then(function () {
          return _this22.loadingSubmission ? _this22.submissionReady : true;
        });
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
      if (!this._form) {
        this._form = {
          components: []
        };
      }

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
      var schema = (0, _utils.fastCloneDeep)(_lodash.default.omit(this._form, ['components']));
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
}(_NestedDataComponent2.default);

exports.default = Webform;
Webform.setBaseUrl = _Formio.default.setBaseUrl;
Webform.setApiUrl = _Formio.default.setApiUrl;
Webform.setAppUrl = _Formio.default.setAppUrl;