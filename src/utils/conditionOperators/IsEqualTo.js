import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class IsEqualTo extends ConditionOperator {
  static get operatorKey() {
    return 'isEqual';
  }

  static get displayedName() {
    return 'Is Equal To';
  }

  execute({ value, comparedValue}) {
    if (
      (value || value === false) &&
      comparedValue &&
      typeof value !== typeof comparedValue &&
      _.isString(comparedValue)
    ) {
      try {
        comparedValue = JSON.parse(comparedValue);
      } catch (ignoreErr) {
        // ignore
      }
    }

    //special check for select boxes
    if (_.isObject(value) && comparedValue && _.isBoolean(value[comparedValue])) {
      return value[comparedValue];
    }

    const valuesAreObjects =
      typeof comparedValue === 'object' &&
      comparedValue !== null &&
      typeof value === 'object' &&
      value !== null;

    return valuesAreObjects ? _.isMatch(value, comparedValue) : _.isEqual(comparedValue, value);
  }
}
