'use strict';
import Formio from './Formio';
import Wizard from './Wizard';
import PDF from './PDF';
import Webform from './Webform';
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
   * form.render();
   */
  constructor(element, form, options) {
    this.instance = null;
    this.element = element;
    this.form = form;
    this.options = options;
  }

  create() {
    if (this.form.display === 'wizard') {
      return new Wizard(this.element, this.options);
    }
    else if (this.form.display === 'pdf') {
      return new PDF(this.element, this.options);
    }
    else {
      return new Webform(this.element, this.options);
    }
  }

  setForm(formParam) {
    formParam = formParam || this.form;
    this.element.innerHTML = '';
    if (typeof formParam === 'string') {
      return (new Formio(formParam)).loadForm().then(form => {
        this.form = form;
        this.instance = this.create();
        this.instance.url = formParam;
        this.instance.nosubmit = false;
        this.instance.loadSubmission();
        this.form = this.instance.form = form;
        return this.instance.ready.then(() => this.instance);
      });
    }
    else {
      this.form = formParam;
      this.instance = this.create();
      this.instance.form = this.form;
      return this.instance.ready.then(() => this.instance);
    }
  }

  setDisplay(display) {
    this.form.display = display;
    return this.render();
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
    return (new Form(formElement, embed.src)).render();
  }

  render(form) {
    return this.setForm(form);
  }
}

// Allow simple embedding.
Formio.embedForm = (embed) => Form.embed(embed);

/**
 * Creates a new form based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio.createForm = (element, form, options) => {
  return (new Form(element, form, options)).render();
};

Formio.Form = Form;
