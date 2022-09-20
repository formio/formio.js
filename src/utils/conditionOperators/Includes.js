import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class Includes extends ConditionOperator {
    static get operatorKey() {
        return 'includes';
    }

    static get displayedName() {
        return 'Includes';
    }

    execute({ value, comparedValue }) {
        return  _.includes(value, comparedValue);
    }
}
