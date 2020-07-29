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
var YearGreaterThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(YearGreaterThanOrEqualOperator, _super);
    function YearGreaterThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(YearGreaterThanOrEqualOperator, "name", {
        get: function () {
            return 'yearGreaterThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearGreaterThanOrEqualOperator, "title", {
        get: function () {
            return 'Year Greater Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearGreaterThanOrEqualOperator, "presetArguments", {
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
    return YearGreaterThanOrEqualOperator;
}(DateGreaterThanOrEqualOperator));
export { YearGreaterThanOrEqualOperator };
