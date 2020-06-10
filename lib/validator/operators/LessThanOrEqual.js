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
var LessThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(LessThanOrEqualOperator, _super);
    function LessThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LessThanOrEqualOperator, "name", {
        get: function () {
            return 'lessThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LessThanOrEqualOperator, "title", {
        get: function () {
            return 'Less Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LessThanOrEqualOperator, "arguments", {
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
    LessThanOrEqualOperator.prototype.execute = function (args) {
        var left = args.left, right = args.right;
        return left <= right;
    };
    return LessThanOrEqualOperator;
}(Operator));
export { LessThanOrEqualOperator };
