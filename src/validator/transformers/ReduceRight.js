import { BaseReduceTransformer } from './BaseReduce';

export class ReduceRightTransformer extends BaseReduceTransformer {
  static get title() {
    return 'Reduce Right';
  }

  static get name() {
    return 'reduceRight';
  }

  transform(value, args) {
    const {
      iteratee,
      initialValue,
    } = args;

    return value?.reduceRight?.(this.getReduceIteratee(iteratee), initialValue()) ?? null;
  }
}
