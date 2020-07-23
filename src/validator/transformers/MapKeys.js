import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class MapKeysTransformer extends IterateeTransformer {
  static get title() {
    return 'Map Keys';
  }

  static get name() {
    return 'mapKeys';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.mapKeys(value, this.getIteratee(iteratee)) ?? null;
  }
}
