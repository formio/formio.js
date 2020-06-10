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
var AbsTransformer = /** @class */ (function (_super) {
    __extends(AbsTransformer, _super);
    function AbsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbsTransformer, "title", {
        get: function () {
            return 'Abs';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbsTransformer, "name", {
        get: function () {
            return 'abs';
        },
        enumerable: false,
        configurable: true
    });
    AbsTransformer.prototype.transform = function (value) {
        return Math.abs(value);
    };
    return AbsTransformer;
}(Transformer));
export { AbsTransformer };
