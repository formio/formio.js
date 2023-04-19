import DateGeaterThan from './DateGreaterThan';

export default class DateLessThan extends DateGeaterThan {
    static get operatorKey() {
        return 'dateLessThan';
    }

    static get displayedName() {
        return 'Less Than';
    }

    execute(options) {
        return super.execute(options, 'isBefore');
    }
}
