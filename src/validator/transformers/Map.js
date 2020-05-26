import { IterateeTransformer } from './Iteratee';

export class MapTransformer extends IterateeTransformer {
  static get title() {
    return 'Map';
  }

  static get name() {
    return 'map';
  }

  transform(value, args) {
    const {
      iteratee,
    } = args;

    return value?.map?.(this.getIteratee(iteratee)) ?? null;
  }
}
