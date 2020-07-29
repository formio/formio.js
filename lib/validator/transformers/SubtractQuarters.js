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
var SubtractQuartersTransformer = /** @class */ (function (_super) {
    __extends(SubtractQuartersTransformer, _super);
    function SubtractQuartersTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubtractQuartersTransformer, "title", {
        get: function () {
            return 'Subtract Quarters';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractQuartersTransformer, "name", {
        get: function () {
            return 'subtractQuarters';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractQuartersTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'quarters',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SubtractQuartersTransformer;
}(SubtractDateComponentTransformer));
export { SubtractQuartersTransformer };
