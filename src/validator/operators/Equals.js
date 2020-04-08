import _ from 'lodash';

import { Operator } from './Operator';

export class EqualsOperator extends Operator {
  static get name() {
    return 'equals';
  }

  static get title() {
    return 'Equals';
  }

  static get hasComplementaryOperator() {
    return true;
  }

  static get arguments() {
    return [
      {
        name: 'Left Side',
        key: 'left',
        required: true,
      },
      {
        name: 'Right Side',
        key: 'right',
        required: true,
      },
    ];
  }

  execute(args) {
    const {
      left,
      right,
    } = args;

    return _.isEqual(left, right);
  }
}
