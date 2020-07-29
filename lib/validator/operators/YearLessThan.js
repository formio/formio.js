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
var YearLessThanOperator = /** @class */ (function (_super) {
    __extends(YearLessThanOperator, _super);
    function YearLessThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(YearLessThanOperator, "name", {
        get: function () {
            return 'yearLessThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearLessThanOperator, "title", {
        get: function () {
            return 'Year Less Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearLessThanOperator, "presetArguments", {
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
    return YearLessThanOperator;
}(DateLessThanOperator));
export { YearLessThanOperator };
