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
var MinuteBetweenOperator = /** @class */ (function (_super) {
    __extends(MinuteBetweenOperator, _super);
    function MinuteBetweenOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinuteBetweenOperator, "name", {
        get: function () {
            return 'minuteBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteBetweenOperator, "title", {
        get: function () {
            return 'Minute Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteBetweenOperator, "presetArguments", {
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
    return MinuteBetweenOperator;
}(DateBetweenOperator));
export { MinuteBetweenOperator };
