import { Rule } from './Rule';
export class DateRule extends Rule {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} is not a valid date.';
    }
    check(value) {
        if (!value || value instanceof Date) {
            return true;
        }
        if (value === 'Invalid date' || value === 'Invalid Date') {
            return false;
        }
        if (typeof value === 'string') {
            value = new Date(value);
        }
        return value.toString() !== 'Invalid Date';
    }
}
;
