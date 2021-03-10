export default class QuickRules {
  static quickRules = {};

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
