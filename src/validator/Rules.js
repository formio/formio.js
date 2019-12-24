import rules from './rules/index';

export default class Rules {
  static rules = rules;

  static addRule(name, rule) {
    Rules.rules[name] = rule;
  }

  static addRules(rules) {
    Rules.rules = { ...Rules.rules, ...rules };
  }

  static getRule(name) {
    return Rules.rules[name];
  }

  static getRules() {
    return Rules.rules;
  }
}
