import _ from 'lodash';

import { IterateeTransformer } from './Iteratee';

export class MapTransformer extends IterateeTransformer {
  static get title() {
    return 'Map';
  }

  static get name() {
    return 'map';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return _.map(value, this.getIteratee(iteratee)) ?? null;
  }
}
