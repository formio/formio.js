import DateGeaterThan from './DateGreaterThan';

export default class IsNotDateEqual extends DateGeaterThan {
    static get operatorKey() {
        return 'isNotDateEqual';
    }

    static get displayedName() {
        return 'Is Not Equal To';
    }

    execute(options) {
        return !super.execute(options, 'isSame');
    }
}
