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
import { BaseReduceTransformer } from './BaseReduce';
var ReduceRightTransformer = /** @class */ (function (_super) {
    __extends(ReduceRightTransformer, _super);
    function ReduceRightTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReduceRightTransformer, "title", {
        get: function () {
            return 'Reduce Right';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReduceRightTransformer, "name", {
        get: function () {
            return 'reduceRight';
        },
        enumerable: false,
        configurable: true
    });
    ReduceRightTransformer.prototype.transform = function (value, args) {
        var _a, _b;
        var iteratee = args.iteratee, initialValue = args.initialValue;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.reduceRight) === null || _a === void 0 ? void 0 : _a.call(value, this.getReduceIteratee(iteratee), initialValue())) !== null && _b !== void 0 ? _b : null;
    };
    return ReduceRightTransformer;
}(BaseReduceTransformer));
export { ReduceRightTransformer };
