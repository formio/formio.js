import { AbsTransformer } from './Abs';
import { AddTransformer } from './Add';
import { AtIndexTransformer } from './AtIndex';
import { CloneTransformer } from './Clone';
import { CloneDeepTransformer } from './CloneDeep';
import { ConcatTransformer } from './Concat';
import { DateDifferenceTransformer } from './DateDifference';
import { DivideTransformer } from './Divide';
import { FilterTransformer } from './Filter';
import { FindTransformer } from './Find';
import { FindIndexTransformer } from './FindIndex';
import { FindLastTransformer } from './FindLast';
import { FindLastIndexTransformer } from './FindLastIndex';
import { FirstTransformer } from './First';
import { FlatTransformer } from './Flat';
import { FlatMapTransformer } from './FlatMap';
import { GetParentTransformer } from './GetParent';
import { GetRowTransformer } from './GetRow';
import { GetRowIndexTransformer } from './GetRowIndex';
import { GetValueTransformer } from './GetValue';
import { IdentityTransformer } from './Identity';
import { JoinTransformer } from './Join';
import { LastTransformer } from './Last';
import { LengthTransformer } from './Length';
import { MapTransformer } from './Map';
import { ModuloTransformer } from './Modulo';
import { MultiplyTransformer } from './Multiply';
import { PropertyTransformer } from './Property';
import { ReduceTransformer } from './Reduce';
import { ReduceRightTransformer } from './ReduceRight';
import { RejectTransformer } from './Reject';
import { ReverseTransformer } from './Reverse';
import { SliceTransformer } from './Slice';
import { SplitTransformer } from './Split';
import { SubtractTransformer } from './Subtract';
import { ToNumberTransformer } from './ToNumber';
const transformers = [
    AbsTransformer,
    AddTransformer,
    AtIndexTransformer,
    CloneTransformer,
    CloneDeepTransformer,
    ConcatTransformer,
    DateDifferenceTransformer,
    DivideTransformer,
    FilterTransformer,
    FindTransformer,
    FindIndexTransformer,
    FindLastTransformer,
    FindLastIndexTransformer,
    FirstTransformer,
    FlatTransformer,
    FlatMapTransformer,
    GetParentTransformer,
    GetRowTransformer,
    GetRowIndexTransformer,
    GetValueTransformer,
    IdentityTransformer,
    JoinTransformer,
    LastTransformer,
    LengthTransformer,
    MapTransformer,
    ModuloTransformer,
    MultiplyTransformer,
    PropertyTransformer,
    ReduceTransformer,
    ReduceRightTransformer,
    RejectTransformer,
    ReverseTransformer,
    SliceTransformer,
    SplitTransformer,
    SubtractTransformer,
    ToNumberTransformer,
].reduce((result, transformer) => (Object.assign(Object.assign({}, result), { [transformer.name]: transformer })), {});
export class Transformers {
    static addTransformer(name, transformer) {
        Transformers.transformers[name] = transformer;
    }
    static addTransformers(transformers) {
        Transformers.transformers = Object.assign(Object.assign({}, Transformers.transformers), transformers);
    }
    static getTransformer(name) {
        return Transformers.transformers[name];
    }
    static getTransformers() {
        return Transformers.transformers;
    }
}
Transformers.transformers = transformers;
