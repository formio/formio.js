import { Operator } from './Operator';

export class EveryOperator extends Operator {
  static get name() {
    return 'every';
  }

  static get title() {
    return 'Every';
  }

  static get hasComplementaryOperator() {
    return false;
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

    return iterable()?.every?.(this.getIteratee(iteratee)) ?? false;
  }
}
