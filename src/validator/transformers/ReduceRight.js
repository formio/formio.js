import _ from 'lodash';

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

    return _.reduceRight(value, this.getReduceIteratee(iteratee), initialValue()) ?? null;
  }
}
