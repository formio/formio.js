import { Transformer } from './Transformer';

export class LengthTransformer extends Transformer {
  static get title() {
    return 'Length';
  }

  static get name() {
    return 'length';
  }

  transform(value) {
    return value?.length ?? null;
  }
}
