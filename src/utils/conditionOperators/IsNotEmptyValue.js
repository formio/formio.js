import  IsEmptyValue from './IsEmptyValue';

export default class IsNotEmptyValue extends IsEmptyValue {
    static get operatorKey() {
        return 'isNotEmpty';
    }

    static get displayedName() {
        return 'Is Not Empty';
    }

    getResult(options) {
        return  !super.getResult(options);
    }
}
