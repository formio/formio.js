import { IterateeTransformer } from './Iteratee';

export class BaseReduceTransformer extends IterateeTransformer {
  static get arguments() {
    return [
      ...IterateeTransformer.arguments,
      {
        name: 'Initial Value',
        key: 'initialValue',
        required: false,
      },
    ];
  }

  getReduceIterateeContext(accumulator, item, itemIndex) {
    return {
      ...this.getIterateeContext(item, itemIndex),
      accumulator,
    };
  }

  getReduceIteratee(valueEvaluator) {
    return (accumulator, item, itemIndex) => {
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
            ...this.getReduceIterateeContext(accumulator, item, itemIndex),
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
