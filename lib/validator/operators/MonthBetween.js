import { DateBetweenOperator } from './DateBetween';
export class MonthBetweenOperator extends DateBetweenOperator {
    static get name() {
        return 'monthBetween';
    }
    static get title() {
        return 'Month Between';
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
