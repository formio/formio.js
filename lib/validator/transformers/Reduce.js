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
var ReduceTransformer = /** @class */ (function (_super) {
    __extends(ReduceTransformer, _super);
    function ReduceTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReduceTransformer, "title", {
        get: function () {
            return 'Reduce';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReduceTransformer, "name", {
        get: function () {
            return 'reduce';
        },
        enumerable: false,
        configurable: true
    });
    ReduceTransformer.prototype.transform = function (value, args) {
        var _a, _b;
        var iteratee = args.iteratee, initialValue = args.initialValue;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.reduce) === null || _a === void 0 ? void 0 : _a.call(value, this.getReduceIteratee(iteratee), initialValue())) !== null && _b !== void 0 ? _b : null;
    };
    return ReduceTransformer;
}(BaseReduceTransformer));
export { ReduceTransformer };
