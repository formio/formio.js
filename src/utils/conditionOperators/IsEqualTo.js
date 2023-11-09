import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class IsEqualTo extends ConditionOperator {
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
            // eslint-disable-next-line no-empty
            catch (e) {}
        }

        //special check for select boxes
        if (_.isObject(value) && comparedValue && _.isBoolean(value[comparedValue])) {
            return value[comparedValue];
        }

        return  _.isEqual(value, comparedValue);
    }
}
