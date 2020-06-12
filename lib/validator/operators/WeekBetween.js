import { DateBetweenOperator } from './DateBetween';
export class WeekBetweenOperator extends DateBetweenOperator {
    static get name() {
        return 'weekBetween';
    }
    static get title() {
        return 'Week Between';
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
