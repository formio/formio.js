import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';
export class YearLessThanOrEqualOperator extends DateLessThanOrEqualOperator {
    static get name() {
        return 'yearLessThanOrEqual';
    }
    static get title() {
        return 'Year Less Than Or Equal';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'year',
            },
        };
    }
}
