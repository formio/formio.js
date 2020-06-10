export class PatternRule extends QuickRule {
    static get name(): string;
    static get title(): string;
    static getEditForm(): {
        label: string;
        key: string;
        type: string;
        input: boolean;
        validate: {
            required: boolean;
        };
    }[];
    constructor(context?: {});
}
import { QuickRule } from "./QuickRule";
