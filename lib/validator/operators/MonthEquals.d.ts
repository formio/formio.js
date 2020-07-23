export class MonthEqualsOperator extends DateEqualsOperator {
    static get presetArguments(): {
        granularity: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { DateEqualsOperator } from "./DateEquals";
