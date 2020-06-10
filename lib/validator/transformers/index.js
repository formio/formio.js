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
var transformers = [
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
