import Formio from './Formio';
import WebformBuilder from './WebformBuilder';
import WizardBuilder from './WizardBuilder';
import PDFBuilder from './PDFBuilder';
import Form from './Form';

export default class FormBuilder extends Form {
  constructor(element, form, options) {
    super(element, form, options);
  }

  create(display) {
    if (display === 'wizard') {
      return new WizardBuilder(this.element, this.options);
    }
    else if (display === 'pdf') {
      return new PDFBuilder(this.element, this.options);
    }
    else {
      return new WebformBuilder(this.element, this.options);
    }
  }
}

/**
 * Factory that creates a new form builder based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio.builder = (...args) => {
  const builder = new FormBuilder(...args);
  return builder.ready.then(() => {
    builder.build();
  });
};

Formio.FormBuilder = FormBuilder;
