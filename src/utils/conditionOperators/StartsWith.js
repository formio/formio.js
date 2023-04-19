import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class StartsWith extends ConditionOperator {
    static get operatorKey() {
        return 'startsWith';
    }

    static get displayedName() {
        return 'Starts With';
    }

    execute({ value, comparedValue }) {
        return  _.startsWith(value, comparedValue);
    }
}
