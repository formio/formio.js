import FormioGrid from './formio.grid';

/**
 * Provided a form object, this will return the form instance.
 *
 * @param element
 * @param form
 * @param options
 * @return {*}
 */
export default (element, form, options) => {
  let instance = new FormioGrid(element, form, options);
  instance.form = form;
   return instance;
};
