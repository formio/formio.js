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
import { DateGreaterThanOperator } from './DateGreaterThan';
var WeekGreaterThanOperator = /** @class */ (function (_super) {
    __extends(WeekGreaterThanOperator, _super);
    function WeekGreaterThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WeekGreaterThanOperator, "name", {
        get: function () {
            return 'weekGreaterThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WeekGreaterThanOperator, "title", {
        get: function () {
            return 'Week Greater Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WeekGreaterThanOperator, "presetArguments", {
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
    return WeekGreaterThanOperator;
}(DateGreaterThanOperator));
export { WeekGreaterThanOperator };
