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
var ConcatTransformer = /** @class */ (function (_super) {
    __extends(ConcatTransformer, _super);
    function ConcatTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ConcatTransformer, "title", {
        get: function () {
            return 'Concat';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConcatTransformer, "name", {
        get: function () {
            return 'concat';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConcatTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value To Add',
                    key: 'valueToAdd',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    ConcatTransformer.prototype.transform = function (value, args) {
        var _a;
        var valueToAdd = args.valueToAdd;
        return (_a = value === null || value === void 0 ? void 0 : value.concat) === null || _a === void 0 ? void 0 : _a.call(value, valueToAdd);
    };
    return ConcatTransformer;
}(Transformer));
export { ConcatTransformer };
