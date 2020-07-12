import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class FlatMapTransformer extends IterateeTransformer {
  static get title() {
    return 'Flat Map';
  }

  static get name() {
    return 'flatMap';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.flatMap(value, this.getIteratee(iteratee)) ?? null;
  }
}
