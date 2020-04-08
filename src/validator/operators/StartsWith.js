import { Operator } from './Operator';

export class StartsWithOperator extends Operator {
  static get name() {
    return 'startsWith';
  }

  static get title() {
    return 'Starts With';
  }

  static get hasComplementaryOperator() {
    return true;
  }

  static get arguments() {
    return [
      {
        name: 'String',
        key: 'string',
        required: true,
      },
      {
        name: 'Search String',
        key: 'searchString',
        required: true,
      },
    ];
  }

  execute(args) {
    const {
      searchString,
      string,
    } = args;

    return string?.startsWith?.(searchString) ?? false;
  }
}
