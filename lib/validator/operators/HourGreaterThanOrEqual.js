import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';
export class HourGreaterThanOrEqualOperator extends DateGreaterThanOrEqualOperator {
    static get name() {
        return 'hourGreaterThanOrEqual';
    }
    static get title() {
        return 'Hour Greater Than Or Equal';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'hour',
            },
        };
    }
}
