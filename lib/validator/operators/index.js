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
import { DayBetweenOperator } from './DayBetween';
import { DayEqualsOperator } from './DayEquals';
import { DayGreaterThanOperator } from './DayGreaterThan';
import { DayGreaterThanOrEqualOperator } from './DayGreaterThanOrEqual';
import { DayLessThanOperator } from './DayLessThan';
import { DayLessThanOrEqualOperator } from './DayLessThanOrEqual';
import { EndsWithOperator } from './EndsWith';
import { EqualsOperator } from './Equals';
import { EveryOperator } from './Every';
import { GreaterThanOperator } from './GreaterThan';
import { GreaterThanOrEqualOperator } from './GreaterThanOrEqual';
import { HourBetweenOperator } from './HourBetween';
import { HourEqualsOperator } from './HourEquals';
import { HourGreaterThanOperator } from './HourGreaterThan';
import { HourGreaterThanOrEqualOperator } from './HourGreaterThanOrEqual';
import { HourLessThanOperator } from './HourLessThan';
import { HourLessThanOrEqualOperator } from './HourLessThanOrEqual';
import { IncludesOperator } from './Includes';
import { IsDaylightSavingTimeOperator } from './IsDaylightSavingTime';
import { IsEmptyOperator } from './IsEmpty';
import { IsLeapYearOperator } from './IsLeapYear';
import { IsNilOperator } from './IsNil';
import { IsTrueOperator } from './IsTrue';
import { IsZeroLengthOperator } from './IsZeroLength';
import { LessThanOperator } from './LessThan';
import { LessThanOrEqualOperator } from './LessThanOrEqual';
import { MatchPatternOperator } from './MatchPattern';
import { MinuteBetweenOperator } from './MinuteBetween';
import { MinuteEqualsOperator } from './MinuteEquals';
import { MinuteGreaterThanOperator } from './MinuteGreaterThan';
import { MinuteGreaterThanOrEqualOperator } from './MinuteGreaterThanOrEqual';
import { MinuteLessThanOperator } from './MinuteLessThan';
import { MinuteLessThanOrEqualOperator } from './MinuteLessThanOrEqual';
import { MonthBetweenOperator } from './MonthBetween';
import { MonthEqualsOperator } from './MonthEquals';
import { MonthGreaterThanOperator } from './MonthGreaterThan';
import { MonthGreaterThanOrEqualOperator } from './MonthGreaterThanOrEqual';
import { MonthLessThanOperator } from './MonthLessThan';
import { MonthLessThanOrEqualOperator } from './MonthLessThanOrEqual';
import { SecondBetweenOperator } from './SecondBetween';
import { SecondEqualsOperator } from './SecondEquals';
import { SecondGreaterThanOperator } from './SecondGreaterThan';
import { SecondGreaterThanOrEqualOperator } from './SecondGreaterThanOrEqual';
import { SecondLessThanOperator } from './SecondLessThan';
import { SecondLessThanOrEqualOperator } from './SecondLessThanOrEqual';
import { SomeOperator } from './Some';
import { StartsWithOperator } from './StartsWith';
import { WeekBetweenOperator } from './WeekBetween';
import { WeekEqualsOperator } from './WeekEquals';
import { WeekGreaterThanOperator } from './WeekGreaterThan';
import { WeekGreaterThanOrEqualOperator } from './WeekGreaterThanOrEqual';
import { WeekLessThanOperator } from './WeekLessThan';
import { WeekLessThanOrEqualOperator } from './WeekLessThanOrEqual';
import { YearBetweenOperator } from './YearBetween';
import { YearEqualsOperator } from './YearEquals';
import { YearGreaterThanOperator } from './YearGreaterThan';
import { YearGreaterThanOrEqualOperator } from './YearGreaterThanOrEqual';
import { YearLessThanOperator } from './YearLessThan';
import { YearLessThanOrEqualOperator } from './YearLessThanOrEqual';
var operators = [
    BetweenOperator,
    DateBetweenOperator,
    DateEqualsOperator,
    DateGreaterThanOperator,
    DateGreaterThanOrEqualOperator,
    DateLessThanOperator,
    DateLessThanOrEqualOperator,
    DayBetweenOperator,
    DayEqualsOperator,
    DayGreaterThanOperator,
    DayGreaterThanOrEqualOperator,
    DayLessThanOperator,
    DayLessThanOrEqualOperator,
    EndsWithOperator,
    EqualsOperator,
    EveryOperator,
    GreaterThanOperator,
    GreaterThanOrEqualOperator,
    HourBetweenOperator,
    HourEqualsOperator,
    HourGreaterThanOperator,
    HourGreaterThanOrEqualOperator,
    HourLessThanOperator,
    HourLessThanOrEqualOperator,
    IncludesOperator,
    IsDaylightSavingTimeOperator,
    IsEmptyOperator,
    IsLeapYearOperator,
    IsNilOperator,
    IsTrueOperator,
    IsZeroLengthOperator,
    LessThanOperator,
    LessThanOrEqualOperator,
    MatchPatternOperator,
    MinuteBetweenOperator,
    MinuteEqualsOperator,
    MinuteGreaterThanOperator,
    MinuteGreaterThanOrEqualOperator,
    MinuteLessThanOperator,
    MinuteLessThanOrEqualOperator,
    MonthBetweenOperator,
    MonthEqualsOperator,
    MonthGreaterThanOperator,
    MonthGreaterThanOrEqualOperator,
    MonthLessThanOperator,
    MonthLessThanOrEqualOperator,
    SecondBetweenOperator,
    SecondEqualsOperator,
    SecondGreaterThanOperator,
    SecondGreaterThanOrEqualOperator,
    SecondLessThanOperator,
    SecondLessThanOrEqualOperator,
    SomeOperator,
    StartsWithOperator,
    WeekBetweenOperator,
    WeekEqualsOperator,
    WeekGreaterThanOperator,
    WeekGreaterThanOrEqualOperator,
    WeekLessThanOperator,
    WeekLessThanOrEqualOperator,
    YearBetweenOperator,
    YearEqualsOperator,
    YearGreaterThanOperator,
    YearGreaterThanOrEqualOperator,
    YearLessThanOperator,
    YearLessThanOrEqualOperator,
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
