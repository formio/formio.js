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
import { SetDateComponentTransformer } from './SetDateComponent';
var SetQuarterTransformer = /** @class */ (function (_super) {
    __extends(SetQuarterTransformer, _super);
    function SetQuarterTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetQuarterTransformer, "title", {
        get: function () {
            return 'Set Quarter';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetQuarterTransformer, "name", {
        get: function () {
            return 'setQuarter';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetQuarterTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'quarter',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SetQuarterTransformer;
}(SetDateComponentTransformer));
export { SetQuarterTransformer };
