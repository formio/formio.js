import { DateLessThanOperator } from './DateLessThan';
export class SecondLessThanOperator extends DateLessThanOperator {
    static get name() {
        return 'secondLessThan';
    }
    static get title() {
        return 'Second Less Than';
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
