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
var LessThanOperator = /** @class */ (function (_super) {
    __extends(LessThanOperator, _super);
    function LessThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LessThanOperator, "name", {
        get: function () {
            return 'lessThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LessThanOperator, "title", {
        get: function () {
            return 'Less Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LessThanOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Left Side',
                    key: 'left',
                    required: true,
                },
                {
                    name: 'Right Side',
                    key: 'right',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    LessThanOperator.prototype.execute = function (args) {
        var left = args.left, right = args.right;
        return left < right;
    };
    return LessThanOperator;
}(Operator));
export { LessThanOperator };
