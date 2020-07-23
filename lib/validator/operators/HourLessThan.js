import { DateLessThanOperator } from './DateLessThan';
export class HourLessThanOperator extends DateLessThanOperator {
    static get name() {
        return 'hourLessThan';
    }
    static get title() {
        return 'Hour Less Than';
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
