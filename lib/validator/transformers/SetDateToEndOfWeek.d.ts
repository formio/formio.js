export class SetDateToEndOfWeekTransformer extends SetDateToEndOfComponentTransformer {
    static get presetArguments(): {
        unit: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { SetDateToEndOfComponentTransformer } from "./SetDateToEndOfComponent";
