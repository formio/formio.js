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
var SubtractTransformer = /** @class */ (function (_super) {
    __extends(SubtractTransformer, _super);
    function SubtractTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubtractTransformer, "title", {
        get: function () {
            return 'Subtract';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractTransformer, "name", {
        get: function () {
            return 'subtract';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value To Subtract',
                    key: 'valueToSubtract',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    SubtractTransformer.prototype.transform = function (value, args) {
        var valueToSubtract = args.valueToSubtract;
        return value - valueToSubtract;
    };
    return SubtractTransformer;
}(Transformer));
export { SubtractTransformer };
