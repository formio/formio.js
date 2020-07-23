export class Operator extends BaseCalculatableEntity {
    static get hasComplementaryOperator(): boolean;
    static get complementaryOperatorName(): string;
    static get complementaryOperatorTitle(): string;
    static get complementaryOperator(): any;
    constructor(context?: {});
    execute(args: any, opts: any): void;
}
import { BaseCalculatableEntity } from "../BaseCalculatableEntity";
