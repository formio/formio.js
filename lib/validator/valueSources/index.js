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
const valueSources = [
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
].reduce((result, valueSource) => (Object.assign(Object.assign({}, result), { [valueSource.name]: valueSource })), {});
export class ValueSources {
    static addValueSource(name, valueSource) {
        ValueSources.valueSources[name] = valueSource;
    }
    static addValueSources(valueSources) {
        ValueSources.valueSources = Object.assign(Object.assign({}, ValueSources.valueSources), valueSources);
    }
    static getValueSource(name) {
        return ValueSources.valueSources[name];
    }
    static getValueSources() {
        return ValueSources.valueSources;
    }
}
ValueSources.valueSources = valueSources;
