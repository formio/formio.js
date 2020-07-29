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
var DayGreaterThanOperator = /** @class */ (function (_super) {
    __extends(DayGreaterThanOperator, _super);
    function DayGreaterThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayGreaterThanOperator, "name", {
        get: function () {
            return 'dayGreaterThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayGreaterThanOperator, "title", {
        get: function () {
            return 'Day Greater Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayGreaterThanOperator, "presetArguments", {
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
    return DayGreaterThanOperator;
}(DateGreaterThanOperator));
export { DayGreaterThanOperator };
