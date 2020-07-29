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
var MonthLessThanOperator = /** @class */ (function (_super) {
    __extends(MonthLessThanOperator, _super);
    function MonthLessThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonthLessThanOperator, "name", {
        get: function () {
            return 'monthLessThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthLessThanOperator, "title", {
        get: function () {
            return 'Month Less Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthLessThanOperator, "presetArguments", {
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
    return MonthLessThanOperator;
}(DateLessThanOperator));
export { MonthLessThanOperator };
