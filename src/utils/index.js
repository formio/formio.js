import * as utils from './utils';
import * as formUtils from './formUtils';
import { Evaluator } from './Evaluator';

const FormioUtils = {
  ...utils,
  ...formUtils,
  Evaluator,
};
if (typeof global === 'object') {
  global.FormioUtils = FormioUtils;
}
export { FormioUtils as Utils };
export { Evaluator, registerEvaluator } from './Evaluator';
export default FormioUtils;
