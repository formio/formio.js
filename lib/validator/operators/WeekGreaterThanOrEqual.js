import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';
export class WeekGreaterThanOrEqualOperator extends DateGreaterThanOrEqualOperator {
    static get name() {
        return 'weekGreaterThanOrEqual';
    }
    static get title() {
        return 'Week Greater Than Or Equal';
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
