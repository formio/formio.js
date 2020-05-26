import { Transformer } from './Transformer';

export class FirstTransformer extends Transformer {
  static get title() {
    return 'First';
  }

  static get name() {
    return 'first';
  }

  transform(value) {
    return value?.[0] ?? null;
  }
}
