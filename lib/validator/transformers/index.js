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
import { AbsTransformer } from './Abs';
import { AddTransformer } from './Add';
import { AddDateComponentTransformer } from './AddDateComponent';
import { AddDaysTransformer } from './AddDays';
import { AddHoursTransformer } from './AddHours';
import { AddMillsecondsTransformer } from './AddMillseconds';
import { AddMinutesTransformer } from './AddMinutes';
import { AddMonthsTransformer } from './AddMonths';
import { AddPropertyTransformer } from './AddProperty';
import { AddQuartersTransformer } from './AddQuarters';
import { AddSecondsTransformer } from './AddSeconds';
import { AddWeeksTransformer } from './AddWeeks';
import { AddYearsTransformer } from './AddYears';
import { AtIndexTransformer } from './AtIndex';
import { CamelCaseTransformer } from './CamelCase';
import { CapitalizeTransformer } from './Capitalize';
import { CloneTransformer } from './Clone';
import { CloneDeepTransformer } from './CloneDeep';
import { ConcatTransformer } from './Concat';
import { DivideTransformer } from './Divide';
import { FilterTransformer } from './Filter';
import { FindTransformer } from './Find';
import { FindIndexTransformer } from './FindIndex';
import { FindKeyTransformer } from './FindKey';
import { FindLastTransformer } from './FindLast';
import { FindLastIndexTransformer } from './FindLastIndex';
import { FindLastKeyTransformer } from './FindLastKey';
import { FirstTransformer } from './First';
import { FlatTransformer } from './Flat';
import { FlatMapTransformer } from './FlatMap';
import { GetDateComponentTransformer } from './GetDateComponent';
import { GetDateDifferenceTransformer } from './GetDateDifference';
import { GetDateOfMonthTransformer } from './GetDateOfMonth';
import { GetDayOfWeekTransformer } from './GetDayOfWeek';
import { GetDayOfYearTransformer } from './GetDayOfYear';
import { GetDaysBetweenTransformer } from './GetDaysBetween';
import { GetDaysInMonthTransformer } from './GetDaysInMonth';
import { GetHourTransformer } from './GetHour';
import { GetHoursBetweenTransformer } from './GetHoursBetween';
import { GetMillisecondTransformer } from './GetMillisecond';
import { GetMillisecondsBetweenTransformer } from './GetMillisecondsBetween';
import { GetMinuteTransformer } from './GetMinute';
import { GetMinutesBetweenTransformer } from './GetMinutesBetween';
import { GetMonthTransformer } from './GetMonth';
import { GetMonthsBetweenTransformer } from './GetMonthsBetween';
import { GetParentTransformer } from './GetParent';
import { GetQuarterTransformer } from './GetQuarter';
import { GetQuartersBetweenTransformer } from './GetQuartersBetween';
import { GetRowTransformer } from './GetRow';
import { GetRowIndexTransformer } from './GetRowIndex';
import { GetSecondTransformer } from './GetSecond';
import { GetSecondsBetweenTransformer } from './GetSecondsBetween';
import { GetValueTransformer } from './GetValue';
import { GetWeekOfYearTransformer } from './GetWeekOfYear';
import { GetWeeksBetweenTransformer } from './GetWeeksBetween';
import { GetWeeksInYearTransformer } from './GetWeeksInYear';
import { GetWeekYearTransformer } from './GetWeekYear';
import { GetYearTransformer } from './GetYear';
import { GetYearsBetweenTransformer } from './GetYearsBetween';
import { GroupByTransformer } from './GroupBy';
import { IdentityTransformer } from './Identity';
import { JoinTransformer } from './Join';
import { KebabCaseTransformer } from './KebabCase';
import { LastTransformer } from './Last';
import { LengthTransformer } from './Length';
import { LowerCaseTransformer } from './LowerCase';
import { LowerFirstTransformer } from './LowerFirst';
import { MapTransformer } from './Map';
import { MapKeysTransformer } from './MapKeys';
import { MapValuesTransformer } from './MapValues';
import { MaxTransformer } from './Max';
import { MaxDateTransformer } from './MaxDate';
import { MinTransformer } from './Min';
import { MinDateTransformer } from './MinDate';
import { ModuloTransformer } from './Modulo';
import { MultiplyTransformer } from './Multiply';
import { PropertyTransformer } from './Property';
import { ReduceTransformer } from './Reduce';
import { ReduceRightTransformer } from './ReduceRight';
import { RejectTransformer } from './Reject';
import { ReverseTransformer } from './Reverse';
import { SetDateComponentTransformer } from './SetDateComponent';
import { SetDateOfMonthTransformer } from './SetDateOfMonth';
import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';
import { SetDateToEndOfDayTransformer } from './SetDateToEndOfDay';
import { SetDateToEndOfHourTransformer } from './SetDateToEndOfHour';
import { SetDateToEndOfMinuteTransformer } from './SetDateToEndOfMinute';
import { SetDateToEndOfMonthTransformer } from './SetDateToEndOfMonth';
import { SetDateToEndOfQuarterTransformer } from './SetDateToEndOfQuarter';
import { SetDateToEndOfSecondTransformer } from './SetDateToEndOfSecond';
import { SetDateToEndOfWeekTransformer } from './SetDateToEndOfWeek';
import { SetDateToEndOfYearTransformer } from './SetDateToEndOfYear';
import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';
import { SetDateToStartOfDayTransformer } from './SetDateToStartOfDay';
import { SetDateToStartOfHourTransformer } from './SetDateToStartOfHour';
import { SetDateToStartOfMinuteTransformer } from './SetDateToStartOfMinute';
import { SetDateToStartOfMonthTransformer } from './SetDateToStartOfMonth';
import { SetDateToStartOfQuarterTransformer } from './SetDateToStartOfQuarter';
import { SetDateToStartOfSecondTransformer } from './SetDateToStartOfSecond';
import { SetDateToStartOfWeekTransformer } from './SetDateToStartOfWeek';
import { SetDateToStartOfYearTransformer } from './SetDateToStartOfYear';
import { SetDayOfWeekTransformer } from './SetDayOfWeek';
import { SetDayOfYearTransformer } from './SetDayOfYear';
import { SetHourTransformer } from './SetHour';
import { SetMillisecondTransformer } from './SetMillisecond';
import { SetMinuteTransformer } from './SetMinute';
import { SetMonthTransformer } from './SetMonth';
import { SetQuarterTransformer } from './SetQuarter';
import { SetSecondTransformer } from './SetSecond';
import { SetWeekOfYearTransformer } from './SetWeekOfYear';
import { SetWeekYearTransformer } from './SetWeekYear';
import { SetYearTransformer } from './SetYear';
import { SliceTransformer } from './Slice';
import { SnakeCaseTransformer } from './SnakeCase';
import { SplitTransformer } from './Split';
import { StartCaseTransformer } from './StartCase';
import { SubtractTransformer } from './Subtract';
import { SubtractDateComponentTransformer } from './SubtractDateComponent';
import { SubtractDaysTransformer } from './SubtractDays';
import { SubtractHoursTransformer } from './SubtractHours';
import { SubtractMillsecondsTransformer } from './SubtractMillseconds';
import { SubtractMinutesTransformer } from './SubtractMinutes';
import { SubtractMonthsTransformer } from './SubtractMonths';
import { SubtractQuartersTransformer } from './SubtractQuarters';
import { SubtractSecondsTransformer } from './SubtractSeconds';
import { SubtractWeeksTransformer } from './SubtractWeeks';
import { SubtractYearsTransformer } from './SubtractYears';
import { ToLowerTransformer } from './ToLower';
import { ToNumberTransformer } from './ToNumber';
import { ToUpperTransformer } from './ToUpper';
import { UpperCaseTransformer } from './UpperCase';
import { UpperFirstTransformer } from './UpperFirst';
var transformers = [
    AbsTransformer,
    AddTransformer,
    AddDateComponentTransformer,
    AddDaysTransformer,
    AddHoursTransformer,
    AddMillsecondsTransformer,
    AddMinutesTransformer,
    AddMonthsTransformer,
    AddPropertyTransformer,
    AddQuartersTransformer,
    AddSecondsTransformer,
    AddWeeksTransformer,
    AddYearsTransformer,
    AtIndexTransformer,
    CamelCaseTransformer,
    CapitalizeTransformer,
    CloneTransformer,
    CloneDeepTransformer,
    ConcatTransformer,
    DivideTransformer,
    FilterTransformer,
    FindTransformer,
    FindIndexTransformer,
    FindKeyTransformer,
    FindLastTransformer,
    FindLastIndexTransformer,
    FindLastKeyTransformer,
    FirstTransformer,
    FlatTransformer,
    FlatMapTransformer,
    GetDateComponentTransformer,
    GetDateDifferenceTransformer,
    GetDateOfMonthTransformer,
    GetDayOfWeekTransformer,
    GetDayOfYearTransformer,
    GetDaysBetweenTransformer,
    GetDaysInMonthTransformer,
    GetHourTransformer,
    GetHoursBetweenTransformer,
    GetMillisecondTransformer,
    GetMillisecondsBetweenTransformer,
    GetMinuteTransformer,
    GetMinutesBetweenTransformer,
    GetMonthTransformer,
    GetMonthsBetweenTransformer,
    GetParentTransformer,
    GetQuarterTransformer,
    GetQuartersBetweenTransformer,
    GetRowTransformer,
    GetRowIndexTransformer,
    GetSecondTransformer,
    GetSecondsBetweenTransformer,
    GetValueTransformer,
    GetWeekOfYearTransformer,
    GetWeeksBetweenTransformer,
    GetWeeksInYearTransformer,
    GetWeekYearTransformer,
    GetYearTransformer,
    GetYearsBetweenTransformer,
    GroupByTransformer,
    IdentityTransformer,
    JoinTransformer,
    KebabCaseTransformer,
    LastTransformer,
    LengthTransformer,
    LowerCaseTransformer,
    LowerFirstTransformer,
    MapTransformer,
    MapKeysTransformer,
    MapValuesTransformer,
    MaxTransformer,
    MaxDateTransformer,
    MinTransformer,
    MinDateTransformer,
    ModuloTransformer,
    MultiplyTransformer,
    PropertyTransformer,
    ReduceTransformer,
    ReduceRightTransformer,
    RejectTransformer,
    ReverseTransformer,
    SetDateComponentTransformer,
    SetDateOfMonthTransformer,
    SetDateToEndOfComponentTransformer,
    SetDateToEndOfDayTransformer,
    SetDateToEndOfHourTransformer,
    SetDateToEndOfMinuteTransformer,
    SetDateToEndOfMonthTransformer,
    SetDateToEndOfQuarterTransformer,
    SetDateToEndOfSecondTransformer,
    SetDateToEndOfWeekTransformer,
    SetDateToEndOfYearTransformer,
    SetDateToStartOfComponentTransformer,
    SetDateToStartOfDayTransformer,
    SetDateToStartOfHourTransformer,
    SetDateToStartOfMinuteTransformer,
    SetDateToStartOfMonthTransformer,
    SetDateToStartOfQuarterTransformer,
    SetDateToStartOfSecondTransformer,
    SetDateToStartOfWeekTransformer,
    SetDateToStartOfYearTransformer,
    SetDayOfWeekTransformer,
    SetDayOfYearTransformer,
    SetHourTransformer,
    SetMillisecondTransformer,
    SetMinuteTransformer,
    SetMonthTransformer,
    SetQuarterTransformer,
    SetSecondTransformer,
    SetWeekOfYearTransformer,
    SetWeekYearTransformer,
    SetYearTransformer,
    SliceTransformer,
    SnakeCaseTransformer,
    SplitTransformer,
    StartCaseTransformer,
    SubtractTransformer,
    SubtractDateComponentTransformer,
    SubtractDaysTransformer,
    SubtractHoursTransformer,
    SubtractMillsecondsTransformer,
    SubtractMinutesTransformer,
    SubtractMonthsTransformer,
    SubtractQuartersTransformer,
    SubtractSecondsTransformer,
    SubtractWeeksTransformer,
    SubtractYearsTransformer,
    ToLowerTransformer,
    ToNumberTransformer,
    ToUpperTransformer,
    UpperCaseTransformer,
    UpperFirstTransformer,
].reduce(function (result, transformer) {
    var _a;
    return (__assign(__assign({}, result), (_a = {}, _a[transformer.name] = transformer, _a)));
}, {});
var Transformers = /** @class */ (function () {
    function Transformers() {
    }
    Transformers.addTransformer = function (name, transformer) {
        Transformers.transformers[name] = transformer;
    };
    Transformers.addTransformers = function (transformers) {
        Transformers.transformers = __assign(__assign({}, Transformers.transformers), transformers);
    };
    Transformers.getTransformer = function (name) {
        return Transformers.transformers[name];
    };
    Transformers.getTransformers = function () {
        return Transformers.transformers;
    };
    Transformers.transformers = transformers;
    return Transformers;
}());
export { Transformers };
