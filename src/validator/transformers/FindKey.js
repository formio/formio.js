import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class FindKeyTransformer extends IterateeTransformer {
  static get title() {
    return 'Find Key';
  }

  static get name() {
    return 'findKey';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.findKey(value, this.getIteratee(iteratee)) ?? null;
  }
}
