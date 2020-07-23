import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';
export class SecondGreaterThanOrEqualOperator extends DateGreaterThanOrEqualOperator {
    static get name() {
        return 'secondGreaterThanOrEqual';
    }
    static get title() {
        return 'Second Greater Than Or Equal';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'second',
            },
        };
    }
}
