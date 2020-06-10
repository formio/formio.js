var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var operators = [
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
].reduce(function (result, operator) {
    var _a, _b;
    if (operator.hasComplementaryOperator) {
        var complementaryOperator = operator.complementaryOperator;
        return __assign(__assign({}, result), (_a = {}, _a[operator.name] = operator, _a[complementaryOperator.name] = complementaryOperator, _a));
    }
    return __assign(__assign({}, result), (_b = {}, _b[operator.name] = operator, _b));
}, {});
var Operators = /** @class */ (function () {
    function Operators() {
    }
    Operators.addOperator = function (name, operator) {
        Operators.operators[name] = operator;
    };
    Operators.addOperators = function (operators) {
        Operators.operators = __assign(__assign({}, Operators.operators), operators);
    };
    Operators.getOperator = function (name) {
        return Operators.operators[name];
    };
    Operators.getOperators = function () {
        return Operators.operators;
    };
    Operators.operators = operators;
    return Operators;
}());
export { Operators };
