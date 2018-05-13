'use strict';
import Formio from './Formio';
import WebformBuilder from './WebformBuilder';
import WizardBuilder from './WizardBuilder';
import PDFBuilder from './PDFBuilder';
import Form from './Form';
export default class FormBuilder extends Form {
  /**
   * Creates an easy to use interface for embedding a form builder into your application..
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
   * import Form from 'formiojs/FormBuilder';
   * const builder = new FormBuilder(document.getElementById('formio'), {components:[
   *   {
   *     type: 'textfield',
   *     label: 'First Name',
   *     key: 'firstName',
   *     input: true
   *   }
   * ]});
   * builder.render();
   */
  constructor(element, form, options) {
    super(element, form, options);
  }

  create() {
    if (!this.form.components) {
      this.form.components = [];
    }
    if (this.form.display === 'wizard') {
      return new WizardBuilder(this.element, this.options);
    }
    else if (this.form.display === 'pdf') {
      return new PDFBuilder(this.element, this.options);
    }
    else {
      return new WebformBuilder(this.element, this.options);
    }
  }
}

/**
 * Creates a new form based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio.builder = (element, form, options) => {
  let builder = new FormBuilder(element, form, options);
  return builder.render();
};

Formio.FormBuilder = FormBuilder;
