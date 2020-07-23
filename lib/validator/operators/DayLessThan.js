import { DateLessThanOperator } from './DateLessThan';
export class DayLessThanOperator extends DateLessThanOperator {
    static get name() {
        return 'dayLessThan';
    }
    static get title() {
        return 'Day Less Than';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'day',
            },
        };
    }
}
