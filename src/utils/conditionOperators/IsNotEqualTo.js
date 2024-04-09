import IsEqualTo from './IsEqualTo';

export default class IsNotEqualTo extends IsEqualTo {
    static get operatorKey() {
        return 'isNotEqual';
    }

    static get displayedName() {
        return 'Is Not Equal To';
    }

    execute(options) {
        return !super.execute(options);
    }
}
