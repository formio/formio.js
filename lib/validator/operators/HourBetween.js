import { DateBetweenOperator } from './DateBetween';
export class HourBetweenOperator extends DateBetweenOperator {
    static get name() {
        return 'hourBetween';
    }
    static get title() {
        return 'Hour Between';
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
