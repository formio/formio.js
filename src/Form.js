"use strict";
import Formio from './Formio';
import Wizard from './Wizard';
import PDF from './PDF';
import Webform from './Webform';
export default class Form {
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
