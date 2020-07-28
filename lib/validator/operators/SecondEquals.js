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
var SecondEqualsOperator = /** @class */ (function (_super) {
    __extends(SecondEqualsOperator, _super);
    function SecondEqualsOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SecondEqualsOperator, "name", {
        get: function () {
            return 'secondEquals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SecondEqualsOperator, "title", {
        get: function () {
            return 'Second Equals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SecondEqualsOperator, "presetArguments", {
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
    return SecondEqualsOperator;
}(DateEqualsOperator));
export { SecondEqualsOperator };
