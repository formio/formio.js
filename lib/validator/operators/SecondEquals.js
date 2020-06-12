import { DateEqualsOperator } from './DateEquals';
export class SecondEqualsOperator extends DateEqualsOperator {
    static get name() {
        return 'secondEquals';
    }
    static get title() {
        return 'Second Equals';
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
