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
var DateLessThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(DateLessThanOrEqualOperator, _super);
    function DateLessThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateLessThanOrEqualOperator, "name", {
        get: function () {
            return 'dateLessThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateLessThanOrEqualOperator, "title", {
        get: function () {
            return 'Date Less Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateLessThanOrEqualOperator, "arguments", {
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
                {
                    name: 'Granularity',
                    key: 'granularity',
                    required: false,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    DateLessThanOrEqualOperator.prototype.execute = function (args) {
        var left = args.left, right = args.right, _a = args.granularity, granularity = _a === void 0 ? 'millisecond' : _a;
        return moment(left).isSameOrBefore(right, granularity);
    };
    return DateLessThanOrEqualOperator;
}(Operator));
export { DateLessThanOrEqualOperator };
