import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';
export class MonthLessThanOrEqualOperator extends DateLessThanOrEqualOperator {
    static get name() {
        return 'monthLessThanOrEqual';
    }
    static get title() {
        return 'Month Less Than Or Equal';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'month',
            },
        };
    }
}
