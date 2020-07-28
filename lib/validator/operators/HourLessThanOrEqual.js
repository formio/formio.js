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
import { DateLessThanOrEqualOperator } from './DateLessThanOrEqual';
var HourLessThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(HourLessThanOrEqualOperator, _super);
    function HourLessThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HourLessThanOrEqualOperator, "name", {
        get: function () {
            return 'hourLessThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HourLessThanOrEqualOperator, "title", {
        get: function () {
            return 'Hour Less ThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HourLessThanOrEqualOperator, "presetArguments", {
        get: function () {
            return {
                granularity: {
                    valueSource: 'string',
                    stringInput: 'hour',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return HourLessThanOrEqualOperator;
}(DateLessThanOrEqualOperator));
export { HourLessThanOrEqualOperator };
