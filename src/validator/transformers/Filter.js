import { IterateeTransformer } from './Iteratee';

export class FilterTransformer extends IterateeTransformer {
  static get title() {
    return 'Filter';
  }

  static get name() {
    return 'filter';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return value?.filter?.(this.getIteratee(iteratee)) ?? null;
  }
}
