import { BetweenOperator } from './Between';
import { EndsWithOperator } from './EndsWith';
import { EqualsOperator } from './Equals';
import { GreaterThanOperator } from './GreaterThan';
import { GreaterThanOrEqualOperator } from './GreaterThanOrEqual';
import { IncludesOperator } from './Includes';
import { IsEmptyOperator } from './IsEmpty';
import { IsNilOperator } from './IsNil';
import { IsTrueOperator } from './IsTrue';
import { IsZeroLengthOperator } from './IsZeroLength';
import { LessThanOperator } from './LessThan';
import { LessThanOrEqualOperator } from './LessThanOrEqual';
import { MatchPatternOperator } from './MatchPattern';
import { StartsWithOperator } from './StartsWith';

const operators = [
  BetweenOperator,
  EndsWithOperator,
  EqualsOperator,
  GreaterThanOperator,
  GreaterThanOrEqualOperator,
  IncludesOperator,
  IsEmptyOperator,
  IsNilOperator,
  IsTrueOperator,
  IsZeroLengthOperator,
  LessThanOperator,
  LessThanOrEqualOperator,
  MatchPatternOperator,
  StartsWithOperator,
].reduce((result, operator) => {
  if (operator.hasComplementaryOperator) {
    const { complementaryOperator } = operator;

    return {
      ...result,
      [operator.name]: operator,
      [complementaryOperator.name]: complementaryOperator,
    };
  }

  return {
    ...result,
    [operator.name]: operator,
  };
}, {});

export class Operators {
  static operators = operators;

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
