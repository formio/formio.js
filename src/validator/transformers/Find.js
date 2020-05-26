import { IterateeTransformer } from './Iteratee';

export class FindTransformer extends IterateeTransformer {
  static get title() {
    return 'Find';
  }

  static get name() {
    return 'find';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return value?.find?.(this.getIteratee(iteratee)) ?? null;
  }
}
