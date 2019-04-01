import Formio from './Formio';
import Wizard from './Wizard';
import PDF from './PDF';
import Webform from './Webform';
import templates from './templates';
import { sanitize } from 'dompurify';

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
      this.options = args[2];
      this.setForm(args[1])
        .then(() => {
          this.build()
            .then(() => this.readyResolve(this.instance))
            .catch(this.readyReject);
        })
        .catch(this.readyReject);
    }
    else if (args[0]) {
      this.element = null;
      this.options = args[1];
      this.setForm(args[0])
        .then(() => this.readyResolve(this.instance))
        .catch(this.readyReject);
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
    if (this.options && this.options.flatten) {
      display = 'form';
    }
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
    return this.setForm(formParam);
  }

  setForm(formParam) {
    formParam = formParam || this.form;
    let element;
    if (this.instance) {
      element = this.instance.webform.element;
      this.instance.destroy();
    }
    if (typeof formParam === 'string') {
      return (new Formio(formParam)).loadForm().then((form) => {
        this.instance = this.create(form.display);
        this.instance.webform.element = element;
        this.instance.url = formParam;
        this.instance.nosubmit = false;
        this._form = this.instance.form = form;
        return this.instance.ready.then(() => {
          return this.instance.loadSubmission();
        });
      });
    }
    else {
      this.instance = this.create(formParam.display);
      this.instance.webform.element = element;
      this._form = this.instance.form = formParam;
      return this.instance.ready;
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
    return new Promise((resolve, reject) => {
      if (!embed || !embed.src) {
        resolve();
      }
      const id = this.id || `formio-${Math.random().toString(36).substring(7)}`;
      const className = embed.class || 'formio-form-wrapper';
      let code = embed.styles ? `<link rel="stylesheet" href="${embed.styles}">` : '';
      code += `<div id="${id}" class="${className}"></div>`;
      document.write(code);
      let attempts = 0;
      const wait = setInterval(() => {
        attempts++;
        const formElement = document.getElementById(id);
        if (formElement || attempts > 10) {
          resolve(new Form(formElement, embed.src).ready);
          clearInterval(wait);
        }
      }, 10);
    });
  }

  /**
   * Sanitize an html string.
   *
   * @param string
   * @returns {*}
   */
  sanitize(dirty) {
    return sanitize(dirty, {
      ADD_ATTR: ['ref'],
      USE_PROFILES: {
        html: true
      }
    });
  }

  setContent(element, content) {
    if (element instanceof HTMLElement) {
      element.innerHTML = this.sanitize(content);
      return true;
    }
    return false;
  }

  /**
   * Build a new form.
   *
   * @return {Promise<T>}
   */
  build() {
    if (!this.instance) {
      return Promise.reject('Form not ready. Use form.ready promise');
    }

    if (!this.element) {
      return Promise.reject('No DOM element for form.');
    }

    // Add temporary loader.
    const template = (this.options && this.options.template) ? this.options.template : 'bootstrap';
    const loader = templates[template].loader || templates.bootstrap.loader;
    this.setContent(this.element, loader.form);

    return this.render().then(html => {
      this.setContent(this.element, html);
      return this.attach(this.element).then(() => this.instance);
    });
  }

  render() {
    if (!this.instance) {
      return Promise.reject('Form not ready. Use form.ready promise');
    }
    return Promise.resolve(this.instance.render());
  }

  attach(element) {
    if (!this.instance) {
      return Promise.reject('Form not ready. Use form.ready promise');
    }
    this.element = element;
    return this.instance.attach(this.element);
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
  return (new Form(...args).ready);
};

Formio.Form = Form;
