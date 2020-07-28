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
var DayBetweenOperator = /** @class */ (function (_super) {
    __extends(DayBetweenOperator, _super);
    function DayBetweenOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayBetweenOperator, "name", {
        get: function () {
            return 'dayBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayBetweenOperator, "title", {
        get: function () {
            return 'Day Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayBetweenOperator, "presetArguments", {
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
    return DayBetweenOperator;
}(DateBetweenOperator));
export { DayBetweenOperator };
