import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class LessThanOrEqual extends ConditionOperator {
    static get operatorKey() {
        return 'lessThanOrEqual';
    }

    static get displayedName() {
        return 'Less Than Or Equal To';
    }

    execute({ value, comparedValue }) {
        return  _.isNumber(value) && (value < comparedValue || _.isEqual(value, comparedValue));
    }
}
