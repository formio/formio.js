"use strict";
import Promise from "native-promise-only";
import Formio from './formio';
import { FormioComponents } from './components/Components';
import _each from 'lodash/each';
import _clone from 'lodash/clone';
import _assign from 'lodash/assign';
import EventEmitter from 'eventemitter2';

// Initialize the available forms.
Formio.forms = {};

/**
 * Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 *
 * This is needed for PhantomJS.
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP    = function() {},
      fBound  = function() {
        return fToBind.apply(this instanceof fNOP
            ? this
            : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}

let getOptions = function(options) {
  options = options || {};
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
 *
 * @example
 * import FormioForm from 'formiojs/form';
 * let form = new FormioForm(document.getElementById('formio'));
 * form.src = 'https://examples.form.io/example';
 */
export class FormioForm extends FormioComponents {
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
  constructor(element, options) {
    super(null, getOptions(options));

    // Keep track of all available forms globally.
    Formio.forms[this.id] = this;

    /**
     * The type of this element.
     * @type {string}
     */
    this.type = 'form';
    this._src = '';
    this._loading = false;
    this._submission = {};
    this._form = null;

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
     * let form = new FormioForm(document.getElementById('formio'));
     * form.ready.then(() => {
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
     * let form = new FormioForm(document.getElementById('formio'));
     * form.ready.then(() => {
     *   console.log('The form is ready!');
     * });
     * form.src = 'https://examples.form.io/example';
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

    this.element = element;
    var classNames = this.element.getAttribute('class');
    classNames += ' formio-form';
    this.addClass(this.element, classNames);
    this.loading = true;
    this.ready.then(
      () => (this.loading = false),
      () => (this.loading = false)
    ).catch(
      () => (this.loading = false)
    );
    this.elementResolve(element);
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
    if (this.formio.submissionId) {
      this.onSubmission = this.formio.loadSubmission().then(
        (submission) => this.setSubmission(submission),
        (err) => this.submissionReadyReject(err)
      ).catch(
        (err) => this.submissionReadyReject(err)
      );
    }
  }

  /**
   * Set the src of the form renderer.
   *
   * @param value
   * @param options
   */
  setSrc(value, options) {
    this.setUrl(value, options);
    this.nosubmit = false;
    this.formio.loadForm().then(
      (form) => {
        var setForm = this.setForm(form);
        this.loadSubmission();
        return setForm;
      },
      (err) => this.formReadyReject(err)
    ).catch(
      (err) => this.formReadyReject(err)
    );
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
    if (!value || typeof value !== 'string') {
      return;
    }
    this._src = value;
    this.nosubmit = true;
    this.formio = this.options.formio = new Formio(value, options);

    if (this.type === 'form') {
      // Set the options source so this can be passed to other components.
      this.options.src = value;
    }
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
    return this.formReady.then(() => this.submissionReady);
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
        let spinner = this.ce('div', {
          class: 'loader text-center'
        });
        this.loader.appendChild(spinner);
      }
      if (this.loader) {
        try {
          if (loading) {
            this.prepend(this.loader);
          }
          else {
            this.removeChild(this.loader);
          }
        }
        catch (err) {}
      }
    }
  }

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
  set submission(submission) {
    this.setSubmission(submission);
  }

  /**
   * Sets a submission and returns the promise when it is ready.
   * @param submission
   * @return {Promise.<TResult>}
   */
  setSubmission(submission) {
    return this.onSubmission = this.formReady.then(
      () => {
        // Don't do updates as values are set.
        this.setValue(submission, {
          noUpdate: true
        });
        // Once all values are set, trigger change.
        this.submissionReady.then(() => {
          this.triggerChange();
        });
        this.submissionReadyResolve();
      },
      (err) => this.submissionReadyReject(err)
    ).catch(
      (err) => this.submissionReadyReject(err)
    );
  }

  setValue(submission, flags) {
    this._submission = submission || {data: {}};
    return super.setValue(this._submission.data, flags);
  }

  getValue() {
    if (!this._submission.data) {
      this._submission.data = {};
    }
    this._submission.data = _assign(this.data, super.getValue());
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
      this.setSubmission(this._submission);
    },
      (err) => this.formReadyReject(err)
    ).catch(
      (err) => this.formReadyReject(err)
    );
  }

  /**
   * Render the form within the HTML element.
   * @returns {Promise.<TResult>}
   */
  render() {
    return this.onElement.then(() => {
      this.clear();
      return this.localize().then(() => {
        this.build();
        this.on('resetForm', () => this.reset(), true);
        this.on('componentChange', (changed) => this.onSubmissionChange(changed), true);
        this.on('refreshData', () => this.updateValue());
        this.emit('render');
      });
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
      catch(err) {}
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
  build() {
    this.on('submitButton', () => this.submit(), true);
    this.addComponents();
    this.checkConditions(this.getValue());
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
      errors.push(error);
    }
    if (!errors.length) {
      this.setAlert(false);
      return;
    }
    let message = '<p>' + this.t('error') + '</p><ul>';
    _each(errors, (err) => {
      if (err) {
        let errorMessage = err.message || err;
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
  onSubmit(submission, saved) {
    this.loading = false;
    this.setValue(submission);
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
  onSubmissionError(error) {
    if (!error) {
      return;
    }

    // Normalize the error.
    if (typeof error === 'string') {
      error = {message: error};
    }

    this.showErrors(error);
  }

  /**
   * Called when the submission has changed in value.
   *
   * @param {Object} changed - The changed value that triggered this event.
   * @param {Object} changed.component - The component that was changed.
   * @param {*} changed.value - The new value of the changed component.
   * @param {boolean} changed.flags - The flags to apply to this update.
   */
  onSubmissionChange(changed) {
    this._submission = this.submission;
    let value = _clone(this._submission);
    value.changed = changed;
    this.checkData(value.data, changed.flags);
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
  reset() {
    // Reset the submission data.
    this.data = this.value = {};
    this.setSubmission({data: {}});
  }

  /**
   * Cancels the submission.
   *
   * @alias reset
   */
  cancel() {
    this.reset();
  }

  executeSubmit() {
    let submission = this.submission;
    if (
      submission &&
      submission.data &&
      this.checkValidity(submission.data, true)
    ) {
      this.loading = true;
      if (this.nosubmit || !this.formio) {
        return this.onSubmit(submission, false);
      }
      return this.formio.saveSubmission(submission)
        .then(
          (result) => this.onSubmit(result, true),
          (err) => this.onSubmissionError(err)
        )
        .catch(
          (err) => this.onSubmissionError(err)
        );
    }
    else {
      this.showErrors();
      return Promise.reject('Invalid Submission');
    }
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
  submit(before) {
    if (!before) {
      return this.beforeSubmit().then(() => this.executeSubmit());
    }
    else {
      return this.executeSubmit();
    }
  }
}

FormioForm.setBaseUrl = Formio.setBaseUrl;
FormioForm.setApiUrl = Formio.setApiUrl;
FormioForm.setAppUrl = Formio.setAppUrl;
module.exports = global.FormioForm = FormioForm;
