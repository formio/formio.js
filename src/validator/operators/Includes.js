import { Operator } from './Operator';

export class IncludesOperator extends Operator {
  static get name() {
    return 'includes';
  }

  static get title() {
    return 'Includes';
  }

  static get hasComplementaryOperator() {
    return true;
  }

  static get arguments() {
    return [
      {
        name: 'Iterable',
        key: 'iterable',
        required: true,
      },
      {
        name: 'Value To Search',
        key: 'valueToSearch',
        required: true,
      },
    ];
  }

  execute(args) {
    const {
      iterable,
      valueToSearch,
    } = args;

    return iterable?.includes?.(valueToSearch) ?? false;
  }
}
