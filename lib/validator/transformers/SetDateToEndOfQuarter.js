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
import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';
var SetDateToEndOfQuarterTransformer = /** @class */ (function (_super) {
    __extends(SetDateToEndOfQuarterTransformer, _super);
    function SetDateToEndOfQuarterTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetDateToEndOfQuarterTransformer, "title", {
        get: function () {
            return 'Set Date To End of Quarter';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToEndOfQuarterTransformer, "name", {
        get: function () {
            return 'setDateToEndOfQuarter';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToEndOfQuarterTransformer, "presetArguments", {
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
    return SetDateToEndOfQuarterTransformer;
}(SetDateToEndOfComponentTransformer));
export { SetDateToEndOfQuarterTransformer };
