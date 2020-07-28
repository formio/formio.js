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
import { DateLessThanOperator } from './DateLessThan';
var MinuteLessThanOperator = /** @class */ (function (_super) {
    __extends(MinuteLessThanOperator, _super);
    function MinuteLessThanOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinuteLessThanOperator, "name", {
        get: function () {
            return 'minuteLessThan';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteLessThanOperator, "title", {
        get: function () {
            return 'Minute Less Than';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MinuteLessThanOperator, "presetArguments", {
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
    return MinuteLessThanOperator;
}(DateLessThanOperator));
export { MinuteLessThanOperator };
