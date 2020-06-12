import { Rule } from './Rule';
export class MaxLength extends Rule {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} must have no more than {{- settings.length}} characters.';
    }
    check(value) {
        const maxLength = parseInt(this.settings.length, 10);
        if (!value || !maxLength || !value.hasOwnProperty('length')) {
            return true;
        }
        return (value.length <= maxLength);
    }
}
