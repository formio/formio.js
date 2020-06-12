import { DateGreaterThanOperator } from './DateGreaterThan';
export class MonthGreaterThanOperator extends DateGreaterThanOperator {
    static get name() {
        return 'monthGreaterThan';
    }
    static get title() {
        return 'Month Greater Than';
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
