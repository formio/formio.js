export class SetMillisecondTransformer extends SetDateComponentTransformer {
    static get presetArguments(): {
        unit: {
            valueSource: string;
            stringInput: string;
        };
    };
    constructor(context?: {});
}
import { SetDateComponentTransformer } from "./SetDateComponent";
