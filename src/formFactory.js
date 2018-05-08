import Formio from './Formio';
import Wizard from './Wizard';
import PDF from './PDF';
import Form from './Form';

/**
 * Provided a form object, this will return the form instance.
 *
 * @param element
 * @param form
 * @param options
 * @return {*}
 */
Formio.formFactory = (element, form, options) => {
  let instance = null;
  if (form && (form.display === 'wizard')) {
    instance = new Wizard(element, options);
  }
  else if (form && (form.display === 'pdf')) {
    instance = new PDF(element, options);
  }
  else {
    instance = new Form(element, options);
  }
  if (form) {
    instance.form = form;
  }
  return instance;
};

export default Formio.formFactory;
