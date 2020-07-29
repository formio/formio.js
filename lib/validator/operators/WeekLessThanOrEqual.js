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
var WeekLessThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(WeekLessThanOrEqualOperator, _super);
    function WeekLessThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WeekLessThanOrEqualOperator, "name", {
        get: function () {
            return 'weekLessThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WeekLessThanOrEqualOperator, "title", {
        get: function () {
            return 'Week Less Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WeekLessThanOrEqualOperator, "presetArguments", {
        get: function () {
            return {
                granularity: {
                    valueSource: 'string',
                    stringInput: 'isoWeek',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return WeekLessThanOrEqualOperator;
}(DateLessThanOrEqualOperator));
export { WeekLessThanOrEqualOperator };
