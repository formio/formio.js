import { Conjunction } from './Conjunction';

export class OrConjunction extends Conjunction {
  static get name() {
    return 'or';
  }

  static get title() {
    return 'Or';
  }

  static get weight() {
    return 10;
  }

  execute(conditionParts) {
    return conditionParts.reduce((result, conditionPart) => (result || conditionPart), false);
  }
}
