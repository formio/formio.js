import { DateGreaterThanOperator } from './DateGreaterThan';
export class DayGreaterThanOperator extends DateGreaterThanOperator {
    static get name() {
        return 'dayGreaterThan';
    }
    static get title() {
        return 'Day Greater Than';
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
