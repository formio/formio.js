import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class FindLastKeyTransformer extends IterateeTransformer {
  static get title() {
    return 'Find Last Key';
  }

  static get name() {
    return 'findLastKey';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.findLastKey(value, this.getIteratee(iteratee)) ?? null;
  }
}
