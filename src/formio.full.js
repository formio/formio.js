'use strict';
// DO NOT DELETE! THIS WILL BREAK PDF GENERATION.
import * as polyfill from './formio.polyfill';

import FormioWizard from './formio.wizard';
import FormioPDF from './formio.pdf';
import FormioForm from './formio.form';
import {FormioComponents} from './components/Components';
import Formio from './formio';
import createForm from './createForm';
import formFactory from './formFactory';

Formio.formFactory = formFactory;

Formio.createForm = createForm;

/**
 * Embed this form within the current page.
 * @param embed
 */
Formio.embedForm = function(embed) {
  if (!embed || !embed.src) {
    return null;
  }
  const id = embed.id || `formio-${Math.random().toString(36).substring(7)}`;
  const className = embed.class || 'formio-form-wrapper';
  let code = embed.styles ? `<link rel="stylesheet" href="${embed.styles}">` : '';
  code += `<div id="${id}" class="${className}"></div>`;
  document.write(code);
  const formElement = document.getElementById(id);
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

export default Formio;
exports.Formio = global.Formio = Formio;
exports.FormioForm = FormioForm;
exports.FormioWizard = FormioWizard;
exports.FormioPDF = FormioPDF;
