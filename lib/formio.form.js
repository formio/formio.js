'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _eventemitter = require('eventemitter2');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _formio = require('./formio');

var _formio2 = _interopRequireDefault(_formio);

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _Components = require('./components/Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Initialize the available forms.
_formio2.default.forms = {};

var getOptions = function getOptions(options) {
  options = _lodash2.default.defaults(options, {
    submitOnEnter: false,
    i18next: _i18next2.default
  });
  if (!options.events) {
    options.events = new _eventemitter2.default({
      wildcard: false,
      maxListeners: 0
    });
  }
  return options;
};

/**
 * Renders a Form.io form within the webpage.
 *
 * @example
 * import FormioForm from 'formiojs/form';
 * let form = new FormioForm(document.getElementById('formio'));
 * form.src = 'https://examples.form.io/example';
 */

var FormioForm = function (_FormioComponents) {
  _inherits(FormioForm, _FormioComponents);

  /**
   * Creates a new FormioForm instance.
   *
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.readOnly - Set this form to readOnly
   * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
   * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
   * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
   *
   * @example
   * import FormioForm from 'formiojs/form';
   * let form = new FormioForm(document.getElementById('formio'), {
   *   readOnly: true
   * });
   * form.src = 'https://examples.form.io/example';
   *
   */
  function FormioForm(element, options) {
    _classCallCheck(this, FormioForm);

    // Keep track of all available forms globally.
    var _this2 = _possibleConstructorReturn(this, (FormioForm.__proto__ || Object.getPrototypeOf(FormioForm)).call(this, null, getOptions(options)));

    _formio2.default.forms[_this2.id] = _this2;

    /**
     * The i18n configuration for this component.
     */
    var i18n = require('./i18n');
    if (options && options.i18n && !options.i18nReady) {
      // Support legacy way of doing translations.
      if (options.i18n.resources) {
        i18n = options.i18n;
      } else {
        _lodash2.default.each(options.i18n, function (lang, code) {
          if (!i18n.resources[code]) {
            i18n.resources[code] = { translation: lang };
          } else {
            _lodash2.default.assign(i18n.resources[code].translation, lang);
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
    }

    /**
     * The type of this element.
     * @type {string}
     */
    _this2.type = 'form';
    _this2._src = '';
    _this2._loading = false;
    _this2._submission = {};
    _this2._form = null;

    /**
     * Determines if this form should submit the API on submit.
     * @type {boolean}
     */
    _this2.nosubmit = false;

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
     * Promise that executes when the form is ready and rendered.
     * @type {Promise}
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
     * form.ready.then(() => {
     *   console.log('The form is ready!');
     * });
     * form.src = 'https://examples.form.io/example';
     */
    _this2.formReady = new _nativePromiseOnly2.default(function (resolve, reject) {
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
     * let form = new FormioForm(document.getElementById('formio'));
     * form.ready.then(() => {
     *   console.log('The form is ready!');
     * });
     * form.src = 'https://examples.form.io/example';
     */
    _this2.submissionReady = new _nativePromiseOnly2.default(function (resolve, reject) {
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
    _this2.onElement = new _nativePromiseOnly2.default(function (resolve) {
      /**
       * Called when the element has been resolved.
       *
       * @type {function}
       */
      _this2.elementResolve = resolve;
      _this2.setElement(element);
    });

    _this2.shortcuts = [];

    // Set language after everything is established.
    _this2.localize().then(function () {
      _this2.language = _this2.options.language;
    });
    return _this2;
  }

  /**
   * Sets the language for this form.
   *
   * @param lang
   * @return {Promise}
   */


  _createClass(FormioForm, [{
    key: 'addLanguage',


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

      _i18next2.default.addResourceBundle(code, 'translation', lang, true, true);
      if (active) {
        this.language = code;
      }
    }

    /**
     * Perform the localization initialization.
     * @returns {*}
     */

  }, {
    key: 'localize',
    value: function localize() {
      var _this3 = this;

      if (_i18next2.default.initialized) {
        return _nativePromiseOnly2.default.resolve(_i18next2.default);
      }
      _i18next2.default.initialized = true;
      return new _nativePromiseOnly2.default(function (resolve, reject) {
        _i18next2.default.init(_this3.options.i18n, function (err) {
          _this3.options.language = _i18next2.default.language;
          if (err) {
            return reject(err);
          }
          resolve(_i18next2.default);
        });
      });
    }

    /**
     * Sets the the outside wrapper element of the Form.
     *
     * @param {HTMLElement} element - The element to set as the outside wrapper element for this form.
     */

  }, {
    key: 'setElement',
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
    key: 'keyboardCatchableElement',
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
    key: 'executeShortcuts',
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

      _lodash2.default.each(this.shortcuts, function (shortcut) {
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
    key: 'addShortcut',
    value: function addShortcut(element, shortcut) {
      if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
        return;
      }

      shortcut = _lodash2.default.capitalize(shortcut);

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
    key: 'removeShortcut',
    value: function removeShortcut(element, shortcut) {
      if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
        return;
      }

      _lodash2.default.remove(this.shortcuts, {
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
    key: 'loadSubmission',


    /**
     * Loads the submission if applicable.
     */
    value: function loadSubmission() {
      var _this4 = this;

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
    }

    /**
     * Set the src of the form renderer.
     *
     * @param value
     * @param options
     */

  }, {
    key: 'setSrc',
    value: function setSrc(value, options) {
      var _this5 = this;

      if (this.setUrl(value, options)) {
        this.nosubmit = false;
        this.formio.loadForm({ params: { live: 1 } }).then(function (form) {
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
     * let form = new FormioForm(document.getElementById('formio'));
     * form.formReady.then(() => {
     *   console.log('The form is formReady!');
     * });
     * form.src = 'https://examples.form.io/example';
     */

  }, {
    key: 'setUrl',


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
      this.formio = this.options.formio = new _formio2.default(value, options);

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
    key: 'setForm',


    /**
     * Sets the JSON schema for the form to be rendered.
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
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
      }

      // Set the form object.
      this._form = form;
      this.emit('formLoad', form);

      // Create the form.
      return this.createForm(form);
    }

    /**
     * Gets the form object.
     *
     * @returns {Object} - The form JSON schema.
     */

  }, {
    key: 'setSubmission',


    /**
     * Sets a submission and returns the promise when it is ready.
     * @param submission
     * @return {Promise.<TResult>}
     */
    value: function setSubmission(submission) {
      var _this7 = this;

      return this.onSubmission = this.formReady.then(function () {
        // If nothing changed, still trigger an update.
        if (!_this7.setValue(submission)) {
          _this7.triggerChange({
            noValidate: true
          });
        }
        _this7.submissionReadyResolve();
      }, function (err) {
        return _this7.submissionReadyReject(err);
      }).catch(function (err) {
        return _this7.submissionReadyReject(err);
      });
    }
  }, {
    key: 'mergeData',
    value: function mergeData(_this, _that) {
      _lodash2.default.mergeWith(_this, _that, function (thisValue, thatValue) {
        if (Array.isArray(thisValue) && Array.isArray(thatValue) && thisValue.length !== thatValue.length) {
          return thatValue;
        }
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(submission, flags, data) {
      data = data || this.data;
      if (!submission) {
        return _get(FormioForm.prototype.__proto__ || Object.getPrototypeOf(FormioForm.prototype), 'setValue', this).call(this, data, flags);
      }
      submission = submission || { data: {} };
      this.mergeData(data, submission.data);
      this._submission = submission;
      this._submission.data = data;
      return _get(FormioForm.prototype.__proto__ || Object.getPrototypeOf(FormioForm.prototype), 'setValue', this).call(this, data, flags);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (!this._submission.data) {
        this._submission.data = {};
      }
      if (this.viewOnly) {
        return this._submission;
      }
      var submission = _lodash2.default.clone(this._submission);
      submission.data = this.data;
      return submission;
    }

    /**
     * Create a new form.
     *
     * @param {Object} form - The form object that is created.
     * @returns {Promise.<TResult>}
     */

  }, {
    key: 'createForm',
    value: function createForm(form) {
      var _this8 = this;

      /**
       * {@link BaseComponent.component}
       */
      if (this.component) {
        this.component.components = form.components;
      } else {
        this.component = form;
      }
      return this.onFormBuild = this.render().then(function () {
        _this8.formReadyResolve();
        _this8.onFormBuild = null;
        _this8.setValue(_this8.submission);
      }).catch(function (err) {
        console.warn(err);
        _this8.formReadyReject(err);
      });
    }

    /**
     * Render the form within the HTML element.
     * @returns {Promise.<TResult>}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      return this.onElement.then(function () {
        _this9.clear();
        _this9.showElement(false);
        _this9.build();
        _this9.isBuilt = true;
        _this9.onResize();
        _this9.on('resetForm', function () {
          return _this9.reset();
        }, true);
        _this9.on('refreshData', function () {
          return _this9.updateValue();
        });
        setTimeout(function () {
          _this9.onChange();
          _this9.emit('render');
        }, 1);
      });
    }

    /**
     * Sets a new alert to display in the error dialog of the form.
     *
     * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
     * @param {string} message - The message to show in the alert.
     */

  }, {
    key: 'setAlert',
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
        } catch (err) {
          // ingore
        }
      }
      if (message) {
        this.alert = this.ce('div', {
          class: 'alert alert-' + type,
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
    key: 'build',
    value: function build() {
      var _this10 = this;

      this.on('submitButton', function () {
        return _this10.submit();
      }, true);
      this.addComponents();
      this.on('requestUrl', function (args) {
        return _this10.submitUrl(args.url, args.headers);
      }, true);
    }

    /**
     * Show the errors of this form within the alert dialog.
     *
     * @param {Object} error - An optional additional error to display along with the component errors.
     * @returns {*}
     */

  }, {
    key: 'showErrors',
    value: function showErrors(error) {
      this.loading = false;
      var errors = this.errors;
      if (error) {
        if (Array.isArray(error)) {
          errors = errors.concat(error);
        } else {
          errors.push(error);
        }
      }
      if (!errors.length) {
        this.setAlert(false);
        return;
      }
      var message = '<p>' + this.t('error') + '</p><ul>';
      _lodash2.default.each(errors, function (err) {
        if (err) {
          var errorMessage = err.message || err;
          message += '<li><strong>' + errorMessage + '</strong></li>';
        }
      });
      message += '</ul>';
      this.setAlert('danger', message);
      this.emit('error', errors);
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
    key: 'onSubmit',
    value: function onSubmit(submission, saved) {
      this.loading = false;
      this.setPristine(true);
      this.setValue(submission, {
        noValidate: true,
        noCheck: true
      });
      this.setAlert('success', '<p>' + this.t('complete') + '</p>');
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
    key: 'onSubmissionError',
    value: function onSubmissionError(error) {
      if (!error) {
        return;
      }

      // Normalize the error.
      if (typeof error === 'string') {
        error = { message: error };
      }

      if ('details' in error) {
        error = error.details;
      }

      return this.showErrors(error);
    }

    /**
     * Trigger the change event for this form.
     *
     * @param changed
     * @param flags
     */

  }, {
    key: 'onChange',
    value: function onChange(flags, changed) {
      _get(FormioForm.prototype.__proto__ || Object.getPrototypeOf(FormioForm.prototype), 'onChange', this).call(this, flags, true);
      this.mergeData(this._submission, this.submission);
      var value = _lodash2.default.clone(this._submission);
      value.changed = changed;
      value.isValid = this.checkData(value.data, flags);
      this.showElement(true);
      this.loading = false;
      this.emit('change', value);
    }

    /**
     * Resets the submission of a form and restores defaults.
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
     * form.src = 'https://examples.form.io/example';
     * form.submission = {data: {
     *   firstName: 'Joe',
     *   lastName: 'Smith',
     *   email: 'joe@example.com'
     * }};
     *
     * // In two seconds, reset the data in the form.
     * setTimeout(() => form.reset(), 2000);
     */

  }, {
    key: 'reset',
    value: function reset() {
      // Reset the submission data.
      this._submission.data = this.data = {};
      this.setSubmission({ data: {} });
    }

    /**
     * Cancels the submission.
     *
     * @alias reset
     */

  }, {
    key: 'cancel',
    value: function cancel(noconfirm) {
      if (noconfirm || confirm('Are you sure you want to cancel?')) {
        this.reset();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'executeSubmit',
    value: function executeSubmit() {
      var _this11 = this;

      return new _nativePromiseOnly2.default(function (resolve, reject) {
        // Read-only forms should never submit.
        if (_this11.options.readOnly) {
          return resolve(_this11.submission);
        }

        var submission = _this11.submission || {};
        _this11.hook('beforeSubmit', submission, function (err) {
          if (err) {
            _this11.showErrors(err);
            return reject(err.message || err);
          }

          if (submission && submission.data && _this11.checkValidity(submission.data, true)) {
            _this11.loading = true;
            if (_this11.nosubmit || !_this11.formio) {
              return resolve(_this11.onSubmit(submission, false));
            }
            return _this11.formio.saveSubmission(submission).then(function (result) {
              return resolve(_this11.onSubmit(result, true));
            }).catch(function (err) {
              _this11.onSubmissionError(err);
              reject(err);
            });
          } else {
            _this11.showErrors();
            return reject('Invalid Submission');
          }
        });
      });
    }

    /**
     * Submits the form.
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
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
    key: 'submit',
    value: function submit(before) {
      var _this12 = this;

      if (!before) {
        return this.beforeSubmit().then(function () {
          return _this12.executeSubmit();
        });
      } else {
        return this.executeSubmit();
      }
    }
  }, {
    key: 'submitUrl',
    value: function submitUrl(URL, headers) {
      var _this13 = this;

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
            settings.headers[e.header] = e.value;
          }
        });
      }
      if (API_URL && settings) {
        try {
          _formio2.default.makeStaticRequest(API_URL, settings.method, submission, settings.headers).then(function () {
            _this13.emit('requestDone');
            _this13.setAlert('success', '<p> Success </p>');
          });
        } catch (e) {
          this.showErrors(e.statusText + ' ' + e.status);
          this.emit('error', e.statusText + ' ' + e.status);
          console.error(e.statusText + ' ' + e.status);
        }
      } else {
        this.emit('error', 'You should add a URL to this button.');
        this.setAlert('warning', 'You should add a URL to this button.');
        return console.warn('You should add a URL to this button.');
      }
    }
  }, {
    key: 'language',
    set: function set(lang) {
      var _this14 = this;

      return new _nativePromiseOnly2.default(function (resolve, reject) {
        _this14.options.language = lang;
        _i18next2.default.changeLanguage(lang, function (err) {
          if (err) {
            return reject(err);
          }
          _this14.redraw();
          resolve();
        });
      });
    }
  }, {
    key: 'src',
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
    key: 'url',
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
    key: 'ready',
    get: function get() {
      var _this15 = this;

      return this.formReady.then(function () {
        return _this15.submissionReady;
      });
    }

    /**
     * Returns if this form is loading.
     *
     * @returns {boolean} - TRUE means the form is loading, FALSE otherwise.
     */

  }, {
    key: 'loading',
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
        if (this.loader) {
          try {
            if (loading) {
              this.prependTo(this.loader, this.wrapper);
            } else {
              this.removeChildFrom(this.loader, this.wrapper);
            }
          } catch (err) {
            // ingore
          }
        }
      }
    }
  }, {
    key: 'form',
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
    key: 'submission',
    get: function get() {
      return this.getValue();
    }

    /**
     * Sets the submission of a form.
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
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
    key: 'schema',
    get: function get() {
      return this._form;
    }
  }]);

  return FormioForm;
}(_Components.FormioComponents);

// Used to trigger a resize.


exports.default = FormioForm;
_formio2.default.onResize = function (scale) {
  return _lodash2.default.each(_formio2.default.forms, function (instance) {
    return instance.onResize(scale);
  });
};
_formio2.default.triggerResize = _lodash2.default.debounce(_formio2.default.onResize, 200);
if ('addEventListener' in window) {
  window.addEventListener('resize', function () {
    return _formio2.default.triggerResize();
  }, false);
} else if ('attachEvent' in window) {
  window.attachEvent('onresize', function () {
    return _formio2.default.triggerResize();
  });
}

FormioForm.setBaseUrl = _formio2.default.setBaseUrl;
FormioForm.setApiUrl = _formio2.default.setApiUrl;
FormioForm.setAppUrl = _formio2.default.setAppUrl;