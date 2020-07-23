export class MonthGreaterThanOrEqualOperator extends DateGreaterThanOrEqualOperator {
    static get presetArguments(): {
        granularity: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { DateGreaterThanOrEqualOperator } from "./DateGreaterThanOrEqual";
