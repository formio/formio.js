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
import { Transformer } from './Transformer';
var FlatTransformer = /** @class */ (function (_super) {
    __extends(FlatTransformer, _super);
    function FlatTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FlatTransformer, "title", {
        get: function () {
            return 'Flat';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlatTransformer, "name", {
        get: function () {
            return 'flat';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FlatTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Depth',
                    key: 'depth',
                    required: false,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    FlatTransformer.prototype.transform = function (value, args) {
        var _a;
        var _b = args.depth, depth = _b === void 0 ? 1 : _b;
        return (_a = value === null || value === void 0 ? void 0 : value.flat) === null || _a === void 0 ? void 0 : _a.call(value, depth);
    };
    return FlatTransformer;
}(Transformer));
export { FlatTransformer };
