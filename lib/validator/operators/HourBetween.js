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
var HourBetweenOperator = /** @class */ (function (_super) {
    __extends(HourBetweenOperator, _super);
    function HourBetweenOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HourBetweenOperator, "name", {
        get: function () {
            return 'hourBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HourBetweenOperator, "title", {
        get: function () {
            return 'Hour Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HourBetweenOperator, "presetArguments", {
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
    return HourBetweenOperator;
}(DateBetweenOperator));
export { HourBetweenOperator };
