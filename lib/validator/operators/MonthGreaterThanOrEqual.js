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
import { DateGreaterThanOrEqualOperator } from './DateGreaterThanOrEqual';
var MonthGreaterThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(MonthGreaterThanOrEqualOperator, _super);
    function MonthGreaterThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonthGreaterThanOrEqualOperator, "name", {
        get: function () {
            return 'monthGreaterThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthGreaterThanOrEqualOperator, "title", {
        get: function () {
            return 'Month Greater Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthGreaterThanOrEqualOperator, "presetArguments", {
        get: function () {
            return {
                granularity: {
                    valueSource: 'string',
                    stringInput: 'month',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return MonthGreaterThanOrEqualOperator;
}(DateGreaterThanOrEqualOperator));
export { MonthGreaterThanOrEqualOperator };
