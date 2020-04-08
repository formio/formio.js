import _ from 'lodash';

import { Conjunction } from './Conjunction';

export class XorConjunction extends Conjunction {
  static get name() {
    return 'xor';
  }

  static get title() {
    return 'Xor';
  }

  static get weight() {
    return 20;
  }

  execute(conditionParts) {
    return conditionParts.filter(_.identity).length === 1;
  }
}
