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
import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';
var DayLessThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(DayLessThanOrEqualOperator, _super);
    function DayLessThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayLessThanOrEqualOperator, "name", {
        get: function () {
            return 'dayLessThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayLessThanOrEqualOperator, "title", {
        get: function () {
            return 'Day Less ThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayLessThanOrEqualOperator, "presetArguments", {
        get: function () {
            return {
                granularity: {
                    valueSource: 'string',
                    stringInput: 'day',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return DayLessThanOrEqualOperator;
}(DateLessThanOrEqualOperator));
export { DayLessThanOrEqualOperator };
