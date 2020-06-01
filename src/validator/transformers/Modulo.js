import { Transformer } from './Transformer';

export class ModuloTransformer extends Transformer {
  static get title() {
    return 'Modulo';
  }

  static get name() {
    return 'modulo';
  }

  static get arguments() {
    return [
      {
        name: 'Divisor',
        key: 'divisor',
        required: true,
      },
    ];
  }

  transform(value, args) {
    const {
      divisor,
    } = args;

    return value % divisor;
  }
}
