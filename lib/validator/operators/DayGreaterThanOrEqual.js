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
var DayGreaterThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(DayGreaterThanOrEqualOperator, _super);
    function DayGreaterThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayGreaterThanOrEqualOperator, "name", {
        get: function () {
            return 'dayGreaterThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayGreaterThanOrEqualOperator, "title", {
        get: function () {
            return 'Day Greater Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayGreaterThanOrEqualOperator, "presetArguments", {
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
    return DayGreaterThanOrEqualOperator;
}(DateGreaterThanOrEqualOperator));
export { DayGreaterThanOrEqualOperator };
