import { DateGreaterThanOperator } from './DateGreaterThan';
export class SecondGreaterThanOperator extends DateGreaterThanOperator {
    static get name() {
        return 'secondGreaterThan';
    }
    static get title() {
        return 'Second Greater Than';
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
