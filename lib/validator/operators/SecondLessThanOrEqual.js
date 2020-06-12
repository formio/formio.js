import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';
export class SecondLessThanOrEqualOperator extends DateLessThanOrEqualOperator {
    static get name() {
        return 'secondLessThanOrEqual';
    }
    static get title() {
        return 'Second Less Than Or Equal';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'second',
            },
        };
    }
}
