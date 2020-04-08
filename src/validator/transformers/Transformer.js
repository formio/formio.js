export class Transformer {
  constructor(options) {
    this.options = options;
  }

  static get name() {
    throw new Error('Getter #name() is abstract.');
  }

  static get title() {
    throw new Error('Getter #title() is abstract.');
  }

  static get arguments() {
    return [];
  }

  // eslint-disable-next-line no-unused-vars
  transform(value, args) {
    throw new Error('Method #transform() is abstract.');
  }
}
