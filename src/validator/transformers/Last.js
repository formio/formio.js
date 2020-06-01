import { Transformer } from './Transformer';

export class LastTransformer extends Transformer {
  static get title() {
    return 'Last';
  }

  static get name() {
    return 'last';
  }

  transform(value) {
    return value?.[value.length - 1] ?? null;
  }
}
