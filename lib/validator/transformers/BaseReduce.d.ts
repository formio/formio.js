export class BaseReduceTransformer extends IterateeTransformer {
    constructor(context?: {});
    getReduceIterateeContext(accumulator: any, item: any, itemIndex: any): {
        accumulator: any;
        item: any;
        itemIndex: any;
        parentItems: any;
        parentItemIndexes: any;
    };
    getReduceIteratee(valueEvaluator: any): (accumulator: any, item: any, itemIndex: any) => any;
}
import { IterateeTransformer } from "./Iteratee";
