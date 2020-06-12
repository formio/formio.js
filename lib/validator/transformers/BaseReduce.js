import { IterateeTransformer } from './Iteratee';
export class BaseReduceTransformer extends IterateeTransformer {
    static get arguments() {
        return [
            ...super.arguments,
            {
                name: 'Initial Value',
                key: 'initialValue',
                required: false,
            },
        ];
    }
    getReduceIterateeContext(accumulator, item, itemIndex) {
        return Object.assign(Object.assign({}, this.getIterateeContext(item, itemIndex)), { accumulator });
    }
    getReduceIteratee(valueEvaluator) {
        return (accumulator, item, itemIndex) => {
            const { evaluationContext: { context, }, } = valueEvaluator;
            return valueEvaluator({
                context: Object.assign(Object.assign({}, context), { options: Object.assign(Object.assign({}, context.options), this.getReduceIterateeContext(accumulator, item, itemIndex)), engineOptions: Object.assign(Object.assign({}, context.engineOptions), this.iterateeEngineOptions) }),
            });
        };
    }
}
