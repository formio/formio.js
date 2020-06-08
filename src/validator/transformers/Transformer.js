import { BaseCalculatableEntity } from '../BaseCalculatableEntity';

export class Transformer extends BaseCalculatableEntity {
  static get lazyValueEvaluation() {
    return false;
  }

  static get lazyArgsEvaluation() {
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  transform(value, args, opts) {
    throw new Error('Method #transform() is abstract.');
  }
}
