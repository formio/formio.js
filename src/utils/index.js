import * as FormioUtils from './utils';
if (typeof global === 'object') {
  global.FormioUtils = FormioUtils;
}
export { FormioUtils as Utils };
export default FormioUtils;
