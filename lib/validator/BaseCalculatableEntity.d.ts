export class BaseCalculatableEntity extends BaseEntity {
    static get arguments(): any[];
    static get lazyArgsEvaluation(): boolean;
    static get presetArguments(): {};
    static get optionsEditForm(): any[];
    constructor(context?: {});
    get iterateeEngineOptions(): {
        cachable: boolean;
    };
    getIterateeContext(item: any, itemIndex: any): {
        item: any;
        itemIndex: any;
        parentItems: any;
        parentItemIndexes: any;
    };
    getIteratee(valueEvaluator: any): (item: any, itemIndex: any) => any;
}
import { BaseEntity } from "./BaseEntity";
