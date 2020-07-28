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
var MinuteGreaterThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(MinuteGreaterThanOrEqualOperator, _super);
    function MinuteGreaterThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinuteGreaterThanOrEqualOperator, "name", {
        get: function () {
            return 'minuteGreaterThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteGreaterThanOrEqualOperator, "title", {
        get: function () {
            return 'Minute Greater Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteGreaterThanOrEqualOperator, "presetArguments", {
        get: function () {
            return {
                granularity: {
                    valueSource: 'string',
                    stringInput: 'minute',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return MinuteGreaterThanOrEqualOperator;
}(DateGreaterThanOrEqualOperator));
export { MinuteGreaterThanOrEqualOperator };
