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
var YearEqualsOperator = /** @class */ (function (_super) {
    __extends(YearEqualsOperator, _super);
    function YearEqualsOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(YearEqualsOperator, "name", {
        get: function () {
            return 'yearEquals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearEqualsOperator, "title", {
        get: function () {
            return 'Year Equals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearEqualsOperator, "presetArguments", {
        get: function () {
            return {
                granularity: {
                    valueSource: 'string',
                    stringInput: 'year',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return YearEqualsOperator;
}(DateEqualsOperator));
export { YearEqualsOperator };
