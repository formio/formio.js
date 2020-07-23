export class GetMonthsBetweenTransformer extends GetDateDifferenceTransformer {
    static get presetArguments(): {
        unit: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { GetDateDifferenceTransformer } from "./GetDateDifference";
