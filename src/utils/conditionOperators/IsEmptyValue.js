import ConditionOperator from './ConditionOperator';
import _ from 'lodash';

export default class IsEmptyValue extends ConditionOperator {
    static get operatorKey() {
        return 'isEmpty';
    }

    static get displayedName() {
        return 'Is Empty';
    }

    static get requireValue() {
        return false;
    }

    execute({ value, instance, conditionComponentPath }) {
        const isEmptyValue = _.isEmpty(value);

        if (instance && instance.root) {
            let conditionTriggerComponent = instance.root.getComponent(conditionComponentPath);
            conditionTriggerComponent = Array.isArray(conditionTriggerComponent) ? conditionTriggerComponent[0] : conditionTriggerComponent;
            return conditionTriggerComponent ? conditionTriggerComponent.isEmpty() : isEmptyValue;
        }

        return  isEmptyValue;
    }

    getResult(options) {
        return this.execute(options);
    }
}
