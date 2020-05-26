import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class RejectTransformer extends IterateeTransformer {
  static get title() {
    return 'Reject';
  }

  static get name() {
    return 'reject';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.reject(value, this.getIteratee(iteratee)) ?? null;
  }
}
