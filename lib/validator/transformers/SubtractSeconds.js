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
var SubtractSecondsTransformer = /** @class */ (function (_super) {
    __extends(SubtractSecondsTransformer, _super);
    function SubtractSecondsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubtractSecondsTransformer, "title", {
        get: function () {
            return 'Subtract Seconds';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractSecondsTransformer, "name", {
        get: function () {
            return 'subtractSeconds';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractSecondsTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'seconds',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SubtractSecondsTransformer;
}(SubtractDateComponentTransformer));
export { SubtractSecondsTransformer };
