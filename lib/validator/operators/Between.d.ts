export class BetweenOperator extends Operator {
    static get name(): string;
    static get title(): string;
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
        columns: {
            components: {
                label: string;
                key: string;
                type: string;
                input: boolean;
            }[];
            width: number;
        }[];
    }[];
    constructor(context?: {});
}
import { Operator } from "./Operator";
