"use strict";
import Formio from './formio';
import { FormioFormBuilder } from './formio.form.builder';
import { FormioWizardBuilder } from './formio.wizard.builder';
import { FormioPDFBuilder } from './formio.pdf.builder';

class FormioBuilder {
  constructor(element, form, options) {
    this.instance = null;
    this.element = element;
    this.form = form || {components: []};
    this.options = options;
  }

  newForm(form) {
    this.instance = null;
    if (form.display === 'wizard') {
      this.instance = new FormioWizardBuilder(this.element, this.options);
    }
    else if (form.display === 'pdf') {
      this.instance = new FormioPDFBuilder(this.element, this.options);
    }
    else {
      this.instance = new FormioFormBuilder(this.element, this.options);
    }
    return this.instance;
  }

  loadForm() {
    if (typeof this.form === 'string') {
      return (new Formio(this.form)).loadForm().then((formObj) => {
        this.newForm(formObj);
        this.instance.url = this.form;
        this.instance.nosubmit = false;
        this.instance.loadSubmission();
        this.form = this.instance.form = formObj;
        return this.instance.ready.then(() => this.instance);
      });
    }
    else {
      this.newForm(this.form);
      this.instance.form = this.form;
      return this.instance.ready.then(() => this.instance);
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
  let builder = new FormioBuilder(element, form, options);
  return builder.loadForm();
};

exports.Formio = global.Formio = Formio;
