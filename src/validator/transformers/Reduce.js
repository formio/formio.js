import _ from 'lodash';

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

    return _.reduce(value, this.getReduceIteratee(iteratee), initialValue()) ?? null;
  }
}
