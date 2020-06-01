import { Operator } from './Operator';

export class LessThanOperator extends Operator {
  static get name() {
    return 'lessThan';
  }

  static get title() {
    return 'Less Than';
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

    return left < right;
  }
}
