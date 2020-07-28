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
var MaxTransformer = /** @class */ (function (_super) {
    __extends(MaxTransformer, _super);
    function MaxTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MaxTransformer, "title", {
        get: function () {
            return 'Max';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaxTransformer, "name", {
        get: function () {
            return 'max';
        },
        enumerable: false,
        configurable: true
    });
    MaxTransformer.prototype.transform = function (value) {
        return Math.max.apply(Math, value);
    };
    return MaxTransformer;
}(Transformer));
export { MaxTransformer };
