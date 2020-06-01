import { Operator } from './Operator';

export class SomeOperator extends Operator {
  static get name() {
    return 'some';
  }

  static get title() {
    return 'Some';
  }

  static get hasComplementaryOperator() {
    return true;
  }

  static get complementaryOperatorName() {
    return 'none';
  }

  static get complementaryOperatorTitle() {
    return 'None';
  }

  static get lazyArgsEvaluation() {
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
        name: 'Iteratee',
        key: 'iteratee',
        required: true,
      },
    ];
  }

  execute(args) {
    const {
      iterable,
      iteratee,
    } = args;

    return iterable()?.some?.(this.getIteratee(iteratee)) ?? false;
  }
}
