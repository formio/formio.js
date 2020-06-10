export class DateDifferenceTransformer extends Transformer {
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
        dataSrc: string;
        data: {
            values: {
                label: string;
                value: string;
            }[];
        };
        defaultValue: string;
    }[];
    constructor(context?: {});
}
import { Transformer } from "./Transformer";
