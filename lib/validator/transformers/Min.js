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
var MinTransformer = /** @class */ (function (_super) {
    __extends(MinTransformer, _super);
    function MinTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinTransformer, "title", {
        get: function () {
            return 'Min';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinTransformer, "name", {
        get: function () {
            return 'min';
        },
        enumerable: false,
        configurable: true
    });
    MinTransformer.prototype.transform = function (value) {
        return Math.min.apply(Math, value);
    };
    return MinTransformer;
}(Transformer));
export { MinTransformer };
