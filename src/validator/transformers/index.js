export default class Transformers {
  static transformers = {};

  static addTransformer(name, transformer) {
    Transformers.transformers[name] = transformer;
  }

  static addTransformers(transformers) {
    Transformers.transformers = { ...Transformers.transformers, ...transformers };
  }

  static getTransformer(name) {
    return Transformers.transformers[name];
  }

  static getTransformers() {
    return Transformers.transformers;
  }
}
