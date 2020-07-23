export class MinuteBetweenOperator extends DateBetweenOperator {
    static get presetArguments(): {
        granularity: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { DateBetweenOperator } from "./DateBetween";
