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
import { DateBetweenOperator } from './DateBetween';
var MonthBetweenOperator = /** @class */ (function (_super) {
    __extends(MonthBetweenOperator, _super);
    function MonthBetweenOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonthBetweenOperator, "name", {
        get: function () {
            return 'monthBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthBetweenOperator, "title", {
        get: function () {
            return 'Month Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthBetweenOperator, "presetArguments", {
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
    return MonthBetweenOperator;
}(DateBetweenOperator));
export { MonthBetweenOperator };
