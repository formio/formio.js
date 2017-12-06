"use strict";
import Promise from "native-promise-only";
import FormioWizard from './formio.wizard';
import FormioPDF from './formio.pdf';
import FormioForm from './formio.form';
import { FormioComponents } from './components/Components';
import Formio from './formio';

/**
 * Provided a form object, this will return the form instance.
 * @param element
 * @param form
 * @param options
 * @return {*}
 */
Formio.formFactory = (element, form, options) => {
  let instance = null;
  if (form.display === 'wizard') {
    instance = new FormioWizard(element, options);
  }
  else if (form.display === 'pdf') {
    instance = new FormioPDF(element, options);
  }
  else {
    instance = new FormioForm(element, options);
  }
  instance.form = form;
  return instance;
};

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
  if (typeof form === 'string') {
    return (new Formio(form)).loadForm().then((formObj) => {
      let instance = Formio.formFactory(element, formObj, options);
      instance.url = form;
      instance.nosubmit = false;
      instance.loadSubmission();
      return instance.ready.then(() => instance);
    });
  }
  else {
    return Promise.resolve(Formio.formFactory(element, form, options));
  }
};

/**
 * Embed this form within the current page.
 * @param embed
 */
Formio.embedForm = function(embed) {
  if (!embed || !embed.src) {
    return null;
  }
  let id = embed.id || 'formio-' + Math.random().toString(36).substring(7);
  let className = embed.class || 'formio-form-wrapper';
  let code = embed.styles ? '<link rel="stylesheet" href="' + embed.styles + '">' : '';
  code += '<div id="' + id + '" class="' + className + '"></div>';
  document.write(code);
  let formElement = document.getElementById(id);
  return Formio.createForm(formElement, embed.src);
};

/**
 * Register a new component.
 *
 * @param type {string} - The type of the component.
 * @param component {function} - The constructor function of the component.
 */
FormioForm.registerComponent = Formio.registerComponent = function(type, component) {
  FormioComponents.customComponents[type] = component;
};

exports.Formio = Formio;
exports.FormioForm = FormioForm;
exports.FormioWizard = FormioWizard;
