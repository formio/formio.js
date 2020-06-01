import { Transformer } from './Transformer';

export class SplitTransformer extends Transformer {
  static get title() {
    return 'Split';
  }

  static get name() {
    return 'split';
  }

  static get arguments() {
    return [
      {
        name: 'Separator',
        key: 'separator',
        required: false,
      },
    ];
  }

  transform(value, args) {
    const { separator } = args;

    return value?.split?.(separator);
  }
}
