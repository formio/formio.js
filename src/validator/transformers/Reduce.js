import { BaseReduceTransformer } from './BaseReduce';

export class ReduceTransformer extends BaseReduceTransformer {
  static get title() {
    return 'Reduce';
  }

  static get name() {
    return 'reduce';
  }

  transform(value, args) {
    const {
      iteratee,
      initialValue,
    } = args;

    return value?.reduce?.(this.getReduceIteratee(iteratee), initialValue()) ?? null;
  }
}
