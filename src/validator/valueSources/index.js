export default class ValueSources {
  static valueSources = {};

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
