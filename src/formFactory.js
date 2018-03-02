import FormioWizard from './formio.wizard';
import FormioPDF from './formio.pdf';
import FormioForm from './formio.form';

/**
 * Provided a form object, this will return the form instance.
 *
 * @param element
 * @param form
 * @param options
 * @return {*}
 */
export default (element, form, options) => {
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
