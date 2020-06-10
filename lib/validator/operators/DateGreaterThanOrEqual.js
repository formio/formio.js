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
import moment from 'moment';
import { Operator } from './Operator';
var DateGreaterThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(DateGreaterThanOrEqualOperator, _super);
    function DateGreaterThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateGreaterThanOrEqualOperator, "name", {
        get: function () {
            return 'dateGreaterThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateGreaterThanOrEqualOperator, "title", {
        get: function () {
            return 'Date Greater Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateGreaterThanOrEqualOperator, "arguments", {
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
    DateGreaterThanOrEqualOperator.prototype.execute = function (args) {
        var left = args.left, right = args.right;
        return moment(left).isSameOrAfter(right);
    };
    return DateGreaterThanOrEqualOperator;
}(Operator));
export { DateGreaterThanOrEqualOperator };
