export default class Operators {
  static operators = {};

  static addOperator(name, operator) {
    Operators.operators[name] = operator;
  }

  static addOperators(operators) {
    Operators.operators = { ...Operators.operators, ...operators };
  }

  static getOperator(name) {
    return Operators.operators[name];
  }

  static getOperators() {
    return Operators.operators;
  }
}
