export class AddDateComponentTransformer extends Transformer {
    static get title(): string;
    static get name(): string;
    static get arguments(): {
        name: string;
        key: string;
        required: boolean;
    }[];
    constructor(context?: {});
}
import { Transformer } from "./Transformer";
