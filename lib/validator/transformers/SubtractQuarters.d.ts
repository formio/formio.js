export class SubtractQuartersTransformer extends SubtractDateComponentTransformer {
    static get presetArguments(): {
        unit: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { SubtractDateComponentTransformer } from "./SubtractDateComponent";
