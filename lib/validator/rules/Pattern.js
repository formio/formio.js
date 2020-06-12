import { Rule } from './Rule';
export class Pattern extends Rule {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} does not match the pattern {{settings.pattern}}';
    }
    check(value) {
        const { pattern } = this.settings;
        if (!pattern) {
            return true;
        }
        return (new RegExp(`^${pattern}$`)).test(value);
    }
}
