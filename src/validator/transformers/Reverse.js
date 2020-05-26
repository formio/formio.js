import { Transformer } from './Transformer';

export class ReverseTransformer extends Transformer {
  static get title() {
    return 'Reverse';
  }

  static get name() {
    return 'reverse';
  }

  transform(value) {
    // Revert array in immutable manner.
    return value?.slice?.().reverse;
  }
}
