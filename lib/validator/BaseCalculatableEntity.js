import { BaseEntity } from './BaseEntity';
export class BaseCalculatableEntity extends BaseEntity {
    static get arguments() {
        return [];
    }
    static get lazyArgsEvaluation() {
        return false;
    }
    static get presetArguments() {
        return {};
    }
    static get optionsEditForm() {
        return [];
    }
    get iterateeEngineOptions() {
        return {
            cachable: false,
        };
    }
    getIterateeContext(item, itemIndex) {
        const { item: parentItem = null, itemIndex: parentItemIndex = null, parentItems = [], parentItemIndexes = [], } = this.options;
        return {
            item,
            itemIndex,
            parentItems: parentItems.concat(parentItem !== null && parentItem !== void 0 ? parentItem : []),
            parentItemIndexes: parentItemIndexes.concat(parentItemIndex !== null && parentItemIndex !== void 0 ? parentItemIndex : []),
        };
    }
    getIteratee(valueEvaluator) {
        return (item, itemIndex) => {
            const { evaluationContext: { context, }, } = valueEvaluator;
            return valueEvaluator({
                context: Object.assign(Object.assign({}, context), { options: Object.assign(Object.assign({}, context.options), this.getIterateeContext(item, itemIndex)), engineOptions: Object.assign(Object.assign({}, context.engineOptions), this.iterateeEngineOptions) }),
            });
        };
    }
}
