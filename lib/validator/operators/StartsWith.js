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
import { Operator } from './Operator';
var StartsWithOperator = /** @class */ (function (_super) {
    __extends(StartsWithOperator, _super);
    function StartsWithOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StartsWithOperator, "name", {
        get: function () {
            return 'startsWith';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StartsWithOperator, "title", {
        get: function () {
            return 'Starts With';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StartsWithOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StartsWithOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'String',
                    key: 'string',
                    required: true,
                },
                {
                    name: 'Search String',
                    key: 'searchString',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    StartsWithOperator.prototype.execute = function (args) {
        var _a, _b;
        var searchString = args.searchString, string = args.string;
        return (_b = (_a = string === null || string === void 0 ? void 0 : string.startsWith) === null || _a === void 0 ? void 0 : _a.call(string, searchString)) !== null && _b !== void 0 ? _b : false;
    };
    return StartsWithOperator;
}(Operator));
export { StartsWithOperator };
