import { Transformer } from './Transformer';

export class MultiplyTransformer extends Transformer {
  static get title() {
    return 'Multiply';
  }

  static get name() {
    return 'multiply';
  }

  static get arguments() {
    return [
      {
        name: 'Multiplier',
        key: 'multiplier',
        required: true,
      },
    ];
  }

  transform(value, args) {
    const {
      multiplier,
    } = args;

    return value * multiplier;
  }
}
