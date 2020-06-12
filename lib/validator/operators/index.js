import { BetweenOperator } from './Between';
import { DateBetweenOperator } from './DateBetween';
import { DateEqualsOperator } from './DateEquals';
import { DateGreaterThanOperator } from './DateGreaterThan';
import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';
import { DateLessThanOperator } from './DateLessThan';
import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';
import { EndsWithOperator } from './EndsWith';
import { EqualsOperator } from './Equals';
import { EveryOperator } from './Every';
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
import { SomeOperator } from './Some';
import { StartsWithOperator } from './StartsWith';
const operators = [
    BetweenOperator,
    DateBetweenOperator,
    DateEqualsOperator,
    DateGreaterThanOperator,
    DateGreaterThanOrEqualOperator,
    DateLessThanOperator,
    DateLessThanOrEqualOperator,
    EndsWithOperator,
    EqualsOperator,
    EveryOperator,
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
    SomeOperator,
    StartsWithOperator,
].reduce((result, operator) => {
    if (operator.hasComplementaryOperator) {
        const { complementaryOperator } = operator;
        return Object.assign(Object.assign({}, result), { [operator.name]: operator, [complementaryOperator.name]: complementaryOperator });
    }
    return Object.assign(Object.assign({}, result), { [operator.name]: operator });
}, {});
export class Operators {
    static addOperator(name, operator) {
        Operators.operators[name] = operator;
    }
    static addOperators(operators) {
        Operators.operators = Object.assign(Object.assign({}, Operators.operators), operators);
    }
    static getOperator(name) {
        return Operators.operators[name];
    }
    static getOperators() {
        return Operators.operators;
    }
}
Operators.operators = operators;
