import Includes from './Includes';

export default class NotIncludes extends Includes {
    static get operatorKey() {
        return 'notIncludes';
    }

    static get displayedName() {
        return 'Not Includes';
    }

    execute(options) {
        return  !super.execute(options);
    }
}
