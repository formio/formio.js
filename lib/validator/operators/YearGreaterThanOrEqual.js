import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';
export class YearGreaterThanOrEqualOperator extends DateGreaterThanOrEqualOperator {
    static get name() {
        return 'yearGreaterThanOrEqual';
    }
    static get title() {
        return 'Year Greater Than Or Equal';
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
