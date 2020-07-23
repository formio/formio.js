import { DateLessThanOperator } from './DateLessThan';
export class YearLessThanOperator extends DateLessThanOperator {
    static get name() {
        return 'yearLessThan';
    }
    static get title() {
        return 'Year Less Than';
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
