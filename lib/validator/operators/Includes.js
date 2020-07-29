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
var IncludesOperator = /** @class */ (function (_super) {
    __extends(IncludesOperator, _super);
    function IncludesOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IncludesOperator, "name", {
        get: function () {
            return 'includes';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncludesOperator, "title", {
        get: function () {
            return 'Includes';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncludesOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncludesOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Iterable',
                    key: 'iterable',
                    required: true,
                },
                {
                    name: 'Value To Search',
                    key: 'valueToSearch',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    IncludesOperator.prototype.execute = function (args) {
        var _a, _b;
        var iterable = args.iterable, valueToSearch = args.valueToSearch;
        return (_b = (_a = iterable === null || iterable === void 0 ? void 0 : iterable.includes) === null || _a === void 0 ? void 0 : _a.call(iterable, valueToSearch)) !== null && _b !== void 0 ? _b : false;
    };
    return IncludesOperator;
}(Operator));
export { IncludesOperator };
