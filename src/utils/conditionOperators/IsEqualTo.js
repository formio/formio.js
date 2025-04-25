import ConditionOperator from './ConditionOperator';
import _ from 'lodash';
import { compareSelectResourceWithObjectTypeValues, isSelectResourceWithObjectValue } from '../utils';

export default class IsEqualTo extends ConditionOperator {
    static get operatorKey() {
        return 'isEqual';
    }

    static get displayedName() {
        return 'Is Equal To';
    }

    execute({ value, comparedValue, instance, path }) {
        if ((value || value === false) && comparedValue && typeof value !== typeof comparedValue && _.isString(comparedValue)) {
            try {
                comparedValue = JSON.parse(comparedValue);
            }
            // eslint-disable-next-line no-empty
            catch (e) {}
        }

        if (instance?.root?.getComponent) {
            const conditionTriggerComponent = instance.root.getComponent(path);

            if (
                conditionTriggerComponent
                && isSelectResourceWithObjectValue(conditionTriggerComponent.component)
                && conditionTriggerComponent.component?.template
            ) {
                return compareSelectResourceWithObjectTypeValues(value, comparedValue, conditionTriggerComponent.component);
            }
        }

        //special check for select boxes
        if (_.isObject(value) && comparedValue && _.isBoolean(value[comparedValue])) {
            return value[comparedValue];
        }

        return  _.isEqual(value, comparedValue);
    }
}
