import { Rule } from './Rule';
export class Required extends Rule {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} is required';
    }
    check(value) {
        // TODO: Day, Survey overrides.
        return !this.component.isValueHidden() && !this.component.isEmpty(value);
    }
}
;
