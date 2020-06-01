import { Transformer } from './Transformer';

export class FlatTransformer extends Transformer {
  static get title() {
    return 'Flat';
  }

  static get name() {
    return 'flat';
  }

  static get arguments() {
    return [
      {
        name: 'Depth',
        key: 'depth',
        required: false,
      },
    ];
  }

  transform(value, args) {
    const {
      depth = 1,
    } = args;

    return value?.flat?.(depth);
  }
}
