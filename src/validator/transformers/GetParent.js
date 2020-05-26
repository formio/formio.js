import { Transformer } from './Transformer';

export class GetParentTransformer extends Transformer {
  static get title() {
    return 'Get Parent';
  }

  static get name() {
    return 'getParent';
  }

  transform(value) {
    return value?.parent ?? null;
  }
}
