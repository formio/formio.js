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
var HourGreaterThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(HourGreaterThanOrEqualOperator, _super);
    function HourGreaterThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HourGreaterThanOrEqualOperator, "name", {
        get: function () {
            return 'hourGreaterThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HourGreaterThanOrEqualOperator, "title", {
        get: function () {
            return 'Hour Greater Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HourGreaterThanOrEqualOperator, "presetArguments", {
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
    return HourGreaterThanOrEqualOperator;
}(DateGreaterThanOrEqualOperator));
export { HourGreaterThanOrEqualOperator };
