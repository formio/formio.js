import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class EndsWith extends ConditionOperator {
    static get operatorKey() {
        return 'endsWith';
    }

    static get displayedName() {
        return 'Ends With';
    }

    execute({ value, comparedValue }) {
        return  _.endsWith(value, comparedValue);
    }
}
