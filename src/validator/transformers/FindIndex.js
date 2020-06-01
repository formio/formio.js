import { IterateeTransformer } from './Iteratee';

export class FindIndexTransformer extends IterateeTransformer {
  static get title() {
    return 'Find Index';
  }

  static get name() {
    return 'findIndex';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return value?.findIndex?.(this.getIteratee(iteratee)) ?? null;
  }
}
