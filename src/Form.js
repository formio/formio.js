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
   * form.display();
   */
  constructor(source, options) {
    this.instance = null;
    this.form = source;
    this.options = options;
  }

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

  set form(value) {
    console.log('set form');
    if (typeof value === 'string') {
      return this.ready = (new Formio(value)).loadForm().then(form => {
        this.instance = this.create(form.display);
        this.instance.url = value;
        this.instance.nosubmit = false;
        this.instance.loadSubmission();
        this._form = this.instance.form = form;
        return this.instance.ready.then(() => this.instance);
      });
    }
    else {
      this.instance = this.create(value.display);
      this._form = this.instance.form = value;
      return this.ready = this.instance.ready.then(() => this.instance);
    }
  }

  get form() {
    return this._form;
  }

  setDisplay(display) {
    this.form.display = display;
    return this.display();
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
    return (new Form(formElement, embed.src)).display();
  }

  display(element) {
    this.element = element;
    return this.render(this.element).then(() =>
      this.hydrate(this.element).then(() =>
        this.instance
      )
    );
  }

  render() {
    console.log('render');
    this.empty();
    return this.ready.then(instance => instance.render());
  }

  hydrate(element) {
    this.element = element;
    console.log('hydrate');
    return this.ready.then(instance => instance.hydrate(this.element));
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
  return (new Form(element, form, options)).display();
};

Formio.Form = Form;
