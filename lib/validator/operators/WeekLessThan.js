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
import { DateLessThanOperator } from './DateLessThan';
var WeekLessThanOperator = /** @class */ (function (_super) {
    __extends(WeekLessThanOperator, _super);
    function WeekLessThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WeekLessThanOperator, "name", {
        get: function () {
            return 'weekLessThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WeekLessThanOperator, "title", {
        get: function () {
            return 'Week Less Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WeekLessThanOperator, "presetArguments", {
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
    return WeekLessThanOperator;
}(DateLessThanOperator));
export { WeekLessThanOperator };
