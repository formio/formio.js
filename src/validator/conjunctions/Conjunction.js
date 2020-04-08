export class Conjunction {
  constructor(options) {
    this.options = options;
  }

  static get name() {
    throw new Error('Getter #name() is abstract.');
  }

  static get title() {
    throw new Error('Getter #title() is abstract.');
  }

  static get weight() {
    return 0;
  }

  // eslint-disable-next-line no-unused-vars
  execute(conditionParts) {
    throw new Error('Method #execute() is abstract.');
  }
}
