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
var MonthGreaterThanOperator = /** @class */ (function (_super) {
    __extends(MonthGreaterThanOperator, _super);
    function MonthGreaterThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonthGreaterThanOperator, "name", {
        get: function () {
            return 'monthGreaterThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthGreaterThanOperator, "title", {
        get: function () {
            return 'Month Greater Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthGreaterThanOperator, "presetArguments", {
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
    return MonthGreaterThanOperator;
}(DateGreaterThanOperator));
export { MonthGreaterThanOperator };
