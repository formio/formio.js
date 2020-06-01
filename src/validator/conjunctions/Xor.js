import { Conjunction } from './Conjunction';

export class XorConjunction extends Conjunction {
  static get name() {
    return 'xor';
  }

  static get title() {
    return 'Xor';
  }

  static get weight() {
    return 20;
  }

  static get lazyConditionPartsEvaluation() {
    return true;
  }

  execute(conditionParts) {
    let amount = 0;

    for (const conditionPart of conditionParts) {
      const result = conditionPart();

      if (result) {
        amount += 1;

        if (amount > 1) {
          return false;
        }
      }
    }

    return true;
  }
}
