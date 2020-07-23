export class SetDateToStartOfSecondTransformer extends SetDateToStartOfComponentTransformer {
    static get presetArguments(): {
        unit: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { SetDateToStartOfComponentTransformer } from "./SetDateToStartOfComponent";
