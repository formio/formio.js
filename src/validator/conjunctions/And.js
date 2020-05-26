import { Conjunction } from './Conjunction';

export class AndConjunction extends Conjunction {
  static get name() {
    return 'and';
  }

  static get title() {
    return 'And';
  }

  static get weight() {
    return 0;
  }

  static get lazyConditionPartsEvaluation() {
    return true;
  }

  execute(conditionParts) {
    return conditionParts.reduce((result, conditionPart) => (result && conditionPart()), true);
  }
}
