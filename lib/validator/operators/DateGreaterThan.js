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
var DateGreaterThanOperator = /** @class */ (function (_super) {
    __extends(DateGreaterThanOperator, _super);
    function DateGreaterThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateGreaterThanOperator, "name", {
        get: function () {
            return 'dateGreaterThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateGreaterThanOperator, "title", {
        get: function () {
            return 'Date Greater Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateGreaterThanOperator, "arguments", {
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
    DateGreaterThanOperator.prototype.execute = function (args) {
        var left = args.left, right = args.right, _a = args.granularity, granularity = _a === void 0 ? 'millisecond' : _a;
        return moment(left).isAfter(right, granularity);
    };
    return DateGreaterThanOperator;
}(Operator));
export { DateGreaterThanOperator };
