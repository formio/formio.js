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
var SecondGreaterThanOperator = /** @class */ (function (_super) {
    __extends(SecondGreaterThanOperator, _super);
    function SecondGreaterThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SecondGreaterThanOperator, "name", {
        get: function () {
            return 'secondGreaterThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SecondGreaterThanOperator, "title", {
        get: function () {
            return 'Second Greater Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SecondGreaterThanOperator, "presetArguments", {
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
    return SecondGreaterThanOperator;
}(DateGreaterThanOperator));
export { SecondGreaterThanOperator };
