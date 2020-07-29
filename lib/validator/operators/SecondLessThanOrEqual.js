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
var SecondLessThanOrEqualOperator = /** @class */ (function (_super) {
    __extends(SecondLessThanOrEqualOperator, _super);
    function SecondLessThanOrEqualOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SecondLessThanOrEqualOperator, "name", {
        get: function () {
            return 'secondLessThanOrEqual';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SecondLessThanOrEqualOperator, "title", {
        get: function () {
            return 'Second Less Than Or Equal';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SecondLessThanOrEqualOperator, "presetArguments", {
        get: function () {
            return {
                granularity: {
                    valueSource: 'string',
                    stringInput: 'second',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SecondLessThanOrEqualOperator;
}(DateLessThanOrEqualOperator));
export { SecondLessThanOrEqualOperator };
