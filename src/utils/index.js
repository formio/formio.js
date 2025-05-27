import * as utils from './utils';
import * as formUtils from './formUtils';
import { Evaluator, registerEvaluator, interpolate } from './Evaluator';

const FormioUtils = {
  ...utils,
  ...formUtils,
  Evaluator,
  interpolate
};
if (typeof global === 'object') {
  global.FormioUtils = FormioUtils;
}

export { FormioUtils as Utils };
export { Evaluator, registerEvaluator };
export * from './utils';
export * from './formUtils';

export default FormioUtils;
