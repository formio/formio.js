import { Transformer } from './Transformer';

export class SliceTransformer extends Transformer {
  static get title() {
    return 'Slice';
  }

  static get name() {
    return 'slice';
  }

  static get arguments() {
    return [
      {
        name: 'From',
        key: 'from',
        required: true,
      },
      {
        name: 'To',
        key: 'to',
        required: false,
      },
    ];
  }

  transform(value, args) {
    const {
      from,
      to,
    } = args;

    return value?.slice?.(from, to) ?? null;
  }
}
