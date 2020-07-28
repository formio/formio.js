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
var SubtractMillsecondsTransformer = /** @class */ (function (_super) {
    __extends(SubtractMillsecondsTransformer, _super);
    function SubtractMillsecondsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubtractMillsecondsTransformer, "title", {
        get: function () {
            return 'Subtract Millseconds';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractMillsecondsTransformer, "name", {
        get: function () {
            return 'subtractMillseconds';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SubtractMillsecondsTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'milliseconds',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SubtractMillsecondsTransformer;
}(SubtractDateComponentTransformer));
export { SubtractMillsecondsTransformer };
