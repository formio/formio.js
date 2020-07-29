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
var MinuteLessThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(MinuteLessThanOrEqualOperator, _super);
    function MinuteLessThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinuteLessThanOrEqualOperator, "name", {
        get: function () {
            return 'minuteLessThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteLessThanOrEqualOperator, "title", {
        get: function () {
            return 'Minute Less Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteLessThanOrEqualOperator, "presetArguments", {
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
    return MinuteLessThanOrEqualOperator;
}(DateLessThanOrEqualOperator));
export { MinuteLessThanOrEqualOperator };
