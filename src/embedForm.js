import Promise from "native-promise-only";
import createForm from "./createForm";
import Formio from "./Formio";

/**
 * Embeds a form within the page.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio.embedForm = (embed) => {
  if (!embed || !embed.src) {
    return null;
  }
  const id = embed.id || `formio-${Math.random().toString(36).substring(7)}`;
  const className = embed.class || 'formio-form-wrapper';
  let code = embed.styles ? `<link rel="stylesheet" href="${embed.styles}">` : '';
  code += `<div id="${id}" class="${className}"></div>`;
  document.write(code);
  const formElement = document.getElementById(id);
  return createForm(formElement, embed.src);
};

export default Formio.embedForm;
