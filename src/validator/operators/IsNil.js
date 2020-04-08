import _ from 'lodash';

import { Operator } from './Operator';

export class IsNilOperator extends Operator {
  static get name() {
    return 'isNil';
  }

  static get title() {
    return 'Is Nil';
  }

  static get hasComplementaryOperator() {
    return true;
  }

  static get arguments() {
    return [
      {
        name: 'Value',
        key: 'value',
        required: true,
      },
    ];
  }

  execute(args) {
    const {
      value,
    } = args;

    return _.isNil(value);
  }
}
