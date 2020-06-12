import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';
export class MinuteGreaterThanOrEqualOperator extends DateGreaterThanOrEqualOperator {
    static get name() {
        return 'minuteGreaterThanOrEqual';
    }
    static get title() {
        return 'Minute Greater Than Or Equal';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'minute',
            },
        };
    }
}
