export class QuickRule {
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
  static getEditForm(options) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  addRule(input) {
    throw new Error('Method #addRule() is abstract.');
  }
}
