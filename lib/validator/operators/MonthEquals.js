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
import { DateEqualsOperator } from './DateEquals';
var MonthEqualsOperator = /** @class */ (function (_super) {
    __extends(MonthEqualsOperator, _super);
    function MonthEqualsOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonthEqualsOperator, "name", {
        get: function () {
            return 'monthEquals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthEqualsOperator, "title", {
        get: function () {
            return 'Month Equals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonthEqualsOperator, "presetArguments", {
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
    return MonthEqualsOperator;
}(DateEqualsOperator));
export { MonthEqualsOperator };
