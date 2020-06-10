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
var SliceTransformer = /** @class */ (function (_super) {
    __extends(SliceTransformer, _super);
    function SliceTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SliceTransformer, "title", {
        get: function () {
            return 'Slice';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SliceTransformer, "name", {
        get: function () {
            return 'slice';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SliceTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'From',
                    key: 'from',
                    required: true,
                },
                {
                    name: 'To',
                    key: 'to',
                    required: false,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    SliceTransformer.prototype.transform = function (value, args) {
        var _a, _b;
        var from = args.from, to = args.to;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.slice) === null || _a === void 0 ? void 0 : _a.call(value, from, to)) !== null && _b !== void 0 ? _b : null;
    };
    return SliceTransformer;
}(Transformer));
export { SliceTransformer };
