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
var SplitTransformer = /** @class */ (function (_super) {
    __extends(SplitTransformer, _super);
    function SplitTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SplitTransformer, "title", {
        get: function () {
            return 'Split';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplitTransformer, "name", {
        get: function () {
            return 'split';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplitTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Separator',
                    key: 'separator',
                    required: false,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    SplitTransformer.prototype.transform = function (value, args) {
        var _a;
        var separator = args.separator;
        return (_a = value === null || value === void 0 ? void 0 : value.split) === null || _a === void 0 ? void 0 : _a.call(value, separator);
    };
    return SplitTransformer;
}(Transformer));
export { SplitTransformer };
