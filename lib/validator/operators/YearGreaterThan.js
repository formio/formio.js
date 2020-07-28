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
var YearGreaterThanOperator = /** @class */ (function (_super) {
    __extends(YearGreaterThanOperator, _super);
    function YearGreaterThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(YearGreaterThanOperator, "name", {
        get: function () {
            return 'yearGreaterThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearGreaterThanOperator, "title", {
        get: function () {
            return 'Year Greater Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearGreaterThanOperator, "presetArguments", {
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
    return YearGreaterThanOperator;
}(DateGreaterThanOperator));
export { YearGreaterThanOperator };
