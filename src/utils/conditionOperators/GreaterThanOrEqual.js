import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class GreaterThanOrEqual extends ConditionOperator {
    static get operatorKey() {
        return 'greaterThanOrEqual';
    }

    static get displayedName() {
        return 'Greater Than Or Equal To';
    }

    execute({ value, comparedValue }) {
        return  _.isNumber(value) && (value > comparedValue || _.isEqual(value, comparedValue));
    }
}
