import { Rule } from './Rule';
export class MaxWords extends Rule {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} must have no more than {{- settings.length}} words.';
    }
    check(value) {
        const maxWords = parseInt(this.settings.length, 10);
        if (!maxWords || (typeof value !== 'string')) {
            return true;
        }
        return (value.trim().split(/\s+/).length <= maxWords);
    }
}
