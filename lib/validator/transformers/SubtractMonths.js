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
import { SubtractDateComponentTransformer } from './SubtractDateComponent';
var SubtractMonthsTransformer = /** @class */ (function (_super) {
    __extends(SubtractMonthsTransformer, _super);
    function SubtractMonthsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubtractMonthsTransformer, "title", {
        get: function () {
            return 'Subtract Months';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractMonthsTransformer, "name", {
        get: function () {
            return 'subtractMonths';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractMonthsTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'months',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SubtractMonthsTransformer;
}(SubtractDateComponentTransformer));
export { SubtractMonthsTransformer };
