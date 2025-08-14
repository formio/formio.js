import * as utils from './utils';
import * as formUtils from './formUtils';
import { Evaluator, registerEvaluator, interpolate, DefaultEvaluator } from './Evaluator';
import ConditionOperators from './conditionOperators';
import _ from 'lodash';
import moment from 'moment';

const FormioUtils = {
  ...utils,
  ...formUtils,
  Evaluator,
  interpolate,
  ConditionOperators,
  _,
  moment
};
if (typeof global === 'object') {
  global.FormioUtils = FormioUtils;
}

export { FormioUtils as Utils };
export { Evaluator, DefaultEvaluator, registerEvaluator };
export * from './utils';
export * from './formUtils';

export default FormioUtils;
