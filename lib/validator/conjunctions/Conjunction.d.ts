export class Conjunction extends BaseEntity {
    static get weight(): number;
    static get lazyConditionPartsEvaluation(): boolean;
    constructor(context?: {});
    execute(conditionParts: any): void;
}
import { BaseEntity } from "../BaseEntity";
