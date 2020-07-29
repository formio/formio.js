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
var LengthTransformer = /** @class */ (function (_super) {
    __extends(LengthTransformer, _super);
    function LengthTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LengthTransformer, "title", {
        get: function () {
            return 'Length';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LengthTransformer, "name", {
        get: function () {
            return 'length';
        },
        enumerable: false,
        configurable: true
    });
    LengthTransformer.prototype.transform = function (value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.length) !== null && _a !== void 0 ? _a : null;
    };
    return LengthTransformer;
}(Transformer));
export { LengthTransformer };
