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
import { DateEqualsOperator } from './DateEquals';
var MinuteEqualsOperator = /** @class */ (function (_super) {
    __extends(MinuteEqualsOperator, _super);
    function MinuteEqualsOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinuteEqualsOperator, "name", {
        get: function () {
            return 'minuteEquals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteEqualsOperator, "title", {
        get: function () {
            return 'Minute Equals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteEqualsOperator, "presetArguments", {
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
    return MinuteEqualsOperator;
}(DateEqualsOperator));
export { MinuteEqualsOperator };
