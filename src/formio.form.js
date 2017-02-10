"use strict";
import Formio from './formio';
import Promise from "native-promise-only";
import FormioComponents from './components/Components';
import _debounce from 'lodash/debounce';
import EventEmitter from 'eventemitter2';
let getOptions = function(options) {
  options = options || {};
  options.events = new EventEmitter({
    wildcard: false,
    maxListeners: 0
  });
  return options;
};
class FormioForm extends FormioComponents {
  constructor(element, options) {
    super(null, getOptions(options));
    this._src = '';
    this._loading = true;
    this.wrapper = element;
    this.formio = null;
    this.loader = null;
    this.onForm = null;
    this.onSubmission = null;
    this.triggerSubmissionChange = _debounce(this.onSubmissionChange.bind(this), 10);
    this.triggerSubmissionError = _debounce(this.onSubmissionError.bind(this), 10);
  }

  get src() {
    return this._src;
  }

  set src(value) {
    if (!value || typeof value !== 'string') {
      return;
    }
    this._src = value;
    this.loading = true;
    this.formio = new Formio(value);
    this.onForm = this.formio.loadForm().then((form) => (this.form = form));
    if (this.formio.submissionId) {
      this.onSubmission = this.formio.loadSubmission().then((submission) => (this.submission = submission));
    }
  }

  on(event, cb) {
    return this.events.on(event, cb);
  }

  get ready() {
    if (!this.onSubmission && !this.onForm) {
      return Promise.resolve();
    }
    return this.onSubmission ? this.onSubmission : this.onForm;
  }

  get loading() {
    return this._loading;
  }

  set loading(loading) {
    this._loading = loading;
    if (!this.loader && loading) {
      this.loader = document.createElement('div');
      this.loader.setAttribute('class', 'loader-wrapper');
      let spinner = document.createElement('div');
      spinner.setAttribute('class', 'loader text-center');
      this.loader.appendChild(spinner);
    }
    if (this.loader) {
      if (loading) {
        this.wrapper.parentNode.insertBefore(this.loader, this.wrapper);
      }
      else {
        this.wrapper.parentNode.removeChild(this.loader);
      }
    }
  }

  setForm(form) {
    // Set this form as a component.
    this.component = form;

    // Render the form.
    return this.render().then(() => {
      return this.ready.then(() => (this.loading = false));
    });
  }

  set form(form) {
    this.setForm(form);
  }

  get submission() {
    return {
      data: this.getValue()
    };
  }

  set submission(submission) {
    this.setValue(submission.data);
  }

  render() {
    this.wrapper.innerHTML = '';
    return this.localize().then(() => {
      this.build();
      this.wrapper.appendChild(this.element);
      this.on('componentChange', (changed) => this.triggerSubmissionChange(changed));
      this.on('componentError', (changed) => this.triggerSubmissionError(changed));
    });
  }

  build() {
    this.element = this.ce('form');
    this.element.setAttribute('class', 'formio-form');
    this.addAnEventListener(this.element, 'submit', (event) => this.submit(event));
    this.addComponents();
    this.checkConditions(this.getValue());
  }

  onSubmit(submission) {
    this.loading = false;
    this.events.emit('submit', submission);
  }

  submit(event) {
    this.loading = true;
    if (event) {
      event.preventDefault();
    }
    if (!this.formio) {
      return this.onSubmit(submission);
    }
    this.formio.saveSubmission(this.submission)
      .then((submission) => this.onSubmit(submission))
      .catch((err) => this.events.emit('error', err));
  }

  onSubmissionChange(changed) {
    let value = this.submission;
    value.changed = changed;
    this.events.emit('change', value);
    this.checkConditions(value.data);
  }

  onSubmissionError(error) {
    this.events.emit('error', error);
  }
}
module.exports = global.FormioForm = FormioForm;
