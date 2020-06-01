import { Transformer } from './Transformer';

export class JoinTransformer extends Transformer {
  static get title() {
    return 'Join';
  }

  static get name() {
    return 'join';
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

    return value?.join?.(separator);
  }
}
