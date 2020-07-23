import { DateGreaterThanOperator } from './DateGreaterThan';
export class YearGreaterThanOperator extends DateGreaterThanOperator {
    static get name() {
        return 'yearGreaterThan';
    }
    static get title() {
        return 'Year Greater Than';
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
