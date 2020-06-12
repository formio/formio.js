export class DateGreaterThanOrEqualOperator extends Operator {
    static get name(): string;
    static get title(): string;
    static get arguments(): {
        name: string;
        key: string;
        required: boolean;
    }[];
    constructor(context?: {});
}
import { Operator } from "./Operator";
