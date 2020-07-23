import { DateEqualsOperator } from './DateEquals';
export class MonthEqualsOperator extends DateEqualsOperator {
    static get name() {
        return 'monthEquals';
    }
    static get title() {
        return 'Month Equals';
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
