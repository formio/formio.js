import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class IsNotEqualTo extends ConditionOperator {
    static get operatorKey() {
        return 'isNotEqual';
    }

    static get displayedName() {
        return 'Is Not Equal To';
    }

    execute({ value, comparedValue }) {
        return  !_.isEqual(value, comparedValue);
    }
}
