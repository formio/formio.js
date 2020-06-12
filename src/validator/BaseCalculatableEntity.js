import { BaseEntity } from './BaseEntity';

export class BaseCalculatableEntity extends BaseEntity {
  static get arguments() {
    return [];
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
    const {
      item: parentItem = null,
      itemIndex: parentItemIndex = null,
      parentItems = [],
      parentItemIndexes = [],
    } = this.options;

    return {
      item,
      itemIndex,
      parentItems: parentItems.concat(parentItem ?? []),
      parentItemIndexes: parentItemIndexes.concat(parentItemIndex ?? []),
    };
  }

  getIteratee(valueEvaluator) {
    return (item, itemIndex) => {
      const {
        evaluationContext: {
          context,
        },
      } = valueEvaluator;

      return valueEvaluator({
        context: {
          ...context,
          options: {
            ...context.options,
            ...this.getIterateeContext(item, itemIndex),
          },
          engineOptions: {
            ...context.engineOptions,
            ...this.iterateeEngineOptions,
          },
        },
      });
    };
  }
}
