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
var YearBetweenOperator = /** @class */ (function (_super) {
    __extends(YearBetweenOperator, _super);
    function YearBetweenOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(YearBetweenOperator, "name", {
        get: function () {
            return 'yearBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearBetweenOperator, "title", {
        get: function () {
            return 'Year Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YearBetweenOperator, "presetArguments", {
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
    return YearBetweenOperator;
}(DateBetweenOperator));
export { YearBetweenOperator };
