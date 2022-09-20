import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class IsEqual extends ConditionOperator {
    static get operatorKey() {
        return 'isEqual';
    }

    static get displayedName() {
        return 'Is Equal To';
    }

    execute({ value, comparedValue }) {
        if (value && comparedValue && typeof value !== typeof comparedValue && _.isString(comparedValue)) {
            try {
                comparedValue = JSON.parse(comparedValue);
            }
            catch (e) {
                console.warn(e);
            }
        }
        return  _.isEqual(value, comparedValue);
    }
}
