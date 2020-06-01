import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class FindLastTransformer extends IterateeTransformer {
  static get title() {
    return 'Find Last';
  }

  static get name() {
    return 'findLast';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.findLast(value, this.getIteratee(iteratee)) ?? null;
  }
}
