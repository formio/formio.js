"use strict";
import { Formio } from './formio';
import Promise from "native-promise-only";
import FormioComponents from './components/Components';
import _debounce from 'lodash/debounce';
import _each from 'lodash/each';
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

    // Allow the element to either be a form, or a wrapper.
    if (element && element.nodeName.toLowerCase() === 'form') {
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

    this.type = 'form';
    this._src = '';
    this._loading = true;
    this.formio = null;
    this.loader = null;
    this.alert = null;
    this.onFormLoad = null;
    this.onSubmissionLoad = null;

    // Promise that executes when the form is rendered and ready.
    this.ready = new Promise((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });

    // Trigger submission changes and errors debounced.
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
    // Set this form as a component.
    this.component = form;
    this.loading = true;
    return this.render().then(() => {
      return this.onLoaded.then(() => {
        this.loading = false;
        this.readyResolve();
      }, (err) => this.readyReject(err));
    }, (err) => this.readyReject(err));
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
    this.ready.then(() => this.setValue(submission.data));
  }

  render() {
    this.clear();
    return this.localize().then(() => {
      this.build();
      this.on('resetForm', () => this.reset());
      this.on('componentChange', (changed) => this.triggerSubmissionChange(changed));
      this.on('componentError', (changed) => this.triggerSubmissionError(changed));
    });
  }

  setAlert(type, message) {
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
    this.addEventListener(this.element, 'submit', (event) => this.submit(event));
    this.addComponents();
    this.checkConditions(this.getValue());
  }

  showErrors() {
    let errors = this.errors;
    if (!errors.length) {
      this.setAlert(false);
      return;
    }
    let message = '<p>' + this.t('error') + '</p><ul>';
    _each(errors, (err) => {
      if (err) {
        message += '<li><strong>' + err + '</strong></li>';
      }
    });
    message += '</ul>';
    this.setAlert('danger', message);
    return errors;
  }

  onSubmit(submission) {
    this.loading = false;
    this.setAlert('success', '<p>' + this.t('complete') + '</p>');
    this.events.emit('submit', submission);
  }

  onSubmissionError(error) {
    this.loading = false;
    this.showErrors();
    this.events.emit('error', error);
  }

  onSubmissionChange(changed) {
    let value = this.submission;
    let errors = this.errors;
    if (!errors.length) {
      this.setAlert(false);
    }
    value.changed = changed;
    this.events.emit('change', value);
    this.checkConditions(value.data);
  }

  reset() {
    // Reset the submission data.
    this.submission = {data: {}};
  }

  submit(event) {
    this.loading = true;
    if (event) {
      event.preventDefault();
    }
    if (!this.formio) {
      return this.onSubmit(this.submission);
    }
    this.formio.saveSubmission(this.submission)
      .then((submission) => this.onSubmit(submission))
      .catch((err) => this.onSubmissionError(err));
  }
}

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
