import { Transformer } from './Transformer';

export class GetValueTransformer extends Transformer {
  static get title() {
    return 'Get Value';
  }

  static get name() {
    return 'getValue';
  }

  transform(value) {
    return value?.dataValue ?? null;
  }
}
