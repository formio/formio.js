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
var HourGreaterThanOperator = /** @class */ (function (_super) {
    __extends(HourGreaterThanOperator, _super);
    function HourGreaterThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HourGreaterThanOperator, "name", {
        get: function () {
            return 'hourGreaterThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HourGreaterThanOperator, "title", {
        get: function () {
            return 'Hour Greater Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HourGreaterThanOperator, "presetArguments", {
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
    return HourGreaterThanOperator;
}(DateGreaterThanOperator));
export { HourGreaterThanOperator };
