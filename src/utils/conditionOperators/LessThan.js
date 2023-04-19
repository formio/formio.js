import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class LessThan extends ConditionOperator {
    static get operatorKey() {
        return 'lessThan';
    }

    static get displayedName() {
        return 'Less Than';
    }

    execute({ value, comparedValue }) {
        return  _.isNumber(value) && value < comparedValue;
    }
}
