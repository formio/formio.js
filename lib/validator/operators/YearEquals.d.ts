export class YearEqualsOperator extends DateEqualsOperator {
    static get presetArguments(): {
        granularity: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { DateEqualsOperator } from "./DateEquals";
