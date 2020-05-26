import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class FindLastIndexTransformer extends IterateeTransformer {
  static get title() {
    return 'Find Last Index';
  }

  static get name() {
    return 'findLastIndex';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.findLastIndex(value, this.getIteratee(iteratee)) ?? null;
  }
}
