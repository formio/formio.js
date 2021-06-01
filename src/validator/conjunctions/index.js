export default class Conjunctions {
  static conjunctions = {};

  static addConjunction(name, conjunction) {
    Conjunctions.conjunctions[name] = conjunction;
  }

  static addConjunctions(conjunctions) {
    Conjunctions.conjunctions = { ...Conjunctions.conjunctions, ...conjunctions };
  }

  static getConjunction(name) {
    return Conjunctions.conjunctions[name];
  }

  static getConjunctions() {
    return Conjunctions.conjunctions;
  }
}
