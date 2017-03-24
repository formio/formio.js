"use strict";
import Promise from "native-promise-only";
import Formio from './formio';
import { FormioComponents } from './components/Components';
import _debounce from 'lodash/debounce';
import _each from 'lodash/each';
import _find from 'lodash/find';
import _remove from 'lodash/remove';
import _get from 'lodash/get';
import EventEmitter from 'eventemitter2';
let getOptions = function(options) {
  options = options || {};
  options.events = new EventEmitter({
    wildcard: false,
    maxListeners: 0
  });
  return options;
};
export class FormioForm extends FormioComponents {
  constructor(element, options) {
    super(null, getOptions(options));
    this.type = 'form';
    this._src = '';
    this._loading = true;
    this._submission = {};
    this.formio = null;
    this.loader = null;
    this.alert = null;
    this.onFormLoad = null;
    this.onSubmissionLoad = null;
    this.onFormBuild = null;
    this.allErrors = [];

    // Promise that executes when the form is rendered and ready.
    this.ready = new Promise((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });

    // Trigger submission changes and errors debounced.
    this.triggerSubmissionChange = _debounce(this.onSubmissionChange.bind(this), 10);
    this.triggerSubmissionError = _debounce(this.onSubmissionError.bind(this), 10);

    // Set the element (if it is ready).
    this.onElement = new Promise((resolve) => {
      this.elementResolve = resolve;
      this.setElement(element);
    });
  }

  setElement(element) {
    if (!element) {
      return;
    }

    // Allow the element to either be a form, or a wrapper.
    if (element.nodeName.toLowerCase() === 'form') {
      this.element = element;
      var classNames = this.element.getAttribute('class');
      classNames += ' formio-form';
      this.element.setAttribute('class', classNames);
    }
    else {
      this.wrapper = element;
      this.element = this.ce('element', 'form', {
        class: 'formio-form'
      });
      if (this.wrapper) {
        this.wrapper.appendChild(this.element);
      }
    }

    this.elementResolve(element);
  }

  get src() {
    return this._src;
  }

  set src(value) {
    if (!value || typeof value !== 'string') {
      return;
    }
    this._src = value;
    this.formio = new Formio(value);
    this.onFormLoad = this.formio.loadForm().then((form) => (this.form = form));
    if (this.formio.submissionId) {
      this.onSubmissionLoad = this.formio.loadSubmission().then((submission) => (this.submission = submission));
    }
  }

  get onLoaded() {
    if (!this.onSubmissionLoad && !this.onFormLoad) {
      return Promise.resolve();
    }
    return this.onSubmissionLoad ? this.onSubmissionLoad : this.onFormLoad;
  }

  get loading() {
    return this._loading;
  }

  set loading(loading) {
    this._loading = loading;
    if (!this.loader && loading) {
      this.loader = this.ce('loaderWrapper', 'div', {
        class: 'loader-wrapper'
      });
      let spinner = this.ce('loader', 'div', {
        class: 'loader text-center'
      });
      this.loader.appendChild(spinner);
    }
    if (this.loader) {
      try {
        if (loading) {
          this.before(this.loader);
        }
        else {
          this.remove(this.loader);
        }
      }
      catch (err) {}
    }
  }

  setForm(form) {
    if (form.display === 'wizard') {
      console.warn('You need to instantiate the FormioWizard class to use this form as a wizard.');
    }

    if (this.onFormBuild) {
      return this.onFormBuild.then(() => this.createForm(form));
    }

    // Create the form.
    return this.createForm(form);
  }

  cancel() {
    this.submission = {data: {}};
  }

  set form(form) {
    this.setForm(form);
  }

  get submission() {
    this._submission.data = this.getValue();
    return this._submission;
  }

  set submission(submission) {
    submission = submission || {};
    this._submission = submission;
    this.value = submission.data;
    this.ready.then(() => this.setValue(this.value));
  }

  createForm(form) {
    this.component = form;
    this.loading = true;
    return this.onFormBuild = this.render().then(() => {
      return this.onLoaded.then(() => {
        this.loading = false;
        this.readyResolve();
        this.setValue(this.value);
        this.onFormBuild = null;
      }, (err) => this.readyReject(err));
    }, (err) => this.readyReject(err));
  }

  render() {
    return this.onElement.then(() => {
      this.clear();
      return this.localize().then(() => {
        this.build();
        this.on('resetForm', () => this.reset(), true);
        this.on('componentChange', (changed) => this.triggerSubmissionChange(changed), true);
        this.on('componentError', (error) => this.triggerSubmissionError(error), true);
        this.emit('render');
      });
    });
  }

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
      this.alert = this.ce('alert-' + type, 'div', {
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

  build() {
    this.on('submitButton', () => this.submit(), true);
    this.addComponents();
    this.checkConditions(this.getValue());
  }

  showErrors() {
    this.loading = false;
    if (!this.allErrors.length) {
      this.setAlert(false);
      return;
    }
    let message = '<p>' + this.t('error') + '</p><ul>';
    _each(this.allErrors, (err) => {
      if (err) {
        message += '<li><strong>' + err.message + '</strong></li>';
      }
    });
    message += '</ul>';
    this.setAlert('danger', message);
    this.emit('error', this.allErrors);
    return this.allErrors;
  }

  onSubmit(submission, saved) {
    this.loading = false;
    this.setAlert('success', '<p>' + this.t('complete') + '</p>');
    submission.saved = !!saved;
    this.emit('submit', submission);
  }

  onSubmissionError(error) {
    if (!error) {
      return;
    }

    // Normalize the error.
    if (typeof error === 'string') {
      error = {message: error};
    }

    // Get the component this error is for.
    let component = _get(error, 'component.key');
    let predicate = (err) => (_get(err, 'component.key') === component);
    let existing = _find(this.allErrors, predicate);

    // Need to remove the error if it exists and the message is empty.
    if (!error.message && existing) {

      // Remove the error.
      _remove(this.allErrors, predicate);
    }
    else if (error.message && (!component || !existing)) {

      // Add it to the errors array.
      this.allErrors.push(error);
    }
  }

  onSubmissionChange(changed) {
    let value = this.submission;
    value.changed = changed;
    this.emit('change', value);
    this.checkConditions(value.data);
  }

  reset() {
    // Reset the submission data.
    this.submission = {data: {}};
  }

  submit() {
    // Validate the form builed, before submission
    if (this.checkValidity()) {
      this.loading = true;
      if (!this.formio) {
        return this.onSubmit(this.submission);
      }
      this.formio.saveSubmission(this.submission)
        .then((submission) => this.onSubmit(submission, true))
        .catch((err) => {
          this.onSubmissionError(err);
          this.showErrors();
        });
    }
    else {
      this.showErrors();
    }
  }
}

FormioForm.setBaseUrl = Formio.setBaseUrl;
FormioForm.setApiUrl = Formio.setApiUrl;
FormioForm.setAppUrl = Formio.setAppUrl;

/**
 * Embed this form within the current page.
 * @param embed
 */
FormioForm.embed = function(embed) {
  if (!embed || !embed.src) {
    return null;
  }
  let id = embed.id || 'formio-' + Math.random().toString(36).substring(7);
  let height = embed.height || 500;
  let className = embed.class || 'formio-form-wrapper';
  let code = embed.styles ? '<link rel="stylesheet" href="' + embed.styles + '">' : '';
  code += '<div id="' + id + '" class="' + className + '" style="height:' + height + 'px;"></div>';
  document.write(code);
  let formElement = document.getElementById(id);
  let form = new FormioForm(formElement);
  form.src = embed.src;
  return form;
};

module.exports = global.FormioForm = FormioForm;
