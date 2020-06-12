import { DateEqualsOperator } from './DateEquals';
export class WeekEqualsOperator extends DateEqualsOperator {
    static get name() {
        return 'weekEquals';
    }
    static get title() {
        return 'Week Equals';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'isoWeek',
            },
        };
    }
}
