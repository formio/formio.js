export class MinuteGreaterThanOperator extends DateGreaterThanOperator {
    static get presetArguments(): {
        granularity: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { DateGreaterThanOperator } from "./DateGreaterThan";
