import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class GeaterThan extends ConditionOperator {
    static get operatorKey() {
        return 'greaterThan';
    }

    static get displayedName() {
        return 'Greater Than';
    }

    execute({ value, comparedValue }) {
        return  _.isNumber(value) && value > comparedValue;
    }
}
