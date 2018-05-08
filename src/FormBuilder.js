"use strict";
import Formio from './Formio';
import WebformBuilder from './WebformBuilder';
import WizardBuilder from './WizardBuilder';
import PDFBuilder from './PDFBuilder';
import Form from './Form';
export default class FormBuilder extends Form {
  create() {
    if (this.form.components) {
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
