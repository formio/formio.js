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
var IsLeapYearOperator = /** @class */ (function (_super) {
    __extends(IsLeapYearOperator, _super);
    function IsLeapYearOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsLeapYearOperator, "name", {
        get: function () {
            return 'isLeapYear';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsLeapYearOperator, "title", {
        get: function () {
            return 'Is Leap Year';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsLeapYearOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsLeapYearOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Date',
                    key: 'date',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    IsLeapYearOperator.prototype.execute = function (args) {
        var date = args.date;
        return moment(date).isLeapYear();
    };
    return IsLeapYearOperator;
}(Operator));
export { IsLeapYearOperator };
