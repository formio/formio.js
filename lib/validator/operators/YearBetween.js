import { DateBetweenOperator } from './DateBetween';
export class YearBetweenOperator extends DateBetweenOperator {
    static get name() {
        return 'yearBetween';
    }
    static get title() {
        return 'Year Between';
    }
    static get presetArguments() {
        return {
            granularity: {
                valueSource: 'string',
                stringInput: 'year',
            },
        };
    }
}
