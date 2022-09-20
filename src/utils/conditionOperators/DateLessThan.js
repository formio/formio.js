import ConditionOperator from './ConditionOperator';
import moment from 'moment';

export default class DateLessThan extends ConditionOperator {
    static get operatorKey() {
        return 'dateLessThan';
    }

    static get displayedName() {
        return 'Less Than';
    }

    execute({ value, comparedValue, instance }) {
        if (instance.isPartialDay && instance.isPartialDay(value)) {
            return false;
        }

        const hasValidationFormat = instance.getValidationFormat;
        const date = hasValidationFormat ? moment(value, instance.getValidationFormat()) : moment(value);
        const comparedDate = hasValidationFormat ? moment(comparedValue, instance.getValidationFormat()) : moment(comparedValue);

        return date.isBefore(comparedDate);
    }
}
