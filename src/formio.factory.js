"use strict";
import Promise from "native-promise-only";
import FormioWizard from './formio.wizard';
import FormioForm from './formio.form';
import Formio from './formio';
export const FormioFactory = {

  /**
   * Factory to create a new form based on the form json.
   *
   * @param element {HMTLElement} - The HTML Element to add this form to.
   * @param form {Object} - The form json schema.
   * @param options {Object} - The options to create this form.
   * @return {*}
   */
  factory: (element, form, options) => {
    let instance = null;
    if (form.display === 'wizard') {
      instance = new FormioWizard(element, options);
    }
    else {
      instance = new FormioForm(element, options);
    }
    instance.form = form;
    return instance;
  },

  /**
   * Creates a new form based on the form parameter.
   *
   * @param element {HMTLElement} - The HTML Element to add this form to.
   * @param form {string|Object} - The src of the form, or a form object.
   * @param options {Object} - The options to create this form.
   *
   * @return {Promise} - When the form is instance is ready.
   */
  createForm: (element, form, options) => {
    if (typeof form === 'string') {
      return (new Formio(form)).loadForm().then((formObj) => FormioFactory.factory(element, formObj, options));
    }
    else {
      return Promise.resolve(FormioFactory.factory(element, form, options));
    }
  }
};
