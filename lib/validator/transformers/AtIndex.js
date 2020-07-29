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
var AtIndexTransformer = /** @class */ (function (_super) {
    __extends(AtIndexTransformer, _super);
    function AtIndexTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AtIndexTransformer, "title", {
        get: function () {
            return 'At Index';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AtIndexTransformer, "name", {
        get: function () {
            return 'atIndex';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AtIndexTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Index',
                    key: 'index',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    AtIndexTransformer.prototype.transform = function (value, args) {
        var _a;
        var index = args.index;
        return (_a = value === null || value === void 0 ? void 0 : value[index]) !== null && _a !== void 0 ? _a : null;
    };
    return AtIndexTransformer;
}(Transformer));
export { AtIndexTransformer };
