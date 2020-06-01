import { Transformer } from './Transformer';

export class ConcatTransformer extends Transformer {
  static get title() {
    return 'Concat';
  }

  static get name() {
    return 'concat';
  }

  static get arguments() {
    return [
      {
        name: 'Value To Add',
        key: 'valueToAdd',
        required: true,
      },
    ];
  }

  transform(value, args) {
    const {
      valueToAdd,
    } = args;

    return value?.concat?.(valueToAdd);
  }
}
