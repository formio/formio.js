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
var ModuloTransformer = /** @class */ (function (_super) {
    __extends(ModuloTransformer, _super);
    function ModuloTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ModuloTransformer, "title", {
        get: function () {
            return 'Modulo';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModuloTransformer, "name", {
        get: function () {
            return 'modulo';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModuloTransformer, "arguments", {
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
    ModuloTransformer.prototype.transform = function (value, args) {
        var divisor = args.divisor;
        return value % divisor;
    };
    return ModuloTransformer;
}(Transformer));
export { ModuloTransformer };
