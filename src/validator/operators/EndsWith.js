import { Operator } from './Operator';

export class EndsWithOperator extends Operator {
  static get name() {
    return 'endsWith';
  }

  static get title() {
    return 'Ends With';
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

    return string?.endsWith?.(searchString) ?? false;
  }
}
