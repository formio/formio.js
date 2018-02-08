import Promise from 'native-promise-only';
import Formio from './formio';
import formFactory from './formFactory';

/**
 * Creates a new form based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
export default (element, form, options) => {
  if (typeof form === 'string') {
    return (new Formio(form)).loadForm({params: {live: 1}}).then((formObj) => {
      const instance = formFactory(element, formObj, options);
      instance.url = form;
      instance.nosubmit = false;
      instance.loadSubmission();
      return instance.ready.then(() => instance);
    });
  }
  else {
    return Promise.resolve(formFactory(element, form, options));
  }
};
