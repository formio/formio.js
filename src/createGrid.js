import Promise from 'native-promise-only';
import Formio from './formio';
import gridFactory from './gridFactory';
/**
 * Provided a form object, this will return the form instance.
 *
 * @param element
 * @param form
 * @param options
 * @return {*}
 */
export default (element, form, options) => {
  if (typeof form === 'string') {
      const instance = gridFactory(element, form, options);
    return instance.ready.then(() => instance);
  }
  else {
    return Promise.resolve(gridFactory(element, form, options));
  }
};
