import { IdentityTransformer } from './Identity';
import { LengthTransformer } from './Length';
import { PropertyTransformer } from './Property';
import { SliceArrayTransformer } from './Slice';
import { SplitTransformer } from './Split';

const transformers = [
  IdentityTransformer,
  LengthTransformer,
  PropertyTransformer,
  SliceArrayTransformer,
  SplitTransformer,
].reduce((result, transformer) => ({
  ...result,
  [transformer.name]: transformer,
}), {});

export class Transformers {
  static transformers = transformers;

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
