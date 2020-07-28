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
var WeekGreaterThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(WeekGreaterThanOrEqualOperator, _super);
    function WeekGreaterThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WeekGreaterThanOrEqualOperator, "name", {
        get: function () {
            return 'weekGreaterThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WeekGreaterThanOrEqualOperator, "title", {
        get: function () {
            return 'Week Greater Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WeekGreaterThanOrEqualOperator, "presetArguments", {
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
    return WeekGreaterThanOrEqualOperator;
}(DateGreaterThanOrEqualOperator));
export { WeekGreaterThanOrEqualOperator };
