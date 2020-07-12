import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class MapValuesTransformer extends IterateeTransformer {
  static get title() {
    return 'Map Values';
  }

  static get name() {
    return 'mapValues';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.mapValues(value, this.getIteratee(iteratee)) ?? null;
  }
}
