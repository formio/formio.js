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
var IdentityTransformer = /** @class */ (function (_super) {
    __extends(IdentityTransformer, _super);
    function IdentityTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IdentityTransformer, "title", {
        get: function () {
            return 'Identity';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IdentityTransformer, "name", {
        get: function () {
            return 'identity';
        },
        enumerable: false,
        configurable: true
    });
    IdentityTransformer.prototype.transform = function (value) {
        return value;
    };
    return IdentityTransformer;
}(Transformer));
export { IdentityTransformer };
