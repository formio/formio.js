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
  return new FormioGrid(element, form, options);
};
