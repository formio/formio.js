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
import { BaseCalculatableEntity } from '../BaseCalculatableEntity';
var Transformer = /** @class */ (function (_super) {
    __extends(Transformer, _super);
    function Transformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Transformer, "lazyValueEvaluation", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Transformer.prototype.transform = function (value, args, opts) {
        throw new Error('Method #transform() is abstract.');
    };
    return Transformer;
}(BaseCalculatableEntity));
export { Transformer };
