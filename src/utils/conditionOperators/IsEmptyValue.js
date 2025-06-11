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

    execute({ value, instance, path }) {
        const isEmptyValue = _.isEmpty(_.isNumber(value)? String(value): value);

        if (instance?.root?.getComponent) {
            const conditionTriggerComponent =  instance.root.getComponent(path);
            return conditionTriggerComponent?.isEmpty ? conditionTriggerComponent.isEmpty() : isEmptyValue;
        }

        return  isEmptyValue;
    }

    getResult(options) {
        return this.execute(options);
    }
}
