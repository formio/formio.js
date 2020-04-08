import { BooleanValueSource } from './Boolean';
import { ComponentByPathValueSource } from './ComponentByPath';
import { ComponentValueByPathValueSource } from './ComponentValueByPath';
import { ConditionalAssignmentValueSource } from './ConditionalAssignment';
import { CurrentDateTimeValueSource } from './CurrentDateTime';
import { DateValueSource } from './Date';
import { DateTimeValueSource } from './DateTime';
import { NumberValueSource } from './Number';
import { RegExpValueSource } from './RegExp';
import { StringValueSource } from './String';
import { ThisComponentValueSource } from './ThisComponent';
import { ThisComponentValueValueSource } from './ThisComponentValue';
import { TimeValueSource } from './Time';
import { VariableValueSource } from './Variable';

const valueSources = [
  BooleanValueSource,
  ComponentByPathValueSource,
  ComponentValueByPathValueSource,
  ConditionalAssignmentValueSource,
  CurrentDateTimeValueSource,
  DateValueSource,
  DateTimeValueSource,
  NumberValueSource,
  RegExpValueSource,
  StringValueSource,
  ThisComponentValueSource,
  ThisComponentValueValueSource,
  TimeValueSource,
  VariableValueSource,
].reduce((result, valueSource) => ({
  ...result,
  [valueSource.name]: valueSource,
}), {});

export class ValueSources {
  static valueSources = valueSources;

  static addValueSource(name, valueSource) {
    ValueSources.valueSources[name] = valueSource;
  }

  static addValueSources(valueSources) {
    ValueSources.valueSources = { ...ValueSources.valueSources, ...valueSources };
  }

  static getValueSource(name) {
    return ValueSources.valueSources[name];
  }

  static getValueSources() {
    return ValueSources.valueSources;
  }
}
