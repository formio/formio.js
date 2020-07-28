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
var DivideTransformer = /** @class */ (function (_super) {
    __extends(DivideTransformer, _super);
    function DivideTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DivideTransformer, "title", {
        get: function () {
            return 'Divide';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DivideTransformer, "name", {
        get: function () {
            return 'divide';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DivideTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Divisor',
                    key: 'divisor',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    DivideTransformer.prototype.transform = function (value, args) {
        var divisor = args.divisor;
        return value / divisor;
    };
    return DivideTransformer;
}(Transformer));
export { DivideTransformer };
