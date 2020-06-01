import { Transformer } from './Transformer';

export class AtIndexTransformer extends Transformer {
  static get title() {
    return 'At Index';
  }

  static get name() {
    return 'atIndex';
  }

  static get arguments() {
    return [
      {
        name: 'Index',
        key: 'index',
        required: true,
      },
    ];
  }

  transform(value, args) {
    const {
      index,
    } = args;

    return value?.[index] ?? null;
  }
}
