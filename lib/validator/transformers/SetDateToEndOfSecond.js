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
var SetDateToEndOfSecondTransformer = /** @class */ (function (_super) {
    __extends(SetDateToEndOfSecondTransformer, _super);
    function SetDateToEndOfSecondTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetDateToEndOfSecondTransformer, "title", {
        get: function () {
            return 'Set Date To End of Second';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToEndOfSecondTransformer, "name", {
        get: function () {
            return 'setDateToEndOfSecond';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToEndOfSecondTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'second',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SetDateToEndOfSecondTransformer;
}(SetDateToEndOfComponentTransformer));
export { SetDateToEndOfSecondTransformer };
