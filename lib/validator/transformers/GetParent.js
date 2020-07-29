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
var GetParentTransformer = /** @class */ (function (_super) {
    __extends(GetParentTransformer, _super);
    function GetParentTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetParentTransformer, "title", {
        get: function () {
            return 'Get Parent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetParentTransformer, "name", {
        get: function () {
            return 'getParent';
        },
        enumerable: false,
        configurable: true
    });
    GetParentTransformer.prototype.transform = function (value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.parent) !== null && _a !== void 0 ? _a : null;
    };
    return GetParentTransformer;
}(Transformer));
export { GetParentTransformer };
