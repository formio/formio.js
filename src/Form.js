import Formio from './Formio';
import Wizard from './Wizard';
import PDF from './PDF';
import Webform from './Webform';
import templates from './templates';

export default class Form {
  /**
   * Creates an easy to use interface for embedding webforms, pdfs, and wizards into your application.
   *
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {Object | string} form - Either a Form JSON schema or the URL of a hosted form via. form.io.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.readOnly - Set this form to readOnly
   * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
   * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
   * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
   *
   * @example
   * import Form from 'formiojs/Form';
   * const form = new Form(document.getElementById('formio'), 'https://examples.form.io/example');
   * form.build();
   */
  constructor(...args) {
    this.ready = new Promise((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });

    this.instance = null;
    if (args[0] instanceof HTMLElement) {
      this.element = args[0];
      this.form = args[1];
      this.options = args[2];
      this.build();
    }
    else if (args[0]) {
      this.element = null;
      this.form = args[0];
      this.options = args[1];
    }
    else {
      this.element = null;
      this.options = null;
    }
  }

  /**
   * Create a new form instance provided the display of the form.
   *
   * @param {string} display - The display of the form, either "wizard", "form", or "pdf"
   * @return {*}
   */
  create(display) {
    switch (display) {
      case 'wizard':
        return new Wizard(this.options);
      case 'pdf':
        return new PDF(this.options);
      default:
        return new Webform(this.options);
    }
  }

  /**
   * Sets the form. Either as JSON or a URL to a form JSON schema.
   *
   * @param {string|object} formParam - Either the form JSON or the URL of the form json.
   * @return {*}
   */
  set form(formParam) {
    formParam = formParam || this.form;
    if (typeof formParam === 'string') {
      return (new Formio(formParam)).loadForm().then(form => {
        this.instance = this.create(form.display);
        this.instance.url = formParam;
        this.instance.nosubmit = false;
        this.instance.loadSubmission();
        this._form = this.instance.form = form;
        return this.instance.ready.then(() => {
          this.readyResolve(this.instance);
          return this.ready;
        });
      });
    }
    else {
      if (this.instance) {
        this.instance.destroy();
      }
      this.instance = this.create(formParam.display);
      this._form = this.instance.form = formParam;
      return this.instance.ready.then(() => {
        this.readyResolve(this.instance);
        return this.ready;
      });
    }
  }

  /**
   * Returns the loaded forms JSON.
   *
   * @return {object} - The loaded form's JSON
   */
  get form() {
    return this._form;
  }

  /**
   * Changes the display of the form.
   *
   * @param {string} display - The display to set this form. Either "wizard", "form", or "pdf"
   * @return {Promise<T>}
   */
  setDisplay(display) {
    this.form.display = display;
    return this.build();
  }

  empty() {
    if (this.element) {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  }

  static embed(embed) {
    if (!embed || !embed.src) {
      return null;
    }
    const id = this.id || `formio-${Math.random().toString(36).substring(7)}`;
    const className = embed.class || 'formio-form-wrapper';
    let code = embed.styles ? `<link rel="stylesheet" href="${embed.styles}">` : '';
    code += `<div id="${id}" class="${className}"></div>`;
    document.write(code);
    const formElement = document.getElementById(id);
    return (new Form(formElement, embed.src)).build();
  }

  /**
   * Build a new form.
   *
   * @return {Promise<T>}
   */
  build() {
    if (!this.element) {
      return Promise.reject('No DOM element for form.');
    }

    // Add temporary loader.
    const template = (this.options && this.options.template) ? this.options.template : 'bootstrap';
    const loader = templates[template].loader || templates.bootstrap.loader;
    this.element.innerHTML = loader.form;

    return this.ready.then(() => {
      return this.render().then(html => {
        this.element.innerHTML = html;
        return this.attach(this.element).then(() => this.instance);
      });
    });
  }

  render() {
    return this.ready.then(instance => instance.render());
  }

  attach(element) {
    this.element = element;
    return this.ready.then(instance => instance.attach(this.element));
  }
}

// Allow simple embedding.
Formio.embedForm = (embed) => Form.embed(embed);

/**
 * Factory that creates a new form based on the form parameters.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio.createForm = (...args) => {
  return (new Form(...args)).build();
};

Formio.Form = Form;
