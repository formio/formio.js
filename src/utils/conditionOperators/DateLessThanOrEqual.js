import DateGeaterThan from './DateGreaterThan';

export default class DateLessThanOrEqual extends DateGeaterThan {
    static get operatorKey() {
        return 'dateLessThanOrEqual';
    }

    static get displayedName() {
        return 'Less Than Or Equal To';
    }

    execute(options) {
        return super.execute(options, 'isSameOrBefore');
    }
}
