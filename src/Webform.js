// DO NOT DELETE! THIS WILL BREAK PDF GENERATION.
/* eslint-disable no-unused-vars */
import * as polyfill from './formio.polyfill';
/* eslint-enable no-unused-vars */

import _ from 'lodash';
import EventEmitter from 'eventemitter2';
import i18next from 'i18next';
import Formio from './Formio';
import Promise from 'native-promise-only';
import NestedComponent from './components/NestedComponent';

// Initialize the available forms.
Formio.forms = {};

// Allow people to register components.
Formio.registerComponent = (type, component) => (NestedComponent.customComponents[type] = component);

const getOptions = function(options) {
  options = _.defaults(options, {
    submitOnEnter: false,
    i18next: i18next
  });
  if (!options.events) {
    options.events = new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
  }
  return options;
};

/**
 * Renders a Form.io form within the webpage.
 */
export default class Webform extends NestedComponent {
  /**
   * Creates a new Form instance.
   *
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.readOnly - Set this form to readOnly
   * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
   * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
   * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
   */
  /* eslint-disable max-statements */
  constructor(element, options) {
    super(null, getOptions(options));

    // Keep track of all available forms globally.
    Formio.forms[this.id] = this;

    // Set the base url.
    if (this.options.baseUrl) {
      Formio.setBaseUrl(this.options.baseUrl);
    }

    /**
     * The i18n configuration for this component.
     */
    let i18n = require('./i18n').default;
    if (options && options.i18n && !options.i18nReady) {
      // Support legacy way of doing translations.
      if (options.i18n.resources) {
        i18n = options.i18n;
      }
      else {
        _.each(options.i18n, (lang, code) => {
          if (!i18n.resources[code]) {
            i18n.resources[code] = {translation: lang};
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
      this.options.i18n = options.i18n;
    }
    else {
      this.options.i18n = i18n;
    }

    // Set the language.
    if (this.options.language) {
      this.options.i18n.lng = this.options.language;
    }

    /**
     * The type of this element.
     * @type {string}
     */
    this.type = 'form';
    this._src = '';
    this._loading = false;
    this._submission = {};
    this._form = {};

    /**
     * Determines if this form should submit the API on submit.
     * @type {boolean}
     */
    this.nosubmit = false;

    /**
     * The Formio instance for this form.
     * @type {Formio}
     */
    this.formio = null;

    /**
     * The loader HTML element.
     * @type {HTMLElement}
     */
    this.loader = null;

    /**
     * The alert HTML element
     * @type {HTMLElement}
     */
    this.alert = null;

    /**
     * Promise that is triggered when the submission is done loading.
     * @type {Promise}
     */
    this.onSubmission = null;

    /**
     * Promise that is triggered when the form is done building.
     * @type {Promise}
     */
    this.onFormBuild = null;

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
    this.formReady = new Promise((resolve, reject) => {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      this.formReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      this.formReadyReject = reject;
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
    this.submissionReady = new Promise((resolve, reject) => {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      this.submissionReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      this.submissionReadyReject = reject;
    });

    /**
     * Promise to trigger when the element for this form is established.
     *
     * @type {Promise}
     */
    this.onElement = new Promise((resolve) => {
      /**
       * Called when the element has been resolved.
       *
       * @type {function}
       */
      this.elementResolve = resolve;
      this.setElement(element);
    });

    this.shortcuts = [];

    // Set language after everything is established.
    this.localize().then(() => {
      this.language = this.options.language;
    });
  }
  /* eslint-enable max-statements */

  /**
   * Sets the language for this form.
   *
   * @param lang
   * @return {Promise}
   */
  set language(lang) {
    return new Promise((resolve, reject) => {
      this.options.language = lang;
      i18next.changeLanguage(lang, (err) => {
        if (err) {
          return reject(err);
        }
        this.redraw();
        resolve();
      });
    });
  }

  /**
   * Add a language for translations
   *
   * @param code
   * @param lang
   * @param active
   * @return {*}
   */
  addLanguage(code, lang, active = false) {
    i18next.addResourceBundle(code, 'translation', lang, true, true);
    if (active) {
      this.language = code;
    }
  }

  /**
   * Perform the localization initialization.
   * @returns {*}
   */
  localize() {
    if (i18next.initialized) {
      return Promise.resolve(i18next);
    }
    i18next.initialized = true;
    return new Promise((resolve, reject) => {
      i18next.init(this.options.i18n, (err) => {
        this.options.language = i18next.language;
        if (err) {
          return reject(err);
        }
        resolve(i18next);
      });
    });
  }

  /**
   * Sets the the outside wrapper element of the Form.
   *
   * @param {HTMLElement} element - The element to set as the outside wrapper element for this form.
   */
  setElement(element) {
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
    let classNames = this.element.getAttribute('class');
    classNames += ' formio-form';
    this.addClass(this.wrapper, classNames);
    this.loading = true;
    this.elementResolve(element);
  }

  keyboardCatchableElement(element) {
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
  }

  executeShortcuts(event) {
    const {target} = event;
    if (!this.keyboardCatchableElement(target)) {
      return;
    }

    const ctrl = event.ctrlKey || event.metaKey;
    const keyCode = event.keyCode;
    let char = '';

    if (65 <= keyCode && keyCode <= 90) {
      char = String.fromCharCode(keyCode);
    }
    else if (keyCode === 13) {
      char = 'Enter';
    }
    else if (keyCode === 27) {
      char = 'Esc';
    }

    _.each(this.shortcuts, (shortcut) => {
      if (shortcut.ctrl && !ctrl) {
        return;
      }

      if (shortcut.shortcut === char) {
        shortcut.element.click();
        event.preventDefault();
      }
    });
  }

  addShortcut(element, shortcut) {
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
        shortcut,
        element
      });
    }
    else {
      this.shortcuts.push({
        ctrl: true,
        shortcut,
        element
      });
    }
  }

  removeShortcut(element, shortcut) {
    if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
      return;
    }

    _.remove(this.shortcuts, {
      shortcut,
      element
    });
  }

  /**
   * Get the embed source of the form.
   *
   * @returns {string}
   */
  get src() {
    return this._src;
  }

  /**
   * Loads the submission if applicable.
   */
  loadSubmission() {
    this.loadingSubmission = true;
    if (this.formio.submissionId) {
      this.onSubmission = this.formio.loadSubmission().then(
        (submission) => this.setSubmission(submission),
        (err) => this.submissionReadyReject(err)
      ).catch(
        (err) => this.submissionReadyReject(err)
      );
    }
    else {
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
  setSrc(value, options) {
    if (this.setUrl(value, options)) {
      this.nosubmit = false;
      this.formio.loadForm({params: {live: 1}}).then(
        (form) => {
          const setForm = this.setForm(form);
          this.loadSubmission();
          return setForm;
        }).catch((err) => {
        console.warn(err);
        this.formReadyReject(err);
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
  set src(value) {
    this.setSrc(value);
  }

  /**
   * Get the embed source of the form.
   *
   * @returns {string}
   */
  get url() {
    return this._src;
  }

  /**
   * Sets the url of the form renderer.
   *
   * @param value
   * @param options
   */
  setUrl(value, options) {
    if (
      !value ||
      (typeof value !== 'string') ||
      (value === this._src)
    ) {
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
  }

  /**
   * Set the form source but don't initialize the form and submission from the url.
   *
   * @param {string} value - The value of the form embed url.
   */
  set url(value) {
    this.setUrl(value);
  }

  /**
   * Called when both the form and submission have been loaded.
   *
   * @returns {Promise} - The promise to trigger when both form and submission have loaded.
   */
  get ready() {
    return this.formReady.then(() => {
      return this.loadingSubmission ? this.submissionReady : true;
    });
  }

  /**
   * Returns if this form is loading.
   *
   * @returns {boolean} - TRUE means the form is loading, FALSE otherwise.
   */
  get loading() {
    return this._loading;
  }

  /**
   * Set the loading state for this form, and also show the loader spinner.
   *
   * @param {boolean} loading - If this form should be "loading" or not.
   */
  set loading(loading) {
    if (this._loading !== loading) {
      this._loading = loading;
      if (!this.loader && loading) {
        this.loader = this.ce('div', {
          class: 'loader-wrapper'
        });
        const spinner = this.ce('div', {
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
  }

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
  setForm(form) {
    if (form.display === 'wizard') {
      console.warn('You need to instantiate the FormioWizard class to use this form as a wizard.');
    }

    if (this.onFormBuild) {
      return this.onFormBuild.then(
        () => this.createForm(form),
        (err) => this.formReadyReject(err)
      ).catch(
        (err) => this.formReadyReject(err)
      );
    }

    // Create the form.
    this._form = form;
    return this.createForm(form).then(() => {
      this.emit('formLoad', form);
      return form;
    });
  }

  /**
   * Gets the form object.
   *
   * @returns {Object} - The form JSON schema.
   */
  get form() {
    return this._form;
  }

  /**
   * Sets the form value.
   *
   * @alias setForm
   * @param {Object} form - The form schema object.
   */
  set form(form) {
    this.setForm(form);
  }

  /**
   * Returns the submission object that was set within this form.
   *
   * @returns {Object}
   */
  get submission() {
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
  set submission(submission) {
    this.setSubmission(submission);
  }

  /**
   * Sets a submission and returns the promise when it is ready.
   * @param submission
   * @param flags
   * @return {Promise.<TResult>}
   */
  setSubmission(submission, flags) {
    return this.onSubmission = this.formReady.then(
      () => {
        // If nothing changed, still trigger an update.
        if (!this.setValue(submission, flags)) {
          this.triggerChange({
            noValidate: true
          });
        }
        this.submissionReadyResolve(submission);
      },
      (err) => this.submissionReadyReject(err)
    ).catch(
      (err) => this.submissionReadyReject(err)
    );
  }

  get schema() {
    let schema = this._form;
    schema.components = [];
    this.eachComponent((component) => schema.components.push(component.schema));
    return schema;
  }

  mergeData(_this, _that) {
    _.mergeWith(_this, _that, (thisValue, thatValue) => {
      if (Array.isArray(thisValue) && Array.isArray(thatValue) && thisValue.length !== thatValue.length) {
        return thatValue;
      }
    });
  }

  setValue(submission, flags) {
    if (!submission || !submission.data) {
      submission = {data: {}};
    }
    let changed = super.setValue(submission.data, flags);
    this.mergeData(this.data, submission.data);
    submission.data = this.data;
    this._submission = submission;
    return changed;
  }

  getValue() {
    if (!this._submission.data) {
      this._submission.data = {};
    }
    if (this.viewOnly) {
      return this._submission;
    }
    const submission = this._submission;
    submission.data = this.data;
    return this._submission;
  }

  /**
   * Create a new form.
   *
   * @param {Object} form - The form object that is created.
   * @returns {Promise.<TResult>}
   */
  createForm(form) {
    /**
     * {@link BaseComponent.component}
     */
    if (this.component) {
      this.component.components = form.components;
    }
    else {
      this.component = form;
    }
    return this.onFormBuild = this.render().then(() => {
      this.formReadyResolve();
      this.onFormBuild = null;
      this.setValue(this.submission);
      return form;
    }).catch((err) => {
      console.warn(err);
      this.formReadyReject(err);
    });
  }

  /**
   * Render the form within the HTML element.
   * @returns {Promise.<TResult>}
   */
  render() {
    return this.onElement.then(() => {
      this.clear();
      this.showElement(false);
      this.build();
      this.isBuilt = true;
      this.on('resetForm', () => this.reset(), true);
      this.on('deleteSubmission', () => this.deleteSubmission(), true);
      this.on('refreshData', () => this.updateValue());
      setTimeout(() => {
        this.onChange();
        this.emit('render');
      }, 1);
    });
  }

  /**
   * Sets a new alert to display in the error dialog of the form.
   *
   * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
   * @param {string} message - The message to show in the alert.
   */
  setAlert(type, message) {
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
      }
      catch (err) {
        // ingore
      }
    }
    if (message) {
      this.alert = this.ce('div', {
        class: `alert alert-${type}`,
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
  build() {
    this.on('submitButton', (options) => this.submit(false, options), true);
    this.addComponents();
    this.on('requestUrl', (args) => (this.submitUrl(args.url,args.headers)), true);
  }

  /**
   * Show the errors of this form within the alert dialog.
   *
   * @param {Object} error - An optional additional error to display along with the component errors.
   * @returns {*}
   */
  showErrors(error) {
    this.loading = false;
    let errors = this.errors;
    if (error) {
      if (Array.isArray(error)) {
        errors = errors.concat(error);
      }
      else {
        errors.push(error);
      }
    }
    if (!errors.length) {
      this.setAlert(false);
      return;
    }
    let message = `<p>${this.t('error')}</p><ul>`;
    _.each(errors, (err) => {
      if (err) {
        const errorMessage = err.message || err;
        message += `<li><strong>${errorMessage}</strong></li>`;
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
  onSubmit(submission, saved) {
    this.loading = false;
    this.setPristine(true);
    this.setValue(submission, {
      noValidate: true,
      noCheck: true
    });
    this.setAlert('success', `<p>${this.t('complete')}</p>`);
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
  onSubmissionError(error) {
    if (error) {
      // Normalize the error.
      if (typeof error === 'string') {
        error = {message: error};
      }

      if ('details' in error) {
        error = error.details;
      }
    }

    return this.showErrors(error);
  }

  /**
   * Trigger the change event for this form.
   *
   * @param changed
   * @param flags
   */
  onChange(flags, changed) {
    super.onChange(flags, true);
    const value = _.clone(this._submission);
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
   * import Webform from 'formiojs/Webform';
   * let form = new Webform(document.getElementById('formio'));
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
  reset() {
    // Reset the submission data.
    this._submission.data = this.data = {};
    this.setSubmission({data: {}});
  }

  /**
   * Send a delete request to the server.
   */
  deleteSubmission() {
    return this.formio.deleteSubmission()
      .then(() => {
        this.emit('submissionDeleted', this.submission);
        this.reset();
      });
  }

  /**
   * Cancels the submission.
   *
   * @alias reset
   */
  cancel(noconfirm) {
    if (noconfirm || confirm('Are you sure you want to cancel?')) {
      this.reset();
      return true;
    }
    else {
      return false;
    }
  }

  submitForm(options = {}) {
    return new Promise((resolve, reject) => {
      // Read-only forms should never submit.
      if (this.options.readOnly) {
        return resolve({
          submission: this.submission,
          saved: false
        });
      }

      const submission = this.submission || {};
      submission.state = options.state || 'submitted';
      const isDraft = (submission.state === 'draft');
      this.hook('beforeSubmit', submission, (err) => {
        if (err) {
          return reject(err);
        }

        if (!isDraft && !submission.data) {
          return reject('Invalid Submission');
        }

        if (!isDraft && !this.checkValidity(submission.data, true)) {
          return reject();
        }

        this.loading = true;
        if (this.nosubmit || !this.formio) {
          return resolve({
            submission: submission,
            saved: false
          });
        }
        this.formio.saveSubmission(submission).then(result => resolve({
          submission: result,
          saved: true
        })).catch(reject);
      });
    });
  }

  executeSubmit(options) {
    return this.submitForm(options)
      .then(result => this.onSubmit(result.submission, result.saved))
      .catch(err => Promise.reject(this.onSubmissionError(err)));
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
  submit(before, options) {
    if (!before) {
      return this.beforeSubmit(options).then(() => this.executeSubmit(options));
    }
    else {
      return this.executeSubmit(options);
    }
  }

  submitUrl(URL,headers) {
    if (!URL) {
      return console.warn('Missing URL argument');
    }

    const submission = this.submission || {};
    const API_URL  = URL;
    const settings = {
      method: 'POST',
      headers: {}
    };

    if (headers && headers.length > 0) {
      headers.map((e) => {
        if (e.header !== '' && e.value !== '') {
          settings.headers[e.header] = e.value;
        }
      });
    }
    if (API_URL && settings) {
      try {
        Formio.makeStaticRequest(API_URL,settings.method,submission,settings.headers).then(() => {
          this.emit('requestDone');
          this.setAlert('success', '<p> Success </p>');
        });
      }
      catch (e) {
        this.showErrors(`${e.statusText} ${e.status}`);
        this.emit('error',`${e.statusText} ${e.status}`);
        console.error(`${e.statusText} ${e.status}`);
      }
    }
    else {
      this.emit('error', 'You should add a URL to this button.');
      this.setAlert('warning', 'You should add a URL to this button.');
      return console.warn('You should add a URL to this button.');
    }
  }
}

Webform.setBaseUrl = Formio.setBaseUrl;
Webform.setApiUrl = Formio.setApiUrl;
Webform.setAppUrl = Formio.setAppUrl;
