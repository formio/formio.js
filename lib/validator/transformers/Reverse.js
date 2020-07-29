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
var ReverseTransformer = /** @class */ (function (_super) {
    __extends(ReverseTransformer, _super);
    function ReverseTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReverseTransformer, "title", {
        get: function () {
            return 'Reverse';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReverseTransformer, "name", {
        get: function () {
            return 'reverse';
        },
        enumerable: false,
        configurable: true
    });
    ReverseTransformer.prototype.transform = function (value) {
        var _a;
        // Revert array in immutable manner.
        return (_a = value === null || value === void 0 ? void 0 : value.slice) === null || _a === void 0 ? void 0 : _a.call(value).reverse;
    };
    return ReverseTransformer;
}(Transformer));
export { ReverseTransformer };
