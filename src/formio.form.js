"use strict";
let Formio = require('./formio');
let FormioComponents = require('./components/Components');
let EventEmitter = require('eventemitter2').EventEmitter2;
class FormioForm extends FormioComponents {
  constructor(element) {
    super(null, new EventEmitter({
      wildcard: false,
      maxListeners: 0
    }));

    this._wrapper = element;
    this._src = '';
    this._form = null;
    this._formio = null;
    this._loader = null;
    this._loading = true;
    this._onForm = null;
    this._onSubmission = null;
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
    this._formio = new Formio(value);
    this._onForm = this._formio.loadForm().then((form) => (this.form = form));
    if (this._formio.submissionId) {
      this._onSubmission = this._formio.loadSubmission().then((submission) => (this.submission = submission));
    }
  }

  on(event, cb) {
    return this._events.on(event, cb);
  }

  get ready() {
    return this._onSubmission ? this._onSubmission : this._onForm;
  }

  get loading() {
    return this._loading;
  }

  set loading(loading) {
    this._loading = loading;
    if (!this._loader && loading) {
      this._loader = document.createElement('div');
      this._loader.setAttribute('class', 'loader-wrapper');
      let spinner = document.createElement('div');
      spinner.setAttribute('class', 'loader text-center');
      this._loader.append(spinner);
    }
    if (this._loader) {
      if (loading) {
        this._wrapper.parentNode.insertBefore(this._loader, this._wrapper);
      }
      else {
        this._wrapper.parentNode.removeChild(this._loader);
      }
    }
  }

  set form(form) {
    // Set this form as a component.
    this._component = form;

    // Render the form.
    this.render();

    // Set the loading flag when we are ready.
    this.ready.then(() => (this.loading = false));
  }

  get value() {
    return {
      data: this.getValue()
    };
  }

  set value(submission) {
    this.setValue(submission.data);
  }

  render() {
    this._wrapper.innerHTML = '';
    this.build();
    this._wrapper.append(this._element);
    this.on('componentChange', (changed) => this.onComponentChange(changed));
  }

  build() {
    this._element = this.ce('form');
    this._element.setAttribute('method', 'POST');
    if (this._formio) {
      this._element.setAttribute('action', this._formio.formUrl + '/submission');
    }
    this.addComponents();
    this.checkConditions(this.getValue());
    this._form = Formio.form(this._element, (err, sub) => this.onSubmit(err, sub));
  }

  onSubmit(err, submission) {
    if (err) {
      return this._events.emit('error', err);
    }
    this._events.emit('submit', submission);
  }

  submit() {
    if (this._form) {
      this._form.submit();
    }
  }

  onComponentChange(changed) {
    let value = this.value;
    value.changed = changed;
    this._events.emit('change', value);
    this.checkConditions(value.data);
  }
}
module.exports = FormioForm;
