import { DateEqualsOperator } from './DateEquals';
export class MinuteEqualsOperator extends DateEqualsOperator {
    static get name() {
        return 'minuteEquals';
    }
    static get title() {
        return 'Minute Equals';
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
