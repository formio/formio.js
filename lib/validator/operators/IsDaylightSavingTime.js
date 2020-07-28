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
var IsDaylightSavingTimeOperator = /** @class */ (function (_super) {
    __extends(IsDaylightSavingTimeOperator, _super);
    function IsDaylightSavingTimeOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsDaylightSavingTimeOperator, "name", {
        get: function () {
            return 'isDaylightSavingTime';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsDaylightSavingTimeOperator, "title", {
        get: function () {
            return 'Is Daylight Saving Time';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsDaylightSavingTimeOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsDaylightSavingTimeOperator, "arguments", {
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
    IsDaylightSavingTimeOperator.prototype.execute = function (args) {
        var date = args.date;
        return moment(date).isDST();
    };
    return IsDaylightSavingTimeOperator;
}(Operator));
export { IsDaylightSavingTimeOperator };
