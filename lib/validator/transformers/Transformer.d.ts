export class Transformer extends BaseCalculatableEntity {
    static get lazyValueEvaluation(): boolean;
    static get lazyArgsEvaluation(): boolean;
    constructor(context?: {});
    transform(value: any, args: any, opts: any): void;
}
import { BaseCalculatableEntity } from "../BaseCalculatableEntity";
