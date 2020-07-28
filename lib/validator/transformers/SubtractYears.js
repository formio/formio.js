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
var SubtractYearsTransformer = /** @class */ (function (_super) {
    __extends(SubtractYearsTransformer, _super);
    function SubtractYearsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubtractYearsTransformer, "title", {
        get: function () {
            return 'Subtract Years';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractYearsTransformer, "name", {
        get: function () {
            return 'subtractYears';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractYearsTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'years',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SubtractYearsTransformer;
}(SubtractDateComponentTransformer));
export { SubtractYearsTransformer };
