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
var ToNumberTransformer = /** @class */ (function (_super) {
    __extends(ToNumberTransformer, _super);
    function ToNumberTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ToNumberTransformer, "title", {
        get: function () {
            return 'To Number';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToNumberTransformer, "name", {
        get: function () {
            return 'toNumber';
        },
        enumerable: false,
        configurable: true
    });
    ToNumberTransformer.prototype.transform = function (value) {
        return Number(value);
    };
    return ToNumberTransformer;
}(Transformer));
export { ToNumberTransformer };
