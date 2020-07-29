var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { IterateeTransformer } from './Iteratee';
var BaseReduceTransformer = /** @class */ (function (_super) {
    __extends(BaseReduceTransformer, _super);
    function BaseReduceTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseReduceTransformer, "arguments", {
        get: function () {
            return __spreadArrays(IterateeTransformer.arguments, [
                {
                    name: 'Initial Value',
                    key: 'initialValue',
                    required: false,
                },
            ]);
        },
        enumerable: false,
        configurable: true
    });
    BaseReduceTransformer.prototype.getReduceIterateeContext = function (accumulator, item, itemIndex) {
        return __assign(__assign({}, this.getIterateeContext(item, itemIndex)), { accumulator: accumulator });
    };
    BaseReduceTransformer.prototype.getReduceIteratee = function (valueEvaluator) {
        var _this = this;
        return function (accumulator, item, itemIndex) {
            var context = valueEvaluator.evaluationContext.context;
            return valueEvaluator({
                context: __assign(__assign({}, context), { options: __assign(__assign({}, context.options), _this.getReduceIterateeContext(accumulator, item, itemIndex)), engineOptions: __assign(__assign({}, context.engineOptions), _this.iterateeEngineOptions) }),
            });
        };
    };
    return BaseReduceTransformer;
}(IterateeTransformer));
export { BaseReduceTransformer };
