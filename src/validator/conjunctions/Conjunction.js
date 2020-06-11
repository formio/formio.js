import { BaseEntity } from '../BaseEntity';

export class Conjunction extends BaseEntity {
  static get weight() {
    return 0;
  }

  static get lazyConditionPartsEvaluation() {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(conditionParts) {
    throw new Error('Method #execute() is abstract.');
  }
}
