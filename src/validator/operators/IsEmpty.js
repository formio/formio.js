import { Operator } from './Operator';

export class IsEmptyOperator extends Operator {
  static get name() {
    return 'isEmpty';
  }

  static get title() {
    return 'Is Empty';
  }

  static get hasComplementaryOperator() {
    return true;
  }

  static get arguments() {
    return [
      {
        name: 'Component',
        key: 'component',
        required: true,
      },
      {
        name: 'Value',
        key: 'value',
        required: false,
      },
    ];
  }

  execute(args) {
    const {
      component,
      value,
    } = args;

    return component?.isEmpty?.(value ?? component.dataValue);
  }
}
