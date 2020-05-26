import { Transformer } from './Transformer';

export class SubtractTransformer extends Transformer {
  static get title() {
    return 'Subtract';
  }

  static get name() {
    return 'subtract';
  }

  static get arguments() {
    return [
      {
        name: 'Value To Subtract',
        key: 'valueToSubtract',
        required: true,
      },
    ];
  }

  transform(value, args) {
    const {
      valueToSubtract,
    } = args;

    return value - valueToSubtract;
  }
}
