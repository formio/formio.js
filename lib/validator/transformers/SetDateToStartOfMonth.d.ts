export class SetDateToStartOfMonthTransformer extends SetDateToStartOfComponentTransformer {
    static get presetArguments(): {
        unit: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { SetDateToStartOfComponentTransformer } from "./SetDateToStartOfComponent";
