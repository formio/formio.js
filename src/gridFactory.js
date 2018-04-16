import GridBuilder from './formio.grid.builder';

/**
 * Provided a form object, this will return the form instance.
 *
 * @param element
 * @param form
 * @param options
 * @return {*}
 */
export default (element, form, options) => {
  let instance = new GridBuilder(element, form, options);
  instance.form = form;
   return instance;
};
