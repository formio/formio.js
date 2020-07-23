export class GetDateDifferenceTransformer extends Transformer {
    static get title(): string;
    static get name(): string;
    static get arguments(): {
        name: string;
        key: string;
        required: boolean;
    }[];
    static get optionsEditForm(): {
        label: string;
        key: string;
        type: string;
        input: boolean;
    }[];
    constructor(context?: {});
}
import { Transformer } from "./Transformer";
