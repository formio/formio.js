import { MaxQuickRule } from './Max';
import { MaxLengthQuickRule } from './MaxLength';
import { MaxWordsQuickRule } from './MaxWords';
import { MinQuickRule } from './Min';
import { MinLengthQuickRule } from './MinLength';
import { MinWordsQuickRule } from './MinWords';
import { PatternRule } from './Pattern';
import { RequiredQuickRule } from './Required';

const quickRules = [
  MaxQuickRule,
  MaxLengthQuickRule,
  MaxWordsQuickRule,
  MinQuickRule,
  MinLengthQuickRule,
  MinWordsQuickRule,
  PatternRule,
  RequiredQuickRule,
].reduce((result, quickRule) => ({
  ...result,
  [quickRule.name]: quickRule,
}), {});

export class QuickRules {
  static quickRules = quickRules;

  static addQuickRule(name, quickRule) {
    QuickRules.quickRules[name] = quickRule;
  }

  static addQuickRules(quickRules) {
    QuickRules.quickRules = { ...QuickRules.quickRules, ...quickRules };
  }

  static getQuickRule(name) {
    return QuickRules.quickRules[name];
  }

  static getQuickRules() {
    return QuickRules.quickRules;
  }
}
