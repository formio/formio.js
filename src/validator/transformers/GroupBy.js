import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class GroupByTransformer extends IterateeTransformer {
  static get title() {
    return 'Group By';
  }

  static get name() {
    return 'groupBy';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.groupBy(value, this.getIteratee(iteratee)) ?? null;
  }
}
