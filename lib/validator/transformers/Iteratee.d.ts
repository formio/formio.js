export class IterateeTransformer extends Transformer {
    static get arguments(): {
        name: string;
        key: string;
        required: boolean;
    }[];
    constructor(context?: {});
}
import { Transformer } from "./Transformer";
