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
import { AccumulatorValueSource } from './Accumulator';
import { BooleanValueSource } from './Boolean';
import { ComponentByPathValueSource } from './ComponentByPath';
import { ComponentRowByPathValueSource } from './ComponentRowByPath';
import { ComponentRowIndexByPathValueSource } from './ComponentRowIndexByPath';
import { ComponentValueByPathValueSource } from './ComponentValueByPath';
import { ConditionValueSource } from './Condition';
import { ConditionalAssignmentValueSource } from './ConditionalAssignment';
import { CurrentDateTimeValueSource } from './CurrentDateTime';
import { DateValueSource } from './Date';
import { DateTimeValueSource } from './DateTime';
import { EmptyArrayValueSource } from './EmptyArray';
import { EmptyObjectValueSource } from './EmptyObject';
import { FormValueSource } from './Form';
import { FormDataValueSource } from './FormData';
import { ItemValueSource } from './Item';
import { ItemIndexValueSource } from './ItemIndex';
import { ListValueSource } from './List';
import { NumberValueSource } from './Number';
import { ParentItemIndexesValueSource } from './ParentItemIndexes';
import { ParentItemsValueSource } from './ParentItems';
import { RangeValueSource } from './Range';
import { RegExpValueSource } from './RegExp';
import { SourceComponentValueSource } from './SourceComponent';
import { SourceComponentRowValueSource } from './SourceComponentRow';
import { SourceComponentRowIndexValueSource } from './SourceComponentRowIndex';
import { SourceComponentValueValueSource } from './SourceComponentValue';
import { StringValueSource } from './String';
import { ThisComponentValueSource } from './ThisComponent';
import { ThisComponentRowValueSource } from './ThisComponentRow';
import { ThisComponentRowIndexValueSource } from './ThisComponentRowIndex';
import { ThisComponentValueValueSource } from './ThisComponentValue';
import { TimeValueSource } from './Time';
import { ValuesValueSource } from './Values';
import { VariableValueSource } from './Variable';
var valueSources = [
    AccumulatorValueSource,
    BooleanValueSource,
    ComponentByPathValueSource,
    ComponentRowByPathValueSource,
    ComponentRowIndexByPathValueSource,
    ComponentValueByPathValueSource,
    ConditionValueSource,
    ConditionalAssignmentValueSource,
    CurrentDateTimeValueSource,
    DateValueSource,
    DateTimeValueSource,
    EmptyArrayValueSource,
    EmptyObjectValueSource,
    FormValueSource,
    FormDataValueSource,
    ItemValueSource,
    ItemIndexValueSource,
    ListValueSource,
    NumberValueSource,
    ParentItemIndexesValueSource,
    ParentItemsValueSource,
    RangeValueSource,
    RegExpValueSource,
    SourceComponentValueSource,
    SourceComponentRowValueSource,
    SourceComponentRowIndexValueSource,
    SourceComponentValueValueSource,
    StringValueSource,
    ThisComponentValueSource,
    ThisComponentRowValueSource,
    ThisComponentRowIndexValueSource,
    ThisComponentValueValueSource,
    TimeValueSource,
    ValuesValueSource,
    VariableValueSource,
].reduce(function (result, valueSource) {
    var _a;
    return (__assign(__assign({}, result), (_a = {}, _a[valueSource.name] = valueSource, _a)));
}, {});
var ValueSources = /** @class */ (function () {
    function ValueSources() {
    }
    ValueSources.addValueSource = function (name, valueSource) {
        ValueSources.valueSources[name] = valueSource;
    };
    ValueSources.addValueSources = function (valueSources) {
        ValueSources.valueSources = __assign(__assign({}, ValueSources.valueSources), valueSources);
    };
    ValueSources.getValueSource = function (name) {
        return ValueSources.valueSources[name];
    };
    ValueSources.getValueSources = function () {
        return ValueSources.valueSources;
    };
    ValueSources.valueSources = valueSources;
    return ValueSources;
}());
export { ValueSources };
