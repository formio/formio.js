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
var MultiplyTransformer = /** @class */ (function (_super) {
    __extends(MultiplyTransformer, _super);
    function MultiplyTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MultiplyTransformer, "title", {
        get: function () {
            return 'Multiply';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultiplyTransformer, "name", {
        get: function () {
            return 'multiply';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultiplyTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Multiplier',
                    key: 'multiplier',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    MultiplyTransformer.prototype.transform = function (value, args) {
        var Multiplier = args.Multiplier;
        return value * Multiplier;
    };
    return MultiplyTransformer;
}(Transformer));
export { MultiplyTransformer };
