import { DateLessThanOperator } from './DateLessThan';
export class WeekLessThanOperator extends DateLessThanOperator {
    static get name() {
        return 'weekLessThan';
    }
    static get title() {
        return 'Week Less Than';
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
