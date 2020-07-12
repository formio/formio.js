import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class FindTransformer extends IterateeTransformer {
  static get title() {
    return 'Find';
  }

  static get name() {
    return 'find';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.find(value, this.getIteratee(iteratee)) ?? null;
  }
}
