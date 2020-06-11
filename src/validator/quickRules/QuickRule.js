import { BaseEntity } from '../BaseEntity';

export class QuickRule extends BaseEntity {
  static get weight() {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getEditForm(options) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addRule(input) {
    throw new Error('Method #addRule() is abstract.');
  }
}
