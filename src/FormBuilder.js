import Formio from './Formio';
import Builders from './builders';
import Form from './Form';

export default class FormBuilder extends Form {
  static options = {};
  constructor(element, form, options) {
    form = form || {};
    options = options || {};
    super(element, form, Object.assign(
      options,
      FormBuilder.options,
      ((Formio.options && Formio.options.builder) ? Formio.options.builder : {})
    ));
  }

  create(display) {
    if (Builders.builders[display]) {
      return new Builders.builders[display](this.element, this.options);
    }
    else {
      // eslint-disable-next-line new-cap
      return new Builders.builders['webform'](this.element, this.options);
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
  return (new FormBuilder(...args)).ready;
};

Formio.FormBuilder = FormBuilder;
